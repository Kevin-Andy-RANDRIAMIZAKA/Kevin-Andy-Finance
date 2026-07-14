import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Dropdown from '../ui/Dropdown'
import { useTransactions } from '../../hooks/useTransactions'
import { useCategories } from '../../hooks/useCategories'
import { validateTransaction } from '../../utils/validators'
import { toInputDate } from '../../utils/formatDate'

const emptyForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: '',
  date: toInputDate(),
  notes: '',
}

export default function TransactionForm({ isOpen, onClose, transaction }) {
  const { t } = useTranslation()
  const { addTransaction, editTransaction } = useTransactions()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const { categories: expenseCategories } = useCategories('expense')
  const { categories: incomeCategories } = useCategories('income')

  const isEditing = !!transaction

  useEffect(() => {
    if (transaction) {
      setForm({
        title: transaction.title,
        amount: String(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        notes: transaction.notes || '',
      })
    } else {
      setForm({ ...emptyForm, date: toInputDate() })
    }
    setErrors({})
  }, [transaction, isOpen])

  const activeCategories = form.type === 'income' ? incomeCategories : expenseCategories

  const categoryOptions = activeCategories.map((cat) => ({
    value: cat.id,
    label: t(cat.labelKey),
  }))

  const typeOptions = [
    { value: 'expense', label: t('transactions.expense') },
    { value: 'income', label: t('transactions.income') },
  ]

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'type') {
        updated.category = ''
      }
      return updated
    })
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { isValid, errors: validationErrors } = validateTransaction(form)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    if (isEditing) {
      editTransaction(transaction.id, form)
    } else {
      addTransaction(form)
    }
    onClose()
  }

  const inputClass = `
    w-full px-4 py-2.5 rounded-[var(--radius-button)]
    bg-[var(--bg-tertiary)] border text-sm text-[var(--text-primary)]
    placeholder:text-[var(--text-tertiary)]
    focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
    transition-all
  `

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? t('transactions.edit') : t('transactions.add')}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            {t('transactions.fields.type')}
          </label>
          <Dropdown
            options={typeOptions}
            value={form.type}
            onChange={(val) => handleChange('type', val)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            {t('transactions.fields.title')}
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder={t('transactions.placeholders.title')}
            className={`${inputClass} ${errors.title ? 'border-danger' : 'border-[var(--border-color)]'}`}
          />
          {errors.title && (
            <p className="text-xs text-danger mt-1">{t(errors.title)}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              {t('transactions.fields.amount')}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder={t('transactions.placeholders.amount')}
              className={`${inputClass} ${errors.amount ? 'border-danger' : 'border-[var(--border-color)]'}`}
            />
            {errors.amount && (
              <p className="text-xs text-danger mt-1">{t(errors.amount)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              {t('transactions.fields.date')}
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`${inputClass} ${errors.date ? 'border-danger' : 'border-[var(--border-color)]'}`}
            />
            {errors.date && (
              <p className="text-xs text-danger mt-1">{t(errors.date)}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            {t('transactions.fields.category')}
          </label>
          <Dropdown
            options={categoryOptions}
            value={form.category}
            onChange={(val) => handleChange('category', val)}
            placeholder={t('transactions.fields.category')}
          />
          {errors.category && (
            <p className="text-xs text-danger mt-1">{t(errors.category)}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            {t('transactions.fields.notes')}
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder={t('transactions.placeholders.notes')}
            rows={3}
            className={`${inputClass} border-[var(--border-color)] resize-none`}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            {t('transactions.actions.cancel')}
          </Button>
          <Button type="submit">
            {t('transactions.actions.save')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
