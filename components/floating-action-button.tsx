'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      <div className={`mb-4 space-y-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button
          size="sm"
          className="bg-[#00BFA6] hover:bg-[#00A693] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => {
            // Handle chat action
            console.log('Open chat');
          }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => {
            // Handle phone action
            console.log('Call us');
          }}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="border-[#7C4DFF] text-[#7C4DFF] hover:bg-[#7C4DFF] hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => {
            // Handle email action
            console.log('Email us');
          }}
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
      </div>

      {/* Main FAB */}
      <div className="relative">
        <Button
          onClick={isExpanded ? scrollToTop : () => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] hover:from-[#00A693] hover:to-[#6B3FA8] text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow"
        >
          <ArrowUp className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-[#00BFA6] animate-ping opacity-20"></div>
      </div>
    </div>
  );
}
