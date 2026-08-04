import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronDown,
  Clock3,
  CreditCard,
  Gem,
  GripVertical,
  Heart,
  Headphones,
  CalendarDays,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Paperclip,
  PackageCheck,
  Plus,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  UserRound,
  Navigation,
  Phone,
  X,
} from 'lucide-react'
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {
  asset,
  branches,
  categories,
  collections,
  formatPrice,
  getCategory,
  getProduct,
  jewelrySets,
  products,
  team,
  testimonials,
  type Product,
} from './data'
import { useStore, type CartItem } from './store'
import { LeadershipPage } from './components/leadership/LeadershipPage'

const navItems = [
  ['/', 'الرئيسية'],
  ['/products', 'المنتجات'],
  ['/collections', 'المجموعات'],
  ['/sets', 'الأطقم'],
  ['/factory', 'عن المصنع'],
  ['/branches', 'الفروع'],
  ['/contact', 'تواصل معنا'],
]

const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')
const brandLogoPath = `${import.meta.env.BASE_URL}logo21-horizontal.png`

function SEOHead({ title, description }: { title: string; description: string }) {
  return (
    <Helmet>
      <title>{title} | مصنع الصايغ للمجوهرات</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | مصنع الصايغ للمجوهرات`} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href="https://demo.alsayegh.example/" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'JewelryStore',
          name: 'مصنع الصايغ للمجوهرات',
          address: 'البحرين',
          makesOffer: products.slice(0, 6).map((product) => product.name),
        })}
      </script>
    </Helmet>
  )
}

function PriceDisplay({ product }: { product: Product }) {
  return (
    <div className="price">
      {product.oldPrice ? <span>{formatPrice(product.oldPrice)}</span> : null}
      <strong>{formatPrice(product.price)}</strong>
    </div>
  )
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? 'brand-logo compact' : 'brand-logo'} src={brandLogoPath} alt="Al Sayegh" />
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cart, wishlist } = useStore()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
        <header className="site-header">
          <Link to="/" className="brand" aria-label="مصنع الصايغ للمجوهرات">
          <BrandLogo />
        </Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navItems.map(([href, label]) => (
            <NavLink key={href} to={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button aria-label="بحث" className="icon-button" onClick={() => setSearchOpen(true)}>
            <Search />
          </button>
          <button aria-label="حساب المستخدم" className="icon-button">
            <UserRound />
          </button>
          <Link aria-label="المفضلة" className="icon-button badge-button" to="/wishlist">
            <Heart />
            <span>{wishlist.length}</span>
          </Link>
          <Link aria-label="السلة" className="icon-button badge-button" to="/cart">
            <ShoppingBag />
            <span>{cart.length}</span>
          </Link>
          <button aria-label="فتح القائمة" className="icon-button mobile-only" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              className="mobile-menu"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-menu-head">
                <span>
                  <strong>مصنع الصايغ</strong>
                  <small>Alsayegh Factory</small>
                </span>
                <button aria-label="إغلاق القائمة" className="icon-button" onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="mobile-menu-shortcuts">
                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  <Heart size={18} />
                  المفضلة
                  <b>{wishlist.length}</b>
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  <ShoppingBag size={18} />
                  السلة
                  <b>{cart.length}</b>
                </Link>
              </div>
              <nav aria-label="قائمة الهاتف">
                {navItems.map(([href, label]) => (
                  <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}>
                    {label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        ) : null}
        {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
      </AnimatePresence>
    </>
  )
}

function RouteScrollReset() {
  const location = useLocation()

  useEffect(() => {
    document.documentElement.scrollLeft = 0
    document.body.scrollLeft = 0
  }, [location.pathname])

  return null
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [term, setTerm] = useState('')
  const addSearch = useStore((state) => state.addSearch)
  const history = useStore((state) => state.searchHistory)
  const navigate = useNavigate()
  const results = products
    .filter((product) => product.name.includes(term) || product.sku.includes(term))
    .slice(0, 6)

  const submit = () => {
    addSearch(term)
    navigate(`/products?search=${encodeURIComponent(term)}`)
    onClose()
  }

  return (
    <motion.div className="search-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="search-box">
        <button aria-label="إغلاق البحث" className="icon-button" onClick={onClose}>
          <X />
        </button>
        <label htmlFor="search">ابحث عن قطعة أو رقم منتج</label>
        <div className="search-input">
          <input id="search" autoFocus value={term} onChange={(event) => setTerm(event.target.value)} />
          <button onClick={submit}>بحث</button>
        </div>
        {history.length ? <p className="muted">عمليات بحث سابقة: {history.join('، ')}</p> : null}
        <div className="mini-list">
          {(term ? results : products.slice(0, 4)).map((product) => (
            <Link key={product.id} to={`/products/${product.slug}`} onClick={onClose}>
              <img src={product.images[0]} alt={product.name} />
              <span>{product.name}</span>
              <strong>{formatPrice(product.price)}</strong>
            </Link>
          ))}
          {term && !results.length ? <EmptyState title="لا توجد نتائج" text="جرّب كلمة بحث أخرى أو تصفح التصنيفات." /> : null}
        </div>
      </div>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="brand footer-brand">
          <BrandLogo compact />
          <span><strong>مصنع الصايغ</strong><small>ذهب عيار 21 منذ 1783</small></span>
        </div>
        <p>متجر تجريبي عربي فاخر يعرض منتجات ومجموعات وأطقم الصايغ ببيانات قابلة للتعديل.</p>
      </div>
      <FooterColumn title="روابط المتجر" links={['المنتجات', 'الأطقم', 'المفضلة', 'السلة']} />
      <FooterColumn title="الشركة" links={['عن المصنع', 'الفروع', 'تواصل معنا']} />
      <FooterColumn title="التواصل" links={['واتساب: +973 3999 1122', 'البريد: info@alsayegh.example', 'سياسة الخصوصية', 'الشروط والأحكام', 'الاستبدال والاسترجاع']} />
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-col">
      <h3>{title}</h3>
      {links.map((link) => <span key={link}>{link}</span>)}
    </div>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const isFavorite = wishlist.includes(product.id)
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/products/${product.slug}`} className="product-image-link" aria-label={`تفاصيل ${product.name}`}>
          <img src={product.images[0]} alt={product.name} onError={(event) => { event.currentTarget.src = asset.fallback }} />
        </Link>
        <div className="product-quick-actions" aria-label="إجراءات سريعة">
          <button
            aria-label={isFavorite ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}
            className={isFavorite ? 'quick-fav active' : 'quick-fav'}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={18} />
          </button>
          <button
            className="quick-cart"
            aria-label={product.stock ? 'أضف للسلة' : 'غير متوفر'}
            title={product.stock ? 'أضف للسلة' : 'غير متوفر'}
            disabled={!product.stock}
            onClick={() => addToCart({ type: 'product', productId: product.id })}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
      <div className="product-body">
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <PriceDisplay product={product} />
      </div>
    </article>
  )
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <EmptyState title="لا توجد منتجات مطابقة" text="عدّل خيارات التصفية أو امسح البحث الحالي." />
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}

const heroFilmImage = (image: string) => image
  .replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp)$)/i, '')
  .replace(/w=\d+/i, 'w=1800')

const hiddenHeroFilmImages = ['1000321217-1', '1000321180']

