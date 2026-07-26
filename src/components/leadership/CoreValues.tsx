import { BadgeCheck, Gem, Handshake, Lightbulb, Sparkles, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { leadershipValues } from '../../data/team'
import { LeadershipSectionHeading } from './LeadershipSectionHeading'

const icons = [Sparkles, BadgeCheck, Handshake, Gem, Lightbulb, ShieldCheck]

export function CoreValues() {
  return (
    <section className="leadership-section leadership-values">
      <LeadershipSectionHeading
        eyebrow="قيمنا"
        title="مبادئ تصنع الثقة قبل القطعة"
        text="قيم هادئة وواضحة تقود القرارات اليومية داخل المصنع والفروع."
      />
      <div className="values-grid">
        {leadershipValues.map((value, index) => {
          const Icon = icons[index]
          return (
            <motion.article
              key={value.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <Icon aria-hidden="true" />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
