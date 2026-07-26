export type PieceType =
  | 'necklace'
  | 'bracelet'
  | 'ring'
  | 'earrings'
  | 'bangle'
  | 'other'

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  sku: string
  categoryId: string
  collectionId?: string
  productType: 'single' | 'set' | 'set-item'
  pieceType: PieceType
  karat: 21
  weight: number
  price: number
  oldPrice?: number
  images: string[]
  badges?: string[]
  stock: number
  branchIds: string[]
  relatedProductIds?: string[]
  setId?: string
  canBePurchasedSeparately: boolean
  canBeAddedToCustomSet: boolean
  styleTags: string[]
  compatibilityTags: string[]
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  pieceType?: PieceType
}

export interface Collection {
  id: string
  slug: string
  name: string
  description: string
  image: string
}

export interface JewelrySet {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productIds: string[]
  canPurchaseFullSet: boolean
  canPurchaseItemsSeparately: boolean
  canCustomize: boolean
  discountPercentage?: number
}

export interface Branch {
  id: string
  name: string
  city: string
  address: string
  phone: string
  whatsapp: string
  hours: string
  image: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export const asset = {
  hero:
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1800&q=85',
  factory:
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=85',
  fallback:
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
}

export const categories: Category[] = [
  ['sets', 'sets', 'الأطقم', 'أطقم ذهب عيار 21 متناسقة للمناسبات والعرائس.', 'set', 'other'],
  ['necklaces', 'necklaces', 'القلائد', 'قلائد بحرينية بتفاصيل دقيقة ووزن واضح.', 'necklace', 'necklace'],
  ['bracelets', 'bracelets', 'الأساور', 'أساور يومية وفاخرة بنقوش خليجية.', 'bracelet', 'bracelet'],
  ['rings', 'rings', 'الخواتم', 'خواتم ذهب بتصاميم كلاسيكية وحديثة.', 'ring', 'ring'],
  ['earrings', 'earrings', 'الأقراط', 'أقراط خفيفة وقطع بارزة للمناسبات.', 'earrings', 'earrings'],
  ['bangles', 'bangles', 'التراكي', 'تراكي ودبل بنقش عربي فاخر.', 'bangle', 'bangle'],
  ['mazanat', 'mazanat', 'المزانط', 'قطع تراثية مستوحاة من صياغة الخليج.', 'other', 'other'],
  ['wedding', 'wedding', 'الدبل', 'دبل ذهب عيار 21 بتشطيب ناعم.', 'ring', 'ring'],
].map(([id, slug, name, description, imageKey, pieceType]) => ({
  id,
  slug,
  name,
  description,
  image: `https://images.unsplash.com/photo-${imageKey === 'ring' ? '1605100804763' : imageKey === 'necklace' ? '1599643478518' : imageKey === 'earrings' ? '1635767798638' : '1515562141207'}?auto=format&fit=crop&w=900&q=85`,
  pieceType: pieceType as PieceType,
}))

export const collections: Collection[] = [
  {
    id: 'heritage',
    slug: 'heritage',
    name: 'مجموعة التراث',
    description: 'قطع مستوحاة من النقوش البحرينية والحرف اليدوية القديمة.',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'danah',
    slug: 'danah',
    name: 'مجموعة الدانة',
    description: 'ذهب فاخر مع حضور هادئ مستوحى من لؤلؤ الخليج.',
    image:
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'royal',
    slug: 'royal',
    name: 'مجموعة العروس',
    description: 'أطقم وقطع كبيرة للمناسبات العائلية وليلة الحناء.',
    image:
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'daily',
    slug: 'daily',
    name: 'أناقة يومية',
    description: 'قطع عملية بتفاصيل راقية تناسب الزيارات والعمل.',
    image:
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'gulf',
    slug: 'gulf',
    name: 'روح الخليج',
    description: 'تصاميم تجمع بين الفخامة الخليجية والوزن المتوازن.',
    image:
      'https://images.unsplash.com/photo-1599459183200-59c7687a0275?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'limited',
    slug: 'limited',
    name: 'إصدارات محدودة',
    description: 'نماذج تجريبية فاخرة بكميات قليلة للعرض الخاص.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85',
  },
]

const names = [
  'طقم عروس ملكي',
  'قلادة لؤلؤ البحرين',
  'سوار نقش المحرق',
  'خاتم زهرة الخليج',
  'تراكي التراث',
  'أقراط الدانة',
  'طقم ليلة الحناء',
  'قلادة نخلة البحرين',
  'سوار الدانة المفتوح',
  'دبلة عهد الصايغ',
  'مزناط اللؤلؤ',
  'خاتم نقشة السدو',
  'قلادة شمس الخليج',
  'سوار عروس الرفاع',
  'أقراط قصر البحرين',
  'طقم دانة المحرق',
  'خاتم موج البحر',
  'تراكي ذهب مصقول',
  'قلادة خط عربي',
  'سوار جناح اللؤلؤ',
  'دبلة نقش ملكي',
  'أقراط وردة الذهب',
  'مزناط حبة دانة',
  'طقم أمواج الخليج',
  'قلادة عيار الصايغ',
  'سوار فجر المنامة',
  'خاتم فص تراثي',
  'تراكي ضوء الحناء',
  'أقراط نخلة صغيرة',
  'طقم الدانة الكبير',
  'قلادة عقدة بحرينية',
  'سوار نقشة اللوز',
  'خاتم نجمة الرفاع',
  'دبلة ذهب ناعم',
  'مزناط صباح الخليج',
  'أقراط خط اللؤلؤ',
  'طقم ميثاق العروس',
  'قلادة نقش الأجداد',
  'سوار وعد الدانة',
  'خاتم الصياغة القديمة',
]

const productImages = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85',
]

