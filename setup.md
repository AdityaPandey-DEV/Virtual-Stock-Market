# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Set up Environment Variables
Create `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/virtual_stock_market?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## 3. Set up Database
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

## 4. Start Development Server
```bash
npm run dev
```

## 5. Initialize Sample Data
After the server is running, visit:
```
http://localhost:3000/api/init-db
```

Or use the curl command:
```bash
curl -X POST http://localhost:3000/api/init-db
```

## 6. Access the Application
- Open [http://localhost:3000](http://localhost:3000)
- Register a new account
- Start trading!

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env.local`
- Ensure the database exists

### Migration Issues
- Reset database: `npm run db:reset`
- Check Prisma Studio: `npm run db:studio`

### Authentication Issues
- Make sure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your local setup

## Production Deployment

1. Set up production database
2. Update environment variables
3. Run `npm run db:deploy`
4. Deploy to your preferred platform

## Features to Test

1. **User Registration/Login**
   - Create account at `/auth/signup`
   - Sign in at `/auth/signin`

2. **Trading**
   - View stocks on dashboard
   - Execute buy/sell trades
   - Check portfolio

3. **Analytics**
   - Visit `/analytics` for leaderboard
   - View market overview

4. **Real-time Updates**
   - Stock prices update automatically
   - Portfolio values change in real-time

## API Testing

Test the API endpoints:
```bash
# Get all stocks
curl http://localhost:3000/api/stocks

# Get leaderboard
curl http://localhost:3000/api/leaderboard

# Update stock prices
curl -X POST http://localhost:3000/api/stocks/update-prices
```

Happy Trading! 📈
