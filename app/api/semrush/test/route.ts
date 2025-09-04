import { NextResponse } from 'next/server';
import { semrushAPI, checkSEMrushConnection } from '@/lib/semrush-api';

export async function GET() {
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
    console.error('SEMrush API test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error testing SEMrush API connection',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}