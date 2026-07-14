import { useMemo } from 'react'
import { statsService } from '../services/statsService'
import { useTransactions } from './useTransactions'

export function useStats() {
  const { version } = useTransactions()

  const overview = useMemo(() => statsService.getOverview(), [version])
  const recentTransactions = useMemo(() => statsService.getRecentTransactions(5), [version])
  const expenseDistribution = useMemo(() => statsService.getExpenseDistribution(), [version])
  const incomeVsExpense = useMemo(() => statsService.getIncomeVsExpense(), [version])
  const monthlyTrends = useMemo(() => statsService.getMonthlyTrends(), [version])
  const savingsEvolution = useMemo(() => statsService.getSavingsEvolution(), [version])

  return {
    overview,
    recentTransactions,
    expenseDistribution,
    incomeVsExpense,
    monthlyTrends,
    savingsEvolution,
  }
}
