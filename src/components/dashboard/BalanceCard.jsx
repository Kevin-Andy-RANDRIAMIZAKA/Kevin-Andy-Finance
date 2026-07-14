import { Wallet } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat'

export function BalanceCardWithLabel({ balance, label, delay = 0 }) {
  const { format } = useCurrencyFormat()

  return (
    <GlassCard delay={delay} className="relative overflow-hidden col-span-full lg:col-span-2">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-accent/10">
            <Wallet size={18} className="text-accent" />
          </div>
          <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
        </div>
        <p className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          {format(balance)}
        </p>
      </div>
    </GlassCard>
  )
}