function BrandFilmHero() {
  const filmImages = Array.from(new Set([
    ...jewelrySets.map((set) => set.image),
    ...categories.filter((category) => category.id !== 'rings' && category.id !== 'earrings').map((category) => category.image),
    ...collections.slice(0, 5).map((collection) => collection.image),
    ...branches.slice(0, 2).map((branch) => branch.image),
  ].filter(Boolean).map(heroFilmImage).filter((image) => !hiddenHeroFilmImages.some((hidden) => image.includes(hidden))) as string[])).slice(0, 10)
  const filmTiming = {
    '--frame-count': filmImages.length,
    '--film-step': `${20 / Math.max(filmImages.length, 1)}s`,
  } as CSSProperties

  return (
    <section className="brand-film-hero" aria-label="فيلم صور مصنع الصايغ" style={filmTiming}>
      <div className="brand-film-stage" aria-hidden="true">
        {filmImages.map((image, index) => (
          <figure key={image} className="brand-film-frame" style={{ '--frame-index': index } as CSSProperties}>
            <img src={image} alt="" />
          </figure>
        ))}
        <div className="brand-film-grain" />
      </div>
    </section>
  )
}

function HomePage() {
  const featured = products.filter((product) => product.isFeatured)
  return (
    <motion.main {...pageMotion}>
      <SEOHead title="الرئيسية" description="متجر عربي تجريبي فاخر لمصنع الصايغ للمجوهرات في البحرين." />
      <BrandFilmHero />
      <TrustBar />
      <section className="band">
        <SectionHeading eyebrow="التصنيفات" title="اختر القطع التي تناسب ذوقك" />
        <div className="category-grid">{categories.map((category) => <CategoryCard key={category.id} category={category} />)}</div>
      </section>
      <section className="band ivory">
        <SectionHeading eyebrow="منتجات مميزة" title="ذهب عيار 21 بتفاصيل موثقة" text="السعر يتغير حسب وزن القطعة وسعر الذهب." />
        <ProductGrid items={featured} />
      </section>
      <BuilderPromo />
      <FactoryBand />
      <Timeline />
      <TeamPreview />
      <Testimonials />
    </motion.main>
  )
}

function TrustBar() {
  const items = [
    ['منذ 1783', Award],
    ['ذهب عيار 21', Gem],
    ['أكثر من 45,000 تصميم', Sparkles],
    ['صناعة بحرينية', Building2],
    ['فحص وضمان الجودة', CheckCircle2],
    ['توصيل آمن', PackageCheck],
  ] as const
  return (
    <div className="trust-bar">{items.map(([text, Icon]) => <div key={text}><Icon /><span>{text}</span></div>)}</div>
  )
}

function CategoryCard({ category, to }: { category: { slug: string; name: string; description: string; image: string }; to?: string }) {
  return (
    <Link className="category-card" to={to ?? `/category/${category.slug}`}>
      <img src={category.image} alt={category.name} onError={(event) => { event.currentTarget.src = asset.fallback }} />
      <div><h3>{category.name}</h3><p>{category.description}</p></div>
    </Link>
  )
}

function BuilderPromo() {
  return (
    <section className="builder-promo">
      <div>
        <SectionHeading eyebrow="صمّم طقمك" title="صمّم طقماً يعكس ذوقك" text="اختر القطع التي تفضلها من مجموعات مختلفة، واجمعها في طقم واحد متناسق." />
        <div className="hero-actions"><Link to="/build-your-set">ابدأ تصميم طقمك</Link><Link to="/sets" className="secondary">تعرّف على الطريقة</Link></div>
      </div>
      <div className="set-preview">{products.slice(1, 5).map((product) => <img key={product.id} src={product.images[0]} alt={product.name} />)}</div>
    </section>
  )
}

function FactoryBand() {
  return (
    <section className="split-band">
      <img src={asset.factory} alt="صياغة مجوهرات ذهبية في المصنع" />
      <div>
        <SectionHeading eyebrow="المصنع" title="من الفكرة إلى قطعةٍ تُورث" text="داخل مصنع الصايغ تمر كل قطعة بمراحل دقيقة من التصميم والصياغة والفحص والتشطيب، لتصل إليك بجودة تليق بتاريخنا." />
        <ul className="check-list">{['تصميم داخلي', 'حرفيون متخصصون', 'فحص دقيق للعيار والوزن', 'تشطيب يدوي', 'إنتاج واسع للسوق المحلي والخليجي'].map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul>
        <Link className="text-link" to="/factory">اكتشف مصنعنا <ChevronLeft size={18} /></Link>
      </div>
    </section>
  )
}

function Timeline() {
  const entries = ['1783: بداية الحرفة', '1960: توسع الإنتاج', '1985: افتتاح المصنع الحديث', '2005: توسع في أسواق الخليج', 'اليوم: آلاف التصاميم وثلاثة فروع']
  return <section className="band"><SectionHeading eyebrow="القصة" title="محطات من تاريخ الصايغ" /><div className="timeline">{entries.map((entry) => <div key={entry}>{entry}</div>)}</div></section>
}

function TeamPreview() {
  return <section className="band ivory"><SectionHeading eyebrow="الإدارة" title="فريق يقود الحرفة بعناية" /><div className="team-grid">{team.slice(0, 4).map((member) => <TeamCard key={member.id} member={member} />)}</div></section>
}

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return <article className="team-card"><img src={member.image} alt={member.name} /><h3>{member.name}</h3><strong>{member.role}</strong><p>{member.bio}</p><Link to="/factory">عرض التفاصيل</Link></article>
}

function Testimonials() {
  return <section className="band"><SectionHeading eyebrow="آراء العملاء" title="تجربة عرض قريبة من المتجر الحقيقي" /><div className="testimonial-grid">{testimonials.map((text) => <article key={text}><Star /><p>{text}</p></article>)}</div></section>
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''
  const filtered = useMemo(() => {
    const base = products.filter((product) => {
      const matchesCategory = !category || product.categoryId === category
      const matchesSearch = !search || product.name.includes(search) || product.sku.includes(search)
      return matchesCategory && matchesSearch
    })
    return [...base].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : Number(b.isFeatured) - Number(a.isFeatured))
  }, [category, search, sort])

  return (
    <motion.main className="page" {...pageMotion}>
      <SEOHead title="جميع المنتجات" description="تصفح منتجات مصنع الصايغ للمجوهرات مع تصفية حسب التصنيف والسعر." />
      <PageHero title="جميع المنتجات" text="تصفح 40 قطعة تجريبية من ذهب عيار 21 مع السعر والوزن والتوفر." />
      <div className="catalog-layout">
        <aside className="filters">
          <h3><SlidersHorizontal /> التصفية</h3>
          <button className={!category ? 'selected' : ''} onClick={() => setSearchParams({})}>كل المنتجات</button>
          {categories.map((item) => <button key={item.id} className={category === item.id ? 'selected' : ''} onClick={() => setSearchParams({ category: item.id })}>{item.name}</button>)}
        </aside>
        <section>
          <div className="sort-row"><span>{filtered.length} منتج</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">المميز أولاً</option><option value="price-asc">السعر من الأقل</option><option value="price-desc">السعر من الأعلى</option></select></div>
          <ProductGrid items={filtered} />
        </section>
      </div>
    </motion.main>
  )
}

function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)
  const items = products.filter((product) => product.categoryId === category?.id)
  if (!category) return <NotFound />
  return <motion.main className="page" {...pageMotion}><SEOHead title={category.name} description={category.description} /><PageHero title={category.name} text={category.description} /><ProductGrid items={items} /></motion.main>
}

