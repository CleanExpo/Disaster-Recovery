/**
 * AI Orchestration Demo Component
 * Demonstrates GPT-OSS-120B sequential thinking for disaster recovery
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface OrchestrationResult {
  success: boolean;
  data?: {
    result: any;
    metadata: {
      approach: string;
      provider: string;
      confidence: number;
      cost: number;
      processingTime: number;
      steps?: number;
    };
  };
  error?: string;
}

const EXAMPLE_PROMPTS = [
  {
    title: "Flood Damage Assessment",
    prompt: "I have a residential property that was flooded yesterday. Water level reached 1.2 meters in the ground floor. The house has carpet flooring, plasterboard walls, and electrical outlets that were submerged. What are the immediate safety concerns and step-by-step recovery plan?",
    type: "damage-assessment"
  },
  {
    title: "Fire Damage Analysis", 
    prompt: "A kitchen fire damaged my restaurant. Smoke has affected the dining area and kitchen equipment may be compromised. I need a comprehensive analysis of safety hazards, cleanup requirements, and restoration timeline for insurance purposes.",
    type: "safety-analysis"
  },
  {
    title: "Storm Damage Evaluation",
    prompt: "Severe hailstorm damaged my commercial building roof and broke several windows. Need to assess structural integrity, prioritize repairs, and estimate costs for insurance claim. The building houses IT equipment that needs protection.",
    type: "business-analytics"
  }
];

export function AIOrchestrationDemo() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OrchestrationResult | null>(null);
  const [useSequentialThinking, setUseSequentialThinking] = useState(true);

  const handleSubmit = async (testPrompt?: string) => {
    const inputPrompt = testPrompt || prompt;
    
    if (!inputPrompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/orchestrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputPrompt,
          taskType: 'DAMAGE_ASSESSMENT',
          priority: 'high',
          accuracyRequired: 'critical',
          forceSequentialThinking: useSequentialThinking,
          maxSteps: 6
        }),
      });

      const data = await response.json();
      setResult(data);

      // If using example, set the prompt
      if (testPrompt) {
        setPrompt(testPrompt);
      }

    } catch (error) {
      console.error('API error:', error);
      setResult({
        success: false,
        error: 'Failed to connect to AI orchestration service'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSequentialSteps = (steps: any[]) => {
    if (!steps || !Array.isArray(steps)) return null;

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-gray-700">Sequential Thinking Steps:</h4>
        {steps.map((step, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
            <div className="flex items-centre gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                Step {step.step}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Confidence: {(step.confidence * 100).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-sm text-gray-700 font-medium">{step.thought}</p>
            {step.reasoning && (
              <p className="text-xs text-gray-600 mt-1">{step.reasoning.substring(0, 200)}...</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Orchestration Demo - GPT-OSS-120B Integration
          </CardTitle>
          <CardDescription>
            Test the sequential thinking capabilities for disaster recovery analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Example Prompts */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Quick Test Examples:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit(example.prompt)}
                  disabled={isLoading}
                  className="h-auto p-3 text-left justify-start"
                >
                  <div>
                    <div className="font-medium text-xs">{example.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {example.prompt.substring(0, 60)}...
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div>
            <Textarea
              placeholder="Enter a disaster recovery scenario for AI analysis... (e.g., describe property damage, safety concerns, recovery needs)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Controls */}
          <div className="flex items-centre justify-between">
            <div className="flex items-centre gap-4">
              <label className="flex items-centre gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useSequentialThinking}
                  onChange={(e) => setUseSequentialThinking(e.target.checked)}
                  className="rounded"
                />
                Use Sequential Thinking
              </label>
            </div>
            
            <Button
              onClick={() => handleSubmit()}
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {useSequentialThinking ? <Brain className="mr-2 h-4 w-4" /> : <Zap className="mr-2 h-4 w-4" />}
                  Analyse with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-centre gap-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              AI Analysis Result
            </CardTitle>
            {result.data && (
              <div className="flex flex-wrap gap-2">
                <Badge variant={result.data.metadata.approach === 'sequential-thinking' ? 'default' : 'secondary'}>
                  {result.data.metadata.approach === 'sequential-thinking' ? 'Sequential Thinking' : 'Direct Response'}
                </Badge>
                <Badge variant="outline">
                  {result.data.metadata.provider}
                </Badge>
                <Badge variant="outline">
                  Confidence: {(result.data.metadata.confidence * 100).toFixed(0)}%
                </Badge>
                <Badge variant="outline">
                  {result.data.metadata.processingTime}ms
                </Badge>
                <Badge variant="outline">
                  ${result.data.metadata.cost.toFixed(4)}
                </Badge>
                {result.data.metadata.steps && (
                  <Badge variant="outline">
                    {result.data.metadata.steps} steps
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {result.success && result.data ? (
              <div className="space-y-4">
                {/* Sequential Steps */}
                {result.data.result.steps && renderSequentialSteps(result.data.result.steps)}
                
                {/* Final Answer */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    {result.data.metadata.approach === 'sequential-thinking' ? 'Final Analysis:' : 'AI Response:'}
                  </h4>
                  <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">
                      {result.data.result.finalAnswer || result.data.result}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                <p className="font-medium">Error:</p>
                <p className="text-sm">{result.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}