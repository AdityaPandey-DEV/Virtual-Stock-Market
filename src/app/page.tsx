import Link from 'next/link'
import { TrendingUp, Shield, BarChart3, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-800/40 to-slate-900/60"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Subtle chart-like lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">TradeVault</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/auth/signin"
                className="text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary text-white px-6 py-2 rounded-lg font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <Zap className="w-4 h-4 mr-2" />
            Live Market Data • Real-time Trading
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text animate-gradient">Virtual Stock</span>
            <br />
            <span className="text-white">Market Simulator</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Master the art of trading with our advanced virtual platform. 
            Practice with real market data, compete with traders worldwide, 
            and build your investment strategy risk-free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link
              href="/auth/signup"
              className="group btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <TrendingUp className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Trading Now
            </Link>
            <Link
              href="/auth/signin"
              className="group px-8 py-4 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all duration-300 text-lg font-semibold hover:scale-105 hover:shadow-xl hover:shadow-white/10"
            >
              <span className="group-hover:translate-x-1 transition-transform">Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white/5">
            <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">₹1,00,000</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Starting Balance</div>
          </div>
          <div className="text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white/5">
            <div className="text-4xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors">10+</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Live Stocks</div>
          </div>
          <div className="text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white/5">
            <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">24/7</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Market Access</div>
          </div>
          <div className="text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white/5">
            <div className="text-4xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors">0%</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Risk</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose TradeVault?</h2>
          <p className="text-gray-400 text-lg">Everything you need to become a successful trader</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group trading-card glass rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">Real-time Trading</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
              Experience live market conditions with real-time price updates, 
              order execution, and portfolio tracking.
            </p>
            <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 status-online animate-pulse"></div>
              Live Market Data
            </div>
          </div>

          <div className="group trading-card glass rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-green-300 transition-colors">Risk-Free Learning</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
              Practice with virtual currency and learn trading strategies 
              without any financial risk to your real money.
            </p>
            <div className="flex items-center text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              100% Safe Trading
            </div>
          </div>

          <div className="group trading-card glass rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">Global Competition</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
              Compete with traders worldwide on our leaderboard and 
              learn from the best trading strategies.
            </p>
            <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              Global Leaderboard
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Live Market Overview</h2>
            <div className="flex items-center text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 status-online"></div>
              Market Open
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,450', change: '+2.5%', positive: true },
              { symbol: 'TCS', name: 'Tata Consultancy', price: '₹3,520', change: '+1.8%', positive: true },
              { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,480', change: '-0.5%', positive: false },
              { symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,750', change: '+3.2%', positive: true },
            ].map((stock, index) => (
              <div key={index} className="trading-card bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">{stock.symbol}</div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                  </div>
                  <div className={`text-sm font-medium ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stock.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Trading?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are already mastering the markets with TradeVault. 
            Start your journey to financial success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Create Free Account
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors text-lg font-semibold"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TradeVault</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate virtual stock market simulator for learning and practicing trading strategies.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Trading</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Live Markets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">History</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Strategies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TradeVault. All rights reserved. Virtual trading platform for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}