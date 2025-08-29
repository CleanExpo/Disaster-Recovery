'use client';

/**
 * MOBILE-RESPONSIVE TRAINING PLATFORM LAYOUT
 * ===========================================
 * 
 * Ensures training content is fully accessible and optimized
 * for mobile phones, tablets, and desktop computers.
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ResponsiveImage, TrainingImage } from '@/components/ui/responsive-image';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  BookOpenIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  WifiIcon,
  WifiOffIcon
} from '@heroicons/react/outline';

interface TrainingLayoutProps {
  children: React.ReactNode;
  currentDay: number;
  totalDays: number;
  moduleTitle: string;
  onNavigate?: (day: number) => void;
}

/**
 * Device orientation detection
 */
function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  return orientation;
}

/**
 * Network status detection for mobile
 */
function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');
  
  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
      
      // Check connection type if available
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };
    
    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);
  
  return { isOnline, connectionType };
}

/**
 * Mobile-Responsive Training Layout
 */
export function MobileResponsiveTrainingLayout({
  children,
  currentDay,
  totalDays,
  moduleTitle,
  onNavigate
}: TrainingLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const orientation = useDeviceOrientation();
  const { isOnline, connectionType } = useNetworkStatus();
  
  // Font size classes for accessibility
  const fontSizeClasses = {
    small: 'text-sm md:text-base',
    medium: 'text-base md:text-lg',
    large: 'text-lg md:text-xl'
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Network Status Bar */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm">
          <WifiOffIcon className="inline-block w-4 h-4 mr-2" />
          You're offline. Some features may be limited.
        </div>
      )}
      
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          
          <div className="flex-1 mx-4">
            <h1 className="text-sm font-semibold truncate">{moduleTitle}</h1>
            <p className="text-xs text-gray-500">Day {currentDay} of {totalDays}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {connectionType === '4g' && (
              <WifiIcon className="w-4 h-4 text-green-500" />
            )}
            {connectionType === '3g' && (
              <WifiIcon className="w-4 h-4 text-yellow-500" />
            )}
            {connectionType === '2g' && (
              <WifiIcon className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          />
        </div>
      </header>
      
      <div className="flex h-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Training Modules</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                aria-label="Close menu"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Module Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
                <button
                  key={day}
                  onClick={() => {
                    onNavigate?.(day);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-colors",
                    day === currentDay 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  <span className="flex items-center">
                    <span className="mr-3">Day {day}</span>
                  </span>
                  {day < currentDay && (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  )}
                  {day === currentDay && (
                    <ClockIcon className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </nav>
            
            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">Accessibility</div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Font Size:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setFontSize('small')}
                    className={cn(
                      "px-2 py-1 text-xs rounded",
                      fontSize === 'small' ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('medium')}
                    className={cn(
                      "px-2 py-1 text-sm rounded",
                      fontSize === 'medium' ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={cn(
                      "px-2 py-1 text-base rounded",
                      fontSize === 'large' ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className={cn(
            "max-w-4xl mx-auto px-4 py-6 md:px-6 lg:px-8",
            fontSizeClasses[fontSize]
          )}>
            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{moduleTitle}</h1>
              <p className="text-gray-500 mt-1">Day {currentDay} of {totalDays}</p>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentDay / totalDays) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Content Area */}
            <div className={cn(
              "prose prose-blue max-w-none",
              fontSize === 'small' && "prose-sm",
              fontSize === 'large' && "prose-lg"
            )}>
              {children}
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 lg:hidden">
              <button
                onClick={() => onNavigate?.(Math.max(1, currentDay - 1))}
                disabled={currentDay === 1}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg font-medium",
                  currentDay === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Previous
              </button>
              
              <span className="text-sm text-gray-500">
                {currentDay} / {totalDays}
              </span>
              
              <button
                onClick={() => onNavigate?.(Math.min(totalDays, currentDay + 1))}
                disabled={currentDay === totalDays}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg font-medium",
                  currentDay === totalDays 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                Next
                <ChevronRightIcon className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </main>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-t border-gray-200">
        <button
          onClick={() => onNavigate?.(Math.max(1, currentDay - 1))}
          disabled={currentDay === 1}
          className={cn(
            "flex items-center px-6 py-3 rounded-lg font-medium transition-colors",
            currentDay === 1 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Previous Module
        </button>
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.min(7, totalDays) }, (_, i) => {
            const day = currentDay - 3 + i;
            if (day < 1 || day > totalDays) return null;
            
            return (
              <button
                key={day}
                onClick={() => onNavigate?.(day)}
                className={cn(
                  "w-10 h-10 rounded-full font-medium transition-colors",
                  day === currentDay 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                )}
              >
                {day}
              </button>
            );
          }).filter(Boolean)}
        </div>
        
        <button
          onClick={() => onNavigate?.(Math.min(totalDays, currentDay + 1))}
          disabled={currentDay === totalDays}
          className={cn(
            "flex items-center px-6 py-3 rounded-lg font-medium transition-colors",
            currentDay === totalDays 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          Next Module
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
      
      {/* Orientation Warning for Mobile */}
      {orientation === 'landscape' && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center lg:hidden">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Rotate Your Device</h3>
            <p className="text-gray-600">
              For the best training experience, please use portrait mode on your mobile device.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Video Player Component for Training
 */
export function TrainingVideoPlayer({
  src,
  poster,
  title,
  duration
}: {
  src: string;
  poster?: string;
  title: string;
  duration?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="relative bg-black rounded-lg overflow-hidden my-6">
      {!isPlaying ? (
        <div className="relative">
          <TrainingImage
            src={poster || '/images/video-placeholder.jpg'}
            alt={title}
            className="w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all transform hover:scale-110"
              aria-label="Play video"
            >
              <PlayCircleIcon className="w-12 h-12 text-blue-600" />
            </button>
          </div>
          {duration && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {duration}
            </div>
          )}
        </div>
      ) : (
        <video
          src={src}
          controls
          autoPlay
          className="w-full"
          poster={poster}
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
  );
}

/**
 * Interactive Quiz Component
 */
export function TrainingQuiz({
  question,
  options,
  correctAnswer,
  explanation,
  onComplete
}: {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onComplete?: (correct: boolean) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      onComplete?.(selectedAnswer === correctAnswer);
    }
  };
  
  return (
    <div className="bg-blue-50 rounded-lg p-6 my-6">
      <div className="flex items-start mb-4">
        <DocumentTextIcon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-2">Quick Quiz</h4>
          <p className="text-gray-700">{question}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={cn(
              "flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all",
              selectedAnswer === index
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200 bg-white hover:border-gray-300",
              showResult && index === correctAnswer && "border-green-500 bg-green-50",
              showResult && selectedAnswer === index && index !== correctAnswer && "border-red-500 bg-red-50"
            )}
          >
            <input
              type="radio"
              name="quiz-answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className="mr-3"
            />
            <span className="flex-1">{option}</span>
            {showResult && index === correctAnswer && (
              <CheckCircleIcon className="w-5 h-5 text-green-600 ml-2" />
            )}
          </label>
        ))}
      </div>
      
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-colors",
            selectedAnswer === null
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          Submit Answer
        </button>
      ) : (
        <div className={cn(
          "p-4 rounded-lg",
          selectedAnswer === correctAnswer ? "bg-green-100" : "bg-yellow-100"
        )}>
          <p className="font-semibold mb-1">
            {selectedAnswer === correctAnswer ? "✅ Correct!" : "❌ Not quite right"}
          </p>
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
}