function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { addToCart, addToCustomSet, addRecentlyViewed } = useStore()
  useEffect(() => {
    if (product) addRecentlyViewed(product.id)
  }, [addRecentlyViewed, product])
  if (!product) return <NotFound />
  const related = product.relatedProductIds?.map((id) => products.find((item) => item.id === id)).filter(Boolean) as Product[]
  const whatsappText = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن منتج "${product.name}" برقم المنتج ${product.sku}.`)
  return (
    <motion.main className="page" {...pageMotion}>
      <SEOHead title={product.name} description={product.shortDescription} />
      <div className="breadcrumbs"><Link to="/">الرئيسية</Link><span>/</span><Link to="/products">المنتجات</Link><span>/</span><strong>{product.name}</strong></div>
      <section className="product-detail">
        <div className="gallery">
          {product.images.map((image) => (
            <button key={image} className="gallery-image-button" onClick={() => setPreviewImage(image)}>
              <img src={image} alt={product.name} />
              <span><Search size={18} /> عرض الصورة كاملة</span>
            </button>
          ))}
        </div>
        <div className="detail-panel">
          <p className="eyebrow">{product.sku}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-facts"><span>{product.weight} غرام</span><span>ذهب عيار {product.karat}</span><span>{product.stock ? 'متوفر في الفروع' : 'غير متوفر حالياً'}</span></div>
          <PriceDisplay product={product} />
          <p className="muted">السعر يتغير حسب وزن القطعة وسعر الذهب.</p>
          <div className="detail-actions">
            <button
              className="icon-only-cart"
              aria-label={product.stock ? 'أضف إلى السلة' : 'غير متوفر'}
              title={product.stock ? 'أضف إلى السلة' : 'غير متوفر'}
              disabled={!product.stock}
              onClick={() => addToCart({ type: 'product', productId: product.id })}
            >
              <ShoppingBag size={20} />
            </button>
            {product.canBeAddedToCustomSet ? <button className="secondary-button" onClick={() => addToCustomSet(product.id)}>اختر القطعة للطقم</button> : null}
            <a className="whatsapp" href={`https://wa.me/97339991122?text=${whatsappText}`} target="_blank" rel="noreferrer"><MessageCircle /> واتساب</a>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {previewImage ? (
          <motion.div
            className="image-preview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`صورة ${product.name} كاملة`}
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              className="image-preview-dialog"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="icon-button preview-close" aria-label="إغلاق الصورة" onClick={() => setPreviewImage(null)}>
                <X />
              </button>
              <img src={previewImage} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.weight} غرام · ذهب عيار {product.karat}</span>
                <button
                  className="icon-only-cart"
                  aria-label={product.stock ? 'أضف للسلة' : 'غير متوفر'}
                  title={product.stock ? 'أضف للسلة' : 'غير متوفر'}
                  disabled={!product.stock}
                  onClick={() => addToCart({ type: 'product', productId: product.id })}
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <section className="band"><SectionHeading eyebrow="منتجات ذات صلة" title="قطع تكمل اختيارك" /><ProductGrid items={related} /></section>
      <RecentlyViewed />
    </motion.main>
  )
}

function CollectionsPage() {
  return <motion.main className="page" {...pageMotion}><SEOHead title="المجموعات" description="مجموعات مصنع الصايغ التجريبية." /><PageHero title="المجموعات" text="كل مجموعة مصممة حول ذوق وقصة مختلفة." /><div className="category-grid">{collections.map((collection) => <CategoryCard key={collection.id} category={collection} to="/products" />)}</div></motion.main>
}

function SetsPage() {
  return <motion.main className="page" {...pageMotion}><SEOHead title="الأطقم" description="أطقم كاملة قابلة للشراء أو التخصيص." /><PageHero title="الأطقم" text="اشترِ الطقم كاملاً أو اختر قطعاً لطقمك الخاص." /><div className="sets-grid">{jewelrySets.map((set) => <SetCard key={set.id} set={set} />)}</div></motion.main>
}

