/**
 * Test fixtures and test data factories
 */

import { prisma } from '@/lib/prisma'

export const testUser = {
  email: 'test@example.com',
  name: 'Test User',
  hashedPassword: 'test-password-hash',
}

export const testRoom = {
  name: 'Test Chat Room',
  description: 'A test room for integration tests',
}

export const testMessage = {
  content: 'This is a test message',
}

export const testBooking = {
  startDate: new Date(),
  endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  description: 'Test booking',
  status: 'pending' as const,
}

/**
 * Factory functions for creating test data
 */
export const factories = {
  async createUser(overrides = {}) {
    return prisma.user.create({
      data: {
        ...testUser,
        ...overrides,
      },
    })
  },

  async createRoom(memberIds: string[] = [], overrides = {}) {
    return prisma.chatRoom.create({
      data: {
        ...testRoom,
        ...overrides,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
    })
  },

  async createMessage(userId: string, roomId: string, overrides = {}) {
    return prisma.message.create({
      data: {
        ...testMessage,
        ...overrides,
        sender: { connect: { id: userId } },
        room: { connect: { id: roomId } },
      },
    })
  },

  async createBooking(userId: string, overrides = {}) {
    return prisma.booking.create({
      data: {
        ...testBooking,
        ...overrides,
        createdBy: { connect: { id: userId } },
      },
    })
  },

  async cleanup() {
    await prisma.messageReaction.deleteMany({})
    await prisma.message.deleteMany({})
    await prisma.chatRoom.deleteMany({})
    await prisma.booking.deleteMany({})
    await prisma.claim.deleteMany({})
    await prisma.user.deleteMany({})
  },
}
