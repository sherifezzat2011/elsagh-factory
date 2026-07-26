import { useEffect, useMemo, useState } from 'react'
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
  Gem,
  Heart,
  Headphones,
  CalendarDays,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Paperclip,
  PackageCheck,
  Plus,
  Search,
  Send,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cart, wishlist } = useStore()

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="مصنع الصايغ للمجوهرات">
          <span className="brand-mark">
            <Gem size={24} />
          </span>
          <span>
            <strong>مصنع الصايغ للمجوهرات</strong>
            <small>Alsayegh Factory · Since 1783</small>
          </span>
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
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside className="mobile-menu" initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}>
              <button aria-label="إغلاق القائمة" className="icon-button" onClick={() => setMenuOpen(false)}>
                <X />
              </button>
              {navItems.map(([href, label]) => (
                <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
              ))}
            </motion.aside>
          </motion.div>
        ) : null}
        {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
      </AnimatePresence>
    </>
  )
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
          <span className="brand-mark"><Gem /></span>
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
  const { addToCart, toggleWishlist, wishlist, addToCustomSet } = useStore()
  const isFavorite = wishlist.includes(product.id)
  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="product-image">
        <img src={product.images[0]} alt={product.name} onError={(event) => { event.currentTarget.src = asset.fallback }} />
        <div className="badges">{product.badges?.map((badge) => <span key={badge}>{badge}</span>)}</div>
      </Link>
      <div className="product-body">
        <p>{categories.find((category) => category.id === product.categoryId)?.name}</p>
        <h3>{product.name}</h3>
        <div className="meta"><span>{product.weight} غرام</span><span>ذهب عيار {product.karat}</span></div>
        <PriceDisplay product={product} />
        <div className="card-actions">
          <button aria-label="أضف إلى المفضلة" className={isFavorite ? 'icon-button active' : 'icon-button'} onClick={() => toggleWishlist(product.id)}><Heart /></button>
          <Link className="soft-button" to={`/products/${product.slug}`}>التفاصيل</Link>
          <button disabled={!product.stock} onClick={() => addToCart({ type: 'product', productId: product.id })}>
            {product.stock ? 'أضف للسلة' : 'غير متوفر'}
          </button>
          {product.canBeAddedToCustomSet ? <button className="ghost" onClick={() => addToCustomSet(product.id)}>أضف للطقم</button> : null}
        </div>
      </div>
    </article>
  )
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <EmptyState title="لا توجد منتجات مطابقة" text="عدّل خيارات التصفية أو امسح البحث الحالي." />
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}

