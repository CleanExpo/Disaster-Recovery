'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader, Phone, FileText, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
}

export function EnhancedChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-show chat after 3 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        // Pulse animation to draw attention
        const pulse = setInterval(() => {
          setShowNotification(prev => !prev);
        }, 2000);
        
        return () => clearInterval(pulse);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    // Initialize with welcome message when opened
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "🚨 Emergency? I'm here 24/7! How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          '💧 Water Damage Emergency',
          '🔥 Fire/Smoke Damage',
          '🦠 Mould Problem',
          '📋 Check Claim Status',
          '💰 Get Instant Estimate'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
    handleSend();
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let response = {
      text: '',
      options: [] as string[]
    };

    if (input.includes('water') || input.includes('flood')) {
      response.text = "Water damage requires immediate action! I'm connecting you with the nearest certified contractor. They'll arrive within 60 minutes.";
      response.options = ['Share Property Details', 'Upload Photos', 'Call 1300-DISASTER'];
    } else if (input.includes('fire') || input.includes('smoke')) {
      response.text = "Fire damage restoration specialist needed. Our network handles everything from assessment to complete restoration.";
      response.options = ['Get Emergency Response', 'Insurance Help', 'Speak to Expert'];
    } else if (input.includes('mould') || input.includes('mold')) {
      response.text = "Mould remediation requires certified professionals. We have EPA-licensed specialists ready to help.";
      response.options = ['Book Inspection', 'Get Quote', 'Health Concerns'];
    } else if (input.includes('estimate') || input.includes('quote') || input.includes('cost')) {
      response.text = "Our transparent pricing model means you see exactly what contractors charge. Estimates are provided based on damage assessment, following national pricing guidelines.";
      response.options = ['Understand Coverage', 'Site Manager Info', 'Get Estimate Now'];
    } else if (input.includes('insurance') || input.includes('claim')) {
      response.text = "We work with all major insurers. Our contractors will explain what's covered and give you options for anything outside your policy.";
      response.options = ['Check Coverage', 'Submit Claim', 'Direct Billing Info'];
    } else {
      response.text = "I'll help you connect with the right restoration professional. What type of damage are you dealing with?";
      response.options = ['Water Damage', 'Fire Damage', 'Mould', 'Other Emergency'];
    }

    return {
      id: Date.now().toString(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      options: response.options
    };
  };

  return (
    <>
      {/* Chat Button - Always Visible */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        {!isOpen && (
          <>
            {showNotification && (
              <div className="absolute -top-20 -left-48 bg-white rounded-lg shadow-xl p-3 animate-bounce">
                <p className="text-sm font-semibold">Need help? Chat 24/7! 💬</p>
                <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
              </div>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
              aria-label="Open chat"
            >
              <MessageSquare size={28} />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
            </button>
          </>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col animate-slideIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Disaster Recovery AI</h3>
                <p className="text-xs text-blue-100">Always Online • Instant Response</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Emergency Bar */}
          <div className="bg-red-50 border-b border-red-200 px-4 py-2">
            <a href="tel:1300347278" className="flex items-center justify-center gap-2 text-red-700 font-semibold hover:text-red-900">
              <Phone size={16} />
              <span>Emergency? Call 1300-DISASTER</span>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <Bot size={16} className="text-blue-600" />
                      </div>
                    )}
                    <div>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.options && message.options.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors text-sm"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="bg-blue-600 p-1.5 rounded-full">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Bot size={16} className="text-blue-600" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <Loader className="animate-spin" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
              <button className="hover:text-blue-600"><FileText size={14} /> Claims</button>
              <button className="hover:text-blue-600"><DollarSign size={14} /> Pricing</button>
              <button className="hover:text-blue-600"><Phone size={14} /> Call</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default EnhancedChatBot;