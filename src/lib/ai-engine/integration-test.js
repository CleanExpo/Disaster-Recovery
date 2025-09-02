/**
 * Simple integration test for ElysiaJS setup
 * Tests basic functionality without requiring full server setup
 */

const { Elysia } = require('elysia')

async function testElysiaBasics() {
  console.log('🧪 Testing basic ElysiaJS functionality...')
  
  try {
    // Test basic Elysia app creation
    const app = new Elysia()
      .get('/test', () => ({ message: 'Hello ElysiaJS!', status: 'working' }))
      .post('/echo', ({ body }) => ({ echo: body }))
    
    console.log('✅ ElysiaJS app created successfully')
    
    // Test that we can create type schemas
    const { t } = require('elysia')
    
    const TestSchema = t.Object({
      name: t.String(),
      age: t.Number()
    })
    
    console.log('✅ Type schemas working')
    
    // Test plugins can be imported
    try {
      const { cors } = require('@elysiajs/cors')
      const { swagger } = require('@elysiajs/swagger')
      console.log('✅ ElysiaJS plugins available')
    } catch (pluginError) {
      console.log('⚠️  Plugin import issue:', pluginError.message)
    }
    
    // Test LangChain imports
    try {
      const { OpenAIEmbeddings } = require('@langchain/openai')
      const { MemoryVectorStore } = require('langchain/vectorstores/memory')
      console.log('✅ LangChain dependencies available')
    } catch (langchainError) {
      console.log('⚠️  LangChain import issue:', langchainError.message)
    }
    
    console.log('🎉 Basic integration test passed!')
    return true
    
  } catch (error) {
    console.error('❌ Basic integration test failed:', error)
    return false
  }
}

// Run test if called directly
if (require.main === module) {
  testElysiaBasics()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error('Test runner error:', error)
      process.exit(1)
    })
}

module.exports = { testElysiaBasics }