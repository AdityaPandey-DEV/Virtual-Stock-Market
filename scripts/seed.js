const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
  try {
    console.log('🌱 Seeding database...')
    
    // Sample stocks data
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
        // Check if stock already exists
        const existingStock = await prisma.stock.findUnique({
          where: { symbol: stock.symbol }
        })

        if (!existingStock) {
          const createdStock = await prisma.stock.create({
            data: {
              symbol: stock.symbol,
              name: stock.name,
              sector: stock.sector,
            },
          })
          
          // Add initial price data
          await prisma.stockPrice.create({
            data: {
              stockId: createdStock.id,
              dateTime: new Date(),
              open: basePrice,
              high: basePrice * 1.02,
              low: basePrice * 0.98,
              close: basePrice,
              volume: BigInt(Math.floor(Math.random() * 1000000) + 100000),
            },
          })
          
          console.log(`✅ Created stock: ${stock.symbol}`)
        } else {
          console.log(`⏭️  Stock already exists: ${stock.symbol}`)
        }
      } catch (error) {
        console.error(`❌ Error with stock ${stock.symbol}:`, error.message)
      }
    }

    console.log('🎉 Database seeding complete!')
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ Seeding completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

module.exports = { seed }
