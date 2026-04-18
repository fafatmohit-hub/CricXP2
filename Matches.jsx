import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'
import { LEAGUE_MATCHES } from '../data'
import styles from './Matches.module.css'

const WIN_POINTS = 300
const LOSS_POINTS = 50

const SIM_PHASES = [
  'Coin toss…', 'Opening overs…', 'Powerplay in progress!',
  'Middle overs…', 'Building partnership…', 'Death overs!',
  'Last 5 overs!', 'Chasing the target…', 'Final over!', 'Last ball!'
]

export default function Matches() {
  const navigate = useNavigate()
  const savedTeam = useStore(s => s.savedTeam)
  const addMatchResult = useStore(s => s.addMatchResult)

  const [activeMatch, setActiveMatch] = useState(null)
  const [simState, setSimState] = useState(null) // null | 'running' | 'done'
  const [progress, setProgress] = useState(0)
  const [scores, setScores] = useState({ s1: 0, s2: 0 })
  const [phase, setPhase] = useState('')
  const [result, setResult] = useState(null)
  const intervalRef = useRef(null)

  const startSim = (match) => {
    if (!savedTeam) { toast.error('Build your team first!'); return }
    setActiveMatch(match)
    setSimState('running')
    setProgress(0)
    setScores({ s1: 0, s2: 0 })
    setPhase('Coin toss…')
    setResult(null)

    const maxS1 = 140 + Math.floor(Math.random() * 80)
    const maxS2 = 130 + Math.floor(Math.random() * 90)
    let tick = 0

    intervalRef.current = setInterval(() => {
      tick += 1
      const pct = Math.min(tick * 5, 100)
      const s1 = Math.min(Math.round((pct / 100) * maxS1), maxS1)
      const s2 = pct > 50
        ? Math.min(Math.round(((pct - 50) / 50) * maxS2), maxS2)
        : 0
      setProgress(pct)
      setScores({ s1, s2 })
      setPhase(SIM_PHASES[Math.min(Math.floor(pct / 11), SIM_PHASES.length - 1)])

      if (pct >= 100) {
        clearInterval(intervalRef.current)
        const won = maxS2 > maxS1
        const pointsEarned = won ? WIN_POINTS : LOSS_POINTS
        const res = { won, s1: maxS1, s2: maxS2, pointsEarned }
        setResult(res)
        setSimState('done')
        addMatchResult({
          match: `${match.team1} vs ${match.team2}`,
          date: 'Today',
          won,
          pointsEarned,
          score: `${maxS1} - ${maxS2}`,
        })
        toast[won ? 'success' : 'error'](
          won ? `🏆 You won! +${pointsEarned} pts` : `💔 Tough luck! +${pointsEarned} pts`
        )
      }
    }, 280)
  }

  const closeSim = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActiveMatch(null)
    setSimState(null)
    setResult(null)
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>PLAY MATCH</h1>
          <p className={styles.subtitle}>WIN = +{WIN_POINTS} PTS · LOSS = +{LOSS_POINTS} PTS</p>
        </div>
        {savedTeam && (
          <div className={styles.teamBadge}>
            <span className={styles.tbIcon}>✅</span>
            <div>
              <div className={styles.tbLabel}>Team Ready</div>
              <div className={styles.tbCount}>{savedTeam.length} players</div>
            </div>
          </div>
        )}
      </div>

      {!savedTeam ? (
        <div className={styles.noTeam}>
          <div className={styles.noTeamIcon}>🏏</div>
          <p className={styles.noTeamText}>You haven't built a team yet!</p>
          <button className={styles.buildBtn} onClick={() => navigate('/team')}>
            BUILD YOUR XI →
          </button>
        </div>
      ) : (
        <div className={styles.matchesGrid}>
          {LEAGUE_MATCHES.map((m, i) => (
            <motion.div
              key={m.id}
              className={styles.matchCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.badgeLive}>UPCOMING</span>
                <span className={styles.matchDate}>{m.date}</span>
              </div>
              <div className={styles.vsRow}>
                <div className={styles.teamBox}>
                  <div className={styles.teamEmoji}>🏏</div>
                  <div className={styles.teamName}>{m.team1}</div>
                </div>
                <div className={styles.vsBadge}>VS</div>
                <div className={styles.teamBox}>
                  <div className={styles.teamEmoji}>🏏</div>
                  <div className={styles.teamName}>{m.team2}</div>
                </div>
              </div>
              <div className={styles.matchMeta}>
                <span>📍 {m.venue}</span>
                <span>🕐 {m.time}</span>
                <span>📌 {m.city}</span>
              </div>
              <button className={styles.playBtn} onClick={() => startSim(m)}>
                ▶ PLAY NOW
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Simulation Modal */}
      <AnimatePresence>
        {activeMatch && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className={styles.modalLabel}>LIVE MATCH SIMULATION</div>
              <div className={styles.modalMatchup}>
                {activeMatch.team1} <span>vs</span> {activeMatch.team2}
              </div>

              {simState === 'done' && result ? (
                <>
                  <div className={`${styles.resultBanner} ${result.won ? styles.win : styles.loss}`}>
                    {result.won ? '🏆 YOU WON!' : '💔 MATCH LOST'}
                  </div>
                  <div className={styles.scoreDisplay}>
                    <div className={styles.scoreTeam}>
                      <div className={styles.scoreNum} style={{ color: result.won ? '#ef4444' : '#22c55e' }}>
                        {result.s1}
                      </div>
                      <div className={styles.scoreLabel}>{activeMatch.team1}</div>
                    </div>
                    <div className={styles.scoreSep}>—</div>
                    <div className={styles.scoreTeam}>
                      <div className={styles.scoreNum} style={{ color: result.won ? '#22c55e' : '#ef4444' }}>
                        {result.s2}
                      </div>
                      <div className={styles.scoreLabel}>{activeMatch.team2}</div>
                    </div>
                  </div>
                  <div className={styles.pointsEarned}>
                    +{result.pointsEarned} POINTS EARNED
                  </div>
                  <button className={styles.continueBtn} onClick={closeSim}>
                    CONTINUE →
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.scoreDisplay}>
                    <div className={styles.scoreTeam}>
                      <div className={styles.scoreNum}>{scores.s1}</div>
                      <div className={styles.scoreLabel}>{activeMatch.team1}</div>
                    </div>
                    <div className={styles.scoreSep}>—</div>
                    <div className={styles.scoreTeam}>
                      <div className={styles.scoreNum}>{scores.s2}</div>
                      <div className={styles.scoreLabel}>{activeMatch.team2}</div>
                    </div>
                  </div>
                  <div className={styles.simBar}>
                    <div className={styles.simFill} style={{ width: `${progress}%` }} />
                  </div>
                  <div className={styles.simPhase}>{phase}</div>
                  <div className={styles.simOvers}>{Math.round(progress * 0.2)} / 20 overs</div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