function HomePage() {
  const featured = products.filter((product) => product.isFeatured)
  return (
    <motion.main {...pageMotion}>
      <SEOHead title="الرئيسية" description="متجر عربي تجريبي فاخر لمصنع الصايغ للمجوهرات في البحرين." />
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,31,26,.88), rgba(6,44,37,.52)), url(${asset.hero})` }}>
        <div className="hero-content">
          <span>مصنع بحريني للمجوهرات</span>
          <h1>حرفة توارثناها منذ 1783</h1>
          <p>أكثر من قرنين من الخبرة في صياغة المجوهرات البحرينية الأصيلة، بتصاميم تجمع بين التراث والدقة والفخامة.</p>
          <div className="hero-actions">
            <Link to="/collections">اكتشف المجموعات</Link>
            <Link to="/products" className="secondary">تسوّق الآن</Link>
            <Link to="/build-your-set" className="secondary">صمّم طقمك الخاص</Link>
          </div>
        </div>
      </section>
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
        <div className="gallery">{product.images.map((image) => <img key={image} src={image} alt={product.name} />)}</div>
        <div className="detail-panel">
          <p className="eyebrow">{product.sku}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-facts"><span>{product.weight} غرام</span><span>ذهب عيار {product.karat}</span><span>{product.stock ? 'متوفر في الفروع' : 'غير متوفر حالياً'}</span></div>
          <PriceDisplay product={product} />
          <p className="muted">السعر يتغير حسب وزن القطعة وسعر الذهب.</p>
          <div className="detail-actions">
            <button disabled={!product.stock} onClick={() => addToCart({ type: 'product', productId: product.id })}>أضف إلى السلة</button>
            {product.canBeAddedToCustomSet ? <button className="secondary-button" onClick={() => addToCustomSet(product.id)}>اختر القطعة للطقم</button> : null}
            <a className="whatsapp" href={`https://wa.me/97339991122?text=${whatsappText}`} target="_blank" rel="noreferrer"><MessageCircle /> واتساب</a>
          </div>
        </div>
      </section>
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
  const { customSet, saveCustomSet, clearCustomSet, removeFromCustomSet } = useStore()
  const selected = customSet.map((item) => products.find((product) => product.id === item.productId)).filter(Boolean) as Product[]
  const total = selected.reduce((sum, product) => sum + product.price, 0)
  const weight = selected.reduce((sum, product) => sum + product.weight, 0).toFixed(1)
  const message = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن طقم مخصص يحتوي على: ${selected.map((item) => item.name).join('، ')}. الوزن الإجمالي ${weight} غرام والسعر التقديري ${formatPrice(total)}.`)
  return (
    <motion.main className="page" {...pageMotion}>
      <SEOHead title="صمّم طقمك" description="أداة تجريبية لتكوين طقم مجوهرات مخصص." />
      <PageHero title="صمّم طقمك الخاص" text="اختر قطعاً من التصنيفات المختلفة واحفظها كطقم مخصص." />
      <BuilderSteps selectedCount={selected.length} />
      <div className="builder-layout builder-layout-premium">
        <section className="builder-products" id="builder-products">
          <div className="builder-toolbar">
            <div>
              <span>الخطوة الثانية</span>
              <h2>استعرض القطع المناسبة</h2>
            </div>
            <Link to="/sets">عرض الأطقم الجاهزة</Link>
          </div>
          <ProductGrid items={products.filter((product) => product.canBeAddedToCustomSet).slice(0, 24)} />
        </section>
        <aside className="builder-summary builder-summary-premium">
          <span className="summary-label">الملخص</span>
          <h3>طقمك المخصص</h3>
          {selected.length ? (
            <div className="selected-piece-list">
              {selected.map((product) => (
                <div className="selected-piece" key={product.id}>
                  <img src={product.images[0]} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.weight} غرام</span>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="piece-actions">
                    <button aria-label="استبدال القطعة" title="استبدال القطعة">
                      <SlidersHorizontal size={15} />
                    </button>
                    <button aria-label="إزالة القطعة" onClick={() => removeFromCustomSet(product.id)}>
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="builder-empty">
              <Gem />
              <h3>لم تضف أي قطعة بعد</h3>
              <p>ابدأ باختيار القطع التي تناسب ذوقك.</p>
              <a href="#builder-products">استعرض القطع</a>
            </div>
          )}
          <div className="summary-totals">
            <span>إجمالي القطع <strong>{selected.length}</strong></span>
            <span>إجمالي الوزن <strong>{weight} غرام</strong></span>
            <span>السعر التقديري <strong>{formatPrice(total)}</strong></span>
          </div>
          <button onClick={() => saveCustomSet('طقم مخصص')}>حفظ الطقم</button>
          <button onClick={() => saveCustomSet('طقم مخصص')}>إضافة إلى السلة</button>
          <button className="secondary-button" onClick={clearCustomSet}>تفريغ الاختيارات</button>
          <a className="whatsapp" href={`https://wa.me/97339991122?text=${message}`} target="_blank" rel="noreferrer">مساعدة عبر واتساب</a>
        </aside>
      </div>
    </motion.main>
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
  const { cart, removeFromCart, updateCartQuantity } = useStore()
  const total = cart.reduce((sum, item) => sum + cartItemPrice(item) * item.quantity, 0)
  if (!cart.length) return <EmptyPage title="السلة فارغة" text="ابدأ بإضافة منتجات أو أطقم مخصصة." action="/products" actionText="تسوق الآن" />
  return <motion.main className="page" {...pageMotion}><SEOHead title="السلة" description="مراجعة السلة التجريبية." /><PageHero title="السلة" text="راجع القطع المختارة قبل تجربة الدفع." /><div className="cart-layout"><section>{cart.map((item) => <CartRow key={item.id} item={item} onRemove={removeFromCart} onQuantity={updateCartQuantity} />)}</section><aside className="checkout-card"><h3>ملخص الطلب</h3><p>الإجمالي التقديري</p><strong>{formatPrice(total)}</strong><Link to="/checkout">متابعة الدفع التجريبي</Link></aside></div></motion.main>
}

