import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
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

export default function SavingsEvolutionChart({ data }) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { settings } = useSettings()

  const chartData = data.map((item) => ({
    name: formatMonthYear(item.month + '-01', settings.language),
    savings: item.savings,
    rate: item.rate,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="chart-tooltip px-3 py-2 text-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-accent">{format(payload[0]?.value)}</p>
        <p className="text-[var(--text-secondary)]">
          {t('dashboard.savingsRate')}: {payload[0]?.payload?.rate}%
        </p>
      </div>
    )
  }

  return (
    <GlassCard delay={0.25}>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">
        {t('analytics.savingsEvolution')}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="h-72"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#0071e3"
              strokeWidth={2.5}
              dot={{ fill: '#0071e3', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </GlassCard>
  )
}
