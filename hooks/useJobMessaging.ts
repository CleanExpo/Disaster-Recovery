'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRealtimeConnection } from './useRealtimeConnection'
import type { ChatMessage, MessageSentEvent, MessageReadEvent } from '@/lib/supabase/types'

interface UseJobMessagingOptions {
  jobId: string
  userId: string
  userType: 'client' | 'contractor'
  otherPartyId?: string
  enabled?: boolean
}

interface UseJobMessagingReturn {
  messages: ChatMessage[]
  unreadCount: number
  isTyping: boolean
  isConnected: boolean
  addMessage: (message: ChatMessage) => void
  markAsRead: (messageId: string) => void
  setTyping: (typing: boolean) => void
  refetch: () => Promise<void>
}

export function useJobMessaging({
  jobId,
  userId,
  userType,
  otherPartyId,
  enabled = true,
}: UseJobMessagingOptions): UseJobMessagingReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle incoming messages
  const handleMessageSent = useCallback(
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

      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === newMessage.id)) return prev
        return [...prev, newMessage]
      })

      setUnreadCount((prev) => prev + 1)
    },
    [jobId, userId]
  )

  // Handle read receipts
  const handleMessageRead = useCallback(
    (event: MessageReadEvent) => {
      if (event.jobId !== jobId) return

      // Mark messages from current user as read
      setMessages((prev) =>
        prev.map((m) =>
          m.senderId === userId && !m.isRead ? { ...m, isRead: true } : m
        )
      )
    },
    [jobId, userId]
  )

  // Setup realtime connection
  const { isConnected, sendDirectMessage } = useRealtimeConnection({
    channelName: `job:${jobId}:messages`,
    userId,
    userType,
    onMessageSent: handleMessageSent,
    onMessageRead: handleMessageRead,
    autoReconnect: enabled,
  })

  // Add message to local state
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === message.id)) {
        // Replace temp message with real one
        return prev.map((m) => (m.id.startsWith('temp-') && m.content === message.content ? message : m))
      }
      return [...prev, message]
    })
  }, [])

  // Mark message as read locally
  const markAsRead = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isRead: true } : m))
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  // Send typing indicator
  const setTypingIndicator = useCallback(
    (typing: boolean) => {
      if (!otherPartyId || !sendDirectMessage) return

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      if (typing) {
        sendDirectMessage(
          otherPartyId,
          userType === 'client' ? 'contractor' : 'client',
          {
            type: 'TYPING_START' as any,
            jobId,
            senderId: userId,
            senderType: userType,
          }
        )

        // Auto-stop typing after 3 seconds
        typingTimeoutRef.current = setTimeout(() => {
          sendDirectMessage(
            otherPartyId,
            userType === 'client' ? 'contractor' : 'client',
            {
              type: 'TYPING_STOP' as any,
              jobId,
              senderId: userId,
              senderType: userType,
            }
          )
        }, 3000)
      } else {
        sendDirectMessage(
          otherPartyId,
          userType === 'client' ? 'contractor' : 'client',
          {
            type: 'TYPING_STOP' as any,
            jobId,
            senderId: userId,
            senderType: userType,
          }
        )
      }
    },
    [jobId, userId, userType, otherPartyId, sendDirectMessage]
  )

  // Fetch messages from API
  const refetch = useCallback(async () => {
    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/messages`)
      if (!response.ok) return

      const data = await response.json()
      setMessages(data.messages)
      setUnreadCount(
        data.messages.filter(
          (m: ChatMessage) => !m.isRead && m.senderId !== userId
        ).length
      )
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }, [jobId, userId])

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      refetch()
    }
  }, [enabled, refetch])

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return {
    messages,
    unreadCount,
    isTyping,
    isConnected,
    addMessage,
    markAsRead,
    setTyping: setTypingIndicator,
    refetch,
  }
}

export type { UseJobMessagingOptions, UseJobMessagingReturn }
