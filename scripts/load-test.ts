/**
 * Load Testing Script
 *
 * Simulates concurrent API requests to test performance under load
 * Usage: npx ts-node scripts/load-test.ts
 */

import http from 'http'
import https from 'https'

interface LoadTestConfig {
  baseUrl: string
  concurrentRequests: number
  totalRequests: number
  timeout: number
}

interface TestResult {
  endpoint: string
  method: string
  statusCode: number
  responseTime: number
  success: boolean
  error?: string
}

class LoadTester {
  private config: LoadTestConfig
  private results: TestResult[] = []
  private startTime = Date.now()
  private completedRequests = 0

  constructor(config: LoadTestConfig) {
    this.config = config
  }

  async runTests(): Promise<void> {
    console.log('Starting load tests...')
    console.log(`Configuration:`)
    console.log(`  Base URL: ${this.config.baseUrl}`)
    console.log(`  Concurrent requests: ${this.config.concurrentRequests}`)
    console.log(`  Total requests: ${this.config.totalRequests}`)
    console.log('')

    const tests = this.generateTests()
    const batches = this.chunkArray(tests, this.config.concurrentRequests)

    for (let i = 0; i < batches.length; i++) {
      console.log(`Running batch ${i + 1}/${batches.length}...`)
      await Promise.all(batches[i].map((test) => this.executeTest(test)))
      console.log(`  Completed: ${this.completedRequests}/${this.config.totalRequests}`)
    }

    this.printResults()
  }

  private generateTests(): Array<{ endpoint: string; method: string }> {
    const tests: Array<{ endpoint: string; method: string }> = []
    const endpoints = [
      { endpoint: '/api/health', method: 'GET' },
      { endpoint: '/api/health/ready', method: 'GET' },
      { endpoint: '/api/health/live', method: 'GET' },
      { endpoint: '/api/presence', method: 'GET' },
    ]

    for (let i = 0; i < this.config.totalRequests; i++) {
      const test = endpoints[i % endpoints.length]
      tests.push(test)
    }

    return tests
  }

  private async executeTest(test: { endpoint: string; method: string }): Promise<void> {
    return new Promise((resolve) => {
      const startTime = Date.now()
      const url = new URL(test.endpoint, this.config.baseUrl)
      const client = url.protocol === 'https:' ? https : http

      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: test.method,
        timeout: this.config.timeout,
      }

      const request = client.request(options, (response) => {
        let data = ''

        response.on('data', (chunk) => {
          data += chunk
        })

        response.on('end', () => {
          const responseTime = Date.now() - startTime
          const result: TestResult = {
            endpoint: test.endpoint,
            method: test.method,
            statusCode: response.statusCode || 0,
            responseTime,
            success: (response.statusCode || 0) < 400,
          }

          this.results.push(result)
          this.completedRequests++
          resolve()
        })
      })

      request.on('error', (error) => {
        const responseTime = Date.now() - startTime
        const result: TestResult = {
          endpoint: test.endpoint,
          method: test.method,
          statusCode: 0,
          responseTime,
          success: false,
          error: error.message,
        }

        this.results.push(result)
        this.completedRequests++
        resolve()
      })

      request.on('timeout', () => {
        request.destroy()
        const responseTime = Date.now() - startTime
        const result: TestResult = {
          endpoint: test.endpoint,
          method: test.method,
          statusCode: 0,
          responseTime,
          success: false,
          error: 'Request timeout',
        }

        this.results.push(result)
        this.completedRequests++
        resolve()
      })

      request.end()
    })
  }

  private printResults(): void {
    console.log('')
    console.log('=== Load Test Results ===')
    console.log('')

    const totalTime = Date.now() - this.startTime
    const successCount = this.results.filter((r) => r.success).length
    const failureCount = this.results.length - successCount

    console.log('Summary:')
    console.log(`  Total time: ${(totalTime / 1000).toFixed(2)}s`)
    console.log(`  Total requests: ${this.results.length}`)
    console.log(`  Successful: ${successCount} (${((successCount / this.results.length) * 100).toFixed(1)}%)`)
    console.log(`  Failed: ${failureCount}`)
    console.log('')

    const responseTimes = this.results
      .filter((r) => r.success)
      .map((r) => r.responseTime)
      .sort((a, b) => a - b)

    if (responseTimes.length > 0) {
      console.log('Response Time Statistics (successful requests):')
      console.log(`  Min: ${Math.min(...responseTimes)}ms`)
      console.log(`  Max: ${Math.max(...responseTimes)}ms`)
      console.log(`  Avg: ${(responseTimes.reduce((a, b) => a + b) / responseTimes.length).toFixed(2)}ms`)
      console.log(`  P50: ${responseTimes[Math.floor(responseTimes.length * 0.5)]}ms`)
      console.log(`  P95: ${responseTimes[Math.floor(responseTimes.length * 0.95)]}ms`)
      console.log(`  P99: ${responseTimes[Math.floor(responseTimes.length * 0.99)]}ms`)
    }

    console.log('')
    console.log('Status Code Distribution:')
    const statusCodes = new Map<number, number>()
    for (const result of this.results) {
      statusCodes.set(result.statusCode, (statusCodes.get(result.statusCode) || 0) + 1)
    }
    for (const [code, count] of statusCodes.entries()) {
      console.log(`  ${code}: ${count}`)
    }

    console.log('')
    if (failureCount > 0) {
      console.log('Failures:')
      for (const result of this.results.filter((r) => !r.success)) {
        console.log(`  ${result.method} ${result.endpoint} - ${result.error || `Status ${result.statusCode}`}`)
      }
    }

    console.log('')
    console.log(`Throughput: ${(this.results.length / (totalTime / 1000)).toFixed(2)} req/s`)
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

// Main execution
const config: LoadTestConfig = {
  baseUrl: process.env.TEST_URL || 'http://localhost:3000',
  concurrentRequests: parseInt(process.env.CONCURRENT || '10', 10),
  totalRequests: parseInt(process.env.TOTAL_REQUESTS || '1000', 10),
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
}

const tester = new LoadTester(config)
tester.runTests().catch((error) => {
  console.error('Load test failed:', error)
  process.exit(1)
})
