import { useTranslation } from 'react-i18next'
import TopBar from '../components/layout/TopBar'
import TransactionList from '../components/transactions/TransactionList'

export default function TransactionsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <TopBar title={t('transactions.title')} subtitle={t('transactions.subtitle')} />
      <div className="px-4 lg:px-8 py-6 lg:py-8">
        <TransactionList />
      </div>
    </div>
  )
}
