import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'
import { COUPONS } from '../data'
import styles from './Shop.module.css'

export default function Shop() {
  const user = useStore(s => s.user)
  const ownedCoupons = useStore(s => s.ownedCoupons)
  const redeemCoupon = useStore(s => s.redeemCoupon)

  const handleRedeem = (coupon) => {
    const success = redeemCoupon(coupon)
    if (success) {
      toast.success(`🎉 ${coupon.title} redeemed!`)
    } else {
      toast.error('Not enough points!')
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>REDEEM POINTS</h1>
          <p className={styles.subtitle}>EXCHANGE EARNED POINTS FOR EXCLUSIVE COUPONS</p>
        </div>
        <div className={styles.balanceCard}>
          <div className={styles.balLabel}>YOUR BALANCE</div>
          <div className={styles.balValue}>{user?.points?.toLocaleString()}</div>
          <div className={styles.balUnit}>POINTS</div>
        </div>
      </div>

      {/* Coupon grid */}
      <div className={styles.grid}>
        {COUPONS.map((c, i) => {
          const owned = ownedCoupons.find(o => o.id === c.id)
          const canAfford = (user?.points || 0) >= c.points
          return (
            <motion.div
              key={c.id}
              className={`${styles.card} ${owned ? styles.cardOwned : ''} ${!canAfford && !owned ? styles.cardLocked : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={styles.cardTop} style={{ '--brand': c.color }}>
                <div className={styles.couponIcon} style={{ background: `${c.color}18` }}>
                  {c.icon}
                </div>
                <div className={styles.couponInfo}>
                  <div className={styles.couponBrand}>{c.brand}</div>
                  <div className={styles.couponTitle}>{c.title}</div>
                  <div className={styles.couponDesc}>{c.description}</div>
                </div>
              </div>
              <div className={styles.cardBottom}>
                <div>
                  <div className={styles.pointsCost} style={{ color: canAfford || owned ? c.color : '#6b7280' }}>
                    {c.points.toLocaleString()}
                  </div>
                  <div className={styles.pointsLabel}>POINTS</div>
                </div>
                {owned ? (
                  <div className={styles.ownedBadge}>✓ OWNED</div>
                ) : (
                  <button
                    className={styles.redeemBtn}
                    style={{ '--brand': c.color }}
                    disabled={!canAfford}
                    onClick={() => handleRedeem(c)}
                  >
                    {canAfford ? 'REDEEM' : 'NOT ENOUGH'}
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Owned coupons */}
      {ownedCoupons.length > 0 && (
        <div className={styles.ownedSection}>
          <h2 className={styles.ownedTitle}>YOUR COUPONS</h2>
          <div className={styles.ownedGrid}>
            {ownedCoupons.map((c, i) => (
              <motion.div
                key={i}
                className={styles.ownedCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={styles.ownedLeft}>
                  <span className={styles.ownedIcon}>{c.icon}</span>
                  <div>
                    <div className={styles.ownedName}>{c.title}</div>
                    <div className={styles.ownedBrand}>{c.brand}</div>
                  </div>
                </div>
                <div className={styles.ownedRight}>
                  <div className={styles.codeLabel}>COUPON CODE</div>
                  <div className={styles.code}>{c.code}</div>
                  <div className={styles.redeemed}>
                    Redeemed {new Date(c.redeemedAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
