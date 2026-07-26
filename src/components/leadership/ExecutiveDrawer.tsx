import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Link2, X, CheckCircle2 } from 'lucide-react'
import type { Executive } from '../../data/team'

export function ExecutiveDrawer({
  executive,
  onClose,
}: {
  executive: Executive | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {executive ? (
        <motion.div
          className="executive-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="executive-drawer"
            initial={{ x: -520 }}
            animate={{ x: 0 }}
            exit={{ x: -520 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="executive-drawer-title"
          >
            <button className="executive-drawer-close" type="button" onClick={onClose} aria-label="إغلاق الملف">
              <X />
            </button>
            <img src={executive.image} alt={executive.name} />
            <div className="executive-drawer-content">
              <span>{executive.department}</span>
              <h2 id="executive-drawer-title">{executive.name}</h2>
              <strong>{executive.role}</strong>
              <p>{executive.bio}</p>
              <div className="drawer-detail-grid">
                <div>
                  <small>الخبرة</small>
                  <b>{executive.experience}</b>
                </div>
                <div>
                  <small>التعليم</small>
                  <b>{executive.education}</b>
                </div>
              </div>
              <h3>الإنجازات</h3>
              <ul>
                {executive.achievements.map((achievement) => (
                  <li key={achievement}>
                    <CheckCircle2 aria-hidden="true" />
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="executive-drawer-actions">
                <a href={executive.linkedin} target="_blank" rel="noreferrer">
                  <Link2 aria-hidden="true" />
                  لينكدإن
                </a>
                <a href={`mailto:${executive.email}`}>
                  <Mail aria-hidden="true" />
                  البريد الإلكتروني
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
