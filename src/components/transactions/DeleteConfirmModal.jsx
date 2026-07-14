import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useTransactions } from '../../hooks/useTransactions'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'

export default function DeleteConfirmModal({ isOpen, onClose, transaction }) {
  const { t } = useTranslation()
  const { removeTransaction } = useTransactions()
  const { format } = useCurrencyFormat()

  if (!transaction) return null

  const handleDelete = () => {
    removeTransaction(transaction.id)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('transactions.delete')} size="sm">
      <div className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-danger/10 w-fit">
          <AlertTriangle size={24} className="text-danger" />
        </div>
        <p className="text-sm text-[var(--text-primary)] mb-1">
          {t('transactions.deleteConfirm')}
        </p>
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
          {transaction.title} — {format(transaction.amount)}
        </p>
        <p className="text-xs text-[var(--text-secondary)] mb-6">
          {t('transactions.deleteWarning')}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" onClick={onClose}>
            {t('transactions.actions.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('transactions.actions.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
