import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Page not found')
  return <div className="mx-auto max-w-2xl px-4 py-32 text-center md:py-40">
    <p className="text-sm uppercase tracking-[0.2em] opacity-60">404</p>
    <h1 className="mt-3 text-5xl">This page has moved</h1>
    <p className="mx-auto mt-4 max-w-md leading-7 opacity-70">The piece or page you were looking for is unavailable. Explore the latest NK. fashnina collection instead.</p>
    <div className="mt-8 flex justify-center gap-3"><Link to="/shop" className="btn btn-solid">Shop now</Link><Link to="/" className="btn btn-line">Back home</Link></div>
  </div>
}
