# AI Integration Patterns

**Skill ID**: ai-integration-patterns
**Version**: 1.0.0

## OpenAI

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function analyzeText(text: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: text }],
    temperature: 0.7,
    max_tokens: 1000
  })

  return completion.choices[0].message.content
}
```

## Google Gemini

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)

export async function generateImage(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
  const result = await model.generateContent(prompt)
  return result.response.text()
}
```

## Claude Agent SDK

```typescript
import { Agent } from '@anthropic-ai/claude-agent-sdk'

const agent = new Agent({
  name: 'data-intake-agent',
  prompt: 'Validate inspection data',
  tools: ['Read', 'Grep'],
  skills: ['australian-business-validator']
})

const result = await agent.execute(input)
```

Load when integrating AI/ML services.
