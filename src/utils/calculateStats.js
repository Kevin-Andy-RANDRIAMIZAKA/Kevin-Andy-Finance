export function calculateIncome(transactions) {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function calculateExpenses(transactions) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function calculateBalance(transactions) {
  return calculateIncome(transactions) - calculateExpenses(transactions)
}

export function calculateSavingsRate(transactions) {
  const income = calculateIncome(transactions)
  if (income === 0) return 0
  const expenses = calculateExpenses(transactions)
  return Math.round(((income - expenses) / income) * 100)
}

export function getExpenseByCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const grouped = {}

  expenses.forEach((t) => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount
  })

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function getMonthlyTrends(transactions) {
  const grouped = {}

  transactions.forEach((t) => {
    const month = t.date.substring(0, 7)
    if (!grouped[month]) {
      grouped[month] = { month, income: 0, expenses: 0 }
    }
    if (t.type === 'income') {
      grouped[month].income += t.amount
    } else {
      grouped[month].expenses += t.amount
    }
  })

  return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month))
}

export function getIncomeVsExpense(transactions) {
  const trends = getMonthlyTrends(transactions)
  return trends.map((t) => ({
    month: t.month,
    income: t.income,
    expenses: t.expenses,
    net: t.income - t.expenses,
  }))
}

export function getSavingsEvolution(transactions) {
  const trends = getMonthlyTrends(transactions)
  let cumulative = 0

  return trends.map((t) => {
    cumulative += t.income - t.expenses
    const rate = t.income > 0 ? Math.round(((t.income - t.expenses) / t.income) * 100) : 0
    return {
      month: t.month,
      savings: cumulative,
      rate,
    }
  })
}