const pieceCycle: PieceType[] = ['other', 'necklace', 'bracelet', 'ring', 'bangle', 'earrings']
const categoryCycle = ['sets', 'necklaces', 'bracelets', 'rings', 'bangles', 'earrings', 'mazanat', 'wedding']
const collectionCycle = ['royal', 'danah', 'heritage', 'gulf', 'daily', 'limited']

// Demo data: prices, weights, dates, and commercial details are placeholders for client presentation.
export const products: Product[] = names.map((name, index) => {
  const id = `p-${String(index + 1).padStart(4, '0')}`
  const isSet = name.startsWith('طقم')
  const categoryId = isSet ? 'sets' : categoryCycle[index % categoryCycle.length]
  const pieceType = isSet ? 'other' : pieceCycle[index % pieceCycle.length]
  const price = 285 + index * 72 + (isSet ? 1250 : 0)
  return {
    id,
    slug: `product-${index + 1}`,
    name,
    shortDescription: 'قطعة ذهب عيار 21 بتشطيب يدوي ووزن موثق.',
    description:
      'صممت هذه القطعة لتجمع بين الحضور الخليجي الهادئ ودقة الصياغة البحرينية. السعر تقديري ويتغير حسب الوزن وسعر الذهب عند اعتماد الطلب.',
    sku: `${isSet ? 'SET' : 'GLD'}-${10023 + index}`,
    categoryId,
    collectionId: collectionCycle[index % collectionCycle.length],
    productType: isSet ? 'set' : index % 5 === 0 ? 'set-item' : 'single',
    pieceType,
    karat: 21,
    weight: Number((8.5 + index * 1.35 + (isSet ? 31 : 0)).toFixed(1)),
    price,
    oldPrice: index % 7 === 0 ? price + 180 : undefined,
    images: [productImages[index % productImages.length], productImages[(index + 2) % productImages.length]],
    badges: [
      index % 3 === 0 ? 'جديد' : '',
      index % 4 === 0 ? 'الأكثر مبيعاً' : '',
      index % 9 === 0 ? 'إصدار محدود' : '',
    ].filter(Boolean),
    stock: index % 11 === 0 ? 0 : 2 + (index % 9),
    branchIds: ['bahrain-mall', 'manama-souq', 'riffa'],
    relatedProductIds: [
      `p-${String(((index + 1) % 40) + 1).padStart(4, '0')}`,
      `p-${String(((index + 4) % 40) + 1).padStart(4, '0')}`,
    ],
    setId: isSet ? `set-${(index % 8) + 1}` : undefined,
    canBePurchasedSeparately: true,
    canBeAddedToCustomSet: !isSet,
    styleTags: [index % 2 ? 'هادئ' : 'فاخر', index % 3 ? 'تراثي' : 'عصري'],
    compatibilityTags: [pieceType, collectionCycle[index % collectionCycle.length]],
    isFeatured: index < 12,
    isNew: index % 3 === 0,
    isBestSeller: index % 4 === 0,
  }
})

export const jewelrySets: JewelrySet[] = Array.from({ length: 8 }, (_, index) => {
  const setProducts = products.slice(index * 5, index * 5 + 5).map((product) => product.id)
  return {
    id: `set-${index + 1}`,
    slug: `set-${index + 1}`,
    name: ['طقم عروس ملكي', 'طقم الدانة الكبير', 'طقم ليلة الحناء', 'طقم أمواج الخليج'][index % 4],
    description: 'طقم كامل من ذهب عيار 21 مع إمكانية شراء القطع كاملة أو اختيار بعضها لطقم مخصص.',
    image: productImages[index % productImages.length],
    productIds: setProducts,
    canPurchaseFullSet: true,
    canPurchaseItemsSeparately: true,
    canCustomize: true,
    discountPercentage: index % 2 === 0 ? 5 : undefined,
  }
})

