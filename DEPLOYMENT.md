# Deployment Guide: Virtual Stock Market Simulator

## 🚀 Deploy to Vercel + Render PostgreSQL

### Step 1: Set up Render PostgreSQL Database

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Create a new PostgreSQL database:**
   - Click "New +" → "PostgreSQL"
   - Name: `virtual-stock-market-db`
   - Plan: Free (or paid for production)
   - Region: Choose closest to your users
   - Click "Create Database"

3. **Get your database connection string:**
   - Once created, go to your database dashboard
   - Copy the "External Database URL"
   - It will look like: `postgresql://username:password@hostname:port/database`

### Step 2: Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Virtual Stock Market Simulator"
   git branch -M main
   git remote add origin https://github.com/yourusername/virtual-stock-market.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)

### Step 3: Configure Environment Variables in Vercel

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
DATABASE_URL = postgresql://username:password@hostname:port/database
NEXTAUTH_URL = https://your-app-name.vercel.app
NEXTAUTH_SECRET = your-super-secret-key-here
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Deploy and Initialize Database

1. **Deploy to Vercel:**
   - Vercel will automatically build and deploy
   - Wait for deployment to complete

2. **Run database migrations:**
   - Go to your Vercel project dashboard
   - Go to Functions → Create a new function
   - Or use Vercel CLI:
   ```bash
   npx vercel env pull .env.local
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. **Initialize sample data:**
   - Visit: `https://your-app-name.vercel.app/api/init-db`
   - Or run the init script locally with production DATABASE_URL

### Step 5: Verify Deployment

1. **Test the application:**
   - Visit your Vercel URL
   - Register a new account
   - Check if database operations work

2. **Monitor logs:**
   - Check Vercel function logs for any errors
   - Monitor Render database usage

## 🔧 Production Optimizations

### Database Connection Pooling
```javascript
// In your Prisma client configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

### Environment Variables for Production
```env
# Production
DATABASE_URL="postgresql://username:password@hostname:port/database"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
NODE_ENV="production"
```

## 📊 Monitoring & Analytics

1. **Vercel Analytics:** Enable in project settings
2. **Database Monitoring:** Use Render dashboard
3. **Error Tracking:** Consider adding Sentry
4. **Performance:** Monitor Core Web Vitals

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Errors:**
   - Check DATABASE_URL format
   - Ensure Render database is running
   - Verify network access

2. **Build Failures:**
   - Check Prisma client generation
   - Verify all dependencies are installed
   - Check TypeScript errors

3. **Authentication Issues:**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure HTTPS in production

### Useful Commands:

```bash
# Check deployment status
npx vercel ls

# View logs
npx vercel logs

# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## 🎯 Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Sample data initialized
- [ ] User registration working
- [ ] Trading functionality tested
- [ ] Analytics dashboard accessible
- [ ] All API endpoints responding
- [ ] SSL certificate active
- [ ] Performance optimized

## 📈 Scaling Considerations

- **Database:** Upgrade Render plan for higher limits
- **CDN:** Vercel automatically handles this
- **Caching:** Consider Redis for session storage
- **Monitoring:** Set up alerts for errors and performance

---

**Your Virtual Stock Market Simulator is now live! 🚀📈**
