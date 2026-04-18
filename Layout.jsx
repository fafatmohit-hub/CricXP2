import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'
import styles from './Layout.module.css'

const NAV = [
  { to: '/',           icon: '▦',  label: 'Dashboard',      end: true },
  { to: '/team',       icon: '◈',  label: 'Build Team' },
  { to: '/matches',    icon: '⚔',  label: 'Play Match' },
  { to: '/leaderboard',icon: '◉',  label: 'Leaderboard' },
  { to: '/shop',       icon: '◎',  label: 'Redeem Points' },
]

export default function Layout() {
  const navigate = useNavigate()
  const user = useStore(s => s.user)
  const logout = useStore(s => s.logout)

  const handleLogout = () => {
    logout()
    toast.success('Logged out. See you on the pitch!')
    navigate('/auth')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandLogo}>CricXP</span>
          <span className={styles.brandSub}>Fantasy League</span>
        </div>

        <div className={styles.userBlock}>
          <div className={styles.avatar}>{user?.avatar || user?.name?.[0]}</div>
          <div>
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userTeam}>{user?.teamName}</div>
            <div className={styles.userPoints}>⚡ {user?.points?.toLocaleString()} pts</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.pointsBar}>
            <div className={styles.pbLabel}>Season Points</div>
            <div className={styles.pbValue}>{user?.points?.toLocaleString()}</div>
            <div className={styles.pbTrack}>
              <div
                className={styles.pbFill}
                style={{ width: `${Math.min((user?.points / 5000) * 100, 100)}%` }}
              />
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            ↩ Logout
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.pageWrapper}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
