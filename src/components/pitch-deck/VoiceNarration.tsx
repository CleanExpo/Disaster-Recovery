'use client';

import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

interface VoiceNarrationProps {
  muted: boolean;
  elevenLabsApiKey?: string;
  voiceId?: string;
}

interface VoiceNarrationHandle {
  play: (text: string) => Promise<void>;
  pause: () => void;
  setMuted: (muted: boolean) => void;
}

const VoiceNarration = forwardRef<VoiceNarrationHandle, VoiceNarrationProps>(
  ({ muted, elevenLabsApiKey, voiceId = 'EXAVITQu4vr4xnSDxMaL' }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioCache] = useState<Map<string, string>>(new Map());
    const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

    useImperativeHandle(ref, () => ({
      play: async (text: string) => {
        if (!text) return;
        
        // Stop current playback
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        
        // Cancel browser speech
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }

        setIsPlaying(true);

        try {
          // Check if we have ElevenLabs API key
          if (elevenLabsApiKey) {
            await playElevenLabsVoice(text);
          } else {
            // Use browser synthesis
            await playBrowserVoice(text);
          }
        } catch (error) {
          console.error('Voice narration error:', error);
          // Fallback to browser voice
          await playBrowserVoice(text);
        }
      },
      
      pause: () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setIsPlaying(false);
      },
      
      setMuted: (newMuted: boolean) => {
        if (audioRef.current) {
          audioRef.current.muted = newMuted;
        }
        if (currentUtterance.current) {
          currentUtterance.current.volume = newMuted ? 0 : 0.8;
        }
      }
    }));

    const playElevenLabsVoice = async (text: string) => {
      // Check cache first
      if (audioCache.has(text)) {
        const audioUrl = audioCache.get(text)!;
        await playAudioUrl(audioUrl);
        return;
      }

      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey!
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.75,
              similarity_boost: 0.75,
              style: 0.5,
              use_speaker_boost: true
            }
          })
        });

        if (!response.ok) {
          throw new Error('ElevenLabs API request failed');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Cache the audio
        audioCache.set(text, audioUrl);
        
        // Play the audio
        await playAudioUrl(audioUrl);
      } catch (error) {
        console.error('ElevenLabs API error:', error);
        throw error;
      }
    };

    const playAudioUrl = async (url: string) => {
      return new Promise<void>((resolve, reject) => {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        
        const audio = audioRef.current;
        audio.src = url;
        audio.muted = muted;
        audio.volume = 0.8;
        
        audio.onended = () => {
          setIsPlaying(false);
          resolve();
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          reject(new Error('Audio playback failed'));
        };
        
        audio.play().catch(reject);
      });
    };

    const playBrowserVoice = async (text: string) => {
      return new Promise<void>((resolve) => {
        if (!('speechSynthesis' in window)) {
          console.warn('Speech synthesis not supported');
          resolve();
          return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        currentUtterance.current = utterance;
        
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = muted ? 0 : 0.8;
        
        // Try to use a professional voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.lang.startsWith('en') && (v.name.includes('Microsoft') || v.name.includes('Google'))
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        utterance.onend = () => {
          setIsPlaying(false);
          resolve();
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          resolve();
        };
        
        window.speechSynthesis.speak(utterance);
      });
    };

    useEffect(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
      }
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        audioCache.forEach(url => URL.revokeObjectURL(url));
      };
    }, []);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.muted = muted;
      }
    }, [muted]);

    return (
      <>
        <audio ref={audioRef} style={{ display: 'none' }} />
        
        {isPlaying && !muted && (
          <div className="fixed bottom-24 left-6 z-50 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full">
              <div className="flex gap-1">
                {[0, 100, 200, 300, 400].map((delay) => (
                  <div 
                    key={delay}
                    className="w-1 h-4 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
              <span className="text-white text-sm">AI Voice Active</span>
            </div>
          </div>
        )}
      </>
    );
  }
);

VoiceNarration.displayName = 'VoiceNarration';

export default VoiceNarration;