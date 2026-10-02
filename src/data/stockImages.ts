// All product photography is bundled with the site so it does not depend on
// third-party image links that can expire or be blocked by the browser.
export const stockImages = [
  '/images/products/saffron-farsi-set.jpg',
  '/images/products/dusty-rose-sharara-set.jpg',
  '/images/products/violet-embroidered-top.jpg',
  '/images/products/rust-printed-short-kurti.jpg',
  '/images/products/lilac-occasion-anarkali.jpg',
  '/images/products/black-heart-overlay-dress.jpg',
  '/images/products/fuchsia-embroidered-pant-kurti-set.jpg',
  '/images/products/black-lace-mini-dress.jpg',
  '/images/products/denim-ruffle-dress.jpg',
  '/images/products/burgundy-draped-two-piece-set.jpg',
  '/images/products/silver-sequin-two-piece-set.jpg',
  '/images/products/ivory-satin-two-piece-set.jpg',
  '/images/products/white-lace-flared-pants.jpg',
]

export const stockImage = (index: number, _width = 1200) => {
  const safeIndex = ((index % stockImages.length) + stockImages.length) % stockImages.length
  return stockImages[safeIndex]
}
