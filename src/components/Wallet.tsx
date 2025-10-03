'use client'

import { formatCurrency } from '@/lib/utils'
import { Wallet as WalletIcon, TrendingUp, TrendingDown, CreditCard, History } from 'lucide-react'

interface WalletProps {
  balance: number
}

export default function Wallet({ balance }: WalletProps) {
  const startingBalance = 100000
  const netChange = balance - startingBalance
  const isProfit = netChange >= 0

  return (
    <div className="glass rounded-xl">
      <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <WalletIcon className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Wallet</h2>
          </div>
        <p className="text-sm text-gray-400">Your virtual trading balance</p>
      </div>

      <div className="p-6">
        {/* Main Balance */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">
            {formatCurrency(balance)}
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Available Balance</span>
          </div>
        </div>

        {/* Balance Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Starting Balance</span>
            </div>
            <span className="text-sm font-medium text-white">
              {formatCurrency(startingBalance)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2">
              <WalletIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Current Balance</span>
            </div>
            <span className="text-sm font-medium text-white">
              {formatCurrency(balance)}
            </span>
          </div>

          <div className="border-t border-slate-600 pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {isProfit ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-gray-400">Net Change</span>
              </div>
              <div className={`text-sm font-semibold ${
                isProfit ? 'text-green-400' : 'text-red-400'
              }`}>
                {isProfit ? '+' : ''}{formatCurrency(netChange)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors">
            <History className="w-4 h-4" />
            <span className="text-sm font-medium">Transaction History</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition-colors">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-medium">Add Funds</span>
          </button>
        </div>

        {/* Performance Indicator */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Performance</span>
            <span className={`text-sm font-medium ${
              isProfit ? 'text-green-400' : 'text-red-400'
            }`}>
              {isProfit ? '+' : ''}{((netChange / startingBalance) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isProfit ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{ 
                width: `${Math.min(Math.abs((netChange / startingBalance) * 100), 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}