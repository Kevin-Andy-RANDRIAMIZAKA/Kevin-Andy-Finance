import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'
import { useCategories } from '../../hooks/useCategories'

const COLORS = ['#0071e3', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5856d6']

export default function ExpenseDistributionChart({ data }) {
  const { t } = useTranslation()
  const { format } = useCurrencyFormat()
  const { getCategoryById } = useCategories()

  const chartData = data.map((item) => {
    const category = getCategoryById(item.category)
    return {
      name: category ? t(category.labelKey) : item.category,
      value: item.amount,
    }
  })

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="chart-tooltip px-3 py-2 text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-[var(--text-secondary)]">{format(payload[0].value)}</p>
      </div>
    )
  }

  return (
    <GlassCard delay={0.1}>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">
        {t('analytics.expenseDistribution')}
      </h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-[var(--text-secondary)]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </GlassCard>
  )
}
