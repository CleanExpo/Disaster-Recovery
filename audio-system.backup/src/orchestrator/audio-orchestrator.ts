/**
 * Master Audio Orchestrator
 * Coordinates all audio operations across agents and services
 */

import { EventEmitter } from 'eventemitter3';
import winston from 'winston';
import { LanguageAgent } from '../agents/language-agent';
import { VoiceAgent } from '../agents/voice-agent';
import { CacheAgent } from '../agents/cache-agent';
import { StreamingAgent } from '../agents/streaming-agent';
import { ElevenLabsService } from '../services/elevenlabs-service';
import { Queue } from 'bullmq';
import crypto from 'crypto';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

export interface AudioRequest {
  text: string;
  language?: string;
  voice?: string;
  context?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  cache?: boolean;
  streaming?: boolean;
  format?: string;
  metadata?: any;
}

export interface AudioResponse {
  url?: string;
  stream?: ReadableStream;
  buffer?: Buffer;
  duration?: number;
  language: string;
  voice: string;
  cached: boolean;
  requestId: string;
  metadata?: any;
}

export interface BatchRequest {
  items: AudioRequest[];
  priority?: string;
  callback?: (results: AudioResponse[]) => void;
}

export class AudioOrchestrator extends EventEmitter {
  private languageAgent: LanguageAgent;
  private voiceAgent: VoiceAgent;
  private cacheAgent: CacheAgent;
  private streamingAgent: StreamingAgent;
  private elevenLabsService: ElevenLabsService;
  private queue: Queue;
  private activeRequests: Map<string, any> = new Map();
  
