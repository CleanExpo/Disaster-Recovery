'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  Paperclip,
  MoreVertical,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  Smile,
  Image as ImageIcon
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import type { ChatSession, ChatMessage, ChatAgent } from '@/types/support';
import { DEFAULT_BUSINESS_HOURS } from '@/types/support';

// Mock agent data
const mockAgent: ChatAgent = {
  id: 'agent-1',
  name: 'Sarah Johnson',
  email: 'sarah@nrp.com.au',
  avatar: '/avatars/sarah.jpg',
  status: 'online',
  activeChats: 2,
  maxChats: 5,
  skills: ['billing', 'compliance', 'technical'],
  languages: ['English'],
  rating: 4.8,
  totalChats: 1250
};

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    sessionId: 'session-1',
    senderId: 'bot',
    senderName: 'NRP Support',
    senderType: 'bot',
    message: 'Hello! Welcome to NRP Support. How can I help you today?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '2',
    sessionId: 'session-1',
    senderId: 'user-1',
    senderName: 'You',
    senderType: 'user',
    message: 'I need help with my certification renewal',
    timestamp: new Date(Date.now() - 4 * 60 * 1000)
  },
  {
    id: '3',
    sessionId: 'session-1',
    senderId: 'agent-1',
    senderName: 'Sarah',
    senderType: 'agent',
    message: "I'd be happy to help you with your certification renewal. Which certification are you looking to renew?",
    timestamp: new Date(Date.now() - 3 * 60 * 1000)
  }
];

// Pre-defined quick responses
const quickResponses = [
  'How do I renew my certification?',
  'I have a billing question',
  'Technical issue with the portal',
  'Need help with compliance',
  'Territory question'
];

interface LiveChatProps {
  embedded?: boolean;
}

export function LiveChat({ embedded = false }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const isBusinessHours = () => {
    const now = new Date();
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const schedule = DEFAULT_BUSINESS_HOURS.schedule[day as keyof typeof DEFAULT_BUSINESS_HOURS.schedule];
    
    if (!schedule.isOpen) return false;
    
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime >= (schedule.openTime || '') && currentTime <= (schedule.closeTime || '');
  };

  const handleStartChat = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      userId: 'current-user',
      userName: 'John Doe',
      agentId: mockAgent.id,
      agentName: mockAgent.name,
      status: 'active',
      startedAt: new Date(),
      messages: []
    };
    
    setSession(newSession);
    setIsConnecting(false);
    setShowQuickResponses(false);
    
    // Add agent greeting
    const agentGreeting: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: newSession.id,
      senderId: mockAgent.id,
      senderName: mockAgent.name,
      senderType: 'agent',
      message: `Hi! I'm ${mockAgent.name}. I see you need help with certification renewal. Could you tell me which specific certification you're looking to renew?`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, agentGreeting]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: session?.id || 'session-1',
      senderId: 'user-1',
      senderName: 'You',
      senderType: 'user',
      message: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate agent typing and response
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);
    
    const agentResponse: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sessionId: session?.id || 'session-1',
      senderId: mockAgent.id,
      senderName: mockAgent.name,
      senderType: 'agent',
      message: getAgentResponse(inputMessage),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, agentResponse]);
  };

  const getAgentResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('iicrc')) {
      return 'For IICRC certification renewal, you can upload your new certificate in the Compliance section of your dashboard. The renewal typically needs to be completed 30 days before expiry. Would you like me to guide you through the process?';
    } else if (lowerMessage.includes('billing') || lowerMessage.includes('payment')) {
      return 'I can help you with billing questions. Are you asking about subscription payments, territory fees, or something else?';
    } else if (lowerMessage.includes('technical') || lowerMessage.includes('error')) {
      return 'I understand you\'re experiencing technical issues. Could you describe what\'s happening? Any error messages you\'re seeing would be helpful.';
    } else {
      return 'I understand. Let me help you with that. Could you provide more details about what you need assistance with?';
    }
  };

  const handleQuickResponse = (response: string) => {
    setInputMessage(response);
    handleSendMessage();
  };

  const handleEndChat = () => {
    if (session) {
      setSession({ ...session, status: 'ended', endedAt: new Date() });
    }
    setIsOpen(false);
    // In production, save chat transcript
  };

  const ChatWindow = () => (
    <div className={`flex flex-col h-full ${embedded ? '' : 'max-h-[600px]'}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockAgent.avatar} />
            <AvatarFallback>{mockAgent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{session ? mockAgent.name : 'NRP Support'}</p>
            <p className="text-xs text-blue-100 flex items-center gap-1">
              {session ? (
                <>
                  <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                  Active now
                </>
              ) : isBusinessHours() ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  Available
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3" />
                  Outside business hours
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!embedded && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-600"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Email transcript
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Request callback
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEndChat} className="text-red-600">
                  End chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.senderType === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.senderType === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.senderType === 'bot'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white border text-gray-900'
                  }`}
                >
                  {message.senderType !== 'user' && (
                    <p className="text-xs font-medium mb-1 opacity-70">
                      {message.senderName}
                    </p>
                  )}
                  <p className="text-sm">{message.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {format(message.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Responses */}
      {showQuickResponses && !session && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickResponse(response)}
                className="text-xs"
              >
                {response}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t p-4">
        {!session && !isConnecting ? (
          <Button onClick={handleStartChat} className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        ) : isConnecting ? (
          <div className="text-center py-2">
            <p className="text-sm text-gray-500">Connecting to an agent...</p>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Business Hours Notice */}
      {!isBusinessHours() && !session && (
        <div className="px-4 pb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-900">Outside Business Hours</p>
                <p className="text-yellow-700 mt-1">
                  Our live chat is available Monday-Friday 8AM-6PM AEDT. 
                  You can still send us an email or submit a support ticket.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-3 w-3 mr-1" />
                    Email Us
                  </Button>
                  <Button size="sm" variant="outline">
                    Create Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Embedded version for help centre
  if (embedded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Chat Support
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px]">
            <ChatWindow />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Floating chat widget
  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 h-14 w-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colours flex items-center justify-center group"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border">
          <ChatWindow />
        </div>
      )}

      {/* Minimized Chat */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex items-center justify-between"
               onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockAgent.avatar} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Chat with {mockAgent.name}</p>
                <p className="text-xs text-blue-100">Click to expand</p>
              </div>
            </div>
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
      )}
    </>
  );
}