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
  {
    id: 'sets',
    slug: 'sets',
    name: 'الأطقم',
    description: 'أطقم ذهب عيار 21 من مصنع الصايغ مع إمكانية شراء الطقم أو اختيار قطعه.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000321217-1-600x800.jpg',
    pieceType: 'other',
  },
  {
    id: 'necklaces',
    slug: 'necklaces',
    name: 'القلائد',
    description: 'قلائد ذهبية بحرينية وخليجية بتفاصيل تراثية ووزن واضح.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000313039-900x600.jpg',
    pieceType: 'necklace',
  },
  {
    id: 'mazanat',
    slug: 'mazanat',
    name: 'المزانط',
    description: 'مزانط ذهب عيار 21 بتصاميم بارزة للأطقم والمناسبات.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000321217-600x800.jpg',
    pieceType: 'other',
  },
  {
    id: 'bracelets',
    slug: 'bracelets',
    name: 'الأساور',
    description: 'أساور وبناجل ذهبية بتشطيب يدوي ونقوش خليجية.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000320774-1-600x800.jpg',
    pieceType: 'bracelet',
  },
  {
    id: 'earrings',
    slug: 'earrings',
    name: 'التراكي',
    description: 'تراكي ذهبية تكمل الأطقم وتناسب الهدايا والمناسبات.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000321216-600x800.jpg',
    pieceType: 'earrings',
  },
  {
    id: 'rings',
    slug: 'rings',
    name: 'الخواتم',
    description: 'خواتم ذهب عيار 21 مستوحاة من خطوط الأطقم الأساسية.',
    image: 'https://www.alsayeghfactory.com/wp-content/uploads/2026/06/1000321219-600x800.jpg',
    pieceType: 'ring',
  },
]

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

const productImages = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85',
]

type SetPieceSeed = {
  kind: 'مزناط' | 'تراكي' | 'خاتم' | 'بنجل' | 'قلادة' | 'سوار'
  weight: number
  price: number
  image?: string
}

type SetSeed = {
  id: string
  slug: string
  name: string
  note?: string
  range: string
  image: string
  detailImages: string[]
  pieces: SetPieceSeed[]
  featured?: boolean
}

const alsayeghImage = (file: string) =>
  `https://www.alsayeghfactory.com/wp-content/uploads/2026/06/${file}`

