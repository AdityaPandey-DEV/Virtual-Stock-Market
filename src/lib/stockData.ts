import { DatabaseService } from './db'

export interface StockData {
  id: string
  symbol: string
  name: string
  sector?: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
}

export class StockDataService {
  // Simulate stock price movements
  static generateRandomPrice(basePrice: number, volatility: number = 0.02): number {
    const change = (Math.random() - 0.5) * 2 * volatility * basePrice
    return Math.max(0.01, basePrice + change) // Ensure price doesn't go below 0.01
  }

  // Initialize sample stocks
  static async initializeSampleStocks() {
    const sampleStocks = [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'Technology' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking' },
      { symbol: 'INFY', name: 'Infosys Ltd', sector: 'Technology' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking' },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking' },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG' },
      { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG' },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom' },
      { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
    ]

    const basePrices = [2500, 3500, 1500, 1800, 900, 1800, 2400, 400, 800, 600]

    for (let i = 0; i < sampleStocks.length; i++) {
      const stock = sampleStocks[i]
      const basePrice = basePrices[i]

      try {
        const createdStock = await DatabaseService.createStock(stock.symbol, stock.name, stock.sector)
        
        // Add initial price data
        await DatabaseService.addStockPrice(
          createdStock.id,
          new Date(),
          basePrice,
          basePrice * 1.02,
          basePrice * 0.98,
          basePrice,
          Math.floor(Math.random() * 1000000) + 100000
        )
      } catch (error) {
        console.error(`Error initializing stock ${stock.symbol}:`, error)
      }
    }
  }

  // Get all stocks with current prices
  static async getAllStocks(): Promise<StockData[]> {
    const stocks = await DatabaseService.getStocks()
    
    return stocks.map(stock => {
      const latestPrice = stock.stockPrices[0]
      const currentPrice = latestPrice ? Number(latestPrice.close) : 0
      const previousPrice = latestPrice ? Number(latestPrice.open) : currentPrice
      const change = currentPrice - previousPrice
      const changePercent = previousPrice > 0 ? (change / previousPrice) * 100 : 0

      return {
        id: stock.id,
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector || undefined,
        currentPrice,
        change,
        changePercent,
        volume: latestPrice ? Number(latestPrice.volume) : 0,
        marketCap: stock.marketCap ? Number(stock.marketCap) : undefined,
      }
    })
  }

  // Get stock by symbol
  static async getStockBySymbol(symbol: string): Promise<StockData | null> {
    const stock = await DatabaseService.getStockBySymbol(symbol)
    if (!stock) return null

    const latestPrice = stock.stockPrices[0]
    const currentPrice = latestPrice ? Number(latestPrice.close) : 0
    const previousPrice = latestPrice ? Number(latestPrice.open) : currentPrice
    const change = currentPrice - previousPrice
    const changePercent = previousPrice > 0 ? (change / previousPrice) * 100 : 0

    return {
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector || undefined,
      currentPrice,
      change,
      changePercent,
      volume: latestPrice ? Number(latestPrice.volume) : 0,
      marketCap: stock.marketCap ? Number(stock.marketCap) : undefined,
    }
  }

  // Update stock prices (simulate market movements)
  static async updateStockPrices() {
    const stocks = await DatabaseService.getStocks()
    
    for (const stock of stocks) {
      const latestPrice = await DatabaseService.getLatestStockPrice(stock.id)
      if (!latestPrice) continue

      const currentPrice = Number(latestPrice.close)
      const newPrice = this.generateRandomPrice(currentPrice)
      const high = Math.max(currentPrice, newPrice)
      const low = Math.min(currentPrice, newPrice)
      const volume = Math.floor(Math.random() * 1000000) + 100000

      await DatabaseService.addStockPrice(
        stock.id,
        new Date(),
        currentPrice,
        high,
        low,
        newPrice,
        volume
      )
    }
  }

  // Get stock price history
  static async getStockPriceHistory(symbol: string, days: number = 30) {
    const stock = await DatabaseService.getStockBySymbol(symbol)
    if (!stock) return []

    return await DatabaseService.getStockPriceHistory(stock.id, days)
  }

  // Get top gainers
  static async getTopGainers(limit: number = 5): Promise<StockData[]> {
    const stocks = await this.getAllStocks()
    return stocks
      .filter(stock => stock.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, limit)
  }

  // Get top losers
  static async getTopLosers(limit: number = 5): Promise<StockData[]> {
    const stocks = await this.getAllStocks()
    return stocks
      .filter(stock => stock.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, limit)
  }

  // Get most active stocks (by volume)
  static async getMostActive(limit: number = 5): Promise<StockData[]> {
    const stocks = await this.getAllStocks()
    return stocks
      .sort((a, b) => b.volume - a.volume)
      .slice(0, limit)
  }
}
