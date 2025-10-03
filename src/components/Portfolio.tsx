'use client'

import { formatCurrency, formatNumber } from '@/lib/utils'
import { TrendingUp, TrendingDown, BarChart3, Eye } from 'lucide-react'

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

interface PortfolioProps {
  portfolio: PortfolioData[]
}

export default function Portfolio({ portfolio }: PortfolioProps) {
  if (portfolio.length === 0) {
    return (
      <div className="glass rounded-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Holdings Yet</h3>
          <p className="text-gray-400 mb-6">Start trading to build your portfolio and track your investments.</p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Start Trading
          </div>
        </div>
      </div>
    )
  }

  const totalValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)
  const totalInvested = portfolio.reduce((sum, item) => sum + item.totalInvested, 0)
  const totalProfitLoss = totalValue - totalInvested
  const totalProfitLossPercent = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0

  return (
    <div className="glass rounded-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Portfolio</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-gray-400">
              Total Value: <span className="text-white font-semibold">{formatCurrency(totalValue)}</span>
            </div>
            <div className={`flex items-center space-x-1 ${
              totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold">
                {totalProfitLoss >= 0 ? '+' : ''}{formatCurrency(totalProfitLoss)} ({totalProfitLossPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Avg Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {portfolio.map((item) => (
              <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {item.stock.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.stock.symbol}</div>
                      <div className="text-xs text-gray-400">{item.stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white font-medium">
                    {formatNumber(item.quantity)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white">
                    {formatCurrency(item.avgPrice)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-white">
                    {formatCurrency(item.currentValue)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center space-x-1 ${
                    item.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {item.profitLoss >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {formatCurrency(item.profitLoss)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Portfolio Summary */}
      <div className="p-6 border-t border-white/10 bg-slate-700/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(totalValue)}
            </div>
            <div className="text-sm text-gray-400">Total Portfolio Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(totalInvested)}
            </div>
            <div className="text-sm text-gray-400">Total Invested</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${
              totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalProfitLoss >= 0 ? '+' : ''}{formatCurrency(totalProfitLoss)}
            </div>
            <div className="text-sm text-gray-400">
              {totalProfitLoss >= 0 ? 'Total Profit' : 'Total Loss'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}