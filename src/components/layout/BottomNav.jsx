import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, labelKey: 'nav.transactions' },
  { to: '/analytics', icon: BarChart3, labelKey: 'nav.analytics' },
  { to: '/settings', icon: Settings, labelKey: 'nav.settings' },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] backdrop-blur-xl safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className="relative flex flex-col items-center gap-0.5 px-3 py-2 min-w-[64px]"
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon
                    size={22}
                    className={isActive ? 'text-accent' : 'text-[var(--text-tertiary)]'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? 'text-accent' : 'text-[var(--text-tertiary)]'
                  }`}
                >
                  {t(item.labelKey)}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomnav-active"
                    className="absolute -top-0.5 w-8 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
