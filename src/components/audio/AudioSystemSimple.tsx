'use client';

import React, { useState, useEffect, useCallback } from 'react';

export function AudioSystemSimple() {
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Text-to-Speech for page content
  const speakText = useCallback((text: string) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = volume;
    
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
  }, [speechEnabled, volume]);

  // Read selected text on page
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      
      if (selectedText && selectedText.length > 10 && speechEnabled) {
        speakText(selectedText);
      }
    };
    
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, [speechEnabled, speakText]);

  const toggleSpeech = () => {
    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
      setIsPlaying(false);
    } else {
      setSpeechEnabled(true);
      speakText('Audio assistance enabled. Select any text to hear it read aloud.');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-3 flex items-center gap-2">
      {/* Speech Toggle */}
      <button
        onClick={toggleSpeech}
        className={`p-2 rounded-full transition-colors ${
          speechEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        aria-label="Toggle speech"
        title={speechEnabled ? 'Disable audio' : 'Enable audio'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {speechEnabled ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          )}
        </svg>
      </button>
      
      {/* Play/Pause */}
      {isPlaying && (
        <button
          onClick={() => {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
          }}
          className="p-2 rounded-full bg-gray-200 text-gray-700"
          aria-label="Stop"
          title="Stop audio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
          </svg>
        </button>
      )}
      
      {/* Mute/Unmute */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-full bg-gray-200 text-gray-700"
        aria-label={isMuted ? "Unmute" : "Mute"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMuted ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          )}
        </svg>
      </button>
      
      {/* Volume Slider */}
      {!isMuted && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 cursor-pointer"
          aria-label="Volume"
          title="Volume"
        />
      )}
      
      {/* Status indicator */}
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${speechEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {speechEnabled ? 'Audio ON' : 'Audio OFF'}
        </span>
      </div>
    </div>
  );
}