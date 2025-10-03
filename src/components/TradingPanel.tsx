'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react'

interface StockData {
  id: string
  symbol: string
  name: string
  currentPrice: number
}

interface TradingPanelProps {
  onTrade: (stockId: string, type: 'BUY' | 'SELL', quantity: number, price: number) => void
  stocks: StockData[]
}

export default function TradingPanel({ onTrade, stocks }: TradingPanelProps) {
  const [selectedStock, setSelectedStock] = useState('')
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY')
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedStockData = stocks.find(stock => stock.id === selectedStock)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStock || !selectedStockData) return

    setIsSubmitting(true)
    try {
      await onTrade(selectedStock, tradeType, quantity, selectedStockData.currentPrice)
      // Reset form
      setSelectedStock('')
      setQuantity(1)
    } catch (error) {
      console.error('Trade error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass rounded-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Quick Trade</h2>
        </div>
        <p className="text-sm text-gray-400">Execute trades instantly with live market prices</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Stock Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Stock
          </label>
          <div className="relative">
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              required
            >
              <option value="">Choose a stock...</option>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.symbol} - {stock.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
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
              type="button"
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
              type="button"
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
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Stock Info */}
        {selectedStockData && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-white">{selectedStockData.symbol}</div>
                  <div className="text-sm text-gray-400">{selectedStockData.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(selectedStockData.currentPrice)}
                  </div>
                  <div className="text-sm text-gray-400">Current Price</div>
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Cost:</span>
                  <span className="text-lg font-semibold text-white">
                    {formatCurrency(selectedStockData.currentPrice * quantity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedStock || isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            tradeType === 'BUY'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Executing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              {tradeType === 'BUY' ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span>{tradeType} {quantity} Shares</span>
            </div>
          )}
        </button>
      </form>

      {/* Quick Tips */}
      <div className="p-6 border-t border-white/10 bg-slate-700/20">
        <h3 className="text-sm font-semibold text-white mb-3">Trading Tips</h3>
        <ul className="space-y-2 text-xs text-gray-400">
          <li>• Start with small quantities to learn</li>
          <li>• Monitor market trends before trading</li>
          <li>• Set realistic profit targets</li>
          <li>• Keep track of your portfolio performance</li>
        </ul>
      </div>
    </div>
  )
}