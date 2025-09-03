/**
 * ElevenLabs API Integration Service
 * Handles all direct interactions with ElevenLabs API
 */

import { ElevenLabsClient, play } from 'elevenlabs';
import { Readable } from 'stream';
import winston from 'winston';
import crypto from 'crypto';
import { EventEmitter } from 'eventemitter3';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

export interface VoiceSettings {
  stability: number;
  similarityBoost: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export interface AudioGenerationOptions {
  text: string;
  voiceId?: string;
  modelId?: string;
  language?: string;
  voiceSettings?: VoiceSettings;
  outputFormat?: string;
  optimizeStreamingLatency?: number;
  previousRequestIds?: string[];
  seed?: number;
}

export interface StreamOptions extends AudioGenerationOptions {
  chunkLengthSchedule?: number[];
  enableSsmlParsing?: boolean;
}

export interface AudioResult {
  audioBuffer?: Buffer;
  audioStream?: Readable;
  duration?: number;
  requestId: string;
  cached: boolean;
}

export class ElevenLabsService extends EventEmitter {
  private client: ElevenLabsClient;
  private defaultVoiceId: string;
  private activeStreams: Map<string, any> = new Map();
  private voiceCache: Map<string, any> = new Map();
  
  constructor() {
    super();
    
    // Initialize ElevenLabs client
    this.client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY || ''
    });
    
    this.defaultVoiceId = process.env.SELECTED_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
    
