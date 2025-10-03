# Virtual Stock Market Simulator

A comprehensive full-stack Next.js application that simulates stock trading with virtual currency. Users can buy/sell stocks, track their portfolio, and compete on leaderboards.

## Features

### Core Features
- **User Management**: Registration, login, and authentication with NextAuth
- **Virtual Wallet**: Starting balance of ₹1,00,000 for each user
- **Stock Market Data**: Real-time or simulated stock price feeds
- **Trading System**: Buy/sell stocks with order management
- **Portfolio Management**: Track holdings, profit/loss, and portfolio value
- **Analytics Dashboard**: Leaderboard and market overview

### Advanced Features
- **Concurrency Control**: Row-level locking to prevent double spending
- **Real-time Updates**: Stock prices update automatically
- **Transaction History**: Complete audit trail of all trades
- **Portfolio Analytics**: Dynamic profit/loss calculations
- **Market Screener**: Top gainers, losers, and most active stocks

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Lucide React
- **Charts**: Recharts

## Database Schema

### Tables
- `users` - User accounts with wallet balance
- `stocks` - Stock information (symbol, name, sector)
- `stock_prices` - Historical price data (OHLCV)
- `orders` - Trading orders (buy/sell)
- `portfolio` - User holdings and P&L
- `transactions` - Executed trades audit trail

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   cd virtual-stock-market
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/virtual_stock_market?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Initialize with sample data
   npm run dev
   # Then visit: http://localhost:3000/api/init-db
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Register a new account or sign in
   - Start trading!

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Stocks
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/[symbol]` - Get specific stock
- `POST /api/stocks/update-prices` - Update stock prices

### Trading
- `POST /api/trade` - Execute trade
- `GET /api/orders` - Get user orders
- `GET /api/transactions` - Get transaction history

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `GET /api/wallet` - Get wallet balance

### Analytics
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/init-db` - Initialize database

## Key Features Explained

### Concurrency Control
The trading system uses database transactions with row-level locking to ensure:
- No double spending
- Consistent portfolio updates
- Atomic trade execution

### Stock Price Simulation
- Random price movements based on volatility
- Realistic market behavior
- Historical price tracking

### Portfolio Management
- Automatic P&L calculations
- Average cost tracking
- Real-time portfolio valuation

### Security
- Password hashing with bcrypt
- Session-based authentication
- Input validation and sanitization

## Development

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy
```

### Adding New Features
1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev`
3. Update API routes
4. Add UI components
5. Test thoroughly

## Production Deployment

1. **Environment Setup**
   - Set production database URL
   - Configure NextAuth secrets
   - Set up proper CORS

2. **Database**
   - Use managed PostgreSQL (AWS RDS, Supabase, etc.)
   - Run migrations: `npx prisma migrate deploy`

3. **Deployment**
   - Deploy to Vercel, Netlify, or your preferred platform
   - Configure environment variables
   - Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed description

---

**Happy Trading! 📈**