import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { fallbackPortrait } from '../lib/img'

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallbackIndex?: number }

export default function SmartImage({ src, alt = '', fallbackIndex = 0, className, ...props }: Props) {
  const [current, setCurrent] = useState(src || fallbackPortrait(fallbackIndex))
  useEffect(() => { setCurrent(src || fallbackPortrait(fallbackIndex)) }, [src, fallbackIndex])
  return <img
    {...props}
    src={current}
    alt={alt}
    className={className}
    onError={() => setCurrent(fallbackPortrait(fallbackIndex))}
  />
}
