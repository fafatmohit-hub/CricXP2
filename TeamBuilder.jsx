import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { PLAYERS_POOL, ROLE_COLORS } from '../data'
import styles from './TeamBuilder.module.css'

const ROLES = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper']

export default function TeamBuilder() {
  const navigate = useNavigate()
  const savedTeam = useStore(s => s.savedTeam)
  const saveTeam = useStore(s => s.saveTeam)

  const [selected, setSelected] = useState(savedTeam || [])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const toggle = (player) => {
    const already = selected.find(p => p.id === player.id)
    if (already) {
      setSelected(prev => prev.filter(p => p.id !== player.id))
    } else {
      if (selected.length >= 11) {
        toast.error('Team is full! Remove a player first.')
        return
      }
      setSelected(prev => [...prev, player])
    }
  }

  const handleSave = () => {
    if (selected.length !== 11) {
      toast.error(`Need exactly 11 players. You have ${selected.length}.`)
      return
    }
    saveTeam(selected)
    toast.success('✅ Team saved! Ready to play.')
    navigate('/matches')
  }

  const filtered = PLAYERS_POOL.filter(p => {
    const roleMatch = filter === 'All' || p.role === filter
    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase())
    return roleMatch && searchMatch
  })

  const roleCount = (role) => selected.filter(p => p.role === role).length

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>BUILD YOUR XI</h1>
          <p className={styles.subtitle}>SELECT EXACTLY 11 PLAYERS TO FORM YOUR SQUAD</p>
        </div>
        <div className={styles.roleBreakdown}>
          {['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'].map(r => (
            <div key={r} className={styles.rbItem} style={{ '--rc': ROLE_COLORS[r].text }}>
              <span className={styles.rbCount}>{roleCount(r)}</span>
              <span className={styles.rbRole}>{r.slice(0, 3).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {/* Player pool */}
        <div className={styles.poolPanel}>
          <div className={styles.poolHeader}>
            <input
              className={styles.searchInput}
              placeholder="Search player..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className={styles.filterRow}>
              {ROLES.map(r => (
                <button
                  key={r}
                  className={`${styles.pill} ${filter === r ? styles.pillActive : ''}`}
                  onClick={() => setFilter(r)}
                >
                  {r === 'All-Rounder' ? 'AR' : r === 'Wicketkeeper' ? 'WK' : r === 'All' ? 'ALL' : r.toUpperCase().slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.playerList}>
            {filtered.map(p => {
              const isSelected = !!selected.find(s => s.id === p.id)
              const isFull = selected.length >= 11 && !isSelected
              const rc = ROLE_COLORS[p.role]
              return (
                <motion.div
                  key={p.id}
                  className={`${styles.playerRow} ${isSelected ? styles.rowSelected : ''} ${isFull ? styles.rowDisabled : ''}`}
                  onClick={() => !isFull && toggle(p)}
                  whileHover={!isFull ? { x: 2 } : {}}
                  whileTap={!isFull ? { scale: 0.99 } : {}}
                >
                  <div className={styles.playerAvatar} style={{ background: `${rc.text}18`, borderColor: `${rc.text}30` }}>
                    {p.avatar}
                  </div>
                  <div className={styles.playerInfo}>
                    <div className={styles.playerName}>{p.country} {p.name}</div>
                    <span className={styles.roleTag} style={{ background: rc.bg, color: rc.text }}>
                      {p.role}
                    </span>
                  </div>
                  <div className={styles.playerRating}>{p.rating}</div>
                  <div className={`${styles.checkBox} ${isSelected ? styles.checkBoxSelected : ''}`}>
                    {isSelected && '✓'}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Team panel */}
        <div className={styles.teamPanel}>
          <div className={styles.teamPanelInner}>
            <div className={styles.teamHeader}>
              <div className={styles.countRow}>
                <span className={styles.countLabel}>PLAYERS SELECTED</span>
                <span className={`${styles.countNum} ${selected.length === 11 ? styles.countFull : ''}`}>
                  {selected.length}/11
                </span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(selected.length / 11) * 100}%` }}
                />
              </div>
            </div>

            <div className={styles.selectedList}>
              <AnimatePresence>
                {selected.map(p => {
                  const rc = ROLE_COLORS[p.role]
                  return (
                    <motion.div
                      key={p.id}
                      className={styles.chip}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className={styles.chipAvatar} style={{ color: rc.text }}>{p.avatar}</div>
                      <div className={styles.chipInfo}>
                        <div className={styles.chipName}>{p.name}</div>
                        <div className={styles.chipRole} style={{ color: rc.text }}>{p.role}</div>
                      </div>
                      <button className={styles.chipRemove} onClick={() => toggle(p)}>×</button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {Array.from({ length: 11 - selected.length }).map((_, i) => (
                <div key={i} className={styles.emptySlot}>
                  <span>○</span> Empty slot {selected.length + i + 1}
                </div>
              ))}
            </div>

            <div className={styles.teamFooter}>
              {selected.length > 0 && selected.length < 11 && (
                <p className={styles.hint}>
                  {11 - selected.length} more player{11 - selected.length !== 1 ? 's' : ''} needed
                </p>
              )}
              <button
                className={styles.saveBtn}
                disabled={selected.length !== 11}
                onClick={handleSave}
              >
                {selected.length === 11 ? 'SAVE & PLAY →' : `SELECT ${11 - selected.length} MORE`}
              </button>
              {selected.length > 0 && (
                <button className={styles.clearBtn} onClick={() => setSelected([])}>
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
