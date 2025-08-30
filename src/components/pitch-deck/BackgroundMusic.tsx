'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

interface BackgroundMusicProps {
  muted: boolean;
  trackUrl?: string;
}

interface BackgroundMusicHandle {
  play: () => void;
  pause: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  changeTrack: (url: string) => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(
  ({ muted, trackUrl = '/audio/pitch-deck-bg.mp3' }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(0.3); // Lower volume for background music

    useImperativeHandle(ref, () => ({
      play: () => {
        if (audioRef.current) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      },
      
      pause: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      },
      
      setMuted: (newMuted: boolean) => {
        if (audioRef.current) {
          audioRef.current.muted = newMuted;
        }
      },
      
      setVolume: (volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        setCurrentVolume(clampedVolume);
        if (audioRef.current) {
          audioRef.current.volume = clampedVolume;
        }
      },
      
      changeTrack: (url: string) => {
        if (audioRef.current) {
          const wasPlaying = !audioRef.current.paused;
          audioRef.current.src = url;
          if (wasPlaying) {
            audioRef.current.play().catch(console.error);
          }
        }
      }
    }));

    useEffect(() => {
      // Create audio element
      const audio = new Audio(trackUrl);
      audio.loop = true;
      audio.volume = currentVolume;
      audio.muted = muted;
      audioRef.current = audio;

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.muted = muted;
      }
    }, [muted]);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = currentVolume;
      }
    }, [currentVolume]);

    // For now, we'll use a placeholder for the background music
    // In production, you would add actual background music files to public/audio/
    return (
      <>
        {/* Audio element is created programmatically */}
        {/* Visual indicator for music playing */}
        {isPlaying && !muted && (
          <div className="fixed bottom-24 right-6 z-50 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full">
              <div className="flex gap-1">
                {[0, 150, 300].map((delay) => (
                  <div 
                    key={delay}
                    className="w-0.5 h-3 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
              <span className="text-white text-xs">♪</span>
            </div>
          </div>
        )}
      </>
    );
  }
);

BackgroundMusic.displayName = 'BackgroundMusic';

export default BackgroundMusic;