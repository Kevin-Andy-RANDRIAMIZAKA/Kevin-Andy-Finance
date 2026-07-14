import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  Wallet,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, labelKey: 'nav.transactions' },
  { to: '/analytics', icon: BarChart3, labelKey: 'nav.analytics' },
  { to: '/settings', icon: Settings, labelKey: 'nav.settings' },
]

export default function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/10">
            <Wallet size={22} className="text-accent" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[var(--text-primary)] leading-tight">
              Kevin Andy
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">Finance</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-accent/8 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon size={18} className="relative z-10" />
                <span className="relative z-10">{t(item.labelKey)}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--text-tertiary)]">© 2026 Kevin Andy Finance</p>
      </div>
    </aside>
  )
}
