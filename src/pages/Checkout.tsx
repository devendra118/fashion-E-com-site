import { useState } from 'react'
import { Link } from 'react-router-dom'
import { inr, store, waLink } from '../config/store'
import { useShop } from '../context/Shop'
import { useSeo } from '../lib/seo'
import { unitPrice } from '../data/products'

const fields = [['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel'], ['address', 'Address', 'text'], ['city', 'City', 'text'], ['state', 'State', 'text'], ['pin', 'PIN code', 'text'], ['country', 'Country', 'text']]

export default function Checkout() {
  useSeo('Checkout')
  const { lines, total } = useShop()
  const [f, setF] = useState<any>({ country: 'India' })
  const [pay, setPay] = useState<'cod' | 'whatsapp'>('whatsapp')
  const [errs, setErrs] = useState<any>({})

  if (!lines.length) return <div className="py-32 text-center"><h1 className="text-4xl">Nothing to check out</h1><Link to="/shop" className="btn btn-solid mt-6">Browse the shop</Link></div>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: any = {}
    fields.forEach(([k, l]) => { if (!f[k]?.trim()) er[k] = `Enter ${l.toLowerCase()}.` })
    if (f.pin && !/^\d{6}$/.test(f.pin)) er.pin = 'PIN must be 6 digits.'
    setErrs(er)
    if (Object.keys(er).length) return

    const items = lines.map((l: any) => `${l.p.name} | Size ${l.size} | Qty ${l.qty} | ${inr((unitPrice(l.p) ?? 0) * l.qty)}`).join('\n')
    const message = [
      `Hello ${store.brandName}, I would like to place an order request.`,
      '',
      `Customer: ${f.name}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      `Address: ${f.address}, ${f.city}, ${f.state} - ${f.pin}, ${f.country}`,
      '',
      'Items:',
      items,
      '',
      `Total: ${inr(total)}`,
      `Preferred payment: ${pay === 'cod' ? 'Cash on delivery' : 'Please confirm payment options on WhatsApp'}`,
    ].join('\n')

    const link = waLink(message)
    if (link) window.open(link, '_blank', 'noopener,noreferrer')
  }

  return <form onSubmit={submit} noValidate className="mx-auto grid max-w-[1100px] gap-10 px-4 py-10 md:grid-cols-[1fr_340px] md:px-8">
    <div>
      <h1 className="mb-2 text-4xl">Order details</h1>
      <p className="mb-6 text-sm opacity-70">Complete your details and send the order request directly to NK. fashnina on WhatsApp.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([k, l, t]) => <label key={k} className={`text-sm ${k === 'address' ? 'sm:col-span-2' : ''}`}>
          {l}<input type={t} className="field mt-1" value={f[k] ?? ''} onChange={e => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errs[k]} />
          {errs[k] && <span role="alert" className="text-wine">{errs[k]}</span>}
        </label>)}
      </div>
      <fieldset className="mt-8">
        <legend className="text-sm">Preferred payment</legend>
        <label className="mt-2 flex min-h-11 items-center gap-2"><input type="radio" name="pay" checked={pay === 'whatsapp'} onChange={() => setPay('whatsapp')} />Confirm payment options on WhatsApp</label>
        <label className="flex min-h-11 items-center gap-2"><input type="radio" name="pay" checked={pay === 'cod'} onChange={() => setPay('cod')} />Cash on delivery</label>
        <p className="mt-2 text-sm opacity-70">Online card/UPI checkout can be connected later with Razorpay.</p>
      </fieldset>
    </div>
    <aside className="h-fit border border-line p-6 text-sm">
      <h2 className="text-2xl">Order summary</h2>
      {lines.map((l: any) => <p key={l.id + l.size} className="mt-3 flex justify-between gap-4"><span>{l.p.name} ({l.size}) × {l.qty}</span><span>{inr((unitPrice(l.p) ?? 0) * l.qty)}</span></p>)}
      <p className="mt-4 flex justify-between border-t border-line pt-3 text-base"><span>Total</span><strong className="font-normal">{inr(total)}</strong></p>
      <button className="btn btn-solid mt-5 w-full">Send order request</button>
    </aside>
  </form>
}
