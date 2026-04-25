import { NextResponse } from 'next/server';
import { semrushAPI, checkSEMrushConnection } from '@/lib/semrush-api';
import { requestLogger, captureException } from '@/lib/observability';

export async function GET(request: Request) {
  const log = requestLogger(request, { route: '/api/semrush/test' });
  try {
    // Check if API is configured
    const isConfigured = semrushAPI.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        message: 'SEMrush API key not configured. Please add SEMRUSH_API_KEY to your .env file',
        configured: false }, { status: 400 });
    }

    // Test connection with a simple keyword lookup
    const testKeyword = 'disaster recovery australia';
    const keywordData = await semrushAPI.getKeywordOverview(testKeyword);
    
    if (keywordData) {
      return NextResponse.json({
        success: true,
        message: 'SEMrush API connected successfully',
        configured: true,
        testData: {
          keyword: keywordData.keyword,
          volume: keywordData.volume,
          difficulty: keywordData.difficulty,
          cpc: keywordData.cpc },
        remainingUnits: semrushAPI.getRemainingUnits() });
    } else {
      return NextResponse.json({
        success: false,
        message: 'SEMrush API configured but unable to fetch data. Check your API key and permissions.',
        configured: true }, { status: 500 });
    }
  } catch (error) {
    log.error('semrush api test error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/semrush/test' }, extra: { requestId: log.requestId } });
    return NextResponse.json({
      success: false,
      message: 'Error testing SEMrush API connection',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}