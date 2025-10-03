import { NextResponse } from 'next/server'
import { StockDataService } from '@/lib/stockData'

export async function POST() {
  try {
    await StockDataService.updateStockPrices()
    return NextResponse.json({ message: 'Stock prices updated successfully' })
  } catch (error) {
    console.error('Error updating stock prices:', error)
    return NextResponse.json(
      { error: 'Failed to update stock prices' },
      { status: 500 }
    )
  }
}
