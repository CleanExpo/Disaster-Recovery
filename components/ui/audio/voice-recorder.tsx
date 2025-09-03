'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Square, Play, Pause, Download, Trash2, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceRecorderProps {
  maxDuration?: number; // in seconds
  onRecordingComplete?: (audioBlob: Blob, transcription?: string) => void;
  onTranscription?: (text: string) => void;
  autoTranscribe?: boolean;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  maxDuration = 300, // 5 minutes default
  onRecordingComplete,
  onTranscription,
  autoTranscribe = false,
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context and analyser for visualization
  const setupAudioAnalyser = (stream: MediaStream) => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    
    const updateLevel = () => {
      if (analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
      }
      
      if (isRecording && !isPaused) {
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  // Start recording
  const startRecording = async () => {
    try {
      setError(null);
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      setupAudioAnalyser(stream);

      // Create media recorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/mp4';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        if (autoTranscribe) {
          transcribeAudio(audioBlob);
        }
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return maxDuration;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop audio level animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      setAudioLevel(0);
    }
  }, [isRecording]);

  // Pause/Resume recording
  const togglePause = () => {
    if (!mediaRecorderRef.current) return;

    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return maxDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Play/Pause recorded audio
  const togglePlayback = () => {
    if (!audioRef.current) {
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      } else {
        return;
      }
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Delete recording
  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingTime(0);
    setTranscription('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  // Download recording
  const downloadRecording = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
    }
  };

  // Transcribe audio
  const transcribeAudio = async (blob: Blob) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', blob);

      const response = await fetch('/api/audio/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      setTranscription(data.text);
      onTranscription?.(data.text);

    } catch (err) {
      console.error('Transcription failed:', err);
      setError('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Send recording
  const sendRecording = () => {
    if (audioBlob) {
      onRecordingComplete?.(audioBlob, transcription);
    }
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecording, audioUrl, stopRecording]);

  return (
    <Card className={cn('p-6 space-y-4', className)}>
      {/* Recording Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isRecording && !audioUrl && (
          <Button
            size="lg"
            onClick={startRecording}
            className="rounded-full w-16 h-16"
          >
            <Mic className="w-6 h-6" />
          </Button>
        )}

        {isRecording && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={togglePause}
              className="rounded-full w-16 h-16"
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={stopRecording}
              className="rounded-full w-16 h-16"
            >
              <Square className="w-6 h-6" />
            </Button>
          </>
        )}

        {audioUrl && !isRecording && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={togglePlayback}
              className="rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={startRecording}
              className="rounded-full w-16 h-16"
              title="Record again"
            >
              <MicOff className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Audio Level Indicator */}
      {isRecording && !isPaused && (
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500"
            animate={{ width: `${audioLevel * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Recording Time */}
      {(isRecording || audioUrl) && (
        <div className="text-center space-y-2">
          <div className="text-2xl font-mono">
            {formatTime(recordingTime)}
          </div>
          {isRecording && (
            <Progress 
              value={(recordingTime / maxDuration) * 100} 
              className="w-full"
            />
          )}
          {isRecording && isPaused && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Recording Paused
            </p>
          )}
        </div>
      )}

      {/* Playback Controls */}
      {audioUrl && !isRecording && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadRecording}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={deleteRecording}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          {!autoTranscribe && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => audioBlob && transcribeAudio(audioBlob)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mic className="w-4 h-4 mr-2" />
              )}
              Transcribe
            </Button>
          )}
          <Button
            size="sm"
            onClick={sendRecording}
            disabled={!audioBlob}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      )}

      {/* Transcription */}
      <AnimatePresence>
        {transcription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <p className="text-sm font-medium mb-2">Transcription:</p>
            <p className="text-sm">{transcription}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing audio...
        </div>
      )}
    </Card>
  );
};