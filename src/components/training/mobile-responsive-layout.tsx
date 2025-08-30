'use client';

/**
 * MOBILE-RESPONSIVE TRAINING PLATFORM LAYOUT
 * ===========================================
 * 
 * Modern, accessible training platform with enhanced animations,
 * improved mobile experience, and professional design system.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ResponsiveImage, TrainingImage } from '@/components/ui/responsive-image';
import { 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  BookOpen,
  PlayCircle,
  FileText,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30"
    >
      {/* Network Status Bar */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 text-center text-sm font-medium shadow-sm"
          >
            <WifiOff className="inline-block w-4 h-4 mr-2" />
            You're offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 lg:hidden"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
          
          <div className="flex-1 mx-4">
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-bold truncate bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              {moduleTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-gray-500 font-medium"
            >
              Day {currentDay} of {totalDays}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2"
          >
            {connectionType === '4g' && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Wifi className="w-4 h-4 text-green-500" />
              </motion.div>
            )}
            {connectionType === '3g' && (
              <Wifi className="w-4 h-4 text-yellow-500" />
            )}
            {connectionType === '2g' && (
              <Wifi className="w-4 h-4 text-red-500" />
            )}
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentDay / totalDays) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm"
          />
        </div>
      </motion.header>
      
      <div className="flex h-full">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -288 }}
          animate={{ x: sidebarOpen ? 0 : -288 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md shadow-xl lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200/50 lg:bg-white"
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-6 border-b border-gray-200/50"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Training Modules
                </h2>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 lg:hidden transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            {/* Module Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day, index) => (
                <motion.button
                  key={day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onNavigate?.(day);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    day === currentDay 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg" 
                      : day < currentDay
                      ? "bg-green-50 text-green-700 hover:bg-green-100 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  {day === currentDay && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ opacity: 0.2 }}
                    />
                  )}
                  
                  <span className="flex items-center relative z-10">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 transition-colors",
                      day === currentDay 
                        ? "bg-white/20 text-white" 
                        : day < currentDay
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                    )}>
                      {day}
                    </div>
                    <span>Day {day}</span>
                  </span>
                  
                  <div className="relative z-10">
                    {day < currentDay && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </motion.div>
                    )}
                    {day === currentDay && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </nav>
            
            {/* Sidebar Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-gray-200/50 bg-gray-50/50"
            >
              <div className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">Accessibility</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Font Size:</span>
                  <div className="flex space-x-1">
                    {(['small', 'medium', 'large'] as const).map((size, index) => (
                      <motion.button
                        key={size}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFontSize(size)}
                        className={cn(
                          "w-8 h-8 rounded-lg font-bold transition-all duration-200 flex items-center justify-center",
                          fontSize === size 
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        )}
                        style={{ 
                          fontSize: size === 'small' ? '10px' : size === 'medium' ? '12px' : '14px' 
                        }}
                      >
                        A
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Device:</span>
                  <div className="flex space-x-2 text-gray-400">
                    <Smartphone className={cn("w-4 h-4", orientation === 'portrait' && "text-blue-500")} />
                    <Tablet className="w-4 h-4" />
                    <Monitor className="w-4 h-4 hidden lg:block text-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "max-w-4xl mx-auto px-4 py-6 md:px-6 lg:px-8",
              fontSizeClasses[fontSize]
            )}
          >
            {/* Desktop Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block mb-8"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {moduleTitle}
                  </h1>
                  <p className="text-gray-500 mt-1 font-medium">Day {currentDay} of {totalDays}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentDay / totalDays) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-sm"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600 font-medium">Progress</span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round((currentDay / totalDays) * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Content Area */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "prose prose-blue max-w-none",
                "prose-headings:font-bold prose-headings:tracking-tight",
                "prose-p:leading-relaxed prose-p:text-gray-700",
                "prose-strong:text-gray-900 prose-strong:font-semibold",
                "prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
                "prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm",
                "prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg",
                fontSize === 'small' && "prose-sm",
                fontSize === 'large' && "prose-lg"
              )}
            >
              {children}
            </motion.div>
            
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