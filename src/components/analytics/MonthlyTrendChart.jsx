import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'
import { formatMonthYear } from '../../utils/formatDate'
import { useSettings } from '../../hooks/useSettings'

export default function MonthlyTrendChart({ data }) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { settings } = useSettings()

  const chartData = data.map((item) => ({
    name: formatMonthYear(item.month + '-01', settings.language),
    income: item.income,
    expenses: item.expenses,
    net: item.income - item.expenses,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="chart-tooltip px-3 py-2 text-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-success">{t('transactions.income')}: {format(payload[0]?.payload?.income)}</p>
        <p className="text-danger">{t('transactions.expense')}: {format(payload[0]?.payload?.expenses)}</p>
        <p className="text-accent font-medium mt-1">Net: {format(payload[0]?.payload?.net)}</p>
      </div>
    )
  }

  return (
    <GlassCard delay={0.2}>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">
        {t('analytics.monthlyTrends')}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-72"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34c759" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34c759" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3b30" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff3b30" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#34c759"
              fill="url(#incomeGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff3b30"
              fill="url(#expenseGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </GlassCard>
  )
}
