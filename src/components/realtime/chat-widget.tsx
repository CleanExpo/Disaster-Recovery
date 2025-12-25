'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Smile,
  MinusCircle,
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: Date;
  readBy: string[];
}

interface ChatWidgetProps {
  roomId: string;
  currentUserId: string;
  roomName?: string;
  messages: Message[];
  isLoading?: boolean;
  onSendMessage?: (content: string) => void;
  onTyping?: () => void;
  onClose?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function ChatWidget({
  roomId,
  currentUserId,
  roomName = 'Chat',
  messages,
  isLoading = false,
  onSendMessage,
  onTyping,
  onClose,
  position = 'bottom-right',
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    onSendMessage?.(messageText);
    setMessageText('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);

    // Emit typing indicator
    if (!isTyping) {
      setIsTyping(true);
      onTyping?.();
    }

    // Clear typing indicator after inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-colors`}
        title="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div>
          <h3 className="font-bold text-lg">{roomName}</h3>
          <p className="text-xs text-blue-100">
            {messages.length > 0 ? `${messages.length} messages` : 'No messages yet'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            title="Minimize"
          >
            <MinusCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-slate-500">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-center">
            <div>
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;
              const isRead = message.readBy.includes(currentUserId);

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-semibold opacity-75 mb-1">
                        {message.senderName}
                      </p>
                    )}
                    <p className="text-sm break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {formatTime(new Date(message.createdAt))}
                      {isCurrentUser && (isRead ? ' ✓✓' : ' ✓')}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-slate-200 bg-white rounded-b-lg"
      >
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            className="p-2 hover:bg-slate-100 rounded transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4 text-slate-600" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-slate-100 rounded transition-colors"
            title="Emoji"
          >
            <Smile className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="flex gap-2">
          <textarea
            value={messageText}
            onChange={handleInputChange}
            placeholder="Type a message..."
            rows={2}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition-colors self-end"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Format time
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
