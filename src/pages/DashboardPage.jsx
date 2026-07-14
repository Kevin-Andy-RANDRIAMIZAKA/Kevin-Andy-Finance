import { useTranslation } from 'react-i18next'
import TopBar from '../components/layout/TopBar'
import { BalanceCardWithLabel } from '../components/dashboard/BalanceCard'
import SummaryCards from '../components/dashboard/SummaryCards'
import SavingsRateWidget from '../components/dashboard/SavingsRateWidget'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import { useStats } from '../hooks/useStats'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { overview, recentTransactions } = useStats()

  return (
    <div>
      <TopBar title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />

      <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <BalanceCardWithLabel
            balance={overview.balance}
            label={t('dashboard.totalBalance')}
            delay={0}
          />
          <SavingsRateWidget rate={overview.savingsRate} label={t('dashboard.savingsRate')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <SummaryCards
            income={overview.income}
            expenses={overview.expenses}
            savingsRate={overview.savingsRate}
            labels={{
              income: t('dashboard.totalIncome'),
              expenses: t('dashboard.totalExpenses'),
              savingsRate: t('dashboard.savingsRate'),
            }}
          />
        </div>

        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  )
}