function cartItemPrice(item: CartItem) {
  if (item.productId) return products.find((product) => product.id === item.productId)?.price ?? 0
  if (item.setId) {
    const set = jewelrySets.find((entry) => entry.id === item.setId)
    return set?.productIds.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0) ?? 0
  }
  return item.customSet?.items.reduce((sum, entry) => sum + (products.find((product) => product.id === entry.productId)?.price ?? 0), 0) ?? 0
}

function CartRow({ item, onRemove, onQuantity }: { item: CartItem; onRemove: (id: string) => void; onQuantity: (id: string, quantity: number) => void }) {
  const product = item.productId ? products.find((entry) => entry.id === item.productId) : undefined
  const set = item.setId ? jewelrySets.find((entry) => entry.id === item.setId) : undefined
  const title = product?.name ?? set?.name ?? item.customSet?.name ?? 'طقم مخصص'
  const image = product?.images[0] ?? set?.image ?? asset.fallback
  return <article className="cart-row"><img src={image} alt={title} /><div><h3>{title}</h3><p>{formatPrice(cartItemPrice(item))}</p></div><div className="quantity"><button onClick={() => onQuantity(item.id, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.id, item.quantity + 1)}><Plus /></button></div><button className="icon-button" aria-label="إزالة" onClick={() => onRemove(item.id)}><Trash2 /></button></article>
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
      <label>الاسم الكامل<input {...register('name')} /></label>{errors.name ? <small>{errors.name.message}</small> : null}
      <label>الهاتف<input {...register('phone')} /></label>{errors.phone ? <small>{errors.phone.message}</small> : null}
      <label>نوع الطلب<select {...register('requestType')}><option value="">اختر</option><option>طلب شراء</option><option>طلب تصميم خاص</option><option>استفسار عن منتج</option><option>استفسار جملة</option><option>شكوى أو اقتراح</option></select></label>{errors.requestType ? <small>{errors.requestType.message}</small> : null}
      <label>الفرع<select {...register('branch')}><option value="">اختر الفرع</option>{branches.map((branch) => <option key={branch.id}>{branch.name}</option>)}</select></label>{errors.branch ? <small>{errors.branch.message}</small> : null}
      <label>{checkout ? 'ملاحظات الطلب' : 'رسالتك'}<textarea {...register('message')} /></label>{errors.message ? <small>{errors.message.message}</small> : null}
      <button type="submit">{checkout ? 'تأكيد الطلب التجريبي' : 'إرسال الطلب'}</button>
    </form>
  )
}

function CheckoutPage() {
  return <motion.main className="page narrow" {...pageMotion}><SEOHead title="الدفع التجريبي" description="تجربة Checkout شكلية لمتجر الصايغ." /><PageHero title="الدفع التجريبي" text="أدخل بيانات تجريبية لتأكيد الطلب داخل الواجهة." /><ContactForm checkout /></motion.main>
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
          <Gem />
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
  return <motion.main className="page narrow" {...pageMotion}><SEOHead title="تواصل معنا" description="نموذج تواصل تجريبي." /><PageHero title="تواصل معنا" text="اختر نوع الطلب والفرع المناسب وسيظهر تأكيد داخل الواجهة." /><ContactForm /></motion.main>
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
      <Router basename={import.meta.env.BASE_URL}>
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
        <LuxuryChatWidget />
      </Router>
    </HelmetProvider>
  )
}

export default App
