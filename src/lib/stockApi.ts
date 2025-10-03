// Optional real-time stock data API integration
// This can be enabled by setting API keys in environment variables

export interface RealTimeStockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  timestamp: Date
}

export class RealTimeStockAPI {
  // Alpha Vantage API integration
  static async getAlphaVantageData(symbol: string): Promise<RealTimeStockData | null> {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY
    if (!apiKey) return null

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      )
      const data = await response.json()
      
      if (data['Global Quote']) {
        const quote = data['Global Quote']
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          timestamp: new Date()
        }
      }
    } catch (error) {
      console.error('Alpha Vantage API error:', error)
    }
    return null
  }

  // Finnhub API integration
  static async getFinnhubData(symbol: string): Promise<RealTimeStockData | null> {
    const apiKey = process.env.FINNHUB_API_KEY
    if (!apiKey) return null

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      )
      const data = await response.json()
      
      if (data.c) {
        return {
          symbol,
          price: data.c,
          change: data.d,
          changePercent: data.dp,
          volume: data.v,
          timestamp: new Date()
        }
      }
    } catch (error) {
      console.error('Finnhub API error:', error)
    }
    return null
  }

  // Get real-time data from any available API
  static async getRealTimeData(symbol: string): Promise<RealTimeStockData | null> {
    // Try Alpha Vantage first
    let data = await this.getAlphaVantageData(symbol)
    if (data) return data

    // Fallback to Finnhub
    data = await this.getFinnhubData(symbol)
    if (data) return data

    return null
  }

  // Batch fetch multiple symbols
  static async getBatchData(symbols: string[]): Promise<RealTimeStockData[]> {
    const promises = symbols.map(symbol => this.getRealTimeData(symbol))
    const results = await Promise.allSettled(promises)
    
    return results
      .filter((result): result is PromiseFulfilledResult<RealTimeStockData> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
  }
}

// WebSocket integration for real-time updates (optional)
export class StockWebSocket {
  private ws: WebSocket | null = null
  private subscribers: Map<string, (data: RealTimeStockData) => void> = new Map()

  connect(symbols: string[]) {
    // This would connect to a real-time data provider
    // For demo purposes, we'll simulate with intervals
    setInterval(() => {
      symbols.forEach(symbol => {
        const mockData: RealTimeStockData = {
          symbol,
          price: Math.random() * 1000 + 100,
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 5,
          volume: Math.floor(Math.random() * 1000000),
          timestamp: new Date()
        }
        
        const callback = this.subscribers.get(symbol)
        if (callback) {
          callback(mockData)
        }
      })
    }, 5000) // Update every 5 seconds
  }

  subscribe(symbol: string, callback: (data: RealTimeStockData) => void) {
    this.subscribers.set(symbol, callback)
  }

  unsubscribe(symbol: string) {
    this.subscribers.delete(symbol)
  }

  disconnect() {
    this.ws?.close()
    this.subscribers.clear()
  }
}
