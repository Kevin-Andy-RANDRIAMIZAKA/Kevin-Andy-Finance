import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, MoreHorizontal, Utensils, Car, ShoppingBag, Banknote, Briefcase } from 'lucide-react'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import TransactionItem from './TransactionItem'
import TransactionForm from './TransactionForm'
import TransactionFilters from './TransactionFilters'
import DeleteConfirmModal from './DeleteConfirmModal'
import { useTransactions } from '../../hooks/useTransactions'

const iconMap = {
  Utensils,
  Car,
  ShoppingBag,
  Banknote,
  Briefcase,
  MoreHorizontal,
}

export { iconMap }

export default function TransactionList() {
  const { t } = useTranslation()
  const { searchTransactions } = useTransactions()
  const [filters, setFilters] = useState({ type: 'all', category: 'all', search: '' })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [deletingTransaction, setDeletingTransaction] = useState(null)

  const transactions = searchTransactions(filters)

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <TransactionFilters filters={filters} onChange={setFilters} />
        <Button icon={Plus} onClick={() => setIsFormOpen(true)}>
          {t('transactions.add')}
        </Button>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={MoreHorizontal}
          title={t('transactions.empty')}
          description={t('transactions.emptyDescription')}
          action={
            <Button icon={Plus} onClick={() => setIsFormOpen(true)}>
              {t('transactions.add')}
            </Button>
          }
        />
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              index={index}
              iconMap={iconMap}
              onEdit={() => handleEdit(transaction)}
              onDelete={() => setDeletingTransaction(transaction)}
            />
          ))}
        </div>
      )}

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        transaction={editingTransaction}
      />

      <DeleteConfirmModal
        isOpen={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        transaction={deletingTransaction}
      />
    </div>
  )
}
