export interface Executive {
  id: string
  name: string
  slug: string
  role: string
  department: string
  experience: string
  bio: string
  image: string
  email: string
  linkedin: string
  achievements: string[]
  education: string
}

export interface LeadershipValue {
  id: string
  title: string
  text: string
}

export interface LeadershipTimelineEntry {
  year: string
  title: string
  text: string
}

export const leadershipHeroImage =
  'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1800&q=88'

export const leadershipFactoryImage =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=88'

export const executives: Executive[] = [
  {
    id: 'exec-1',
    name: 'سلمان الصايغ',
    slug: 'salman-alsayegh',
    role: 'الرئيس التنفيذي',
    department: 'الإدارة العليا',
    experience: '32 عاماً',
    bio: 'يقود سلمان الصايغ رؤية المصنع التجارية والحرفية، مع تركيز واضح على ترسيخ حضور المجوهرات البحرينية الفاخرة في السوق الخليجي.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88',
    email: 'salman@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['توسيع حضور المصنع خليجياً', 'تطوير معايير الجودة الداخلية', 'إطلاق تجربة الطلبات الخاصة'],
    education: 'إدارة أعمال وتجارة مجوهرات عائلية',
  },
  {
    id: 'exec-2',
    name: 'مريم الصايغ',
    slug: 'maryam-alsayegh',
    role: 'المديرة العامة',
    department: 'التطوير والاستراتيجية',
    experience: '24 عاماً',
    bio: 'تشرف مريم على تطوير التجربة الشاملة للعميل، من اختيار القطعة إلى خدمة ما بعد البيع، بأسلوب يعكس فخامة العلامة.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=88',
    email: 'maryam@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['تحديث تجربة الفروع', 'بناء فريق خدمة متخصص', 'قيادة خطط النمو الموسمية'],
    education: 'إدارة استراتيجية وتجربة عملاء',
  },
  {
    id: 'exec-3',
    name: 'عبدالله العلوي',
    slug: 'abdulla-alalawi',
    role: 'مدير العمليات',
    department: 'العمليات وسلاسل الإمداد',
    experience: '27 عاماً',
    bio: 'يدير عبدالله تدفق الإنتاج والمخزون والتسليم، لضمان أن تصل كل قطعة إلى الفرع في وقتها وبجودة معتمدة.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88',
    email: 'abdulla@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['تحسين دورة الإنتاج', 'تنظيم مخزون الفروع', 'رفع كفاءة التوريد'],
    education: 'إدارة عمليات ومشتريات',
  },
  {
    id: 'exec-4',
    name: 'خالد محمود',
    slug: 'khalid-mahmood',
    role: 'مدير المصنع',
    department: 'الصياغة والجودة',
    experience: '29 عاماً',
    bio: 'يشرف خالد على الورش والفحص النهائي، ويضمن التزام كل قطعة بعيار الذهب والوزن والتشطيب اليدوي المطلوب.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=88',
    email: 'khalid@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['اعتماد مراحل فحص متعددة', 'تدريب الحرفيين الجدد', 'تطوير التشطيب اليدوي'],
    education: 'صياغة ذهب وفحص عيار',
  },
  {
    id: 'exec-5',
    name: 'نورة الجاسم',
    slug: 'noura-aljassim',
    role: 'مديرة المبيعات',
    department: 'الفروع والمبيعات',
    experience: '18 عاماً',
    bio: 'تقود نورة أداء الفروع وفريق المستشارين، وتبني تجربة شراء هادئة تليق بعملاء المجوهرات الفاخرة.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=88',
    email: 'noura@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['رفع جودة الاستشارات', 'تنظيم عروض العرائس', 'تطوير متابعة العملاء'],
    education: 'إدارة مبيعات فاخرة',
  },
  {
    id: 'exec-6',
    name: 'فاطمة راشد',
    slug: 'fatima-rashid',
    role: 'مديرة التصميم الإبداعي',
    department: 'التصميم والمنتجات',
    experience: '16 عاماً',
    bio: 'تحوّل فاطمة تفاصيل التراث البحريني إلى خطوط تصميم حديثة، مع الحفاظ على الوزن والحضور المناسبين لكل مناسبة.',
    image:
      'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=900&q=88',
    email: 'fatima@alsayegh.example',
    linkedin: 'https://www.linkedin.com/',
    achievements: ['إطلاق مجموعات تراثية', 'تطوير أطقم العرائس', 'توحيد لغة التصميم'],
    education: 'تصميم مجوهرات وفنون تطبيقية',
  },
]

export const leadershipStats = [
  { value: 'تصدير', label: 'لدول الخليج' },
  { value: 'أول مصنع مرخص', label: 'في مملكة البحرين' },
  { value: '45,000+', label: 'تصميم مميز' },
  { value: '6', label: 'أعضاء فريق الإدارة' },
  { value: '240+', label: 'سنة من التاريخ' },
  { value: 'ذهب', label: 'عيار 21' },
]

export const leadershipValues: LeadershipValue[] = [
  { id: 'craft', title: 'الحرفية', text: 'تفاصيل يدوية دقيقة تحافظ على روح الصياغة البحرينية.' },
  { id: 'quality', title: 'الجودة', text: 'فحص متدرج للعيار والوزن والتشطيب قبل الاعتماد.' },
  { id: 'trust', title: 'الثقة', text: 'وضوح في المعلومات وخدمة تحترم قيمة كل قطعة.' },
  { id: 'origin', title: 'الأصالة', text: 'تصاميم تستلهم التراث الخليجي دون تكرار أو مبالغة.' },
  { id: 'innovation', title: 'الابتكار', text: 'مزج التقنيات الحديثة مع خبرة الحرفيين.' },
  { id: 'service', title: 'خدمة العملاء', text: 'استشارة راقية ترافق العميل من الاختيار حتى التسليم.' },
]

export const leadershipTimeline: LeadershipTimelineEntry[] = [
  { year: '1783', title: 'بداية الحرفة', text: 'تأسيس الإرث العائلي في صياغة الذهب البحريني.' },
  { year: '1960', title: 'توسع الإنتاج', text: 'انتقال الحرفة من الورشة الصغيرة إلى إنتاج أوسع.' },
  { year: '1985', title: 'المصنع الحديث', text: 'تنظيم مراحل الصياغة والفحص داخل منشأة متخصصة.' },
  { year: '2005', title: 'حضور خليجي', text: 'توسيع قنوات البيع والتصدير لأسواق الخليج.' },
  { year: 'اليوم', title: 'رؤية متجددة', text: 'قيادة تجمع بين التراث والتجربة الرقمية الحديثة.' },
]
