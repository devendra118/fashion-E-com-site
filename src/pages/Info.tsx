import { Link, useParams } from 'react-router-dom'
import { collections } from '../data/collections'
import { products } from '../data/products'
import { store, waLink } from '../config/store'
import { useSeo } from '../lib/seo'
import Shop from './Shop'
import SmartImage from '../components/SmartImage'

const pages: Record<string, [string, string]> = {
  about: ['About NK. fashnina', 'A contemporary Indian designer label from Jaipur, creating expressive silhouettes for modern celebrations with an appreciation for Indian craft.'],
  designer: ['The designer', 'Discover the designer behind NK. fashnina — her creative process, design language and the ideas that shape each collection.'],
  craft: ['Craftsmanship', 'From sketch to silhouette, every collection is developed through considered fabric choices, surface detail and careful finishing, bringing a contemporary point of view to Indian occasionwear.'],
  wedding: ['Wedding collection', 'Bridal and wedding-guest pieces designed for celebrations.'],
  faq: ['FAQ', 'For sizing, custom orders, delivery, payment and return questions, please contact NK. fashnina before placing an order. We will confirm availability and current policies with you.'],
}

export function Info({ k }: { k: string }) {
  const [t, b] = pages[k] ?? pages.about
  useSeo(t, b)
  return <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <SmartImage src={undefined} alt="NK. fashnina fashion" fallbackIndex={2} className="aspect-[4/5] w-full object-cover" />
      <div>
        <h1 className="text-5xl">{t}</h1>
        <p className="mt-6 leading-7">{b}</p>
        {k === 'wedding' && <Link to="/shop?occasion=Wedding" className="btn btn-solid mt-6">Shop wedding</Link>}
      </div>
    </div>
  </div>
}

export function Contact() {
  useSeo('Contact')
  const wa = waLink('Hello NK. fashnina')
  return <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <SmartImage src={undefined} alt="NK. fashnina fashion" fallbackIndex={3} className="aspect-[4/5] w-full object-cover" />
      <div>
        <h1 className="text-5xl">Contact</h1>
        <p className="mt-4">{store.location}</p>
        {store.email && <p><a className="underline" href={`mailto:${store.email}`}>{store.email}</a></p>}
        {store.phone && <p><a className="underline" href={`tel:${store.phone.replace(/\s/g,'')}`}>{store.phone}</a></p>}
        {wa && <a className="btn btn-solid mt-6" href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}
        <a className="btn btn-line mt-3" href={store.instagram} target="_blank" rel="noreferrer">Message on Instagram</a>
      </div>
    </div>
  </div>
}

export function Collections() {
  useSeo('Collections')
  return <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
    <h1 className="mb-8 text-5xl">Collections</h1>
    <div className="grid gap-8 md:grid-cols-3">
      {collections.map((c, i) => <Link key={c.id} to={`/collections/${c.slug}`} className="group">
        <SmartImage src={c.heroImage} alt={`${c.name} collection`} loading="lazy" fallbackIndex={i} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        <h2 className="mt-3 text-2xl">{c.name}</h2>
        <p className="text-sm">{c.description} · {products.filter(p => c.products.includes(p.id)).length} pieces</p>
      </Link>)}
    </div>
  </div>
}

export function Collection() {
  const { slug } = useParams()
  const c = collections.find(x => x.slug === slug)
  if (!c) return <div className="py-32 text-center"><h1 className="text-4xl">Collection not found</h1><Link to="/collections" className="btn btn-line mt-6">All collections</Link></div>
  return <Shop collection={c.name.replace(/^The /, '')} />
}