const setCatalog: SetSeed[] = [
  {
    id: 'khatmah',
    slug: 'khatmah',
    name: 'طقم خَتْمَة',
    range: 'نطاق السعر من 673.20 د.ب إلى 3641.00 د.ب',
    image: alsayeghImage('1000321217-1-600x800.jpg'),
    detailImages: [alsayeghImage('1000321217-1-600x800.jpg'), alsayeghImage('1000321204-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 65, price: 3641, image: alsayeghImage('1000321217-600x800.jpg') },
      { kind: 'تراكي', weight: 20, price: 1122, image: alsayeghImage('1000321216-600x800.jpg') },
      { kind: 'خاتم', weight: 12, price: 673.2, image: alsayeghImage('1000321219-600x800.jpg') },
    ],
    featured: true,
  },
  {
    id: 'jori-petals',
    slug: 'jori-petals',
    name: 'طقم بَتَلات الجُوري',
    range: 'نطاق السعر من 673.20 د.ب إلى 3641.00 د.ب',
    image: alsayeghImage('1000321180-600x720.jpg'),
    detailImages: [alsayeghImage('1000321180-600x720.jpg'), alsayeghImage('1000321183-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 65, price: 3641, image: alsayeghImage('1000321197.jpg') },
      { kind: 'تراكي', weight: 20, price: 1122, image: alsayeghImage('1000321181-600x800.jpg') },
      { kind: 'خاتم', weight: 12, price: 673.2, image: alsayeghImage('1000321195-600x800.jpg') },
    ],
    featured: true,
  },
  {
    id: 'taj-jaber-nano',
    slug: 'taj-jaber-nano',
    name: 'طقم دقة تاج جابر النانو',
    range: 'نطاق السعر من 363.00 د.ب إلى 1683.00 د.ب',
    image: alsayeghImage('1000321172-600x800.jpg'),
    detailImages: [alsayeghImage('1000321172-600x800.jpg'), alsayeghImage('1000321168-600x721.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 30, price: 1683 },
      { kind: 'تراكي', weight: 10, price: 561 },
      { kind: 'خاتم', weight: 6, price: 363 },
    ],
    featured: true,
  },
  {
    id: 'mirkaah',
    slug: 'mirkaah',
    name: 'طقم مِرْكاة',
    note: 'مستوحى من اسم السلم أو الدرج قديماً.',
    range: 'نطاق السعر من 319.00 د.ب إلى 1683.00 د.ب',
    image: alsayeghImage('1000320779-600x800.jpg'),
    detailImages: [alsayeghImage('1000320779-600x800.jpg'), alsayeghImage('1000320780-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 30, price: 1683 },
      { kind: 'تراكي', weight: 9, price: 504.9 },
      { kind: 'خاتم', weight: 5, price: 319 },
      { kind: 'بنجل', weight: 30, price: 1683 },
    ],
  },
  {
    id: 'hayam',
    slug: 'hayam',
    name: 'طقم الهيام',
    range: 'نطاق السعر من 673.20 د.ب إلى 4180.00 د.ب',
    image: alsayeghImage('1000320770-1-600x719.jpg'),
    detailImages: [alsayeghImage('1000320770-1-600x719.jpg'), alsayeghImage('1000320774-1-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 55, price: 3085.5 },
      { kind: 'تراكي', weight: 22, price: 1234.2 },
      { kind: 'بنجل', weight: 60, price: 3366 },
      { kind: 'قلادة', weight: 75, price: 4180 },
      { kind: 'خاتم', weight: 12, price: 673.2 },
    ],
  },
  {
    id: 'soljan',
    slug: 'soljan',
    name: 'طقم الصولجان',
    range: 'نطاق السعر من 561.00 د.ب إلى 4180.00 د.ب',
    image: alsayeghImage('1000319724-600x800.jpg'),
    detailImages: [alsayeghImage('1000319724-600x800.jpg'), alsayeghImage('1000319726-1-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 50, price: 2805 },
      { kind: 'تراكي', weight: 22, price: 1234.2 },
      { kind: 'بنجل', weight: 50, price: 2805 },
      { kind: 'قلادة', weight: 75, price: 4180 },
      { kind: 'خاتم', weight: 10, price: 561 },
    ],
  },
  {
    id: 'jadeel',
    slug: 'jadeel',
    name: 'طقم جَدِيل',
    range: 'نطاق السعر من 407.00 د.ب إلى 2244.00 د.ب',
    image: alsayeghImage('1000320682-600x800.jpg'),
    detailImages: [alsayeghImage('1000320682-600x800.jpg'), alsayeghImage('1000320691-1-600x722.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 40, price: 2244 },
      { kind: 'تراكي', weight: 10, price: 561 },
      { kind: 'خاتم', weight: 7, price: 407 },
    ],
  },
  {
    id: 'asayel',
    slug: 'asayel',
    name: 'طقم الأصايل',
    range: 'نطاق السعر من 1402.50 د.ب إلى 18700.00 د.ب',
    image: alsayeghImage('1000320648-600x800.jpg'),
    detailImages: [alsayeghImage('1000320648-600x800.jpg'), alsayeghImage('1000320671-1-600x800.jpg')],
    pieces: [
      { kind: 'مزناط', weight: 50, price: 2805 },
      { kind: 'تراكي', weight: 25, price: 1402.5 },
      { kind: 'بنجل', weight: 75, price: 4207.5 },
      { kind: 'قلادة', weight: 340, price: 18700 },
    ],
  },
]

const pieceMeta: Record<SetPieceSeed['kind'], { categoryId: string; pieceType: PieceType; collectionId: string }> = {
  مزناط: { categoryId: 'mazanat', pieceType: 'other', collectionId: 'heritage' },
  تراكي: { categoryId: 'earrings', pieceType: 'earrings', collectionId: 'danah' },
  خاتم: { categoryId: 'rings', pieceType: 'ring', collectionId: 'daily' },
  بنجل: { categoryId: 'bracelets', pieceType: 'bangle', collectionId: 'gulf' },
  قلادة: { categoryId: 'necklaces', pieceType: 'necklace', collectionId: 'royal' },
  سوار: { categoryId: 'bracelets', pieceType: 'bracelet', collectionId: 'gulf' },
}

const fallbackPieceImages: Record<SetPieceSeed['kind'], string> = {
  مزناط: alsayeghImage('1000321217-600x800.jpg'),
  تراكي: alsayeghImage('1000321216-600x800.jpg'),
  خاتم: alsayeghImage('1000321219-600x800.jpg'),
  بنجل: alsayeghImage('1000320774-1-600x800.jpg'),
  قلادة: alsayeghImage('1000313039-900x600.jpg'),
  سوار: productImages[3],
}

const productFromSet = (set: SetSeed, setIndex: number): Product => {
  const totalWeight = set.pieces.reduce((sum, piece) => sum + piece.weight, 0)
  const totalPrice = set.pieces.reduce((sum, piece) => sum + piece.price, 0)

  return {
    id: `set-product-${set.id}`,
    slug: `set-${set.slug}`,
    name: set.name,
    shortDescription: `${set.range}. ${set.note ?? 'طقم ذهب عيار 21 بتصميم تراثي بحريني.'}`,
    description:
      `${set.name} من مصنع الصايغ للمجوهرات. ${set.range}. ` +
      `يشمل ${set.pieces.map((piece) => `${piece.kind} ${piece.weight} غرام`).join('، ')}. ` +
      (set.note ? `${set.note} ` : '') +
      'يمكن شراء الطقم كاملاً أو اختيار القطع المناسبة لتكوين طقم مخصص.',
    sku: `SET-${String(setIndex + 1).padStart(3, '0')}`,
    categoryId: 'sets',
    collectionId: setIndex < 2 ? 'royal' : setIndex % 2 ? 'heritage' : 'gulf',
    productType: 'set',
    pieceType: 'other',
    karat: 21,
    weight: Number(totalWeight.toFixed(1)),
    price: Number(totalPrice.toFixed(2)),
    images: set.detailImages,
    badges: [set.featured ? 'جديدنا' : '', setIndex % 2 === 0 ? 'قابل للتخصيص' : 'قطع منفصلة'].filter(Boolean),
    stock: 3 + setIndex,
    branchIds: ['bahrain-mall', 'manama-souq', 'riffa'],
    relatedProductIds: set.pieces.map((_, pieceIndex) => `${set.id}-${pieceIndex + 1}`),
    setId: set.id,
    canBePurchasedSeparately: true,
    canBeAddedToCustomSet: false,
    styleTags: ['تراثي', 'ذهب عيار 21', 'أطقم الصايغ'],
    compatibilityTags: ['sets', set.id],
    isFeatured: setIndex < 6,
    isNew: setIndex < 3,
    isBestSeller: setIndex === 0 || setIndex === 1 || setIndex === 7,
  }
}

const productsFromPieces = (set: SetSeed, setIndex: number): Product[] =>
  set.pieces.map((piece, pieceIndex) => {
    const meta = pieceMeta[piece.kind]
    const image = piece.image ?? fallbackPieceImages[piece.kind]
    return {
      id: `${set.id}-${pieceIndex + 1}`,
      slug: `${set.slug}-${piece.kind}`,
      name: `${piece.kind} ${set.name.replace('طقم ', '')}`,
      shortDescription: `${piece.kind} من ${set.name} بوزن ${piece.weight} غرام.`,
      description:
        `${piece.kind} ذهب عيار 21 من ${set.name}. الوزن ${piece.weight} غرام والسعر ${piece.price.toFixed(2)} د.ب. ` +
        'يمكن إضافتها لطقم مخصص أو شراؤها كقطعة منفصلة حسب التوفر.',
      sku: `${piece.kind === 'مزناط' ? 'MZN' : piece.kind === 'تراكي' ? 'TRK' : piece.kind === 'خاتم' ? 'RNG' : piece.kind === 'قلادة' ? 'NCK' : 'BGL'}-${setIndex + 1}${pieceIndex + 1}`,
      categoryId: meta.categoryId,
      collectionId: meta.collectionId,
      productType: 'set-item',
      pieceType: meta.pieceType,
      karat: 21,
      weight: piece.weight,
      price: piece.price,
      images: [image, set.image],
      badges: [pieceIndex === 0 ? 'من طقم كامل' : '', set.featured ? 'جديد' : ''].filter(Boolean),
      stock: 4 + ((setIndex + pieceIndex) % 5),
      branchIds: ['bahrain-mall', 'manama-souq', 'riffa'],
      relatedProductIds: [`set-product-${set.id}`],
      setId: set.id,
      canBePurchasedSeparately: true,
      canBeAddedToCustomSet: true,
      styleTags: ['تراثي', piece.kind, 'عيار 21'],
      compatibilityTags: [set.id, meta.categoryId],
      isFeatured: setIndex < 2,
      isNew: setIndex < 3,
      isBestSeller: setIndex === 0 || setIndex === 1,
    }
  })

export const products: Product[] = setCatalog.flatMap((set, index) => [
  productFromSet(set, index),
  ...productsFromPieces(set, index),
])

export const jewelrySets: JewelrySet[] = setCatalog.map((set, index) => ({
  id: set.id,
  slug: set.slug,
  name: set.name,
  description:
    `${set.range}. ${set.note ?? 'طقم ذهب عيار 21 من مجموعات الصايغ.'} ` +
    `يشمل ${set.pieces.map((piece) => `${piece.kind} ${piece.weight} غرام`).join('، ')}.`,
  image: set.image,
  productIds: set.pieces.map((_, pieceIndex) => `${set.id}-${pieceIndex + 1}`),
  canPurchaseFullSet: true,
  canPurchaseItemsSeparately: true,
  canCustomize: true,
  discountPercentage: index === 0 || index === 1 ? 5 : undefined,
}))

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
