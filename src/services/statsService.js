import { transactionService } from './transactionService'
import {
  calculateBalance,
  calculateIncome,
  calculateExpenses,
  calculateSavingsRate,
  getExpenseByCategory,
  getMonthlyTrends,
  getIncomeVsExpense,
  getSavingsEvolution,
} from '../utils/calculateStats'

export const statsService = {
  getOverview() {
    const transactions = transactionService.getAll()
    const income = calculateIncome(transactions)
    const expenses = calculateExpenses(transactions)
    const balance = calculateBalance(transactions)
    const savingsRate = calculateSavingsRate(transactions)

    return { balance, income, expenses, savingsRate, transactionCount: transactions.length }
  },

  getRecentTransactions(limit = 5) {
    return transactionService.getAll().slice(0, limit)
  },

  getExpenseDistribution() {
    return getExpenseByCategory(transactionService.getAll())
  },

  getIncomeVsExpense() {
    return getIncomeVsExpense(transactionService.getAll())
  },

  getMonthlyTrends() {
    return getMonthlyTrends(transactionService.getAll())
  },

  getSavingsEvolution() {
    return getSavingsEvolution(transactionService.getAll())
  },
}
