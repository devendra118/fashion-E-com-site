import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { products, stockForSize, unitPrice } from '../data/products'
import { store } from '../config/store'

type Line = { id: string; size: string; qty: number }
const load = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback }
}
const Ctx = createContext<any>(null)
export const useShop = () => useContext(Ctx)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>(() => load('nk-cart-v2', []))
  const [wish, setWish] = useState<string[]>(() => load('nk-wish-v2', []))
  const [drawer, setDrawer] = useState(false)
  const [coupon, setCoupon] = useState('')

  useEffect(() => { localStorage.setItem('nk-cart-v2', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('nk-wish-v2', JSON.stringify(wish)) }, [wish])

  const add = (id: string, size: string, qty = 1) => {
    const product = products.find(p => p.id === id)
    const available = product ? stockForSize(product, size) : 0
    const price = product ? unitPrice(product) : null
    if (!product || price === null || price <= 0 || available < 1 || qty < 1) return
    setCart(current => {
      const line = current.find(item => item.id === id && item.size === size)
      const nextQuantity = (line?.qty ?? 0) + qty
      if (nextQuantity > available) return current
      return line
        ? current.map(item => item === line ? { ...item, qty: nextQuantity } : item)
        : [...current, { id, size, qty }]
    })
    setDrawer(true)
  }

  const setQty = (id: string, size: string, qty: number) => {
    if (qty < 1) { setCart(current => current.filter(item => !(item.id === id && item.size === size))); return }
    const product = products.find(p => p.id === id)
    const available = product ? stockForSize(product, size) : 0
    setCart(current => current.map(item => item.id === id && item.size === size ? { ...item, qty: Math.min(qty, available) } : item).filter(item => item.qty > 0))
  }

  const setSize = (id: string, from: string, to: string) => {
    const product = products.find(p => p.id === id)
    const available = product ? stockForSize(product, to) : 0
    if (!available) return
    setCart(current => current.map(item => item.id === id && item.size === from
      ? { ...item, size: to, qty: Math.min(item.qty, available) }
      : item))
  }

  const toggleWish = (id: string) => setWish(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const lines = cart.map(line => ({ ...line, p: products.find(product => product.id === line.id) }))
    .filter((line): line is Line & { p: typeof products[number] } => !!line.p && (unitPrice(line.p) ?? 0) > 0 && stockForSize(line.p, line.size) >= line.qty)
  const subtotal = lines.reduce((sum, line) => sum + (unitPrice(line.p) ?? 0) * line.qty, 0)
  const discount = coupon.toUpperCase() === 'WELCOME10' ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal === 0 || subtotal >= store.freeShippingAbove ? 0 : store.shippingFee
  const total = subtotal - discount + shipping
  const count = lines.reduce((sum, line) => sum + line.qty, 0)

  return <Ctx.Provider value={{ lines, wish, add, setQty, setSize, toggleWish, drawer, setDrawer, coupon, setCoupon, subtotal, discount, shipping, total, count, clear: () => setCart([]) }}>{children}</Ctx.Provider>
}
