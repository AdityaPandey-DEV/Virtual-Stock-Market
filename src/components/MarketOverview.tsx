'use client'

import { useEffect, useState } from 'react'
import { formatCurrency, formatNumber, getColorForChange } from '@/lib/utils'

interface StockData {
  id: string
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
}

export default function MarketOverview() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    try {
      const response = await fetch('/api/stocks')
      const data = await response.json()
      setStocks(data)
    } catch (error) {
      console.error('Error fetching stocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const topGainers = stocks
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = stocks
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  const mostActive = stocks
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Gainers */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-600">Top Gainers</h3>
        </div>
        <div className="p-6">
          {topGainers.length > 0 ? (
            <div className="space-y-3">
              {topGainers.map((stock) => (
                <div key={stock.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(stock.currentPrice)}</div>
                    <div className={`text-sm ${getColorForChange(stock.changePercent)}`}>
                      +{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No gainers found</p>
          )}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-red-600">Top Losers</h3>
        </div>
        <div className="p-6">
          {topLosers.length > 0 ? (
            <div className="space-y-3">
              {topLosers.map((stock) => (
                <div key={stock.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(stock.currentPrice)}</div>
                    <div className={`text-sm ${getColorForChange(stock.changePercent)}`}>
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No losers found</p>
          )}
        </div>
      </div>

      {/* Most Active */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-600">Most Active</h3>
        </div>
        <div className="p-6">
          {mostActive.length > 0 ? (
            <div className="space-y-3">
              {mostActive.map((stock) => (
                <div key={stock.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(stock.currentPrice)}</div>
                    <div className="text-sm text-gray-500">
                      Vol: {formatNumber(stock.volume)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No active stocks found</p>
          )}
        </div>
      </div>
    </div>
  )
}