function SetCard({ set }: { set: (typeof jewelrySets)[number] }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const addToCart = useStore((state) => state.addToCart)
  const items = set.productIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[]
  const total = items.reduce((sum, product) => sum + product.price, 0)
  const totalWeight = items.reduce((sum, product) => sum + product.weight, 0).toFixed(1)
  return (
    <>
      <article className="set-card set-card-premium">
        <div className="set-image-panel">
          <img src={set.image} alt={set.name} />
          <div className="set-badges">
            <span>قابل للتخصيص</span>
            {set.discountPercentage ? <span>الأكثر مبيعاً</span> : <span>جديد</span>}
          </div>
        </div>
        <div className="set-content-panel">
          <div>
            <h3>{set.name}</h3>
            <p>{set.description}</p>
          </div>
          <div className="set-facts">
            <span>ذهب عيار 21</span>
            <span>{items.length} قطع</span>
            <span>{totalWeight} غرام تقريباً</span>
          </div>
          <strong className="set-price">{formatPrice(total)}</strong>
          <div className="set-pieces clean-chips">
            {items.slice(0, 5).map((item) => <span key={item.id}>{item.name}</span>)}
          </div>
          <div className="set-actions">
            <button onClick={() => addToCart({ type: 'full-set', setId: set.id })}>
              <ShoppingBag size={18} />
              أضف الطقم كاملاً
            </button>
            <button className="secondary-button" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal size={18} />
              خصّص هذا الطقم
            </button>
            <small>اختر بعض القطع أو امزجها مع قطع من أطقم أخرى.</small>
          </div>
        </div>
      </article>
      <SetCustomizeDrawer set={set} items={items} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'summary'>('products')
  const [setName, setSetName] = useState('طقم المناسبات الفاخر')
  const [summaryOpen, setSummaryOpen] = useState(false)
  const {
    customSet,
    saveCustomSet,
    clearCustomSet,
    removeFromCustomSet,
    updateCustomSetQuantity,
  } = useStore()
  const selected = customSet
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter(Boolean) as SelectedSetEntry[]
  const total = selected.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const weight = selected.reduce((sum, item) => sum + item.product.weight * item.quantity, 0)
  const message = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن طقم مخصص باسم ${setName} يحتوي على: ${selected.map((item) => `${item.product.name} × ${item.quantity}`).join('، ')}. الوزن الإجمالي ${weight.toFixed(1)} غرام والسعر التقديري ${formatPrice(total)}.`)
  const hasItems = selected.length > 0
  const customSetProducts = products.filter((product) => product.canBeAddedToCustomSet).slice(0, 24)
  const saveCurrentSet = () => saveCustomSet(setName.trim() || 'طقم مخصص')

  return (
    <motion.main className="page" {...pageMotion}>
      <SEOHead title="صمّم طقمك" description="أداة تجريبية لتكوين طقم مجوهرات مخصص." />
      <PageHero title="صمّم طقمك الخاص" text="اختر قطعاً من التصنيفات المختلفة واحفظها كطقم مخصص." />
      <BuilderSteps selectedCount={selected.length} />
      <CustomSetTabs activeTab={activeTab} selectedCount={selected.length} onChange={setActiveTab} />
      <div className="builder-layout builder-layout-premium luxury-configurator">
        <section className="builder-products" id="builder-products">
          {activeTab === 'products' ? (
            <>
              <div className="builder-toolbar luxury-toolbar">
                <div>
                  <span>الخطوة الثانية</span>
                  <h2>استعرض القطع المناسبة</h2>
                  <p>اختر مزناطاً أو تراكي أو خاتماً من أطقم مختلفة، والملخص يتحدث فوراً.</p>
                </div>
                <Link to="/sets">عرض الأطقم الجاهزة</Link>
              </div>
              <ProductGrid items={customSetProducts} />
            </>
          ) : (
            <section className="custom-set-workspace" aria-label="أطقمي المخصصة">
              <div className="builder-toolbar luxury-toolbar">
                <div>
                  <span>طقمك الحالي</span>
                  <h2>القطع المختارة</h2>
                  <p>راجع القطع، عدّل الكميات، واحذف أو استبدل أي قطعة قبل الحفظ.</p>
                </div>
                <a href="#builder-products" onClick={() => setActiveTab('products')}>إضافة قطع أخرى</a>
              </div>
              {hasItems ? (
                <motion.div className="selected-products-stack" layout>
                  <AnimatePresence initial={false}>
                    {selected.map((item) => (
                      <SelectedProductCard
                        key={item.product.id}
                        item={item}
                        onQuantity={(quantity) => updateCustomSetQuantity(item.product.id, quantity)}
                        onRemove={() => removeFromCustomSet(item.product.id)}
                        onReplace={() => setActiveTab('products')}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <BuilderEmptyState onBrowse={() => setActiveTab('products')} />
              )}
              <AddMoreProductsCard onClick={() => setActiveTab('products')} />
            </section>
          )}
        </section>
        <StickySummary
          entries={selected}
          setName={setName}
          onNameChange={setSetName}
          total={total}
          weight={weight}
          message={message}
          isOpen={summaryOpen}
          onToggle={() => setSummaryOpen((current) => !current)}
          onAddToCart={saveCurrentSet}
          onSave={saveCurrentSet}
          onClear={clearCustomSet}
          hasItems={hasItems}
        />
      </div>
    </motion.main>
  )
}

type SelectedSetEntry = {
  product: Product
  quantity: number
}

function CustomSetTabs({
  activeTab,
  selectedCount,
  onChange,
}: {
  activeTab: 'products' | 'summary'
  selectedCount: number
  onChange: (tab: 'products' | 'summary') => void
}) {
  return (
    <nav className="custom-set-tabs" aria-label="تنقل أداة تصميم الطقم">
      <button className={activeTab === 'products' ? 'active' : ''} onClick={() => onChange('products')}>
        <Gem size={18} />
        القطع المفردة
      </button>
      <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => onChange('summary')}>
        <PackageCheck size={18} />
        أطقمي المخصصة
        <motion.span
          key={selectedCount}
          initial={{ scale: 0.72 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 18 }}
        >
          {selectedCount}
        </motion.span>
      </button>
    </nav>
  )
}

function CustomSetSummaryCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`custom-summary-card ${className}`}>{children}</div>
}

function StickySummary({
  entries,
  setName,
  onNameChange,
  total,
  weight,
  message,
  isOpen,
  onToggle,
  onAddToCart,
  onSave,
  onClear,
  hasItems,
}: {
  entries: SelectedSetEntry[]
  setName: string
  onNameChange: (name: string) => void
  total: number
  weight: number
  message: string
  isOpen: boolean
  onToggle: () => void
  onAddToCart: () => void
  onSave: () => void
  onClear: () => void
  hasItems: boolean
}) {
  return (
    <>
      <aside className="sticky-summary-desktop">
        <CustomSetSummary
          entries={entries}
          setName={setName}
          onNameChange={onNameChange}
          total={total}
          weight={weight}
          message={message}
          onAddToCart={onAddToCart}
          onSave={onSave}
          onClear={onClear}
          hasItems={hasItems}
        />
      </aside>
      <aside className={isOpen ? 'sticky-summary-mobile open' : 'sticky-summary-mobile'}>
        <button className="mobile-summary-handle" onClick={onToggle} aria-expanded={isOpen}>
          <span />
          <strong>طقمك</strong>
          <small>{entries.length} قطع</small>
          <b>{formatPrice(total)}</b>
        </button>
        <AnimatePresence>
          {isOpen ? (
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
              <CustomSetSummary
                entries={entries}
                setName={setName}
                onNameChange={onNameChange}
                total={total}
                weight={weight}
                message={message}
                onAddToCart={onAddToCart}
                onSave={onSave}
                onClear={onClear}
                hasItems={hasItems}
                compact
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </aside>
    </>
  )
}

function CustomSetSummary({
  entries,
  setName,
  onNameChange,
  total,
  weight,
  message,
  onAddToCart,
  onSave,
  onClear,
  hasItems,
  compact = false,
}: {
  entries: SelectedSetEntry[]
  setName: string
  onNameChange: (name: string) => void
  total: number
  weight: number
  message: string
  onAddToCart: () => void
  onSave: () => void
  onClear: () => void
  hasItems: boolean
  compact?: boolean
}) {
  return (
    <motion.div className="custom-set-summary" layout>
      <header>
        <span>ملخص طقمك</span>
        <strong>{entries.length ? `${entries.length} قطع مختارة` : 'ابدأ بالاختيار'}</strong>
      </header>
      <CustomSetSummaryCard className="set-name-card">
        <label htmlFor={compact ? 'mobile-set-name' : 'set-name'}>اسم الطقم</label>
        <div>
          <input
            id={compact ? 'mobile-set-name' : 'set-name'}
            value={setName}
            onChange={(event) => onNameChange(event.target.value)}
          />
          <SlidersHorizontal size={17} />
        </div>
      </CustomSetSummaryCard>
      <SummaryStatistics entries={entries} total={total} weight={weight} />
      <SummaryActions onAddToCart={onAddToCart} onSave={onSave} onClear={onClear} hasItems={hasItems} />
      <p className="summary-notice">السعر تقديري وقد يتغير حسب الوزن النهائي وسعر الذهب يوم الشراء.</p>
      <WhatsAppConsultationCard message={message} />
      {compact && entries.length ? (
        <div className="mobile-summary-products">
          {entries.map((item) => (
            <div key={item.product.id}>
              <img src={item.product.images[0]} alt={item.product.name} />
              <span>{item.product.name}</span>
              <strong>× {item.quantity}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </motion.div>
  )
}

function SummaryStatistics({
  entries,
  total,
  weight,
}: {
  entries: SelectedSetEntry[]
  total: number
  weight: number
}) {
  const pieceCount = entries.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <CustomSetSummaryCard className="summary-statistics">
      <div>
        <PackageCheck />
        <span>إجمالي القطع</span>
        <strong>{pieceCount}</strong>
      </div>
      <div>
        <Gem />
        <span>إجمالي الوزن</span>
        <strong>{weight.toFixed(1)} غرام</strong>
      </div>
      <div>
        <ShoppingBag />
        <span>السعر التقديري</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </CustomSetSummaryCard>
  )
}

function SummaryActions({
  onAddToCart,
  onSave,
  onClear,
  hasItems,
}: {
  onAddToCart: () => void
  onSave: () => void
  onClear: () => void
  hasItems: boolean
}) {
  return (
    <div className="summary-actions">
      <button onClick={onAddToCart} disabled={!hasItems}>
        <ShoppingBag size={18} />
        أضف الطقم إلى السلة
      </button>
      <Link to="/build-your-set" className="summary-outline">
        <SlidersHorizontal size={18} />
        الانتقال إلى أداة تصميم الطقم
      </Link>
      <button className="summary-ghost" onClick={onSave} disabled={!hasItems}>
        <Paperclip size={18} />
        حفظ الطقم للمستقبل
      </button>
      <button className="summary-clear" onClick={onClear} disabled={!hasItems}>
        تفريغ الاختيارات
      </button>
    </div>
  )
}

function WhatsAppConsultationCard({ message }: { message: string }) {
  return (
    <CustomSetSummaryCard className="whatsapp-consultation-card">
      <span>Need help?</span>
      <strong>تحدث مع مستشار المجوهرات</strong>
      <a href={`https://wa.me/97339991122?text=${message}`} target="_blank" rel="noreferrer">
        <MessageCircle size={18} />
        واتساب
      </a>
    </CustomSetSummaryCard>
  )
}

