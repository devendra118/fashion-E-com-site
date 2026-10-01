import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { inr, store, waLink } from '../config/store'
import { useShop } from '../context/Shop'
import { useSeo } from '../lib/seo'
export default function Product() {
  const { slug } = useParams(); const p = products.find(x => x.slug === slug); const { add, toggleWish, wish } = useShop(); const go = useNavigate()
  const [size, setSize] = useState(''); const [img, setImg] = useState(0); const [err, setErr] = useState(''); const [qty, setQty] = useState(1)
  useSeo(p?.name ?? 'Not found', p?.description, p && { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, offers: { '@type': 'Offer', priceCurrency: store.currency, price: p.salePrice ?? p.price, availability: p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } })
  if (!p) return <div className="py-32 text-center"><h1 className="text-4xl">We couldn't find that piece</h1><Link to="/shop" className="btn btn-line mt-6">Back to shop</Link></div>
  const need = () => { if (!size) { setErr('Choose a size to continue.'); return false } setErr(''); return true }
  const wa = waLink(`Hello NK. fashnina, I'd like to enquire about ${p.name} (${location.href}).`)
  return <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 md:grid-cols-2 md:px-8">
    <div><img src={p.images[img]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
      <div className="mt-3 flex gap-2 overflow-x-auto">{p.images.map((s, i) => <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`h-20 w-16 shrink-0 border ${i === img ? 'border-ink' : 'border-line'}`}><img src={s} alt="" className="h-full w-full object-cover" /></button>)}</div></div>
    <div className="max-w-lg"><h1 className="text-4xl md:text-5xl">{p.name}</h1>
      <p className="mt-3 text-lg">{p.salePrice ? <><span className="mr-2">{inr(p.salePrice)}</span><s className="opacity-50">{inr(p.price)}</s></> : inr(p.price)}</p>
      <p className="mt-1 text-sm">{p.stock ? (p.stock < 4 ? `Only ${p.stock} left` : 'In stock') : 'Out of stock'}</p>
      <fieldset className="mt-6"><legend className="text-sm">Size</legend><div className="mt-2 flex flex-wrap gap-2">{p.sizes.map(s => <button key={s} aria-pressed={size === s} onClick={() => { setSize(s); setErr('') }} className={`h-11 min-w-11 border px-3 ${size === s ? 'bg-ink text-ivory' : 'border-line'}`}>{s}</button>)}</div>{err && <p role="alert" className="mt-2 text-sm text-wine">{err}</p>}</fieldset>
      <div className="mt-5 flex items-center gap-3 text-sm">Quantity <button aria-label="Decrease" className="h-11 w-11 border border-line" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>{qty}<button aria-label="Increase" className="h-11 w-11 border border-line" onClick={() => setQty(qty + 1)}>+</button></div>
      <div className="mt-6 grid gap-2">
        <button disabled={!p.stock} className="btn btn-solid disabled:opacity-40" onClick={() => need() && add(p.id, size, qty)}>Add to cart</button>
        <button disabled={!p.stock} className="btn btn-line disabled:opacity-40" onClick={() => { if (need()) { add(p.id, size, qty); go('/checkout') } }}>Buy now</button>
        <button className="btn btn-line" onClick={() => toggleWish(p.id)}>{wish.includes(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}</button></div>
      <div className="mt-8 space-y-4 text-sm leading-6"><p>{p.description}</p><p><b className="font-normal">Fabric:</b> {p.fabric}</p><p><b className="font-normal">Care:</b> Dry clean only.</p><p><b className="font-normal">Shipping & returns:</b> {store.shippingMessage}</p></div>
      <div className="mt-8 border-t border-line pt-6"><p className="font-serif text-2xl">Need help choosing your outfit?</p>
        {wa ? <a href={wa} target="_blank" rel="noreferrer" className="btn btn-line mt-3">Enquire on WhatsApp</a> : <p className="mt-2 text-sm opacity-70">WhatsApp number not set yet (src/config/store.ts).</p>}</div></div></div>
}
