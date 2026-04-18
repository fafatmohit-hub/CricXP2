import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const navigate = useNavigate()
  const login = useStore(s => s.login)
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', teamName: '', email: '', password: '' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    login({
      name: form.name,
      email: form.email,
      teamName: form.teamName || `${form.name.split(' ')[0]}'s XI`,
      avatar: form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    })
    toast.success(`Welcome to CricXP, ${form.name.split(' ')[0]}! 🏏`)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className={styles.bg}>
      <div className={styles.circles}>
        <div className={styles.c1} />
        <div className={styles.c2} />
        <div className={styles.c3} />
      </div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.logo}>CricXP</div>
        <div className={styles.tagline}>Fantasy Cricket League Platform</div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => setMode('login')}
          >LOGIN</button>
          <button
            className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
            onClick={() => setMode('register')}
          >REGISTER</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>FULL NAME *</label>
            <input
              className={styles.input}
              placeholder={mode === 'register' ? 'Virat Sharma' : 'Your name'}
              value={form.name}
              onChange={set('name')}
              autoFocus
            />
          </div>

          {mode === 'register' && (
            <motion.div
              className={styles.field}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              <label className={styles.label}>TEAM NAME</label>
              <input
                className={styles.input}
                placeholder="Mumbai Challengers"
                value={form.teamName}
                onChange={set('teamName')}
              />
            </motion.div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>EMAIL *</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={set('email')}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>PASSWORD *</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={set('password')}
            />
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading
              ? <span className={styles.spinner} />
              : mode === 'login' ? 'ENTER THE GROUND' : 'JOIN THE LEAGUE'
            }
          </button>
        </form>

        <p className={styles.switchText}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className={styles.switchBtn} onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>

        <div className={styles.demoNote}>
          🏏 Demo — 800 points gifted on signup
        </div>
      </motion.div>
    </div>
  )
}
