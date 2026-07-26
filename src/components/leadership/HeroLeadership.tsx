import { motion } from 'framer-motion'
import { leadershipHeroImage } from '../../data/team'

export function HeroLeadership() {
  return (
    <section
      className="leadership-hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(3,31,26,.88), rgba(3,31,26,.48)), url(${leadershipHeroImage})`,
      }}
    >
      <motion.div
        className="leadership-hero-content"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <span>عن المصنع</span>
        <h1>فريق يقود إرثاً يمتد لأكثر من قرنين</h1>
        <p>
          يقود مصنع الصايغ للمجوهرات نخبة من الخبرات التي تجمع بين الحرفة البحرينية
          الأصيلة والرؤية الحديثة لتقديم مجوهرات تليق بتاريخ يمتد منذ عام 1783.
        </p>
        <div className="leadership-hero-actions">
          <a href="#executive-team">تعرف على الفريق</a>
          <a href="#brand-story">عن المصنع</a>
        </div>
      </motion.div>
    </section>
  )
}