export const branches: Branch[] = [
  {
    id: 'bahrain-mall',
    name: 'فرع السيف',
    city: 'السيف',
    address: 'السيف، مجمع السيف',
    phone: '+973 17 224 911',
    whatsapp: '+973 39 224 911',
    hours: 'السبت إلى الخميس، 10 صباحاً - 10 مساءً',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=88',
  },
  {
    id: 'manama-souq',
    name: 'فرع المحرق',
    city: 'المحرق',
    address: 'المحرق، شارع المجمع',
    phone: '+973 17 343 558',
    whatsapp: '+973 39 343 558',
    hours: 'يومياً، 9 صباحاً - 9 مساءً',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=88',
  },
  {
    id: 'riffa',
    name: 'فرع الرفاع',
    city: 'الرفاع',
    address: 'الرفاع، شارع الرابط',
    phone: '+973 17 827 211',
    whatsapp: '+973 39 827 211',
    hours: 'السبت إلى الخميس، 10 صباحاً - 9 مساءً',
    image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=1200&q=88',
  },
]

export const team: TeamMember[] = [
  ['سلمان الصايغ', 'رئيس مجلس الإدارة', 'يقود رؤية المصنع وتطوير حضوره في السوق الخليجي.'],
  ['مريم الصايغ', 'مديرة التصميم', 'تشرف على تحويل التراث البحريني إلى تصاميم قابلة للارتداء.'],
  ['عبدالله العلوي', 'مدير المصنع', 'يتابع مراحل الصياغة والفحص والاعتماد النهائي.'],
  ['نورة الجاسم', 'مديرة الفروع', 'تهتم بتجربة العملاء وتوفر القطع في الفروع.'],
  ['خالد محمود', 'خبير العيار والجودة', 'يراجع الوزن والعيار قبل عرض كل قطعة.'],
  ['فاطمة راشد', 'مستشارة العرائس', 'تساعد العميلات على اختيار أطقم المناسبات وتنسيقها.'],
].map(([name, role, bio], index) => ({
  id: `team-${index + 1}`,
  name,
  role,
  bio,
  image: `https://images.unsplash.com/photo-${index % 2 ? '1494790108377-be9c29b29330' : '1500648767791-00dcc994a43e'}?auto=format&fit=crop&w=500&q=85`,
}))

export const testimonials = [
  'التجربة راقية والقطع وصلت بتغليف يليق بالهدية.',
  'استطعت تكوين طقم يناسب ذوقي من أكثر من مجموعة.',
  'وضوح الوزن والسعر جعل الاختيار أسهل قبل زيارة الفرع.',
  'تصاميم بحرينية جميلة وليست مكررة.',
  'خدمة واتساب سريعة ومفيدة للاستفسار عن التوفر.',
  'الموقع ممتاز كعرض أولي قبل اعتماد القطع النهائية.',
]

export const faq = [
  ['هل جميع القطع ذهب عيار 21؟', 'نعم، جميع منتجات هذا العرض التجريبي مبنية على ذهب عيار 21.'],
  ['هل الأسعار نهائية؟', 'الأسعار تقديرية وتتغير حسب الوزن وسعر الذهب وقت الطلب.'],
  ['هل يمكن شراء قطعة من طقم؟', 'نعم، إذا كانت القطعة قابلة للبيع منفردة يظهر ذلك في صفحة المنتج.'],
  ['هل توجد فروع فعلية؟', 'البيانات المعروضة للفروع تجريبية ويمكن استبدالها ببيانات العميل.'],
  ['هل السلة تحفظ الطلب؟', 'نعم تحفظ محلياً على الجهاز لغرض العرض التجريبي.'],
  ['هل يوجد دفع حقيقي؟', 'لا، تجربة الدفع شكلية ولا ترسل بيانات لخادم.'],
  ['هل يمكن ربط الموقع بنظام مخزون؟', 'نعم، ملفات البيانات منظمة ليسهل استبدالها بواجهة API لاحقاً.'],
  ['هل يمكن تغيير الصور؟', 'نعم، الصور مركزية في بيانات المنتجات والتصنيفات والفروع.'],
]

export const manufacturingSteps = [
  'رسم الفكرة واعتماد القياسات',
  'اختيار الذهب وفحص العيار',
  'الصياغة والتشكيل اليدوي',
  'التلميع وتركيب التفاصيل',
  'فحص الوزن والجودة',
  'التغليف وتجهيز الفرع',
]

export const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('ar-BH').format(price)} د.ب`

export const getProduct = (slug?: string) => products.find((product) => product.slug === slug)
export const getCategory = (slug?: string) => categories.find((category) => category.slug === slug)
