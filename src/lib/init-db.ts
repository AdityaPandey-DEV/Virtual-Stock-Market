import { StockDataService } from './stockData'

export async function initializeDatabase() {
  try {
    console.log('Initializing database...')
    
    // Initialize sample stocks
    await StockDataService.initializeSampleStocks()
    console.log('Sample stocks initialized')
    
    // Update stock prices to have some initial data
    await StockDataService.updateStockPrices()
    console.log('Initial stock prices set')
    
    console.log('Database initialization complete!')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  }
}
