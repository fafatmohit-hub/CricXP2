import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import AuthPage from './pages/AuthPage'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TeamBuilder from './pages/TeamBuilder'
import Matches from './pages/Matches'
import Leaderboard from './pages/Leaderboard'
import Shop from './pages/Shop'

function PrivateRoute({ children }) {
  const isAuthenticated = useStore(s => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

export default function App() {
  const isAuthenticated = useStore(s => s.isAuthenticated)

  return (
    <Routes>
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />}
      />
      <Route
        path="/"
        element={<PrivateRoute><Layout /></PrivateRoute>}
      >
        <Route index element={<Dashboard />} />
        <Route path="team" element={<TeamBuilder />} />
        <Route path="matches" element={<Matches />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="shop" element={<Shop />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
