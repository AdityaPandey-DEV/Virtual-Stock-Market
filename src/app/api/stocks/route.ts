import { NextResponse } from 'next/server'
import { StockDataService } from '@/lib/stockData'

export async function GET() {
  try {
    const stocks = await StockDataService.getAllStocks()
    return NextResponse.json(stocks)
  } catch (error) {
    console.error('Error fetching stocks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stocks' },
      { status: 500 }
    )
  }
}
