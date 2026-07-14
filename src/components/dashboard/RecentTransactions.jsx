import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'
import { useCategories } from '../../hooks/useCategories'
import { formatDateShort } from '../../utils/formatDate'
import { useSettings } from '../../hooks/useSettings'
import {
  Utensils,
  Car,
  ShoppingBag,
  Banknote,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react'

const iconMap = {
  Utensils,
  Car,
  ShoppingBag,
  Banknote,
  Briefcase,
  MoreHorizontal,
}

export default function RecentTransactions({ transactions }) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { getCategoryById } = useCategories()
  const { settings } = useSettings()

  return (
    <GlassCard delay={0.25}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          {t('dashboard.recentTransactions')}
        </h3>
        <Link
          to="/transactions"
          className="text-sm font-medium text-accent hover:underline"
        >
          {t('dashboard.viewAll')}
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)] py-8 text-center">
          {t('dashboard.noTransactions')}
        </p>
      ) : (
        <div className="space-y-1">
          {transactions.map((transaction, index) => {
            const category = getCategoryById(transaction.category)
            const Icon = iconMap[category?.icon] || MoreHorizontal
            const isIncome = transaction.type === 'income'

            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div
                  className={`p-2 rounded-xl ${
                    isIncome ? 'bg-success/10' : 'bg-danger/10'
                  }`}
                >
                  <Icon
                    size={16}
                    className={isIncome ? 'text-success' : 'text-danger'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {category ? t(category.labelKey) : transaction.category} ·{' '}
                    {formatDateShort(transaction.date, settings.language)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {isIncome ? (
                    <ArrowUpRight size={14} className="text-success" />
                  ) : (
                    <ArrowDownRight size={14} className="text-danger" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      isIncome ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {format(transaction.amount)}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </GlassCard>
  )
}
