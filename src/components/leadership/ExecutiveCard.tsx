import { motion } from 'framer-motion'
import type { Executive } from '../../data/team'

export function ExecutiveCard({
  executive,
  onOpen,
}: {
  executive: Executive
  onOpen: (executive: Executive) => void
}) {
  return (
    <motion.article
      className="executive-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="executive-image">
        <img src={executive.image} alt={executive.name} />
      </div>
      <div className="executive-card-body">
        <span>{executive.department}</span>
        <h3>{executive.name}</h3>
        <strong>{executive.role}</strong>
        <p>{executive.bio}</p>
        <div className="executive-meta">
          <small>خبرة {executive.experience}</small>
          <small>{executive.department}</small>
        </div>
        <button type="button" onClick={() => onOpen(executive)} aria-label={`عرض ملف ${executive.name}`}>
          عرض الملف
        </button>
      </div>
    </motion.article>
  )
}
