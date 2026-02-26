'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { MessageSquare, Send, Paperclip, Search, User, Clock, CheckCheck } from 'lucide-react';

function ClientPortalMessagesPageOriginal() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Smith - Contractor',
      lastMessage: 'The water damage assessment is complete',
      time: '10:30 AM',
      unread: 2,
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Insurance Adjuster',
      lastMessage: 'Your claim has been approved',
      time: 'Yesterday',
      unread: 0,
      avatar: 'IA'
    },
    {
      id: 3,
      name: 'Project Manager',
      lastMessage: 'Schedule update for next week',
      time: '2 days ago',
      unread: 0,
      avatar: 'PM'
    },
    {
      id: 4,
      name: 'Support Team',
      lastMessage: 'How can we help you today?',
      time: '1 week ago',
      unread: 0,
      avatar: 'ST'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      content: 'Good morning! I wanted to update you on the water damage restoration progress.',
      time: '9:00 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Good morning John. Please go ahead with the update.',
      time: '9:15 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'John Smith',
      content: 'We have completed the initial water extraction and drying process. The affected areas are now ready for reconstruction.',
      time: '9:30 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'John Smith',
      content: 'The water damage assessment is complete. I will send you the detailed report shortly.',
      time: '10:30 AM',
      isMe: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Messages</h1>
          <p className="text-gray-300">Communicate with your restoration team</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-white/20">
              <div className="p-4 border-b border-white/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-full">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b border-white/10 cursor-pointer transition-colors ${
                      selectedConversation === conv.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {conv.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-white font-semibold">{conv.name}</h3>
                          <span className="text-gray-300 text-xs">{conv.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {conversations.find(c => c.id === selectedConversation)?.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {conversations.find(c => c.id === selectedConversation)?.name}
                    </h3>
                    <p className="text-gray-300 text-sm">Active now</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                      <div className={`p-3 rounded-lg ${
                        message.isMe 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/20 text-white'
                      }`}>
                        <p>{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${
                        message.isMe ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-gray-300 text-xs">{message.time}</span>
                        {message.isMe && <CheckCheck className="w-4 h-4 text-blue-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-300 hover:text-white transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ClientPortalMessagesPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ClientPortalMessagesPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ClientPortalMessagesPageOriginal />
      <AntigravityFooter />
    </>
  );
}
