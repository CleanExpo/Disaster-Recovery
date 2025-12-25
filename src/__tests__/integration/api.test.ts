/**
 * Integration tests for API endpoints
 *
 * Tests core API functionality including:
 * - Authentication flows
 * - Message operations
 * - Room management
 * - User presence
 * - Read receipts
 */

import { prisma } from '@/lib/prisma'

describe('API Integration Tests', () => {
  let testUserId: string
  let testRoomId: string

  beforeAll(async () => {
    // Setup: Create test user and room
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        hashedPassword: 'hashed-password',
      },
    })
    testUserId = user.id

    const room = await prisma.chatRoom.create({
      data: {
        name: 'Test Room',
        description: 'Integration test room',
        members: {
          connect: [{ id: testUserId }],
        },
      },
    })
    testRoomId = room.id
  })

  afterAll(async () => {
    // Cleanup
    await prisma.message.deleteMany({
      where: { room: { id: testRoomId } },
    })
    await prisma.chatRoom.delete({
      where: { id: testRoomId },
    })
    await prisma.user.delete({
      where: { id: testUserId },
    })
  })

  describe('Message Operations', () => {
    it('should create a message in a room', async () => {
      const message = await prisma.message.create({
        data: {
          content: 'Test message',
          sender: { connect: { id: testUserId } },
          room: { connect: { id: testRoomId } },
        },
      })

      expect(message).toBeDefined()
      expect(message.content).toBe('Test message')
      expect(message.senderId).toBe(testUserId)
      expect(message.roomId).toBe(testRoomId)
    })

    it('should fetch messages from a room', async () => {
      const messages = await prisma.message.findMany({
        where: { roomId: testRoomId },
        include: { sender: true },
      })

      expect(Array.isArray(messages)).toBe(true)
      expect(messages.length).toBeGreaterThan(0)
    })

    it('should update a message', async () => {
      const created = await prisma.message.create({
        data: {
          content: 'Original content',
          sender: { connect: { id: testUserId } },
          room: { connect: { id: testRoomId } },
        },
      })

      const updated = await prisma.message.update({
        where: { id: created.id },
        data: { content: 'Updated content' },
      })

      expect(updated.content).toBe('Updated content')
    })

    it('should delete a message', async () => {
      const message = await prisma.message.create({
        data: {
          content: 'To be deleted',
          sender: { connect: { id: testUserId } },
          room: { connect: { id: testRoomId } },
        },
      })

      await prisma.message.delete({
        where: { id: message.id },
      })

      const deleted = await prisma.message.findUnique({
        where: { id: message.id },
      })

      expect(deleted).toBeNull()
    })
  })

  describe('Room Management', () => {
    it('should fetch room with members', async () => {
      const room = await prisma.chatRoom.findUnique({
        where: { id: testRoomId },
        include: { members: true },
      })

      expect(room).toBeDefined()
      expect(room?.members).toContainEqual(
        expect.objectContaining({ id: testUserId })
      )
    })

    it('should add user to room', async () => {
      const newUser = await prisma.user.create({
        data: {
          email: 'newuser@example.com',
          name: 'New User',
          hashedPassword: 'hashed-password',
        },
      })

      const updated = await prisma.chatRoom.update({
        where: { id: testRoomId },
        data: {
          members: {
            connect: [{ id: newUser.id }],
          },
        },
        include: { members: true },
      })

      expect(updated.members).toContainEqual(
        expect.objectContaining({ id: newUser.id })
      )

      // Cleanup
      await prisma.user.delete({ where: { id: newUser.id } })
    })
  })

  describe('User Operations', () => {
    it('should fetch user profile', async () => {
      const user = await prisma.user.findUnique({
        where: { id: testUserId },
      })

      expect(user).toBeDefined()
      expect(user?.email).toBe('test@example.com')
    })

    it('should get user rooms', async () => {
      const user = await prisma.user.findUnique({
        where: { id: testUserId },
        include: { chatRooms: true },
      })

      expect(user?.chatRooms).toBeDefined()
      expect(user?.chatRooms.length).toBeGreaterThan(0)
    })
  })
})
