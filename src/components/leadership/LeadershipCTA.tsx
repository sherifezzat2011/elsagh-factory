import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function LeadershipCTA() {
  return (
    <section className="leadership-section leadership-cta-section">
      <motion.div
        className="leadership-cta"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <span>تواصل معنا</span>
        <h2>هل ترغب بالتعامل مع مصنع الصايغ؟</h2>
        <p>
          يسعد فريقنا بالإجابة على جميع استفساراتكم وتقديم أفضل الحلول لاحتياجاتكم.
        </p>
        <div>
          <Link to="/contact">تواصل معنا</Link>
          <Link to="/branches">زيارة الفروع</Link>
        </div>
      </motion.div>
    </section>
  )
}
