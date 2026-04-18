import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { LEAGUE_MATCHES } from '../data'
import styles from './Dashboard.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const user = useStore(s => s.user)
  const matchHistory = useStore(s => s.matchHistory)
  const savedTeam = useStore(s => s.savedTeam)
  const ownedCoupons = useStore(s => s.ownedCoupons)

  const stats = [
    { icon: '⚡', value: user?.points?.toLocaleString(), label: 'Total Points',    accent: '#22c55e' },
    { icon: '🏏', value: user?.matches,                   label: 'Matches Played',  accent: '#22d3ee' },
    { icon: '🏆', value: user?.wins,                      label: 'Wins',            accent: '#f59e0b' },
    { icon: '🎁', value: ownedCoupons.length,             label: 'Coupons Owned',   accent: '#a78bfa' },
  ]

  const winRate = user?.matches > 0
    ? Math.round((user.wins / user.matches) * 100)
    : 0

  return (
    <div>
      {/* Header */}
      <motion.div className={styles.header} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>
          <h1 className={styles.title}>DASHBOARD</h1>
          <p className={styles.subtitle}>WELCOME BACK, {user?.name?.toUpperCase()}</p>
        </div>
        <div className={styles.winRateBadge}>
          <span className={styles.wrValue}>{winRate}%</span>
          <span className={styles.wrLabel}>WIN RATE</span>
        </div>
      </motion.div>

      {/* Quick action if no team */}
      {!savedTeam && (
        <motion.div
          className={styles.ctaBanner}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span>🏏 You haven't built a team yet — </span>
          <button className={styles.ctaLink} onClick={() => navigate('/team')}>
            Build your XI now →
          </button>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className={styles.statsGrid}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className={styles.statCard}
            style={{ '--accent': s.accent }}
            variants={fadeUp}
          >
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lower grid */}
      <div className={styles.lowerGrid}>
        {/* Upcoming matches */}
        <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate="show">
          <div className={styles.cardTitle}>
            <span>📅</span> Upcoming Matches
          </div>
          {LEAGUE_MATCHES.map(m => (
            <div key={m.id} className={styles.matchRow}>
              <div>
                <div className={styles.matchTeams}>{m.team1} <span className={styles.vs}>vs</span> {m.team2}</div>
                <div className={styles.matchMeta}>📍 {m.venue} · {m.date} · {m.time}</div>
              </div>
              <span className={styles.badgeUpcoming}>UPCOMING</span>
            </div>
          ))}
          <button className={styles.viewAllBtn} onClick={() => navigate('/matches')}>
            Play a match →
          </button>
        </motion.div>

        {/* Match history */}
        <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <div className={styles.cardTitle}><span>📊</span> Recent Results</div>
          {matchHistory.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🏏</div>
              <p>No matches played yet.</p>
              <button className={styles.emptyBtn} onClick={() => navigate('/matches')}>
                Play your first match
              </button>
            </div>
          ) : (
            matchHistory.slice(0, 6).map((h, i) => (
              <div key={i} className={styles.historyRow}>
                <div>
                  <div className={styles.historyMatch}>{h.match}</div>
                  <div className={styles.historyDate}>{h.date}</div>
                </div>
                <div className={styles.historyRight}>
                  <div className={`${styles.historyPts} ${h.won ? styles.ptsWin : styles.ptsLoss}`}>
                    +{h.pointsEarned} pts
                  </div>
                  <span className={h.won ? styles.badgeWon : styles.badgeLost}>
                    {h.won ? 'WIN' : 'LOSS'}
                  </span>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
