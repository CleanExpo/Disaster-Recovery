/**
 * Audio API Service for Production Deployment
 * NRP Disaster Recovery Platform
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import ElevenLabsService from '../src/services/elevenlabs-service';
import AudioOrchestrator from '../src/orchestrator';
import { logger } from '../src/utils/logger';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Initialize services
const elevenLabsService = new ElevenLabsService();
const audioOrchestrator = new AudioOrchestrator();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || [
    'https://disaster-recovery-seven.vercel.app',
    'https://disaster-recovery-staging.vercel.app'
  ]
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/audio', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'audio-system',
    timestamp: new Date().toISOString(),
    features: {
      elevenlabs: true,
      websocket: true,
      multiLanguage: true,
      streaming: true
    }
  });
});

// Text to Speech endpoint
app.post('/api/audio/tts', async (req, res) => {
  try {
    const {
      text,
      language = 'en',
      voiceId,
      emergency = false,
      format = 'mp3'
    } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Use orchestrator for complex scenarios
    const result = await audioOrchestrator.processText(text, {
      language,
      voiceId,
      priority: emergency ? 'critical' : 'normal',
      format
    });

    // Send audio buffer
    res.set({
      'Content-Type': `audio/${format}`,
      'Content-Length': result.audioBuffer.length,
      'X-Request-Id': result.requestId
    });

    res.send(result.audioBuffer);

  } catch (error) {
    logger.error('TTS request failed:', error);
    res.status(500).json({ error: 'Audio generation failed' });
  }
});

// Stream endpoint for real-time audio
app.post('/api/audio/stream', async (req, res) => {
  try {
    const { text, language = 'en', voiceId } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Set headers for streaming
    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache'
    });

    // Create audio stream
    const stream = await elevenLabsService.streamAudio({
      text,
      language,
      voiceId,
      optimizeStreamingLatency: 3
    });

    // Pipe stream to response
    stream.pipe(res);

  } catch (error) {
    logger.error('Stream request failed:', error);
    res.status(500).json({ error: 'Stream creation failed' });
  }
});

// Get available voices
app.get('/api/audio/voices', async (req, res) => {
  try {
    const voices = await elevenLabsService.getVoices();
    res.json(voices);
  } catch (error) {
    logger.error('Failed to fetch voices:', error);
    res.status(500).json({ error: 'Failed to fetch voices' });
  }
});

// WebSocket for bidirectional streaming
wss.on('connection', (ws) => {
  logger.info('WebSocket client connected');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === 'text') {
        // Generate audio for text
        const result = await elevenLabsService.generateAudio({
          text: data.text,
          language: data.language,
          voiceId: data.voiceId
        });

        // Send audio back
        ws.send(JSON.stringify({
          type: 'audio',
          data: result.audioBuffer.toString('base64'),
          requestId: result.requestId
        }));
      }
    } catch (error) {
      logger.error('WebSocket message processing failed:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Processing failed'
      }));
    }
  });

  ws.on('close', () => {
    logger.info('WebSocket client disconnected');
  });
});

// Error handling
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.AUDIO_API_PORT || 3003;
server.listen(PORT, () => {
  logger.info(`Audio API server running on port ${PORT}`);
  logger.info('WebSocket server ready for connections');
});