import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { DatabaseService } from '@/lib/db'
import { Session } from '@/types/session'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { stockId, type, quantity, price } = await request.json()

    if (!stockId || !type || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (type !== 'BUY' && type !== 'SELL') {
      return NextResponse.json(
        { error: 'Invalid trade type' },
        { status: 400 }
      )
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be positive' },
        { status: 400 }
      )
    }

    // Execute trade with concurrency control
    const order = await DatabaseService.executeTradeWithLock(
      session.user.id,
      stockId,
      type,
      quantity,
      price
    )

    return NextResponse.json({
      message: 'Trade executed successfully',
      order,
    })
  } catch (error) {
    console.error('Trade execution error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Trade execution failed' },
      { status: 500 }
    )
  }
}
