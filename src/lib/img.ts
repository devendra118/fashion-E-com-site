// Placeholder artwork. Replace by putting real image URLs/imports in product `images`.
const tones = ['#CDB892','#B89A6A','#8E3B4C','#2A2724','#D9C7A8','#6B4A3A']
export const ph = (label: string, i = 0) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'><rect width='800' height='1000' fill='${tones[i % tones.length]}'/><text x='400' y='500' text-anchor='middle' font-family='Georgia' font-size='34' fill='#F6F0E6'>${label}</text></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
