'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  X, 
  Send, 
  Users, 
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Wrench
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  isRead: boolean;
  sender: {
    id: string;
    name: string;
    userType: 'CLIENT' | 'CONTRACTOR' | 'ADMIN';
  };
  receiver: {
    id: string;
    name: string;
    userType: 'CLIENT' | 'CONTRACTOR' | 'ADMIN';
  };
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    userType: 'CLIENT' | 'CONTRACTOR' | 'ADMIN';
    businessName?: string;
  };
  lastMessage: Message;
  unreadCount: number;
}

interface FloatingChatWidgetProps {
  currentUserId: string;
  currentUserType: 'CLIENT' | 'CONTRACTOR' | 'ADMIN';
}

export default function FloatingChatWidget({ 
  currentUserId, 
  currentUserType 
}: FloatingChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Also scroll to bottom when new messages are loaded
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoadingConversations(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/messages', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        const allMessages = data.messages || [];
        
        // Group messages by conversation
        const conversationMap = new Map<string, Conversation>();
        
        allMessages.forEach((message: Message) => {
          const otherParticipant = message.senderId === currentUserId 
            ? message.receiver 
            : message.sender;
          
          const conversationKey = otherParticipant.id;
          
          if (!conversationMap.has(conversationKey)) {
            // Get business name for contractors
            let businessName = undefined;
            if (otherParticipant.userType === 'CONTRACTOR') {
              // Try to get business name from contractor profile
              businessName = otherParticipant.name; // For now, use name as business name
            }
            
            conversationMap.set(conversationKey, {
              id: conversationKey,
              participant: {
                id: otherParticipant.id,
                name: otherParticipant.name,
                userType: otherParticipant.userType,
                businessName: businessName
              },
              lastMessage: message,
              unreadCount: 0
            });
          }
          
          const conversation = conversationMap.get(conversationKey)!;
          
          // Update last message if this is newer
          if (new Date(message.createdAt) > new Date(conversation.lastMessage.createdAt)) {
            conversation.lastMessage = message;
          }
          
          // Count unread messages (messages sent to current user that are unread)
          if (message.receiverId === currentUserId && !message.isRead) {
            conversation.unreadCount++;
          }
        });
        
        const conversationList = Array.from(conversationMap.values())
          .sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
        
        setConversations(conversationList);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  }, [currentUserId]);

  // Fetch messages for a specific conversation
  const fetchMessages = async (participantId: string) => {
    try {
      setLoadingMessages(true);
      if (typeof window === 'undefined') return;

      const response = await fetch(`/api/messages?contractorId=${participantId}`, { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Mark messages as read
  const markAsRead = async (conversationId: string) => {
    try {
      if (typeof window === 'undefined') return;
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversationId
        })
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    try {
      setSendingMessage(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: selectedConversation.participant.id,
          content: newMessage.trim(),
          subject: `Chat with ${selectedConversation.participant.name}`,
          messageType: 'GENERAL'
        })
      });

      if (response.ok) {
        setNewMessage('');
        // Refresh messages and conversations
        await fetchMessages(selectedConversation.participant.id);
        await fetchConversations();
        // Scroll to bottom after sending message
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle conversation selection
  const handleConversationSelect = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    await fetchMessages(conversation.participant.id);
    // Mark messages as read when opening conversation
    await markAsRead(conversation.participant.id);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (isOpen) {
      fetchConversations();
      
      refreshIntervalRef.current = setInterval(() => {
        console.log('Auto-refreshing conversations and messages...');
        fetchConversations();
        if (selectedConversation) {
          fetchMessages(selectedConversation.participant.id);
        }
      }, 30000); // 30 seconds
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isOpen, selectedConversation, currentUserId, fetchConversations]);

  // Initial load
  useEffect(() => {
    if (isOpen) {
      fetchConversations();
    }
  }, [isOpen, currentUserId, fetchConversations]);

  const getRoleIcon = (userType: string) => {
    switch (userType) {
      case 'CONTRACTOR':
        return <Wrench className="h-3 w-3" />;
      case 'CLIENT':
        return <User className="h-3 w-3" />;
      case 'ADMIN':
        return <Users className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getRoleColor = (userType: string) => {
    switch (userType) {
      case 'CONTRACTOR':
        return 'bg-blue-100 text-blue-800';
      case 'CLIENT':
        return 'bg-green-100 text-green-800';
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  // Don't render if no user ID
  if (!currentUserId) {
    console.log('FloatingChatWidget: No currentUserId, not rendering');
    return null;
  }

  console.log('FloatingChatWidget: Rendering with userId:', currentUserId, 'userType:', currentUserType);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50" style={{ zIndex: 9999 }}>
        <Button
          onClick={() => {
            console.log('Floating chat button clicked, isOpen:', isOpen);
            setIsOpen(!isOpen);
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00BFA6] to-[#00A693] hover:from-[#00A693] hover:to-[#009682] text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20"
          style={{ 
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999
          }}
        >
          <MessageSquare className="h-6 w-6" />
          {totalUnreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
              {totalUnreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div 
          className="fixed z-50 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden backdrop-blur-sm"
          style={{
            bottom: '100px',
            right: '24px',
            zIndex: 9999,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Professional Chat
                  {totalUnreadCount > 0 && (
                    <Badge className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {totalUnreadCount}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col p-0">
              {!selectedConversation ? (
                // Conversation List
                <div className="flex-1">
                  <ScrollArea className="h-[500px]">
                    {loadingConversations ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No conversations yet</p>
                        <p className="text-sm">Start chatting with contractors!</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {conversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            onClick={() => handleConversationSelect(conversation)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#00BFA6] rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {conversation.participant.name?.charAt(0) || 'U'}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <p className="font-medium text-gray-900 truncate">
                                      {conversation.participant.businessName || conversation.participant.name}
                                    </p>
                                    <Badge className={`text-xs ${getRoleColor(conversation.participant.userType)}`}>
                                      {getRoleIcon(conversation.participant.userType)}
                                      <span className="ml-1">{conversation.participant.userType}</span>
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 truncate">
                                    {conversation.lastMessage.content}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <p className="text-xs text-gray-400">
                                  {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                                {conversation.unreadCount > 0 && (
                                  <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              ) : (
                // Chat Messages
                <div className="flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#00BFA6] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {selectedConversation.participant.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {selectedConversation.participant.businessName || selectedConversation.participant.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getRoleColor(selectedConversation.participant.userType)}`}>
                              {getRoleIcon(selectedConversation.participant.userType)}
                              <span className="ml-1">{selectedConversation.participant.userType}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedConversation(null)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
                    {loadingMessages ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-3`}
                          >
                            <div
                              className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                                message.senderId === currentUserId
                                  ? 'bg-[#00BFA6] text-white rounded-br-md'
                                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div className={`flex items-center justify-end mt-2 space-x-2 ${
                                message.senderId === currentUserId ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                <p className="text-xs">
                                  {new Date(message.createdAt).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                                {message.senderId === currentUserId && (
                                  <div className="flex items-center space-x-1">
                                    {message.isRead ? (
                                      <div className="flex items-center space-x-0.5">
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-0.5">
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/20 focus:outline-none transition-all duration-200"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim() || sendingMessage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#00BFA6] hover:bg-[#00A693] text-white p-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sendingMessage ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {newMessage.trim() && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center">
                        <span>Press Enter to send</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
