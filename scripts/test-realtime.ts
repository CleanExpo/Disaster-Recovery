/**
 * Test Supabase Realtime Connection
 * Run: npx ts-node scripts/test-realtime.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lccqasmurmsisnnjqqmr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY3Fhc211cm1zaXNubmpxcW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzI1MjUsImV4cCI6MjA3MzY0ODUyNX0.7W4kXBxyRZRFMawE0xNGkB-9lW0V-cjTnr6xUkOLlag'

async function testRealtimeConnection() {
  console.log('🔌 Testing Supabase Realtime Connection...\n')

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  })

  let messageReceived = false
  let connectionEstablished = false

  // Create a test channel
  const channelName = `test-${Date.now()}`
  const channel = supabase.channel(channelName)

  // Set up message listener
  channel.on('broadcast', { event: 'test_event' }, (payload) => {
    console.log('✅ Message received:', payload.payload)
    messageReceived = true
  })

  // Subscribe to channel
  console.log(`📡 Subscribing to channel: ${channelName}`)

  const subscribePromise = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Connection timeout after 10 seconds'))
    }, 10000)

    channel.subscribe((status) => {
      console.log(`   Status: ${status}`)

      if (status === 'SUBSCRIBED') {
        connectionEstablished = true
        clearTimeout(timeout)
        resolve()
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        clearTimeout(timeout)
        reject(new Error(`Channel error: ${status}`))
      }
    })
  })

  try {
    await subscribePromise
    console.log('\n✅ Connected to Supabase Realtime!\n')

    // Send a test message
    console.log('📤 Sending test message...')
    const testPayload = {
      type: 'STATUS_CHANGED',
      jobId: 'test-job-123',
      status: 'en_route',
      timestamp: new Date().toISOString(),
    }

    const sendResult = await channel.send({
      type: 'broadcast',
      event: 'test_event',
      payload: testPayload,
    })

    console.log(`   Send result: ${sendResult}`)

    // Wait for message to be received
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Cleanup
    await channel.unsubscribe()

    // Results
    console.log('\n' + '='.repeat(50))
    console.log('📊 TEST RESULTS')
    console.log('='.repeat(50))
    console.log(`   Connection:     ${connectionEstablished ? '✅ PASS' : '❌ FAIL'}`)
    console.log(`   Message Send:   ${sendResult === 'ok' ? '✅ PASS' : '❌ FAIL'}`)
    console.log(`   Message Receive: ${messageReceived ? '✅ PASS' : '⚠️  Not received (normal for broadcast to self)'}`)
    console.log('='.repeat(50))

    if (connectionEstablished && sendResult === 'ok') {
      console.log('\n🎉 Supabase Realtime is working correctly!\n')
      process.exit(0)
    } else {
      console.log('\n❌ Some tests failed\n')
      process.exit(1)
    }
  } catch (error) {
    console.error('\n❌ Connection failed:', error)
    process.exit(1)
  }
}

testRealtimeConnection()
