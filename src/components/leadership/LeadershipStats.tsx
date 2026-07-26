import { Award, Building2, Gem, Globe2, Landmark, UsersRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { leadershipStats } from '../../data/team'

const icons = [Globe2, Building2, Gem, UsersRound, Award, Landmark]

export function LeadershipStats() {
  return (
    <section className="leadership-stats" aria-label="أرقام مصنع الصايغ">
      {leadershipStats.map((stat, index) => {
        const Icon = icons[index]
        return (
          <motion.article
            key={`${stat.value}-${stat.label}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            <Icon aria-hidden="true" />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.article>
        )
      })}
    </section>
  )
}
