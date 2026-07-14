import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'

const cardConfig = [
  { key: 'income', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
  { key: 'expenses', icon: TrendingDown, color: 'text-danger', bg: 'bg-danger/10' },
  { key: 'savingsRate', icon: PiggyBank, color: 'text-accent', bg: 'bg-accent/10', isPercent: true },
]

export default function SummaryCards({ income, expenses, savingsRate, labels }) {
  const { format } = useCurrencyFormat()

  const values = { income, expenses, savingsRate }

  return (
    <>
      {cardConfig.map((card, index) => {
        const Icon = card.icon
        const value = values[card.key]

        return (
          <GlassCard key={card.key} delay={0.1 + index * 0.05} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                  {labels[card.key]}
                </p>
                <p className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {card.isPercent ? `${value}%` : format(value)}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <Icon size={18} className={card.color} />
              </div>
            </div>
          </GlassCard>
        )
      })}
    </>
  )
}
