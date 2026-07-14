import { useTranslation } from 'react-i18next'
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'
import { useCategories } from '../../hooks/useCategories'
import { formatDateShort } from '../../utils/formatDate'
import { useSettings } from '../../hooks/useSettings'

export default function TransactionItem({
  transaction,
  index = 0,
  iconMap,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { getCategoryById } = useCategories()
  const { settings } = useSettings()

  const category = getCategoryById(transaction.category)
  const Icon = iconMap[category?.icon] || iconMap.MoreHorizontal
  const isIncome = transaction.type === 'income'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:shadow-[var(--shadow-soft)] transition-all"
    >
      <div
        className={`p-2.5 rounded-xl shrink-0 ${
          isIncome ? 'bg-success/10' : 'bg-danger/10'
        }`}
      >
        <Icon size={18} className={isIncome ? 'text-success' : 'text-danger'} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
          {transaction.title}
        </p>
        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
          {category ? t(category.labelKey) : transaction.category} ·{' '}
          {formatDateShort(transaction.date, settings.language)}
        </p>
        {transaction.notes && (
          <p className="text-xs text-[var(--text-secondary)] mt-1 truncate">
            {transaction.notes}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          {isIncome ? (
            <ArrowUpRight size={14} className="text-success" />
          ) : (
            <ArrowDownRight size={14} className="text-danger" />
          )}
          <span
            className={`text-sm font-bold ${
              isIncome ? 'text-success' : 'text-danger'
            }`}
          >
            {isIncome ? '+' : '-'}
            {format(transaction.amount)}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            <Pencil size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-danger/10 hover:text-danger"
          >
            <Trash2 size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
