'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { ChatMessage, MessageSentEvent } from '@/lib/supabase/types'

interface JobMessagingProps {
  jobId: string
  userId: string
  userType: 'client' | 'contractor'
  otherPartyName?: string
  className?: string
  isOtherTyping?: boolean
  onMessageSent?: (message: ChatMessage) => void
  onNewMessage?: (message: ChatMessage) => void
  onTypingChange?: (isTyping: boolean) => void
}

export function JobMessaging({
  jobId,
  userId,
  userType,
  otherPartyName = 'Other Party',
  className,
  isOtherTyping = false,
  onMessageSent,
  onNewMessage,
  onTypingChange,
}: JobMessagingProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [upgradeRequired, setUpgradeRequired] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Fetch message history
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/realtime/jobs/${jobId}/messages`)

      if (!response.ok) {
        const data = await response.json()
        if (data.upgradeRequired) {
          setUpgradeRequired(true)
          return
        }
        throw new Error(data.error || 'Failed to fetch messages')
      }

      const data = await response.json()
      setMessages(data.messages)
      setError(null)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError(err instanceof Error ? err.message : 'Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  // Send a message
  const sendMessage = async () => {
    const content = inputValue.trim()
    if (!content || isSending) return

    setIsSending(true)
    setError(null)

    // Optimistic update
    const optimisticMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      jobId,
      senderId: userId,
      senderType: userType,
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimisticMessage])
    setInputValue('')

    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      const data = await response.json()

      // Replace optimistic message with real one
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticMessage.id ? data.message : m))
      )

      onMessageSent?.(data.message)
      scrollToBottom()
    } catch (err) {
      console.error('Error sending message:', err)
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id))
      setError(err instanceof Error ? err.message : 'Failed to send message')
      setInputValue(content) // Restore input
    } finally {
      setIsSending(false)
    }
  }

  // Handle incoming real-time messages
  const handleNewMessage = useCallback(
    (event: MessageSentEvent) => {
      if (event.jobId !== jobId) return
      if (event.senderId === userId) return // Ignore own messages

      const newMessage: ChatMessage = {
        id: event.messageId,
        jobId: event.jobId,
        senderId: event.senderId,
        senderType: event.senderType,
        content: event.content,
        isRead: false,
        createdAt: event.timestamp,
      }

      setMessages((prev) => [...prev, newMessage])
      onNewMessage?.(newMessage)
      scrollToBottom()
    },
    [jobId, userId, onNewMessage, scrollToBottom]
  )

  // Initial fetch
  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (onTypingChange) {
      // Start typing
      if (value.length > 0 && !isTypingRef.current) {
        isTypingRef.current = true
        onTypingChange(true)
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Stop typing after 2 seconds of inactivity
      if (value.length > 0) {
        typingTimeoutRef.current = setTimeout(() => {
          isTypingRef.current = false
          onTypingChange(false)
        }, 2000)
      } else {
        // Immediately stop if input is empty
        isTypingRef.current = false
        onTypingChange(false)
      }
    }
  }

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  if (upgradeRequired) {
    return (
      <div className={cn('flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden', className)}>
        <div className="p-6 text-center">
          <span className="text-3xl mb-3 block">💬</span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            In-App Messaging
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Chat directly with your contractor. Available with PRO tier.
          </p>
          <button
            onClick={() => window.open('/dashboard/settings/subscription', '_blank')}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Chat with {otherPartyName}
          </h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-48 bg-white dark:bg-gray-900">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <span className="text-2xl mb-2">💬</span>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Send a message to get started</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === userId}
              senderName={message.senderId === userId ? 'You' : otherPartyName}
            />
          ))
        )}
        {/* Typing indicator */}
        {isOtherTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 rounded-bl-none">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {otherPartyName} is typing
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error display */}
      {error && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isSending}
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isSending}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isSending ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Message bubble component
interface MessageBubbleProps {
  message: ChatMessage
  isOwn: boolean
  senderName: string
}

function MessageBubble({ message, isOwn, senderName }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2',
          isOwn
            ? 'bg-teal-600 text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
        )}
      >
        {!isOwn && (
          <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mb-1">
            {senderName}
          </p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <div className={cn('flex items-center gap-1 mt-1', isOwn ? 'justify-end' : 'justify-start')}>
          <span
            className={cn(
              'text-xs',
              isOwn ? 'text-teal-200' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {time}
          </span>
          {isOwn && message.isRead && (
            <span className="text-xs text-teal-200">✓✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Export for external use
export { MessageBubble }
