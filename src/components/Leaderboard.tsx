'use client'

import { formatCurrency } from '@/lib/utils'

interface LeaderboardEntry {
  id: string
  name: string
  email: string
  walletBalance: number
  portfolio: Array<{
    currentValue: number
    totalInvested: number
    profitLoss: number
  }>
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  const calculateTotalValue = (entry: LeaderboardEntry) => {
    const portfolioValue = entry.portfolio.reduce((sum, item) => sum + item.currentValue, 0)
    return Number(entry.walletBalance) + portfolioValue
  }

  const sortedLeaderboard = [...leaderboard].sort((a, b) => 
    calculateTotalValue(b) - calculateTotalValue(a)
  )

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Leaderboard</h2>
        <p className="text-sm text-gray-600">Top traders by total portfolio value</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trader
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wallet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Portfolio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLeaderboard.map((entry, index) => {
              const portfolioValue = entry.portfolio.reduce((sum, item) => sum + item.currentValue, 0)
              const totalValue = Number(entry.walletBalance) + portfolioValue
              const profitLoss = totalValue - 100000 // Starting balance

              return (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      {index === 0 && <span className="text-yellow-500 mr-2">🥇</span>}
                      {index === 1 && <span className="text-gray-400 mr-2">🥈</span>}
                      {index === 2 && <span className="text-orange-500 mr-2">🥉</span>}
                      #{index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {entry.name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {entry.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(Number(entry.walletBalance))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(portfolioValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(totalValue)}
                      </div>
                      <div className={`text-xs ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLoss >= 0 ? '+' : ''}{formatCurrency(profitLoss)}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <p>No traders found. Start trading to appear on the leaderboard!</p>
        </div>
      )}
    </div>
  )
}
