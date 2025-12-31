'use client';

import { useState, useEffect, useCallback } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Lock,
  Star,
  ArrowLeft
} from 'lucide-react';

interface EnhancedChatWidgetProps {
  user?: {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}

interface ChatConnection {
  id: string;
  contractor: {
    id: string;
    name: string;
    businessName?: string;
    avatar?: string;
    rating: number;
    isOnline: boolean;
  };
  lastMessage?: {
    content: string;
    timestamp: string;
    isFromUser: boolean;
  };
  unreadCount: number;
  canChat: boolean;
  connectionReason: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  isRead: boolean;
  messageType: string;
}

export default function EnhancedChatWidget({ user }: EnhancedChatWidgetProps) {
  const { data: session } = useSession();
  const userId = user?.id ?? session?.user?.id ?? null;
  const userType = (session?.user as any)?.userType ?? (session?.user as any)?.role ?? null;
  const isClientUser = userType === 'CLIENT';
  const [isOpen, setIsOpen] = useState(false);
  const [connections, setConnections] = useState<ChatConnection[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<ChatConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      if (isClientUser) {
        setConnections([]);
        return;
      }
      const response = await fetch('/api/chat/connections', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Failed to fetch connections:', error);
    } finally {
      setLoading(false);
    }
  }, [isClientUser]);

  const fetchMessages = useCallback(async (connectionId: string) => {
    try {
      const response = await fetch(`/api/chat/connections/${connectionId}/messages`, { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchConnections();
    }
  }, [isOpen, fetchConnections]);

  useEffect(() => {
    if (selectedConnection) {
      fetchMessages(selectedConnection.id);
    }
  }, [selectedConnection, fetchMessages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConnection || sendingMessage) return;

    try {
      setSendingMessage(true);
      const response = await fetch(`/api/chat/connections/${selectedConnection.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: newMessage.trim()
        })
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages(selectedConnection.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const initiateContact = async (contractorId: string) => {
    try {
      if (isClientUser) {
        console.warn('[CHAT] Direct client messaging is disabled.');
        return;
      }
      const response = await fetch('/api/chat/initiate-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contractorId
        })
      });

      if (response.ok) {
        fetchConnections();
      }
    } catch (error) {
      console.error('Failed to initiate contact:', error);
    }
  };

  const totalUnreadCount = connections.reduce((sum, conn) => sum + conn.unreadCount, 0);

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => {
          if (!userId) {
            void signIn();
            return;
          }
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#00BFA6] hover:bg-[#00A693] shadow-lg z-40"
      >
        <MessageSquare className="h-6 w-6" />
        {totalUnreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
            {totalUnreadCount}
          </Badge>
        )}
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#00BFA6] text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Messages</h3>
                <p className="text-sm text-white/80">
                  {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex">
            {/* Connections List */}
            {!selectedConnection ? (
              <div className="w-full">
                <div className="p-4 border-b">
                  <h4 className="font-medium text-gray-900">Your Connections</h4>
                  <p className="text-sm text-gray-500">
                    {isClientUser ? 'Messaging is handled by NRPG' : 'Contractors you can chat with'}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00BFA6]"></div>
                    </div>
                  ) : connections.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">No connections yet</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        You can start chatting with contractors after they bid on your requests or you contact them.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {connections.map((connection) => (
                        <div
                          key={connection.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                          onClick={() => setSelectedConnection(connection)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={connection.contractor.avatar} />
                                <AvatarFallback>
                                  {connection.contractor.name?.charAt(0) || 'C'}
                                </AvatarFallback>
                              </Avatar>
                              {connection.contractor.isOnline && (
                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900 truncate">
                                  {connection.contractor.businessName || connection.contractor.name}
                                </h4>
                                {connection.unreadCount > 0 && (
                                  <Badge className="bg-[#00BFA6] text-white text-xs">
                                    {connection.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                {connection.lastMessage?.content || 'No messages yet'}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs text-gray-500">
                                    {connection.contractor.rating.toFixed(1)}
                                  </span>
                                </div>
                                {connection.lastMessage && (
                                  <span className="text-xs text-gray-400">
                                    {new Date(connection.lastMessage.timestamp).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <div className="w-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedConnection(null)}
                        className="p-1"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Avatar>
                        <AvatarImage src={selectedConnection.contractor.avatar} />
                        <AvatarFallback>
                          {selectedConnection.contractor.name?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {selectedConnection.contractor.businessName || selectedConnection.contractor.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-gray-500">
                              {selectedConnection.contractor.rating.toFixed(1)}
                            </span>
                          </div>
                          {selectedConnection.contractor.isOnline && (
                            <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No messages yet</p>
                      <p className="text-sm text-gray-400">Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${userId && message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            userId && message.senderId === userId
                              ? 'bg-[#00BFA6] text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={sendingMessage}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || sendingMessage}
                      className="bg-[#00BFA6] hover:bg-[#00A693]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
