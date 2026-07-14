import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import { TransactionsProvider } from './context/TransactionsContext'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <TransactionsProvider>
          <AppRouter />
        </TransactionsProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}
