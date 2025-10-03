import { NextRequest, NextResponse } from 'next/server'
import { RealTimeStockAPI } from '@/lib/stockApi'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')
    
    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol parameter is required' },
        { status: 400 }
      )
    }

    const data = await RealTimeStockAPI.getRealTimeData(symbol)
    
    if (!data) {
      return NextResponse.json(
        { error: 'Real-time data not available' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Real-time data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch real-time data' },
      { status: 500 }
    )
  }
}