function SelectedProductCard({
  item,
  onQuantity,
  onRemove,
  onReplace,
}: {
  item: SelectedSetEntry
  onQuantity: (quantity: number) => void
  onRemove: () => void
  onReplace: () => void
}) {
  return (
    <motion.article
      className="selected-product-card"
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.97 }}
      whileHover={{ y: -3 }}
    >
      <div className="selected-product-tools">
        <button aria-label="تحريك القطعة" title="تحريك القطعة">
          <Menu size={17} />
        </button>
        <button aria-label="حذف القطعة" title="حذف القطعة" onClick={onRemove}>
          <Trash2 size={17} />
        </button>
      </div>
      <div className="selected-product-info">
        <span>{getCategory(item.product.categoryId)?.name ?? 'قطعة ذهبية'}</span>
        <h3>{item.product.name}</h3>
        <div className="selected-product-badges">
          <b>{item.product.weight} غرام</b>
          <b>ذهب عيار {item.product.karat}</b>
          <b>{formatPrice(item.product.price)}</b>
        </div>
        <div className="selected-product-bottom">
          <QuantityStepper value={item.quantity} onChange={onQuantity} />
          <button onClick={onReplace}>
            <SlidersHorizontal size={16} />
            استبدال
          </button>
        </div>
      </div>
      <div className="selected-product-thumb">
        <img src={item.product.images[0]} alt={item.product.name} />
      </div>
    </motion.article>
  )
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (quantity: number) => void }) {
  return (
    <div className="quantity-stepper" aria-label="تحديد الكمية">
      <button onClick={() => onChange(value - 1)} aria-label="تقليل الكمية">
        <Minus size={15} />
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="زيادة الكمية">
        <Plus size={15} />
      </button>
    </div>
  )
}

function AddMoreProductsCard({ onClick }: { onClick: () => void }) {
  return (
    <button className="add-more-products-card" onClick={onClick}>
      <span><Plus /></span>
      <strong>أضف قطعاً من أطقم أخرى</strong>
      <small>استعرض المزيد من القطع من أطقم مختلفة وأضفها إلى طقمك.</small>
    </button>
  )
}

function BuilderEmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="builder-empty luxury-builder-empty">
      <Gem />
      <h3>لم تضف أي قطعة بعد</h3>
      <p>ابدأ باختيار القطع التي تناسب ذوقك وسيظهر الملخص هنا فوراً.</p>
      <button onClick={onBrowse}>استعرض القطع</button>
    </div>
  )
}

