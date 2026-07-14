import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import Dropdown from '../ui/Dropdown'
import { useCategories } from '../../hooks/useCategories'

export default function TransactionFilters({ filters, onChange }) {
  const { t } = useTranslation()
  const { categories } = useCategories()

  const typeOptions = [
    { value: 'all', label: t('transactions.all') },
    { value: 'income', label: t('transactions.income') },
    { value: 'expense', label: t('transactions.expense') },
  ]

  const categoryOptions = [
    { value: 'all', label: t('transactions.all') },
    ...categories.map((cat) => ({
      value: cat.id,
      label: t(cat.labelKey),
    })),
  ]

  const updateFilter = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
      <div className="relative flex-1 max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder={t('transactions.search')}
          className="
            w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-button)]
            bg-[var(--bg-tertiary)] border border-[var(--border-color)]
            text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
            focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
            transition-all
          "
        />
      </div>
      <Dropdown
        options={typeOptions}
        value={filters.type}
        onChange={(val) => updateFilter('type', val)}
        className="w-36"
      />
      <Dropdown
        options={categoryOptions}
        value={filters.category}
        onChange={(val) => updateFilter('category', val)}
        className="w-40"
      />
    </div>
  )
}
