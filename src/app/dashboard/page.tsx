'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, Wallet, BarChart3, Users, Bell, Settings, LogOut } from 'lucide-react'
import StockList from '@/components/StockList'
import Portfolio from '@/components/Portfolio'
import TradingPanel from '@/components/TradingPanel'
import WalletComponent from '@/components/Wallet'

interface StockData {
  id: string
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
}

interface PortfolioData {
  id: string
  stockId: string
  quantity: number
  avgPrice: number
  currentValue: number
  totalInvested: number
  profitLoss: number
  stock: {
    symbol: string
    name: string
    stockPrices: Array<{
      close: number
    }>
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stocks, setStocks] = useState<StockData[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioData[]>([])
  const [walletBalance, setWalletBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      const [stocksRes, portfolioRes, walletRes] = await Promise.all([
        fetch('/api/stocks'),
        fetch('/api/portfolio'),
        fetch('/api/wallet'),
      ])

      const stocksData = await stocksRes.json()
      const portfolioData = await portfolioRes.json()
      const walletData = await walletRes.json()

      setStocks(stocksData)
      setPortfolio(portfolioData)
      setWalletBalance(walletData.balance)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTrade = async (stockId: string, type: 'BUY' | 'SELL', quantity: number, price: number) => {
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockId,
          type,
          quantity,
          price,
        }),
      })

      if (response.ok) {
        // Refresh data after successful trade
        fetchData()
      } else {
        const error = await response.json()
        alert(error.error || 'Trade failed')
      }
    } catch (error) {
      console.error('Trade error:', error)
      alert('Trade failed')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading your trading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)
  const totalProfitLoss = portfolio.reduce((sum, item) => sum + item.profitLoss, 0)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TradeVault</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'portfolio' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-300">Welcome back</div>
                  <div className="text-white font-medium">{session.user?.name}</div>
                </div>
                <button
                  onClick={() => router.push('/api/auth/signout')}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Status Bar */}
        <div className="glass rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 status-online"></div>
                <span className="text-sm font-medium">Market Open</span>
              </div>
              <div className="text-sm text-gray-300">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-gray-300">NSE</div>
              <div className="text-green-400 font-medium">+1.2%</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Market Data */}
          <div className="lg:col-span-3 space-y-8">
            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Wallet Balance</div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(walletBalance)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Available for trading
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Portfolio Value</div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(totalPortfolioValue)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Current holdings
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      totalProfitLoss >= 0 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}>
                      {totalProfitLoss >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-white" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total P&L</div>
                      <div className={`text-2xl font-bold ${
                        totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formatCurrency(totalProfitLoss)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {totalProfitLoss >= 0 ? 'Profit' : 'Loss'}
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <div className="glass rounded-xl">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Live Market</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full status-online"></div>
                    <span className="text-sm text-gray-400">Live</span>
                  </div>
                </div>
              </div>
              <StockList stocks={stocks} onTrade={handleTrade} />
            </div>

            {/* Portfolio */}
            <Portfolio portfolio={portfolio} />
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            <TradingPanel onTrade={handleTrade} stocks={stocks} />
            <WalletComponent balance={walletBalance} />
            
            {/* Quick Actions */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/analytics')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-white">View Analytics</span>
                </button>
                <button
                  onClick={() => router.push('/analytics')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Leaderboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}