import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'
import { formatMonthYear } from '../../utils/formatDate'
import { useSettings } from '../../hooks/useSettings'

export default function IncomeVsExpenseChart({ data }) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { settings } = useSettings()

  const chartData = data.map((item) => ({
    name: formatMonthYear(item.month + '-01', settings.language),
    income: item.income,
    expenses: item.expenses,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="chart-tooltip px-3 py-2 text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            {entry.dataKey === 'income' ? t('transactions.income') : t('transactions.expense')}:{' '}
            {format(entry.value)}
          </p>
        ))}
      </div>
    )
  }

  return (
    <GlassCard delay={0.15}>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">
        {t('analytics.incomeVsExpense')}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="h-72"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => format(v)}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-[var(--text-secondary)]">
                  {value === 'income' ? t('transactions.income') : t('transactions.expense')}
                </span>
              )}
            />
            <Bar dataKey="income" fill="#34c759" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill="#ff3b30" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </GlassCard>
  )
}
