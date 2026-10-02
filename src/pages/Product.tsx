import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { inventoryConfigured, products, stockForSize, unitPrice } from '../data/products'
import { inr, store, waLink } from '../config/store'
import { useShop } from '../context/Shop'
import { useSeo } from '../lib/seo'
import SmartImage from '../components/SmartImage'

export default function Product() {
  const { slug } = useParams()
  const p = products.find(x => x.slug === slug)
  const { add, toggleWish, wish } = useShop()
  const go = useNavigate()
  const [size, setSize] = useState('')
  const [img, setImg] = useState(0)
  const [err, setErr] = useState('')
  const [qty, setQty] = useState(1)
  const price = p ? unitPrice(p) : null

  useSeo(p?.name ?? 'Not found', p?.description, p && price !== null ? {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name,
    description: p.description,
    offers: { '@type': 'Offer', priceCurrency: store.currency, price, availability: p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  } : undefined)

  if (!p) return <div className="py-32 text-center"><h1 className="text-4xl">We couldn't find that piece</h1><Link to="/shop" className="btn btn-line mt-6">Back to shop</Link></div>

  const need = () => {
    if (price === null || price <= 0) { setErr('Please contact us to confirm the price.'); return false }
    if (!size) { setErr('Choose an available size to continue.'); return false }
    if (stockForSize(p, size) < qty) { setErr('That size is currently unavailable in the selected quantity.'); return false }
    setErr('')
    return true
  }
  const canBuy = price !== null && price > 0 && !!size && stockForSize(p, size) >= qty
  const wa = waLink(`Hello NK. fashnina, I would like to enquire about ${p.name}${size ? `, size ${size}` : ''} (${location.href}).`)

  return <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 md:grid-cols-2 md:px-8">
    <div>
      <SmartImage src={p.images[img] ?? p.images[0]} alt={p.name} fallbackIndex={img} className="aspect-[4/5] w-full object-cover object-center" />
      {p.images.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto">{p.images.map((image, i) => <button key={image} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`h-20 w-16 shrink-0 border ${i === img ? 'border-ink' : 'border-line'}`}><SmartImage src={image} alt="" fallbackIndex={i + 1} className="h-full w-full object-cover" /></button>)}</div>}
    </div>
    <div className="max-w-lg">
      <p className="mb-2 text-sm uppercase tracking-widest opacity-65">{p.category} · {p.productType}</p>
      <h1 className="text-4xl md:text-5xl">{p.name}</h1>
      <p className="mt-3 text-lg">{price === null ? 'Price on request' : p.salePrice !== null && p.price !== null ? <><span className="mr-2">{inr(p.salePrice)}</span><s className="opacity-50">{inr(p.price)}</s></> : inr(price)}</p>
      <p className="mt-1 text-sm">{p.stock ? (p.stock < 4 ? `Only ${p.stock} left across all sizes` : 'In stock') : inventoryConfigured(p) ? 'Out of stock' : 'Availability to be confirmed'}</p>
      <fieldset className="mt-6">
        <legend className="text-sm">Size</legend>
        {p.sizes.length ? <div className="mt-2 flex flex-wrap gap-2">{p.sizes.map(s => {
          const available = stockForSize(p, s) > 0
          return <button key={s} type="button" disabled={!available} aria-pressed={size === s} aria-label={`${s}${available ? `, ${stockForSize(p, s)} available` : ', unavailable'}`} onClick={() => { setSize(s); setErr('') }} className={`h-11 min-w-11 border px-3 disabled:cursor-not-allowed disabled:opacity-40 ${size === s ? 'bg-ink text-ivory' : 'border-line'}`}>{s}</button>
        })}</div> : <p className="mt-2 text-sm opacity-70">Contact us to confirm available sizes.</p>}
        {err && <p role="alert" className="mt-2 text-sm text-wine">{err}</p>}
      </fieldset>
      <div className="mt-5 flex items-center gap-3 text-sm">Quantity
        <button type="button" aria-label="Decrease" className="h-11 w-11 border border-line" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>{qty}
        <button type="button" aria-label="Increase" disabled={!size || qty >= stockForSize(p, size)} className="h-11 w-11 border border-line disabled:opacity-40" onClick={() => setQty(qty + 1)}>+</button>
      </div>
      <div className="mt-6 grid gap-2">
        <button disabled={!canBuy} className="btn btn-solid disabled:opacity-40" onClick={() => need() && add(p.id, size, qty)}>Add to cart</button>
        <button disabled={!canBuy} className="btn btn-line disabled:opacity-40" onClick={() => { if (need()) { add(p.id, size, qty); go('/checkout') } }}>Buy now</button>
        <button className="btn btn-line" onClick={() => toggleWish(p.id)}>{wish.includes(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}</button>
        {wa && <a href={wa} target="_blank" rel="noreferrer" className="btn btn-line">Enquire on WhatsApp</a>}
      </div>
      <div className="mt-8 space-y-4 text-sm leading-6"><p>{p.description}</p>{p.fabric && <p><b className="font-normal">Fabric:</b> {p.fabric}</p>}<p><b className="font-normal">Shipping & returns:</b> {store.shippingMessage}</p></div>
    </div>
  </div>
}
