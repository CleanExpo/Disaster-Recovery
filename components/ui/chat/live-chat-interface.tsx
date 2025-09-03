'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, X, Minimize2, Maximize2, Phone, 
  Video, Paperclip, Smile, MoreVertical, Bot, User,
  Clock, CheckCheck, Check, AlertCircle, Loader2
} from 'lucide-react';
import { useWebSocket } from '@/lib/websocket-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'sent' | 'received' | 'system';
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isBot?: boolean;
  };
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  attachments?: Array<{
    type: 'image' | 'file' | 'audio';
    url: string;
    name: string;
  }>;
}

interface ChatSession {
  id: string;
  type: 'bot' | 'human' | 'emergency';
  agent: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'away' | 'offline';
    isBot?: boolean;
  };
  startedAt: Date;
  lastMessage?: Date;
}

export const LiveChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { emit, on, off, connected } = useWebSocket();

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    
    // Create new chat session
    const sessionId = `chat-${Date.now()}`;
    const newSession: ChatSession = {
      id: sessionId,
      type: 'bot',
      agent: {
        id: 'bot-1',
        name: 'NRP Assistant',
        status: 'online',
        isBot: true
      },
      startedAt: new Date()
    };
    
    setSession(newSession);
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'received',
      content: 'Hello! I\'m here to help with your disaster recovery needs. How can I assist you today?',
      timestamp: new Date(),
      sender: newSession.agent,
      status: 'delivered'
    };
    
    setMessages([welcomeMessage]);
    setIsLoading(false);
    
    // Emit chat started event
    emit('chat:start', { sessionId, type: 'customer' });
  }, [emit]);

  // WebSocket event handlers
  useEffect(() => {
    const handleMessage = (data: any) => {
      const message: Message = {
        id: data.messageId || `msg-${Date.now()}`,
        type: 'received',
        content: data.message,
        timestamp: new Date(data.timestamp),
        sender: data.sender || session?.agent || {
          id: 'system',
          name: 'System'
        },
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    };

    const handleTyping = (data: any) => {
      setIsTyping(data.isTyping);
    };

    const handleAgentJoined = (data: any) => {
      if (session) {
        setSession({
          ...session,
          agent: data.agent,
          type: 'human'
        });
        
        const systemMessage: Message = {
          id: `msg-${Date.now()}`,
          type: 'system',
          content: `${data.agent.name} has joined the chat`,
          timestamp: new Date(),
          sender: { id: 'system', name: 'System' }
        };
        
        setMessages(prev => [...prev, systemMessage]);
      }
    };

    on('chat:receive', handleMessage);
    on('chat:typing', handleTyping);
    on('chat:agent:joined', handleAgentJoined);

    return () => {
      off('chat:receive', handleMessage);
      off('chat:typing', handleTyping);
      off('chat:agent:joined', handleAgentJoined);
    };
  }, [on, off, session]);

  // Send message
  const sendMessage = useCallback(() => {
    if (!inputMessage.trim() || !session) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      type: 'sent',
      content: inputMessage,
      timestamp: new Date(),
      sender: {
        id: 'user',
        name: 'You'
      },
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setInputMessage('');

    // Emit message via WebSocket
    emit('chat:message', {
      sessionId: session.id,
      message: inputMessage,
      timestamp: new Date()
    });

    // Update message status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => 
          m.id === message.id 
            ? { ...m, status: 'sent' as const }
            : m
        )
      );
    }, 500);

    // Simulate bot typing
    if (session.type === 'bot') {
      setTimeout(() => {
        setIsTyping(true);
        // Simulate bot response
        setTimeout(() => {
          const botResponse: Message = {
            id: `msg-${Date.now()}`,
            type: 'received',
            content: 'I understand your concern. Let me help you with that.',
            timestamp: new Date(),
            sender: session.agent,
            status: 'delivered'
          };
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  }, [inputMessage, session, emit]);

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Open chat
  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (!session) {
      initializeChat();
    }
  };

  // Close chat
  const closeChat = () => {
    setIsOpen(false);
    if (session) {
      emit('chat:end', { sessionId: session.id });
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-6 h-6" />
            {connected && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              'fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-2xl',
              'w-[400px] max-w-[calc(100vw-3rem)]',
              'flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800'
            )}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {session?.agent.isBot ? (
                      <Bot className="w-6 h-6" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {session?.agent.name || 'Chat Support'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={cn(
                        'w-2 h-2 rounded-full',
                        session?.agent.status === 'online' ? 'bg-green-400' :
                        session?.agent.status === 'away' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      )} />
                      <span>
                        {session?.agent.status === 'online' ? 'Online' :
                         session?.agent.status === 'away' ? 'Away' : 'Offline'}
                      </span>
                      {session?.type === 'bot' && (
                        <Badge variant="secondary" className="text-xs bg-white/20">
                          AI Assistant
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={closeChat}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              'flex gap-3',
                              message.type === 'sent' && 'justify-end',
                              message.type === 'system' && 'justify-center'
                            )}
                          >
                            {message.type === 'system' ? (
                              <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                {message.content}
                              </div>
                            ) : (
                              <>
                                {message.type === 'received' && (
                                  <Avatar className="w-8 h-8">
                                    {message.sender.isBot ? (
                                      <Bot className="w-4 h-4" />
                                    ) : (
                                      <User className="w-4 h-4" />
                                    )}
                                  </Avatar>
                                )}
                                <div className={cn(
                                  'max-w-[70%] rounded-lg p-3',
                                  message.type === 'sent'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800'
                                )}>
                                  <p className="text-sm">{message.content}</p>
                                  <div className={cn(
                                    'flex items-center gap-1 mt-1',
                                    message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                                  )}>
                                    <Clock className="w-3 h-3" />
                                    <span className="text-xs">
                                      {new Date(message.timestamp).toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      })}
                                    </span>
                                    {message.type === 'sent' && message.status && (
                                      <span className="ml-1">
                                        {message.status === 'sending' && <Clock className="w-3 h-3" />}
                                        {message.status === 'sent' && <Check className="w-3 h-3" />}
                                        {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                        {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                                        {message.status === 'error' && <AlertCircle className="w-3 h-3 text-red-300" />}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <Bot className="w-4 h-4" />
                            </Avatar>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1"
                      disabled={!connected}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || !connected}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  {!connected && (
                    <p className="text-xs text-red-500 mt-2">
                      Connection lost. Attempting to reconnect...
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};