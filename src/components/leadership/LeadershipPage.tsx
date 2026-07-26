import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { executives, leadershipFactoryImage, type Executive } from '../../data/team'
import { CoreValues } from './CoreValues'
import { ExecutiveCard } from './ExecutiveCard'
import { ExecutiveDrawer } from './ExecutiveDrawer'
import { HeroLeadership } from './HeroLeadership'
import { LeadershipCTA } from './LeadershipCTA'
import { LeadershipSectionHeading } from './LeadershipSectionHeading'
import { LeadershipStats } from './LeadershipStats'
import { LeadershipTimeline } from './LeadershipTimeline'

const factoryProcess = [
  'رسم الفكرة واعتماد القياسات',
  'اختيار الذهب وفحص العيار',
  'الصياغة والتشكيل اليدوي',
  'التلميع وتركيب التفاصيل',
  'فحص الوزن والجودة',
  'التغليف وتجهيز الفروع',
]

const qualityPoints = [
  'ذهب عيار 21 مع فحص موثق للوزن',
  'مراجعة نهائية لكل قطعة قبل العرض',
  'تشطيب يدوي يحافظ على تفاصيل التصميم',
  'بيانات واضحة للسعر والوزن والتوفر',
]

export function LeadershipPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)

  return (
    <motion.main className="leadership-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeroLeadership />
      <LeadershipStats />
      <section className="leadership-section" id="executive-team">
        <LeadershipSectionHeading
          eyebrow="أعضاء الإدارة"
          title="أعضاء الإدارة"
        />
        <div className="executive-grid">
          {executives.map((executive) => (
            <ExecutiveCard key={executive.id} executive={executive} onOpen={setSelectedExecutive} />
          ))}
        </div>
      </section>
      <CoreValues />
      <div className="leadership-bottom-composition">
        <LeadershipTimeline />
        <LeadershipCTA />
      </div>
      <section className="leadership-section brand-story-section" id="brand-story">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <LeadershipSectionHeading
            eyebrow="قصة العلامة"
            title="من إرث الصياغة البحرينية إلى مصنع فاخر معاصر"
            text="بدأت حكاية الصايغ كحرفة عائلية تتناقلها الأجيال، ثم تطورت إلى مصنع مجوهرات بحريني يوازن بين أصالة الذهب عيار 21 ووضوح تجربة العميل الحديثة."
          />
        </motion.div>
      </section>
      <section className="leadership-section factory-process-section">
        <LeadershipSectionHeading
          eyebrow="عملية التصنيع"
          title="رحلة القطعة داخل المصنع"
          text="تمر كل قطعة بمراحل متسلسلة تحفظ دقة التصميم ووضوح الوزن وجودة التشطيب."
        />
        <div className="factory-process-grid">
          {factoryProcess.map((step, index) => (
            <motion.article
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="leadership-section quality-section">
        <LeadershipSectionHeading
          eyebrow="الجودة"
          title="معايير واضحة قبل أن تصل القطعة للعميل"
          text="الجودة في مصنع الصايغ ليست مرحلة أخيرة فقط، بل قرار يبدأ من التصميم ويستمر حتى تغليف القطعة."
        />
        <div className="quality-grid">
          {qualityPoints.map((point) => (
            <article key={point}>
              <CheckCircle2 aria-hidden="true" />
              <span>{point}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="leadership-section leadership-philosophy">
        <motion.img
          src={leadershipFactoryImage}
          alt="تفاصيل صياغة المجوهرات داخل المصنع"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <LeadershipSectionHeading
            eyebrow="فلسفة القيادة"
            title="رؤية تقود المستقبل"
            text="نؤمن أن المجوهرات الفاخرة تبدأ من قرار إداري واعٍ: احترام الحرفة، وضبط الجودة، وتقديم تجربة عميل تليق بقيمة الذهب والتراث."
          />
          <ul>
            {['استثمار مستمر في الحرفيين', 'تطوير تجربة الفروع والاستشارة', 'اعتماد جودة واضحة لكل قطعة', 'مزج التراث البحريني مع الذوق الحديث'].map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
      <ExecutiveDrawer executive={selectedExecutive} onClose={() => setSelectedExecutive(null)} />
    </motion.main>
  )
}