function BuilderSteps({ selectedCount }: { selectedCount: number }) {
  const steps = ['اختر نوع القطع', 'اختر القطع', 'راجع طقمك', 'الملخص']
  const active = selectedCount ? 2 : 1
  return (
    <div className="builder-steps" aria-label="خطوات تصميم الطقم">
      {steps.map((step, index) => (
        <div key={step} className={index < active ? 'done' : index === active ? 'active' : ''}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  )
}

function SetCustomizeDrawer({
  set,
  items,
  open,
  onClose,
}: {
  set: (typeof jewelrySets)[number]
  items: Product[]
  open: boolean
  onClose: () => void
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>(items.map((item) => item.id))
  const addManyToCustomSet = useStore((state) => state.addManyToCustomSet)
  const navigate = useNavigate()
  const selected = items.filter((item) => selectedIds.includes(item.id))
  const total = selected.reduce((sum, product) => sum + product.price, 0)
  const weight = selected.reduce((sum, product) => sum + product.weight, 0).toFixed(1)

  useEffect(() => {
    if (open) setSelectedIds(items.map((item) => item.id))
  }, [items, open])

  const toggle = (productId: string) => {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const addSelected = () => {
    addManyToCustomSet(selectedIds)
    onClose()
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="drawer-backdrop set-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.aside
            className="set-custom-drawer"
            initial={{ x: 460 }}
            animate={{ x: 0 }}
            exit={{ x: 460 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="set-custom-title"
          >
            <header>
              <button aria-label="إغلاق" className="icon-button" onClick={onClose}><X /></button>
              <div>
                <h2 id="set-custom-title">خصّص طقمك</h2>
                <p>اختر القطع التي ترغب بها من هذا الطقم</p>
              </div>
            </header>
            <div className="drawer-set-name">{set.name}</div>
            <div className="drawer-pieces">
              {items.map((product) => {
                const selectedItem = selectedIds.includes(product.id)
                return (
                  <button
                    key={product.id}
                    className={selectedItem ? 'drawer-piece selected' : 'drawer-piece'}
                    onClick={() => toggle(product.id)}
                    aria-pressed={selectedItem}
                  >
                    <img src={product.images[0]} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{categories.find((category) => category.id === product.categoryId)?.name}</span>
                      <span>{product.weight} غرام</span>
                      <b>{formatPrice(product.price)}</b>
                    </div>
                    {selectedItem ? <CheckCircle2 /> : null}
                  </button>
                )
              })}
            </div>
            <Link className="drawer-browse-more" to="/sets" onClick={onClose}>
              استعرض قطعاً من أطقم أخرى
            </Link>
            <footer>
              <div className="drawer-summary">
                <span>القطع المختارة <strong>{selected.length}</strong></span>
                <span>إجمالي الوزن <strong>{weight} غرام</strong></span>
                <span>السعر التقديري <strong>{formatPrice(total)}</strong></span>
              </div>
              <p>السعر تقديري وقد يتغير حسب الوزن النهائي وسعر الذهب يوم الشراء.</p>
              <button onClick={addSelected}>أضف القطع المختارة إلى طقمي</button>
              <button className="secondary-button" onClick={() => { addSelected(); navigate('/build-your-set') }}>
                انتقل إلى أداة تصميم الطقم
              </button>
            </footer>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, toggleWishlist, wishlist } = useStore()
  const total = cart.reduce((sum, item) => sum + cartItemPrice(item) * item.quantity, 0)
  const pieceCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalWeight = cart.reduce((sum, item) => sum + cartItemWeight(item) * item.quantity, 0)
  const clearCart = () => cart.forEach((item) => removeFromCart(item.id))

  return (
    <motion.main className="cart-page" {...pageMotion}>
      <SEOHead title="السلة" description="مراجعة السلة التجريبية." />
      <CartPageHeader />
      {!cart.length ? (
        <EmptyCartState />
      ) : (
        <>
          <section className="luxury-cart-layout">
            <CartSummary total={total} pieceCount={pieceCount} totalWeight={totalWeight} />
            <section className="cart-items-section" aria-label="محتويات السلة">
              <header>
                <div>
                  <span>اختياراتك</span>
                  <h2>محتويات السلة ({cart.length})</h2>
                </div>
                <button className="cart-delete-all" onClick={clearCart}>
                  <Trash2 size={17} />
                  حذف الكل
                </button>
              </header>
              <motion.div className="cart-items-stack" layout>
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      onQuantity={updateCartQuantity}
                      onToggleWishlist={toggleWishlist}
                      wishlist={wishlist}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
              <ContinueShoppingCard />
            </section>
          </section>
          <CartFeatures />
        </>
      )}
    </motion.main>
  )
}

function cartItemPrice(item: CartItem) {
  if (item.productId) return products.find((product) => product.id === item.productId)?.price ?? 0
  if (item.setId) {
    const set = jewelrySets.find((entry) => entry.id === item.setId)
    return set?.productIds.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0) ?? 0
  }
  return item.customSet?.items.reduce((sum, entry) => sum + (products.find((product) => product.id === entry.productId)?.price ?? 0), 0) ?? 0
}

function cartItemWeight(item: CartItem) {
  if (item.productId) return products.find((product) => product.id === item.productId)?.weight ?? 0
  if (item.setId) {
    const set = jewelrySets.find((entry) => entry.id === item.setId)
    return set?.productIds.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.weight ?? 0), 0) ?? 0
  }
  return item.customSet?.items.reduce((sum, entry) => sum + (products.find((product) => product.id === entry.productId)?.weight ?? 0), 0) ?? 0
}

function cartItemDetails(item: CartItem) {
  const product = item.productId ? products.find((entry) => entry.id === item.productId) : undefined
  const set = item.setId ? jewelrySets.find((entry) => entry.id === item.setId) : undefined
  const title = product?.name ?? set?.name ?? item.customSet?.name ?? 'طقم مخصص'
  const image = product?.images[0] ?? set?.image ?? asset.fallback
  const category = product ? getCategory(product.categoryId)?.name : set ? 'طقم كامل' : 'طقم مخصص'
  const productId = product?.id
  return { product, set, title, image, category, productId }
}

function CartPageHeader() {
  return (
    <header className="cart-page-header">
      <span>مصنع الصايغ للمجوهرات</span>
      <h1>السلة</h1>
      <div aria-hidden="true"><span /><Gem /><span /></div>
      <p>راجع القطع المختارة قبل متابعة الطلب.</p>
    </header>
  )
}

function CartSummary({
  total,
  pieceCount,
  totalWeight,
}: {
  total: number
  pieceCount: number
  totalWeight: number
}) {
  return (
    <aside className="cart-summary-card" aria-label="ملخص الطلب">
      <span className="summary-label">عنوان</span>
      <h2>ملخص الطلب</h2>
      <div className="cart-summary-divider" />
      <SummaryRow icon={<PackageCheck />} label="عدد القطع" value={`${pieceCount}`} />
      <SummaryRow icon={<Gem />} label="إجمالي الوزن" value={`${totalWeight.toFixed(1)} غرام`} />
      <SummaryRow icon={<ShoppingBag />} label="السعر التقديري" value={formatPrice(total)} />
      <SummaryRow icon={<Truck />} label="التوصيل" value="يحدد لاحقاً" />
      <SummaryRow icon={<CreditCard />} label="الإجمالي" value={formatPrice(total)} highlight />
      <p className="cart-summary-notice">السعر تقديري ويعتمد على الوزن النهائي وسعر الذهب يوم الشراء.</p>
      <Link to="/checkout" className="cart-checkout-button">
        متابعة الدفع التجريبي
      </Link>
      <Link to="/products" className="cart-continue-link">
        متابعة التسوق
      </Link>
      <div className="secure-checkout-row">
        <LockKeyhole />
        <span>عملية دفع آمنة</span>
      </div>
    </aside>
  )
}

function SummaryRow({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: ReactNode
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={highlight ? 'cart-summary-row highlight' : 'cart-summary-row'}>
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

function CartItemCard({
  item,
  onRemove,
  onQuantity,
  onToggleWishlist,
  wishlist,
}: {
  item: CartItem
  onRemove: (id: string) => void
  onQuantity: (id: string, quantity: number) => void
  onToggleWishlist: (productId: string) => void
  wishlist: string[]
}) {
  const details = cartItemDetails(item)
  const price = cartItemPrice(item)
  const weight = cartItemWeight(item)
  const isFavorite = details.productId ? wishlist.includes(details.productId) : false

  return (
    <motion.article
      className="luxury-cart-item"
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 26 }}
      whileHover={{ y: -3 }}
    >
      <Link to={details.product ? `/products/${details.product.slug}` : details.set ? '/sets' : '/build-your-set'} className="cart-item-image">
        <img src={details.image} alt={details.title} />
      </Link>
      <div className="cart-item-info">
        <span>{details.category}</span>
        <h3>{details.title}</h3>
        <div>
          <b>ذهب عيار 21</b>
          <b>{weight.toFixed(1)} غرام</b>
        </div>
        <strong>{formatPrice(price)}</strong>
      </div>
      <QuantitySelector value={item.quantity} onChange={(quantity) => onQuantity(item.id, quantity)} />
      <CartActions
        canFavorite={Boolean(details.productId)}
        isFavorite={isFavorite}
        onFavorite={() => details.productId ? onToggleWishlist(details.productId) : undefined}
        onRemove={() => onRemove(item.id)}
      />
    </motion.article>
  )
}

function QuantitySelector({ value, onChange }: { value: number; onChange: (quantity: number) => void }) {
  return (
    <div className="cart-quantity-selector" aria-label="تحديد الكمية">
      <button onClick={() => onChange(value - 1)} aria-label="تقليل الكمية">
        <Minus size={16} />
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="زيادة الكمية">
        <Plus size={16} />
      </button>
    </div>
  )
}

function CartActions({
  canFavorite,
  isFavorite,
  onFavorite,
  onRemove,
}: {
  canFavorite: boolean
  isFavorite: boolean
  onFavorite: () => void | undefined
  onRemove: () => void
}) {
  return (
    <div className="cart-item-actions">
      <button aria-label="تحريك القطعة" title="تحريك القطعة">
        <GripVertical size={18} />
      </button>
      <button
        aria-label={isFavorite ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}
        title={isFavorite ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}
        disabled={!canFavorite}
        className={isFavorite ? 'active' : ''}
        onClick={onFavorite}
      >
        <Heart size={18} />
      </button>
      <button aria-label="حذف من السلة" title="حذف من السلة" onClick={onRemove}>
        <Trash2 size={18} />
      </button>
    </div>
  )
}

function ContinueShoppingCard() {
  return (
    <section className="continue-shopping-card">
      <ShoppingBag />
      <h3>تسوق المزيد</h3>
      <p>استعرض المزيد من المجموعات الفاخرة.</p>
      <Link to="/products">عرض المنتجات</Link>
    </section>
  )
}

function CartFeatures() {
  const features = [
    [ShieldCheck, 'ضمان الجودة', 'فحص دقيق للعيار والوزن قبل التسليم.'],
    [Truck, 'شحن آمن', 'تغليف فاخر يحافظ على القطعة أثناء التوصيل.'],
    [Gem, 'ذهب عيار 21', 'قطع مختارة من ذهب عيار 21 بتفاصيل واضحة.'],
    [RefreshCcw, 'استبدال واسترجاع', 'سياسة مرنة حسب حالة القطعة والطلب.'],
    [LockKeyhole, 'دفع آمن', 'تجربة دفع منظمة ومحاكاة آمنة داخل العرض.'],
  ] as const

  return (
    <section className="cart-features" aria-label="مميزات الطلب">
      {features.map(([Icon, title, text]) => (
        <article key={title}>
          <Icon />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  )
}

function EmptyCartState() {
  return (
    <section className="empty-cart-state">
      <div><Gem /></div>
      <h2>السلة فارغة</h2>
      <p>لم تقم بإضافة أي قطعة بعد.</p>
      <Link to="/products">استكشف المنتجات</Link>
    </section>
  )
}

function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist)
  const items = products.filter((product) => wishlist.includes(product.id))
  if (!items.length) return <EmptyPage title="المفضلة فارغة" text="احفظ القطع التي ترغب بمراجعتها لاحقاً." action="/products" actionText="تصفح المنتجات" />
  return <motion.main className="page" {...pageMotion}><SEOHead title="المفضلة" description="قائمة المفضلة التجريبية." /><PageHero title="المفضلة" text="قطع اخترتها لتعود إليها لاحقاً." /><ProductGrid items={items} /></motion.main>
}

const formSchema = z.object({
  name: z.string().min(3, 'يرجى كتابة الاسم الكامل'),
  phone: z.string().min(8, 'يرجى كتابة رقم هاتف صحيح'),
  branch: z.string().min(1, 'يرجى اختيار الفرع'),
  requestType: z.string().min(1, 'يرجى اختيار نوع الطلب'),
  message: z.string().min(10, 'يرجى كتابة تفاصيل أكثر'),
})
type FormValues = z.infer<typeof formSchema>

function ContactForm({ checkout = false }: { checkout?: boolean }) {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(formSchema) })
  if (sent) return <div className="success-box"><CheckCircle2 /><h3>تم إرسال الطلب بنجاح</h3><p>هذه رسالة نجاح تجريبية، ولا يتم إرسال البيانات لخادم حقيقي.</p></div>
  return (
    <form className="contact-form" onSubmit={handleSubmit(() => setSent(true))}>
      <div className="contact-form-header">
        <span><MessageCircle size={18} /> طلب خاص</span>
        <h2>{checkout ? 'تأكيد بيانات الطلب' : 'دعنا نساعدك في اختيار قطعتك'}</h2>
        <p>{checkout ? 'أضف بياناتك وملاحظاتك لتأكيد الطلب داخل التجربة.' : 'اكتب بيانات التواصل ونوع الطلب، وسيظهر تأكيد داخل الواجهة.'}</p>
      </div>
      <div className="contact-form-grid">
        <div className="form-field">
          <label>الاسم الكامل<input {...register('name')} /></label>
          {errors.name ? <small>{errors.name.message}</small> : null}
        </div>
        <div className="form-field">
          <label>الهاتف<input {...register('phone')} /></label>
          {errors.phone ? <small>{errors.phone.message}</small> : null}
        </div>
        <div className="form-field">
          <label>نوع الطلب<select {...register('requestType')}><option value="">اختر</option><option>طلب شراء</option><option>طلب تصميم خاص</option><option>استفسار عن منتج</option><option>استفسار جملة</option><option>شكوى أو اقتراح</option></select></label>
          {errors.requestType ? <small>{errors.requestType.message}</small> : null}
        </div>
        <div className="form-field">
          <label>الفرع<select {...register('branch')}><option value="">اختر الفرع</option>{branches.map((branch) => <option key={branch.id}>{branch.name}</option>)}</select></label>
          {errors.branch ? <small>{errors.branch.message}</small> : null}
        </div>
        <div className="form-field full">
          <label>{checkout ? 'ملاحظات الطلب' : 'رسالتك'}<textarea {...register('message')} /></label>
          {errors.message ? <small>{errors.message.message}</small> : null}
        </div>
      </div>
      <button type="submit" className="contact-submit">{checkout ? 'تأكيد الطلب التجريبي' : 'إرسال الطلب'}</button>
    </form>
  )
}

function CheckoutPage() {
  return <motion.main className="page narrow contact-page" {...pageMotion}><SEOHead title="الدفع التجريبي" description="تجربة Checkout شكلية لمتجر الصايغ." /><PageHero title="الدفع التجريبي" text="أدخل بيانات تجريبية لتأكيد الطلب داخل الواجهة." /><ContactForm checkout /></motion.main>
}

function AboutPage() {
  return <FactoryPage />
}

function FactoryPage() {
  return (
    <>
      <SEOHead title="عن المصنع" description="قصة مصنع الصايغ من التراث إلى القيادة والتصنيع والجودة." />
      <LeadershipPage />
    </>
  )
}

function TeamPage() {
  return (
    <>
      <SEOHead title="عن المصنع" description="قصة مصنع الصايغ من التراث إلى القيادة والتصنيع والجودة." />
      <LeadershipPage />
    </>
  )
}

function BranchesPage() {
  return (
    <motion.main className="branches-page" {...pageMotion}>
      <SEOHead title="الفروع" description="فروع مصنع الصايغ للمجوهرات في مملكة البحرين." />
      <section className="branches-hero">
        <div className="gold-divider" aria-hidden="true" />
        <h1>فروع مصنع الصايغ للمجوهرات</h1>
        <p>نخدمكم في ثلاثة فروع في مملكة البحرين لتكونوا دائماً أقرب إلى الفخامة</p>
      </section>
      <section className="branches-filter" aria-label="تصفية الفروع">
        <button type="button" className="map-filter-button">
          <MapPin size={19} />
          عرض الخريطة
        </button>
        <div className="branch-status-legend">
          <span><b className="open-dot" /> مفتوح الآن</span>
          <span><b className="closed-dot" /> مغلق الآن</span>
        </div>
        <button type="button" className="city-select-button">
          <ChevronDown size={18} />
          جميع المدن
        </button>
      </section>
      <section className="branches-showcase">
        {branches.map((branch, index) => {
          const isOpen = index !== 2
          return (
            <article className="branch-lux-card" key={branch.id}>
              <div className="branch-lux-image">
                <img src={branch.image} alt={branch.name} />
                <span className={isOpen ? 'branch-status open' : 'branch-status closed'}>
                  {isOpen ? 'مفتوح الآن' : 'مغلق الآن'}
                  <b />
                </span>
              </div>
              <div className="branch-lux-body">
                <h2>{branch.name} <Gem size={21} /></h2>
                <p className="branch-zone">المنطقة: {branch.city} <MapPin size={17} /></p>
                <div className="branch-info-grid">
                  <div>
                    <Clock3 />
                    <strong>أوقات العمل</strong>
                    <span>09:00 ص - 10:00 م</span>
                    <span>(السبت - الخميس)</span>
                    <span>09:00 ص - 12:00 م</span>
                    <span>الجمعة</span>
                  </div>
                  <div>
                    <Phone />
                    <strong>الهاتف</strong>
                    <span>{branch.phone}</span>
                  </div>
                  <div>
                    <MapPin />
                    <strong>العنوان</strong>
                    <span>{branch.address}</span>
                    <span>مملكة البحرين</span>
                  </div>
                </div>
                <div className="branch-actions-row">
                  <a href={`https://wa.me/${branch.whatsapp.replace(/\D/g, '')}`} className="branch-whatsapp" target="_blank" rel="noreferrer">
                    واتساب
                    <MessageCircle size={18} />
                  </a>
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="branch-call">
                    اتصل الآن
                    <Phone size={17} />
                  </a>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(`${branch.name} ${branch.city} البحرين`)}`} className="branch-directions" target="_blank" rel="noreferrer">
                    اتجاهات
                    <Navigation size={17} />
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </section>
      <section className="branch-service-strip">
        <div className="branch-service-brand">
          <BrandLogo compact />
          <span>مصنع الصايغ للمجوهرات</span>
          <small>Alsayegh Factory · Since 1783</small>
        </div>
        <div className="branch-service-copy">
          <h2>نحن هنا لخدمتكم</h2>
          <p>تفضلوا بزيارة أقرب فرع لكم أو تواصلوا معنا للحصول على المساعدة</p>
        </div>
        <div className="branch-service-item">
          <Headphones />
          <strong>مركز خدمة العملاء</strong>
          <span>+973 17 223 344</span>
          <span>9:00 ص - 10:00 م</span>
        </div>
        <div className="branch-service-item">
          <MessageCircle />
          <strong>تواصل واتساب</strong>
          <span>+973 39 334 400</span>
          <span>متاح على مدار الساعة</span>
        </div>
        <div className="branch-service-item">
          <CalendarDays />
          <strong>احجز موعداً خاصاً</strong>
          <span>زيارة خاصة في أحد فروعنا</span>
          <span>وخدمة مخصصة</span>
        </div>
      </section>
    </motion.main>
  )
}

function ContactPage() {
  return <motion.main className="page narrow contact-page" {...pageMotion}><SEOHead title="تواصل معنا" description="نموذج تواصل تجريبي." /><PageHero title="تواصل معنا" text="اختر نوع الطلب والفرع المناسب وسيظهر تأكيد داخل الواجهة." /><ContactForm /></motion.main>
}

function RecentlyViewed() {
  const recent = useStore((state) => state.recentlyViewed)
  const items = recent.map((id) => products.find((product) => product.id === id)).filter(Boolean).slice(0, 4) as Product[]
  if (!items.length) return null
  return <section className="band ivory"><SectionHeading eyebrow="شوهد مؤخراً" title="آخر المنتجات التي شاهدتها" /><ProductGrid items={items} /></section>
}

function PageHero({ title, text }: { title: string; text: string }) {
  return <section className="page-hero"><span>مصنع الصايغ للمجوهرات</span><h1>{title}</h1><p>{text}</p></section>
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><Gem /><h3>{title}</h3><p>{text}</p></div>
}

function EmptyPage({ title, text, action, actionText }: { title: string; text: string; action: string; actionText: string }) {
  return <motion.main className="page narrow" {...pageMotion}><SEOHead title={title} description={text} /><EmptyState title={title} text={text} /><Link className="primary-link" to={action}>{actionText}</Link></motion.main>
}

function NotFound() {
  return <EmptyPage title="الصفحة غير موجودة" text="الرابط المطلوب غير متاح في هذا العرض التجريبي." action="/" actionText="العودة للرئيسية" />
}

function Toast() {
  const { toast, clearToast } = useStore()
  return <AnimatePresence>{toast ? <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onAnimationComplete={() => window.setTimeout(clearToast, 1800)}>{toast}</motion.div> : null}</AnimatePresence>
}

function FloatingCustomSetTab() {
  const [open, setOpen] = useState(false)
  const { customSet, removeFromCustomSet } = useStore()
  const items = customSet
    .map((entry) => {
      const product = products.find((item) => item.id === entry.productId)
      return product ? { product, quantity: entry.quantity } : null
    })
    .filter(Boolean) as SelectedSetEntry[]
  const pieceCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  useEffect(() => {
    if (!items.length) setOpen(false)
  }, [items.length])

  if (!items.length) return null

  return (
    <div className="floating-custom-set">
      <AnimatePresence>
        {open ? (
          <motion.section
            className="floating-custom-set-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
          >
            <header>
              <div>
                <span>طقمك المخصص</span>
                <strong>{pieceCount} قطع مضافة</strong>
              </div>
              <button className="icon-button" aria-label="إغلاق طقمك" onClick={() => setOpen(false)}>
                <X />
              </button>
            </header>
            <div className="floating-custom-set-items">
              {items.map((item) => (
                <article key={item.product.id}>
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>{item.quantity} × {item.product.weight} غرام</span>
                  </div>
                  <button aria-label="حذف من الطقم" onClick={() => removeFromCustomSet(item.product.id)}>
                    <Trash2 size={15} />
                  </button>
                </article>
              ))}
            </div>
            <footer>
              <span>الإجمالي التقديري</span>
              <strong>{formatPrice(total)}</strong>
              <Link to="/build-your-set" onClick={() => setOpen(false)}>عرض الطقم وتعديله</Link>
            </footer>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <motion.button
        className="floating-custom-set-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 0.28 }}
      >
        <PackageCheck />
        <span>
          <strong>طقمك</strong>
          <small>{pieceCount} قطع</small>
        </span>
        <b>{formatPrice(total)}</b>
      </motion.button>
    </div>
  )
}

function LuxuryChatWidget() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const context = useMemo(() => {
    const productMatch = location.pathname.match(/\/products\/([^/]+)/)
    if (productMatch) return getProduct(productMatch[1])?.name
    if (location.pathname.includes('/sets')) return 'الأطقم'
    if (location.pathname.includes('/builder') || location.pathname.includes('/build-your-set')) return 'تصميم طقم مخصص'
    return ''
  }, [location.pathname])
  const whatsappMessage = encodeURIComponent(
    context
      ? `مرحباً، أحتاج مساعدة من مستشار الصايغ بخصوص ${context}.`
      : 'مرحباً، أحتاج مساعدة من مستشار الصايغ للمجوهرات.',
  )
  const quickActions = [
    'أحتاج مساعدة في اختيار القطع',
    'أريد تصميم طقم خاص',
    'ما القطع المناسبة للعروس؟',
    'الاستفسار عن التوفر',
    'التواصل عبر واتساب',
  ]

  return (
    <div className="luxury-chat">
      <AnimatePresence>
        {open ? (
          <motion.section className="chat-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
            <header>
              <span className="online-dot" />
              <div>
                <h3>مساعد المجوهرات</h3>
                <p>متاح لمساعدتك في اختيار طقمك</p>
              </div>
              <button aria-label="إغلاق المحادثة" className="icon-button" onClick={() => setOpen(false)}><X /></button>
            </header>
            <div className="chat-body">
              {context ? <div className="chat-context">أنت تستفسر الآن عن: {context}</div> : null}
              <div className="chat-message">
                <p>مرحباً بك في مصنع الصايغ للمجوهرات.</p>
                <p>كيف يمكننا مساعدتك اليوم؟</p>
              </div>
              <div className="quick-actions">
                {quickActions.map((action) => (
                  <button key={action}>{action}</button>
                ))}
              </div>
              <a className="chat-whatsapp" href={`https://wa.me/97339991122?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                تحدث مع مستشار عبر واتساب
              </a>
            </div>
            <div className="chat-input">
              <button aria-label="إرفاق ملف"><Paperclip size={18} /></button>
              <input placeholder="اكتب رسالتك..." />
              <button aria-label="إرسال"><Send size={18} /></button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <button className="chat-toggle" aria-label="تحتاج مساعدة؟" onClick={() => setOpen((current) => !current)}>
        <span>تحتاج مساعدة؟</span>
        <MessageCircle />
      </button>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router basename={routerBasename}>
        <RouteScrollReset />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/sets" element={<SetsPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/build-your-set" element={<BuilderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/factory" element={<FactoryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toast />
        <FloatingCustomSetTab />
        <LuxuryChatWidget />
      </Router>
    </HelmetProvider>
  )
}

export default App
