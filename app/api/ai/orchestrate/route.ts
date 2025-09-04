import { NextRequest, NextResponse } from 'next/server';
import { orchestrationService } from '@/lib/ai-orchestration/simple-orchestrator';
import { AITaskType } from '@/lib/ai-orchestration/core/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      prompt, 
      type = 'QUICK_RESPONSE',
      priority = 'normal',
      accuracyRequired = 'standard',
      context = {},
      useSequentialThinking = false
    } = body;
    
    if (!prompt) {
      return NextResponse.json({
        success: false,
        message: 'Prompt is required' }, { status: 400 });
    }
    
    console.log('📨 Received AI orchestration request:', {
      prompt: prompt.substring(0, 100) + '...',
      type,
      priority,
      useSequentialThinking });
    
    // Map string type to enum
    const taskType = AITaskType[type as keyof typeof AITaskType] || AITaskType.QUICK_RESPONSE;
    
    // Execute orchestration
    const response = await orchestrationService.orchestrate(prompt, {
      type: taskType,
      priority,
      accuracyRequired,
      context,
      useSequentialThinking });
    
    console.log('✅ Orchestration complete:', {
      model: response.model,
      provider: response.provider,
      confidence: response.confidence,
      cost: `$${response.metadata.cost.toFixed(4)}`,
      tokensUsed: response.metadata.tokensUsed });
    
    return NextResponse.json({
      success: true,
      data: {
        response: response.response,
        model: response.model,
        provider: response.provider,
        confidence: response.confidence,
        metadata: {
          cost: response.metadata.cost,
          tokensUsed: response.metadata.tokensUsed,
          latency: response.metadata.latency,
          steps: response.metadata.steps } } }, { status: 200 });
    
  } catch (error) {
    console.error('AI orchestration error:', error);
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'AI orchestration failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Health check endpoint
    const health = await orchestrationService.getHealth();
    
    return NextResponse.json({
      success: true,
      health,
      message: 'AI orchestration service is running',
      availableTypes: Object.keys(AITaskType) }, { status: 200 });
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Health check failed' }, { status: 500 });
  }
}