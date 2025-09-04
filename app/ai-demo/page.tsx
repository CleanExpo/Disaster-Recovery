/**
 * AI Orchestration Demo Page
 * Demonstrates GPT-OSS-120B integration for disaster recovery
 */

import { Metadata } from 'next';
import { AIOrchestrationDemo } from '@/components/AIOrchestrationDemo';
import { Brain, Zap, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Orchestration Demo - GPT-OSS-120B Integration',
  description: 'Test the advanced AI orchestration system with GPT-OSS-120B sequential thinking capabilities' };

export default function AIDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Orchestration System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Experience the power of GPT-OSS-120B sequential thinking integrated with Claude for comprehensive disaster recovery analysis
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sequential Thinking</h3>
              <p className="text-sm text-gray-600">
                GPT-OSS-120B breaks complex problems into logical steps for thorough analysis
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intelligent Routing</h3>
              <p className="text-sm text-gray-600">
                Automatically selects optimal AI approach based on task complexity and requirements
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Disaster Recovery Focus</h3>
              <p className="text-sm text-gray-600">
                Specialised prompts and analysis for Australian disaster recovery scenarios
              </p>
            </div>
          </div>
        </div>

        {/* Demo Component */}
        <AIOrchestrationDemo />
        
        {/* Technical Details */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Architecture</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>OpenRouter Integration:</strong> GPT-OSS-120B access</li>
                <li>• <strong>Anthropic Integration:</strong> Claude 3 Sonnet/Opus</li>
                <li>• <strong>Intelligent Router:</strong> Task complexity analysis</li>
                <li>• <strong>Sequential Engine:</strong> Multi-step reasoning</li>
                <li>• <strong>Fallback System:</strong> Provider redundancy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Cost Optimisation:</strong> Token usage tracking</li>
                <li>• <strong>Response Time:</strong> Performance monitoring</li>
                <li>• <strong>Confidence Scoring:</strong> Reliability metrics</li>
                <li>• <strong>Real-time Updates:</strong> Step-by-step progress</li>
                <li>• <strong>Error Handling:</strong> Graceful degradation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}