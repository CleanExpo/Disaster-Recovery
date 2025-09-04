'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AudioSystemProps {
  enabled?: boolean;
  autoPlay?: boolean;
  voiceType?: 'emergency' | 'contractor' | 'client' | 'learning';
}

export function AudioSystem({ 
  enabled = true, 
  autoPlay = false,
  voiceType = 'client' 
}: AudioSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Text-to-Speech for page content
  const speakText = useCallback((text: string) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = volume;
    
    // Select voice based on type
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => {
      if (voiceType === 'emergency') return voice.name.includes('Microsoft David');
      if (voiceType === 'contractor') return voice.name.includes('Microsoft Mark');
      if (voiceType === 'learning') return voice.name.includes('Microsoft Zira');
      return voice.name.includes('Microsoft Hazel'); // Default client voice
    });
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
  }, [speechEnabled, volume, voiceType]);

  // Read selected text on page
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      
      if (selectedText && selectedText.length > 10 && speechEnabled) {
        speakText(selectedText);
      }
    };
    
    if (enabled) {
      document.addEventListener('mouseup', handleTextSelection);
      document.addEventListener('touchend', handleTextSelection);
    }
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, [enabled, speechEnabled, speakText]);

  // Auto-read emergency messages
  useEffect(() => {
    if (autoPlay && voiceType === 'emergency') {
      const emergencyElement = document.querySelector('[data-audio="emergency"]');
      if (emergencyElement) {
        const text = emergencyElement.textContent || '';
        speakText(text);
      }
    }
  }, [autoPlay, voiceType, speakText]);

  // Audio feedback for button clicks
  const playClickSound = useCallback(() => {
    if (isMuted) return;
    
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzCH0fPTgjMGHm7A7+OZURE');
    audio.volume = volume * 0.3;
    audio.play().catch(() => {});
  }, [isMuted, volume]);

  // Attach click sound to buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
      button.addEventListener('click', playClickSound);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', playClickSound);
      });
    };
  }, [playClickSound]);

  // Background ambient sound for focus
  const playAmbientSound = useCallback(() => {
    if (!enabled || isMuted) return;
    
    // Create or get ambient audio element
    let ambient = document.getElementById('ambient-audio') as HTMLAudioElement;
    if (!ambient) {
      ambient = document.createElement('audio');
      ambient.id = 'ambient-audio';
      ambient.loop = true;
      ambient.volume = volume * 0.1;
      ambient.src = '/audio/ambient-focus.mp3';
      document.body.appendChild(ambient);
    }
    
    if (isPlaying) {
      ambient.play().catch(() => {});
    } else {
      ambient.pause();
    }
  }, [enabled, isMuted, isPlaying, volume]);

  useEffect(() => {
    playAmbientSound();
  }, [playAmbientSound]);

  const toggleSpeech = () => {
    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
      setIsPlaying(false);
    } else {
      setSpeechEnabled(true);
      // Read welcome message
      speakText('Audio assistance enabled. Select any text to hear it read aloud.');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Floating Audio Control Widget */}
      <div className="fixed bottom-24 right-4 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-full shadow-xl p-2 flex items-center gap-2">
        {/* Speech Toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleSpeech}
          className={cn(
            "rounded-full transition-colors",
            speechEnabled ? "bg-blue-100 text-blue-600" : ""
          )}
          aria-label="Toggle speech"
        >
          {speechEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
        
        {/* Play/Pause */}
        {isPlaying && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              window.speechSynthesis.cancel();
              setIsPlaying(false);
            }}
            className="rounded-full"
            aria-label="Pause"
          >
            <Pause className="h-4 w-4" />
          </Button>
        )}
        
        {/* Mute/Unmute */}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleMute}
          className="rounded-full"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        
        {/* Volume Slider */}
        {!isMuted && (
          <div className="w-24 px-2">
            <Slider
              value={[volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
              aria-label="Volume"
            />
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
        )}
      </div>
      
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {speechEnabled && "Audio assistance is enabled"}
        {isPlaying && "Audio is playing"}
        {isMuted && "Audio is muted"}
      </div>
      
      {/* Hidden audio element for preloading */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />
    </>
  );
}

// Audio provider for emergency announcements
export function AudioEmergencyProvider({ children }: { children: React.ReactNode }) {
  const [emergency, setEmergency] = useState<string | null>(null);
  
  useEffect(() => {
    // Listen for emergency broadcasts
    const handleEmergency = (event: CustomEvent) => {
      setEmergency(event.detail.message);
    };
    
    window.addEventListener('emergency-broadcast' as any, handleEmergency);
    return () => {
      window.removeEventListener('emergency-broadcast' as any, handleEmergency);
    };
  }, []);
  
  return (
    <>
      {children}
      {emergency && (
        <div 
          className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white p-4 text-center"
          data-audio="emergency"
        >
          <AudioSystem enabled autoPlay voiceType="emergency" />
          <p className="font-bold text-lg">{emergency}</p>
        </div>
      )}
    </>
  );
}

// Hook for using audio in components
export function useAudio() {
  const [isSupported, setIsSupported] = useState(false);
  
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);
  
  const speak = useCallback((text: string, options?: SpeechSynthesisUtterance) => {
    if (!isSupported) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, options);
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);
  
  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
  }, [isSupported]);
  
  return { speak, stop, isSupported };
}