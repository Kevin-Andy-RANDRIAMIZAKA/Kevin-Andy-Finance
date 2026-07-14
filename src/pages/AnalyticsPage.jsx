import { useTranslation } from 'react-i18next'
import { BarChart3 } from 'lucide-react'
import TopBar from '../components/layout/TopBar'
import EmptyState from '../components/ui/EmptyState'
import ExpenseDistributionChart from '../components/analytics/ExpenseDistributionChart'
import IncomeVsExpenseChart from '../components/analytics/IncomeVsExpenseChart'
import MonthlyTrendChart from '../components/analytics/MonthlyTrendChart'
import SavingsEvolutionChart from '../components/analytics/SavingsEvolutionChart'
import { useStats } from '../hooks/useStats'

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const { expenseDistribution, incomeVsExpense, monthlyTrends, savingsEvolution, overview } =
    useStats()

  const hasData = overview.transactionCount > 0

  return (
    <div>
      <TopBar title={t('analytics.title')} subtitle={t('analytics.subtitle')} />

      <div className="px-4 lg:px-8 py-6 lg:py-8">
        {!hasData ? (
          <EmptyState
            icon={BarChart3}
            title={t('analytics.noData')}
            description={t('analytics.noDataDescription')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {expenseDistribution.length > 0 && (
              <ExpenseDistributionChart data={expenseDistribution} />
            )}
            {incomeVsExpense.length > 0 && (
              <IncomeVsExpenseChart data={incomeVsExpense} />
            )}
            {monthlyTrends.length > 0 && (
              <MonthlyTrendChart data={monthlyTrends} />
            )}
            {savingsEvolution.length > 0 && (
              <SavingsEvolutionChart data={savingsEvolution} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