    // Preload voices
    this.loadVoices();
  }
  
  /**
   * Generate audio from text
   */
  async generateAudio(options: AudioGenerationOptions): Promise<AudioResult> {
    const requestId = this.generateRequestId();
    
    try {
      logger.info(`Generating audio for request ${requestId}`, {
        textLength: options.text.length,
        language: options.language,
        voiceId: options.voiceId || this.defaultVoiceId
      });
      
      // Select appropriate model based on language
      const modelId = options.modelId || this.selectModel(options.language);
      
      // Generate audio
      const audioBuffer = await this.client.textToSpeech.convert(
        options.voiceId || this.defaultVoiceId,
        {
          text: options.text,
          model_id: modelId,
          voice_settings: this.normalizeVoiceSettings(options.voiceSettings),
          output_format: options.outputFormat || 'mp3_44100_128',
          optimize_streaming_latency: options.optimizeStreamingLatency,
          previous_request_ids: options.previousRequestIds,
          seed: options.seed
        }
      );
      
      // Convert to Buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of audioBuffer) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      
      logger.info(`Audio generated successfully for request ${requestId}`, {
        size: buffer.length,
        format: options.outputFormat || 'mp3_44100_128'
      });
      
      return {
        audioBuffer: buffer,
        requestId,
        cached: false,
        duration: this.estimateDuration(buffer.length, options.outputFormat)
      };
      
    } catch (error) {
      logger.error(`Failed to generate audio for request ${requestId}`, error);
      throw new Error(`Audio generation failed: ${error.message}`);
    }
  }
  
  /**
   * Stream audio generation for real-time playback
   */
  async streamAudio(options: StreamOptions): Promise<Readable> {
    const streamId = this.generateRequestId();
    
    try {
      logger.info(`Starting audio stream ${streamId}`);
      
      const modelId = options.modelId || 'eleven_flash_v2_5'; // Low latency model
      
      // Create streaming request
      const audioStream = await this.client.textToSpeech.stream(
        options.voiceId || this.defaultVoiceId,
        {
          text: options.text,
          model_id: modelId,
          voice_settings: this.normalizeVoiceSettings(options.voiceSettings),
          output_format: options.outputFormat || 'mp3_44100_128',
          optimize_streaming_latency: options.optimizeStreamingLatency || 3,
          enable_ssml_parsing: options.enableSsmlParsing
        }
      );
      
      // Track active stream
      this.activeStreams.set(streamId, audioStream);
      
      // Convert to Node.js Readable stream
      const readable = new Readable({
        async read() {
          try {
            const { value, done } = await audioStream.next();
            if (done) {
              this.push(null);
            } else {
              this.push(Buffer.from(value));
            }
          } catch (error) {
            this.destroy(error);
          }
        }
      });
      
      // Clean up on stream end
      readable.on('end', () => {
        this.activeStreams.delete(streamId);
        logger.info(`Audio stream ${streamId} completed`);
      });
      
      return readable;
      
    } catch (error) {
      logger.error(`Failed to create audio stream ${streamId}`, error);
      throw new Error(`Stream creation failed: ${error.message}`);
    }
  }
  
  /**
   * Create WebSocket connection for bidirectional streaming
   */
  async createWebSocketStream(voiceId?: string): Promise<WebSocket> {
    const wsUrl = `wss://api.elevenlabs.io/v1/text-to-speech/${voiceId || this.defaultVoiceId}/stream-input`;
    
    const ws = new WebSocket(wsUrl, {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY || ''
      }
    });
    
    const streamId = this.generateRequestId();
    
    ws.on('open', () => {
      logger.info(`WebSocket stream ${streamId} connected`);
      
      // Send initial configuration
      ws.send(JSON.stringify({
        text: ' ',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true
        },
        generation_config: {
          chunk_length_schedule: [120, 160, 250, 290]
        }
      }));
    });
    
    ws.on('error', (error) => {
      logger.error(`WebSocket stream ${streamId} error`, error);
    });
    
    ws.on('close', () => {
      logger.info(`WebSocket stream ${streamId} closed`);
      this.activeStreams.delete(streamId);
    });
    
    this.activeStreams.set(streamId, ws);
    
    return ws;
  }
  
  /**
   * Generate audio with timestamps for synchronization
   */
  async generateWithTimestamps(options: AudioGenerationOptions): Promise<any> {
    try {
      const response = await this.client.textToSpeech.convertWithTimestamps(
        options.voiceId || this.defaultVoiceId,
        {
          text: options.text,
          model_id: options.modelId || 'eleven_multilingual_v2',
          voice_settings: this.normalizeVoiceSettings(options.voiceSettings),
          output_format: options.outputFormat || 'mp3_44100_128'
        }
      );
      
      return {
        audio: response.audio,
        alignment: response.alignment,
        requestId: this.generateRequestId(),
        cached: false
      };
      
    } catch (error) {
      logger.error('Failed to generate audio with timestamps', error);
      throw error;
    }
  }
  
  /**
   * Clone a voice from audio samples
   */
  async cloneVoice(name: string, files: Buffer[], description?: string): Promise<string> {
    try {
      logger.info(`Cloning voice: ${name}`);
      
      const voice = await this.client.voices.add({
        name,
        files,
        description,
        labels: {
          accent: 'australian',
          use_case: 'disaster_recovery'
        }
      });
      
      // Cache the new voice
      this.voiceCache.set(voice.voice_id, voice);
      
      logger.info(`Voice cloned successfully: ${voice.voice_id}`);
      return voice.voice_id;
      
    } catch (error) {
      logger.error(`Failed to clone voice: ${name}`, error);
      throw error;
    }
  }
  
  /**
   * Get available voices
   */
  async getVoices(): Promise<any[]> {
    try {
      // Check cache first
      if (this.voiceCache.size > 0) {
        return Array.from(this.voiceCache.values());
      }
      
      const voices = await this.client.voices.getAll();
      
      // Cache voices
      voices.voices.forEach(voice => {
        this.voiceCache.set(voice.voice_id, voice);
      });
      
      return voices.voices;
      
    } catch (error) {
      logger.error('Failed to fetch voices', error);
      throw error;
    }
  }
  
  /**
   * Get voice by ID
   */
  async getVoice(voiceId: string): Promise<any> {
    try {
      // Check cache
      if (this.voiceCache.has(voiceId)) {
        return this.voiceCache.get(voiceId);
      }
      
      const voice = await this.client.voices.get(voiceId);
      this.voiceCache.set(voiceId, voice);
      
      return voice;
      
    } catch (error) {
      logger.error(`Failed to fetch voice: ${voiceId}`, error);
      throw error;
    }
  }
  
  /**
   * Delete a voice
   */
  async deleteVoice(voiceId: string): Promise<void> {
    try {
      await this.client.voices.delete(voiceId);
      this.voiceCache.delete(voiceId);
      logger.info(`Voice deleted: ${voiceId}`);
    } catch (error) {
      logger.error(`Failed to delete voice: ${voiceId}`, error);
      throw error;
    }
  }
  
  /**
   * Get usage information
   */
  async getUsage(): Promise<any> {
    try {
      const usage = await this.client.user.getSubscription();
      return usage;
    } catch (error) {
      logger.error('Failed to fetch usage', error);
      throw error;
    }
  }
  
  /**
   * Speech to speech conversion
   */
  async speechToSpeech(audioFile: Buffer, voiceId?: string): Promise<Buffer> {
    try {
      const result = await this.client.speechToSpeech.convert(
        voiceId || this.defaultVoiceId,
        {
          audio: audioFile,
          model_id: 'eleven_english_sts_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.0,
            use_speaker_boost: true
          },
          output_format: 'mp3_44100_128'
        }
      );
      
      // Convert to Buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of result) {
        chunks.push(chunk);
      }
      
      return Buffer.concat(chunks);
      
    } catch (error) {
      logger.error('Speech to speech conversion failed', error);
      throw error;
    }
  }
  
  /**
   * Private helper methods
   */
  
  private async loadVoices(): Promise<void> {
    try {
      const voices = await this.getVoices();
      logger.info(`Loaded ${voices.length} voices`);
    } catch (error) {
      logger.warn('Failed to preload voices', error);
    }
  }
  
  private selectModel(language?: string): string {
    // Select appropriate model based on language
    if (!language || language.startsWith('en')) {
      return 'eleven_flash_v2_5'; // Fast English model
    }
    
    // Multi-language model for other languages
    return 'eleven_multilingual_v2';
  }
  
  private normalizeVoiceSettings(settings?: VoiceSettings): any {
    return {
      stability: settings?.stability ?? 0.5,
      similarity_boost: settings?.similarityBoost ?? 0.8,
      style: settings?.style ?? 0.0,
      use_speaker_boost: settings?.useSpeakerBoost ?? false
    };
  }
  
  private generateRequestId(): string {
    return crypto.randomBytes(16).toString('hex');
  }
  
  private estimateDuration(byteSize: number, format?: string): number {
    // Rough estimation based on format and size
    const bitrate = format?.includes('128') ? 128000 : 64000;
    const duration = (byteSize * 8) / bitrate;
    return Math.round(duration * 100) / 100;
  }
  
  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    // Close all active streams
    for (const [streamId, stream] of this.activeStreams) {
      try {
        if (stream.close) stream.close();
        if (stream.destroy) stream.destroy();
      } catch (error) {
        logger.warn(`Failed to close stream ${streamId}`, error);
      }
    }
    
    this.activeStreams.clear();
    this.voiceCache.clear();
    
    logger.info('ElevenLabs service cleaned up');
  }
}

export default ElevenLabsService;