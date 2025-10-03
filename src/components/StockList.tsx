'use client'

import { useState } from 'react'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { TrendingUp, TrendingDown, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StockData {
  id: string
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
}

interface StockListProps {
  stocks: StockData[]
  onTrade: (stockId: string, type: 'BUY' | 'SELL', quantity: number, price: number) => void
}

export default function StockList({ stocks, onTrade }: StockListProps) {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  const [tradeQuantity, setTradeQuantity] = useState(1)
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY')

  const handleTrade = () => {
    if (selectedStock) {
      onTrade(selectedStock.id, tradeType, tradeQuantity, selectedStock.currentPrice)
      setSelectedStock(null)
      setTradeQuantity(1)
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {stocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {stock.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{stock.symbol}</div>
                      <div className="text-xs text-gray-400">{stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-lg font-semibold text-white">
                    {formatCurrency(stock.currentPrice)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {stock.changePercent > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.change > 0 ? '+' : ''}{formatCurrency(stock.change)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    {formatNumber(stock.volume)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedStock(stock)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Trade
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trade Modal */}
      {selectedStock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Trade {selectedStock.symbol}
              </h3>
              <button
                onClick={() => setSelectedStock(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Stock Info */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-white">{selectedStock.symbol}</div>
                    <div className="text-sm text-gray-400">{selectedStock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      {formatCurrency(selectedStock.currentPrice)}
                    </div>
                    <div className={`text-sm ${
                      selectedStock.changePercent > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedStock.changePercent > 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Trade Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTradeType('BUY')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tradeType === 'BUY'
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowUpRight className="w-5 h-5" />
                      <span className="font-medium">Buy</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setTradeType('SELL')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tradeType === 'SELL'
                        ? 'border-red-500 bg-red-500/10 text-red-400'
                        : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowDownRight className="w-5 h-5" />
                      <span className="font-medium">Sell</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Trade Summary */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price per share:</span>
                    <span className="text-white">{formatCurrency(selectedStock.currentPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white">{tradeQuantity}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-300">Total Cost:</span>
                      <span className="text-white">
                        {formatCurrency(selectedStock.currentPrice * tradeQuantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleTrade}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    tradeType === 'BUY'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {tradeType === 'BUY' ? 'Buy' : 'Sell'} {tradeQuantity} Shares
                </button>
                <button
                  onClick={() => setSelectedStock(null)}
                  className="px-6 py-3 border border-slate-600 text-gray-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}