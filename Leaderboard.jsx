import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { FAKE_LEADERBOARD } from '../data'
import styles from './Leaderboard.module.css'

export default function Leaderboard() {
  const user = useStore(s => s.user)

  const rows = [
    {
      name: user?.name,
      avatar: user?.avatar,
      matches: user?.matches || 0,
      wins: user?.wins || 0,
      points: user?.points || 0,
      isMe: true,
    },
    ...FAKE_LEADERBOARD,
  ]
    .sort((a, b) => b.points - a.points)
    .map((r, i) => ({ ...r, rank: i + 1 }))

  const medals = ['🥇', '🥈', '🥉']
  const me = rows.find(r => r.isMe)

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>LEADERBOARD</h1>
          <p className={styles.subtitle}>GLOBAL RANKINGS · SEASON 2026</p>
        </div>
        <div className={styles.myRank}>
          <div className={styles.myRankNum}>#{me?.rank}</div>
          <div className={styles.myRankLabel}>YOUR RANK</div>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className={styles.podium}>
        {rows.slice(0, 3).map((r, i) => (
          <motion.div
            key={r.name}
            className={`${styles.podiumCard} ${r.isMe ? styles.podiumMe : ''}`}
            style={{ '--order': [1, 0, 2][i] }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.podiumMedal}>{medals[i]}</div>
            <div className={styles.podiumAvatar}>{r.avatar || r.name[0]}</div>
            <div className={styles.podiumName}>{r.name}{r.isMe ? ' (You)' : ''}</div>
            <div className={styles.podiumPoints}>{r.points.toLocaleString()}</div>
            <div className={styles.podiumPtsLabel}>points</div>
          </motion.div>
        ))}
      </div>

      {/* Full table */}
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>#</span>
          <span>PLAYER</span>
          <span>MATCHES</span>
          <span>WINS</span>
          <span>POINTS</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            className={`${styles.tableRow} ${r.isMe ? styles.meRow : ''}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <span className={`${styles.rank} ${r.rank <= 3 ? styles.rankTop : ''}`}>
              {r.rank <= 3 ? medals[r.rank - 1] : r.rank}
            </span>
            <div className={styles.playerCell}>
              <div className={styles.playerAvatar}>{r.avatar || r.name?.[0]}</div>
              <div>
                <div className={styles.playerName}>
                  {r.name}
                  {r.isMe && <span className={styles.youTag}> YOU</span>}
                </div>
              </div>
            </div>
            <span className={styles.cell}>{r.matches}</span>
            <span className={styles.cell}>{r.wins}</span>
            <span className={`${styles.cell} ${styles.cellPts}`}>{r.points.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
