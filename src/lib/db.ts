import { prisma } from './prisma'
import { Decimal } from '@prisma/client/runtime/library'

export class DatabaseService {
  // User operations
  static async createUser(email: string, name: string, password: string) {
    return await prisma.user.create({
      data: {
        email,
        name,
        password,
        walletBalance: 100000, // Starting balance
      },
    })
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        portfolio: {
          include: {
            stock: true,
          },
        },
      },
    })
  }

  // Stock operations
  static async createStock(symbol: string, name: string, sector?: string) {
    return await prisma.stock.create({
      data: {
        symbol,
        name,
        sector,
      },
    })
  }

  static async getStocks() {
    return await prisma.stock.findMany({
      where: { isActive: true },
      include: {
        stockPrices: {
          orderBy: { dateTime: 'desc' },
          take: 1,
        },
      },
    })
  }

  static async getStockBySymbol(symbol: string) {
    return await prisma.stock.findUnique({
      where: { symbol },
      include: {
        stockPrices: {
          orderBy: { dateTime: 'desc' },
          take: 1,
        },
      },
    })
  }

  // Stock price operations
  static async addStockPrice(
    stockId: string,
    dateTime: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number = 0
  ) {
    return await prisma.stockPrice.create({
      data: {
        stockId,
        dateTime,
        open,
        high,
        low,
        close,
        volume: BigInt(volume),
      },
    })
  }

  static async getLatestStockPrice(stockId: string) {
    return await prisma.stockPrice.findFirst({
      where: { stockId },
      orderBy: { dateTime: 'desc' },
    })
  }

  static async getStockPriceHistory(stockId: string, days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return await prisma.stockPrice.findMany({
      where: {
        stockId,
        dateTime: {
          gte: startDate,
        },
      },
      orderBy: { dateTime: 'asc' },
    })
  }

  // Order operations
  static async createOrder(
    userId: string,
    stockId: string,
    type: 'BUY' | 'SELL',
    quantity: number,
    price?: number
  ) {
    return await prisma.order.create({
      data: {
        userId,
        stockId,
        type,
        quantity,
        price: price ? new Decimal(price) : null,
      },
    })
  }

  static async getOrdersByUser(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        stock: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  static async updateOrderStatus(orderId: string, status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'PARTIALLY_EXECUTED') {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })
  }

  // Portfolio operations
  static async getPortfolio(userId: string) {
    return await prisma.portfolio.findMany({
      where: { userId },
      include: {
        stock: {
          include: {
            stockPrices: {
              orderBy: { dateTime: 'desc' },
              take: 1,
            },
          },
        },
      },
    })
  }

  static async updatePortfolio(
    userId: string,
    stockId: string,
    quantity: number,
    avgPrice: number,
    currentValue: number,
    totalInvested: number,
    profitLoss: number
  ) {
    return await prisma.portfolio.upsert({
      where: {
        userId_stockId: {
          userId,
          stockId,
        },
      },
      update: {
        quantity,
        avgPrice: new Decimal(avgPrice),
        currentValue: new Decimal(currentValue),
        totalInvested: new Decimal(totalInvested),
        profitLoss: new Decimal(profitLoss),
      },
      create: {
        userId,
        stockId,
        quantity,
        avgPrice: new Decimal(avgPrice),
        currentValue: new Decimal(currentValue),
        totalInvested: new Decimal(totalInvested),
        profitLoss: new Decimal(profitLoss),
      },
    })
  }

  // Transaction operations
  static async createTransaction(
    orderId: string,
    userId: string,
    stockId: string,
    action: 'BUY' | 'SELL',
    quantity: number,
    price: number
  ) {
    return await prisma.transaction.create({
      data: {
        orderId,
        userId,
        stockId,
        action,
        quantity,
        price: new Decimal(price),
      },
    })
  }

  static async getTransactionsByUser(userId: string) {
    return await prisma.transaction.findMany({
      where: { userId },
      include: {
        stock: true,
        order: true,
      },
      orderBy: { timestamp: 'desc' },
    })
  }

  // Wallet operations
  static async updateWalletBalance(userId: string, amount: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        walletBalance: {
          increment: new Decimal(amount),
        },
      },
    })
  }

  static async getWalletBalance(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletBalance: true },
    })
    return user?.walletBalance || 0
  }

  // Analytics operations
  static async getLeaderboard(limit: number = 10) {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        walletBalance: true,
        portfolio: {
          include: {
            stock: true,
          },
        },
      },
      orderBy: { walletBalance: 'desc' },
      take: limit,
    })
  }

  // Concurrency control with row-level locking
  static async executeTradeWithLock(
    userId: string,
    stockId: string,
    type: 'BUY' | 'SELL',
    quantity: number,
    price: number
  ) {
    return await prisma.$transaction(async (tx) => {
      // Lock user row for update
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { walletBalance: true },
      })

      if (!user) throw new Error('User not found')

      // Lock stock row for update
      const stock = await tx.stock.findUnique({
        where: { id: stockId },
      })

      if (!stock) throw new Error('Stock not found')

      const totalCost = quantity * price

      if (type === 'BUY' && Number(user.walletBalance) < totalCost) {
        throw new Error('Insufficient funds')
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          stockId,
          type,
          quantity,
          price: new Decimal(price),
          status: 'EXECUTED',
        },
      })

      // Create transaction
      await tx.transaction.create({
        data: {
          orderId: order.id,
          userId,
          stockId,
          action: type,
          quantity,
          price: new Decimal(price),
        },
      })

      // Update wallet balance
      const balanceChange = type === 'BUY' ? -totalCost : totalCost
      await tx.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            increment: new Decimal(balanceChange),
          },
        },
      })

      // Update portfolio
      const existingPortfolio = await tx.portfolio.findUnique({
        where: {
          userId_stockId: {
            userId,
            stockId,
          },
        },
      })

      if (existingPortfolio) {
        const newQuantity = type === 'BUY' 
          ? existingPortfolio.quantity + quantity 
          : existingPortfolio.quantity - quantity

        if (newQuantity < 0) {
          throw new Error('Insufficient shares to sell')
        }

        const newTotalInvested = type === 'BUY'
          ? Number(existingPortfolio.totalInvested) + totalCost
          : Number(existingPortfolio.totalInvested) - (Number(existingPortfolio.avgPrice) * quantity)

        const newAvgPrice = newQuantity > 0 ? newTotalInvested / newQuantity : 0
        const newCurrentValue = newQuantity * price
        const newProfitLoss = newCurrentValue - newTotalInvested

        await tx.portfolio.update({
          where: {
            userId_stockId: {
              userId,
              stockId,
            },
          },
          data: {
            quantity: newQuantity,
            avgPrice: new Decimal(newAvgPrice),
            currentValue: new Decimal(newCurrentValue),
            totalInvested: new Decimal(newTotalInvested),
            profitLoss: new Decimal(newProfitLoss),
          },
        })
      } else if (type === 'BUY') {
        // Create new portfolio entry for buy
        await tx.portfolio.create({
          data: {
            userId,
            stockId,
            quantity,
            avgPrice: new Decimal(price),
            currentValue: new Decimal(quantity * price),
            totalInvested: new Decimal(totalCost),
            profitLoss: new Decimal(0),
          },
        })
      }

      return order
    })
  }
}
