import { motion } from 'framer-motion'
import { leadershipTimeline } from '../../data/team'
import { LeadershipSectionHeading } from './LeadershipSectionHeading'

export function LeadershipTimeline() {
  return (
    <section className="leadership-section leadership-timeline-section">
      <LeadershipSectionHeading
        eyebrow="التاريخ"
        title="محطات من تاريخنا"
      />
      <div className="leadership-timeline" aria-label="خط زمني لتاريخ مصنع الصايغ">
        {leadershipTimeline.map((entry, index) => (
          <motion.article
            key={entry.year}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <span>{entry.year}</span>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
