import { stockImage } from '../data/stockImages'

// Demo/launch artwork. Product and category photography is intentionally sourced
// from stock images until the brand's own approved photography is added.
const svg = (s: string) => 'data:image/svg+xml;utf8,' + encodeURIComponent(s)
const palette = ['#E8DDCB', '#CDB892', '#5C1F2E', '#C9A35F']

export const fallbackPortrait = (i = 0) => {
  const [a, b, g, t] = [palette[i % 4], palette[(i + 1) % 4], palette[(i + 2) % 4], palette[(i + 3) % 4]]
  return svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><circle cx='400' cy='360' r='90' fill='#c9a98a' opacity='.85'/><path d='M210 1000c20-280 95-420 190-420s170 140 190 420' fill='${g}' stroke='${t}' stroke-width='10'/><text x='400' y='930' text-anchor='middle' font-family='Georgia,serif' font-size='34' fill='white' opacity='.9'>NK. fashnina</text></svg>`)
}

export const ph = (_label: string, i = 0) => stockImage(i, 1200)
export const phWide = (i = 0) => stockImage(i, 1800)
export { stockImage }

export const safeImage = (src: string, fallbackIndex = 0) => src || fallbackPortrait(fallbackIndex)
