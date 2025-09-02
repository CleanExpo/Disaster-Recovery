/**
 * ElysiaJS AI Engine Test Client
 * Used to verify integration and test RAG/orchestration capabilities
 */

export class AIEngineTestClient {
  private baseUrl: string
  
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl
  }

  /**
   * Test RAG system query
   */
  async testRAGQuery(query: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-engine/rag/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          options: {
            maxResults: 3,
            includeMetadata: true,
            useCache: true
          }
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('RAG query test failed:', error)
      throw error
    }
  }

  /**
   * Test enhanced orchestration
   */
  async testOrchestration(prompt: string, useRAG = true): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-engine/orchestration/orchestrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          options: {
            type: 'QUICK_RESPONSE',
            priority: 'normal',
            accuracyRequired: 'high',
            useRAG,
            verificationLevel: 'standard'
          }
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Orchestration test failed:', error)
      throw error
    }
  }

  /**
   * Test emergency response
   */
  async testEmergencyResponse(situation: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-engine/emergency/assess-situation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: situation,
          urgencyLevel: 'high'
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Emergency response test failed:', error)
      throw error
    }
  }

  /**
   * Test system health
   */
  async testHealthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-engine/health`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Health check test failed:', error)
      throw error
    }
  }

  /**
   * Run comprehensive test suite
   */
  async runTestSuite(): Promise<void> {
    console.log('🚀 Starting ElysiaJS AI Engine Test Suite...\n')
    
    try {
      // Test 1: Health Check
      console.log('1. Testing health check...')
      const health = await this.testHealthCheck()
      console.log('✅ Health check passed:', health.data.status)
      console.log()

      // Test 2: RAG Query
      console.log('2. Testing RAG query...')
      const ragResult = await this.testRAGQuery('What are the steps for water damage emergency response?')
      console.log('✅ RAG query passed')
      console.log('   - Confidence:', ragResult.data?.confidence)
      console.log('   - Sources:', ragResult.data?.sources?.length || 0)
      console.log('   - Hallucination Risk:', ragResult.data?.hallucinationRisk)
      console.log()

      // Test 3: Enhanced Orchestration
      console.log('3. Testing enhanced orchestration...')
      const orchestrationResult = await this.testOrchestration(
        'How should I handle a fire damage restoration project?',
        true
      )
      console.log('✅ Orchestration passed')
      console.log('   - RAG Enhanced:', orchestrationResult.data?.ragEnhanced)
      console.log('   - Hallucination Risk:', orchestrationResult.data?.hallucinationRisk)
      console.log()

      // Test 4: Emergency Response
      console.log('4. Testing emergency response...')
      const emergencyResult = await this.testEmergencyResponse(
        'Water pipe burst in basement, flooding throughout ground floor, electrical panel partially submerged'
      )
      console.log('✅ Emergency response passed')
      console.log('   - Severity Level:', emergencyResult.data?.analysis?.severityLevel)
      console.log('   - Response Time:', emergencyResult.data?.analysis?.estimatedResponseTime)
      console.log()

      console.log('🎉 All tests passed! ElysiaJS AI Engine is working correctly.')
      
    } catch (error) {
      console.error('❌ Test suite failed:', error)
      throw error
    }
  }
}

// Example usage and test scenarios
export const testScenarios = {
  disaster_recovery_queries: [
    'What are the immediate steps for water damage response?',
    'How do I assess fire damage severity?',
    'What equipment is needed for mould remediation?',
    'Emergency protocol for sewage backup cleanup'
  ],
  
  emergency_situations: [
    'Basement flooding after pipe burst, water level rising',
    'Kitchen fire, smoke damage throughout house',
    'Mould discovered in HVAC system, health concerns',
    'Storm damage, roof leak, water entering multiple rooms'
  ],
  
  complex_orchestration_tasks: [
    'Develop comprehensive restoration plan for fire-damaged commercial building',
    'Analyze insurance claim requirements for water damage restoration',
    'Create emergency response checklist for storm damage assessment',
    'Plan contractor resource allocation for large-scale disaster recovery'
  ]
}

// Utility function to run tests in development
export async function runDevelopmentTests() {
  const client = new AIEngineTestClient()
  
  try {
    await client.runTestSuite()
    
    // Additional scenario tests
    console.log('\n📋 Running scenario tests...\n')
    
    for (const [category, scenarios] of Object.entries(testScenarios)) {
      console.log(`Testing ${category.replace(/_/g, ' ')}:`)
      
      for (let i = 0; i < Math.min(scenarios.length, 2); i++) {
        const scenario = scenarios[i]
        console.log(`  - Scenario ${i + 1}: ${scenario.substring(0, 50)}...`)
        
        try {
          if (category === 'emergency_situations') {
            await client.testEmergencyResponse(scenario)
          } else {
            await client.testOrchestration(scenario, true)
          }
          console.log('    ✅ Passed')
        } catch (error) {
          console.log('    ❌ Failed:', error.message)
        }
      }
      console.log()
    }
    
    console.log('🎯 Scenario tests completed!')
    
  } catch (error) {
    console.error('🚨 Development tests failed:', error)
  }
}