  constructor() {
    super();
    
    // Initialize agents
    this.languageAgent = new LanguageAgent();
    this.voiceAgent = new VoiceAgent();
    this.cacheAgent = new CacheAgent();
    this.streamingAgent = new StreamingAgent();
    this.elevenLabsService = new ElevenLabsService();
    
    // Initialize queue for batch processing
    this.queue = new Queue('audio-generation', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379')
      }
    });
    
    this.setupEventHandlers();
    
    logger.info('Audio Orchestrator initialized');
  }
  
  /**
   * Generate audio with full orchestration
   */
  async generateAudio(request: AudioRequest): Promise<AudioResponse> {
    const requestId = this.generateRequestId();
    
    try {
      logger.info(`Processing audio request ${requestId}`, {
        textLength: request.text.length,
        language: request.language,
        context: request.context
      });
      
      // Track request
      this.activeRequests.set(requestId, request);
      
      // Step 1: Language detection
      const detectedLanguage = request.language || 
        await this.languageAgent.detectLanguage(request.text);
      
      // Step 2: Check cache
      if (request.cache !== false) {
        const cacheKey = this.cacheAgent.generateKey({
          text: request.text,
          language: detectedLanguage,
          voice: request.voice
        });
        
        const cached = await this.cacheAgent.get(cacheKey);
        if (cached) {
          logger.info(`Cache hit for request ${requestId}`);
          return {
            ...cached,
            cached: true,
            requestId
          };
        }
      }
      
      // Step 3: Voice selection
      const voiceConfig = await this.voiceAgent.selectVoice({
        language: detectedLanguage,
        context: request.context,
        voice: request.voice
      });
      
      // Step 4: Generate or stream audio
      let audioResult;
      
      if (request.streaming) {
        // Real-time streaming
        const stream = await this.streamingAgent.createStream({
          text: request.text,
          voiceId: voiceConfig.voiceId,
          language: detectedLanguage,
          settings: voiceConfig.settings
        });
        
        audioResult = {
          stream,
          language: detectedLanguage,
          voice: voiceConfig.voiceId,
          cached: false,
          requestId
        };
      } else {
        // Standard generation
        const result = await this.elevenLabsService.generateAudio({
          text: request.text,
          voiceId: voiceConfig.voiceId,
          voiceSettings: voiceConfig.settings,
          language: detectedLanguage,
          outputFormat: request.format || 'mp3_44100_128'
        });
        
        // Save to cache
        if (request.cache !== false) {
          const url = await this.cacheAgent.save({
            key: this.cacheAgent.generateKey({
              text: request.text,
              language: detectedLanguage,
              voice: voiceConfig.voiceId
            }),
            buffer: result.audioBuffer,
            metadata: {
              language: detectedLanguage,
              voice: voiceConfig.voiceId,
              duration: result.duration,
              format: request.format
            }
          });
          
          audioResult = {
            url,
            buffer: result.audioBuffer,
            duration: result.duration,
            language: detectedLanguage,
            voice: voiceConfig.voiceId,
            cached: false,
            requestId
          };
        } else {
          audioResult = {
            buffer: result.audioBuffer,
            duration: result.duration,
            language: detectedLanguage,
            voice: voiceConfig.voiceId,
            cached: false,
            requestId
          };
        }
      }
      
      // Clean up
      this.activeRequests.delete(requestId);
      
      // Emit success event
      this.emit('audio:generated', {
        requestId,
        language: detectedLanguage,
        cached: false
      });
      
      return audioResult;
      
    } catch (error) {
      logger.error(`Failed to process audio request ${requestId}`, error);
      this.activeRequests.delete(requestId);
      
      // Emit error event
      this.emit('audio:error', {
        requestId,
        error: error.message
      });
      
      throw error;
    }
  }
  
  /**
   * Stream audio in real-time
   */
  async streamAudio(request: AudioRequest): Promise<ReadableStream> {
    const streamId = this.generateRequestId();
    
    try {
      logger.info(`Creating audio stream ${streamId}`);
      
      // Detect language
      const language = request.language || 
        await this.languageAgent.detectLanguage(request.text);
      
      // Select voice
      const voiceConfig = await this.voiceAgent.selectVoice({
        language,
        context: request.context,
        voice: request.voice
      });
      
      // Create stream
      const stream = await this.streamingAgent.createStream({
        text: request.text,
        voiceId: voiceConfig.voiceId,
        language,
        settings: voiceConfig.settings,
        priority: request.priority
      });
      
      // Track stream
      this.activeRequests.set(streamId, { type: 'stream', request });
      
      // Handle stream events
      stream.on('end', () => {
        this.activeRequests.delete(streamId);
        this.emit('stream:end', { streamId });
      });
      
      stream.on('error', (error) => {
        this.activeRequests.delete(streamId);
        this.emit('stream:error', { streamId, error });
      });
      
      return stream;
      
    } catch (error) {
      logger.error(`Failed to create audio stream ${streamId}`, error);
      throw error;
    }
  }
  
  /**
   * Process batch audio requests
   */
  async batchProcess(batch: BatchRequest): Promise<string> {
    const jobId = this.generateRequestId();
    
    try {
      logger.info(`Processing batch job ${jobId}`, {
        itemCount: batch.items.length,
        priority: batch.priority
      });
      
      // Add to queue
      await this.queue.add('batch-audio', {
        jobId,
        items: batch.items,
        priority: batch.priority || 'low',
        callback: batch.callback
      }, {
        priority: this.getPriorityValue(batch.priority || 'low'),
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });
      
      // Track job
      this.activeRequests.set(jobId, { type: 'batch', batch });
      
      return jobId;
      
    } catch (error) {
      logger.error(`Failed to queue batch job ${jobId}`, error);
      throw error;
    }
  }
  
  /**
   * Pre-generate cache for common phrases
   */
  async preGenerateCache(options: {
    phrases: string[];
    languages: string[];
    voices?: string[];
  }): Promise<any> {
    const results = {
      generated: 0,
      failed: 0,
      urls: []
    };
    
    try {
      for (const phrase of options.phrases) {
        for (const language of options.languages) {
          const voices = options.voices || [await this.voiceAgent.getDefaultVoice(language)];
          
          for (const voice of voices) {
            try {
              const result = await this.generateAudio({
                text: phrase,
                language,
                voice,
                cache: true,
                priority: 'low'
              });
              
              results.generated++;
              results.urls.push(result.url);
              
            } catch (error) {
              logger.warn(`Failed to pre-generate: ${phrase} in ${language}`, error);
              results.failed++;
            }
          }
        }
      }
      
      logger.info('Cache pre-generation completed', results);
      return results;
      
    } catch (error) {
      logger.error('Cache pre-generation failed', error);
      throw error;
    }
  }
  
  /**
   * Create WebSocket connection for bidirectional streaming
   */
  async createWebSocketStream(options: {
    voiceId?: string;
    onMessage?: (data: any) => void;
    onError?: (error: any) => void;
  }): Promise<WebSocket> {
    try {
      const ws = await this.elevenLabsService.createWebSocketStream(options.voiceId);
      
      if (options.onMessage) {
        ws.on('message', options.onMessage);
      }
      
      if (options.onError) {
        ws.on('error', options.onError);
      }
      
      return ws;
      
    } catch (error) {
      logger.error('Failed to create WebSocket stream', error);
      throw error;
    }
  }
  
  /**
   * Clone a voice
   */
  async cloneVoice(options: {
    name: string;
    samples: Buffer[];
    description?: string;
  }): Promise<string> {
    try {
      const voiceId = await this.elevenLabsService.cloneVoice(
        options.name,
        options.samples,
        options.description
      );
      
      // Register with voice agent
      await this.voiceAgent.registerVoice({
        id: voiceId,
        name: options.name,
        type: 'cloned',
        languages: ['en-AU'] // Default to Australian English
      });
      
      return voiceId;
      
    } catch (error) {
      logger.error('Voice cloning failed', error);
      throw error;
    }
  }
  
  /**
   * Get available voices
   */
  async getVoices(): Promise<any[]> {
    return await this.voiceAgent.getAvailableVoices();
  }
  
  /**
   * Get supported languages
   */
  async getLanguages(): Promise<string[]> {
    return this.languageAgent.getSupportedLanguages();
  }
  
  /**
   * Get orchestrator statistics
   */
  getStats(): any {
    return {
      activeRequests: this.activeRequests.size,
      cacheStats: this.cacheAgent.getStats(),
      streamingStats: this.streamingAgent.getStats(),
      voiceStats: this.voiceAgent.getStats(),
      languageStats: this.languageAgent.getStats()
    };
  }
  
  /**
   * Private helper methods
   */
  
  private setupEventHandlers(): void {
    // Agent event handlers
    this.languageAgent.on('language:detected', (data) => {
      this.emit('language:detected', data);
    });
    
    this.voiceAgent.on('voice:selected', (data) => {
      this.emit('voice:selected', data);
    });
    
    this.cacheAgent.on('cache:hit', (data) => {
      this.emit('cache:hit', data);
    });
    
    this.cacheAgent.on('cache:miss', (data) => {
      this.emit('cache:miss', data);
    });
    
    this.streamingAgent.on('stream:started', (data) => {
      this.emit('stream:started', data);
    });
  }
  
  private generateRequestId(): string {
    return crypto.randomBytes(16).toString('hex');
  }
  
  private getPriorityValue(priority: string): number {
    const priorities = {
      critical: 1,
      high: 2,
      medium: 3,
      low: 4
    };
    return priorities[priority] || 3;
  }
  
  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    // Clean up all agents
    await Promise.all([
      this.languageAgent.cleanup(),
      this.voiceAgent.cleanup(),
      this.cacheAgent.cleanup(),
      this.streamingAgent.cleanup(),
      this.elevenLabsService.cleanup()
    ]);
    
    // Clear active requests
    this.activeRequests.clear();
    
    // Close queue
    await this.queue.close();
    
    logger.info('Audio Orchestrator cleaned up');
  }
}

export default AudioOrchestrator;