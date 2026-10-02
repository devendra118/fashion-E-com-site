export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number | null
  salePrice: number | null
  category: string
  productType: string
  collection: string
  occasion: string
  fabric: string | null
  colors: string[]
  sizes: string[]
  stockBySize: Record<string, number>
  stock: number
  images: string[]
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
}

type ProductInput = Omit<Product, 'stock'>

// Add or edit catalogue items here. Prices are intentionally blank and sizes
// start unavailable until you enter your real prices and stock quantities.
// Use a local image path from /public/images/products for each item.
const catalogue: ProductInput[] = [
  {
    id: 'nk-001', slug: 'saffron-floral-farsi-set', name: 'Saffron Floral Farsi Set',
    description: 'Mustard floral top with matching flared bottoms.',
    price: null, salePrice: null, category: 'Traditional', productType: 'Farsi set',
    collection: 'Heritage Edit', occasion: 'Festive', fabric: null,
    colors: ['Saffron'], sizes: [], stockBySize: {},
    images: ['/images/products/saffron-farsi-set.jpg'], featured: true, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-002', slug: 'dusty-rose-sharara-set', name: 'Dusty Rose Sharara Set',
    description: 'A rose-toned occasion set with a matching draped dupatta.',
    price: null, salePrice: null, category: 'Traditional', productType: 'Sharara set',
    collection: 'Noor Edit', occasion: 'Wedding', fabric: null,
    colors: ['Dusty rose'], sizes: [], stockBySize: {},
    images: ['/images/products/dusty-rose-sharara-set.jpg'], featured: true, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-003', slug: 'violet-embroidered-top', name: 'Violet Embroidered Top',
    description: 'A violet embroidered statement top with delicate detailing.',
    price: null, salePrice: null, category: 'Top Wear', productType: 'Designer tops',
    collection: 'Noor Edit', occasion: 'Party', fabric: null,
    colors: ['Violet'], sizes: [], stockBySize: {},
    images: ['/images/products/violet-embroidered-top.jpg'], featured: false, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-004', slug: 'rust-printed-short-kurti', name: 'Rust Printed Short Kurti',
    description: 'A rust printed short kurti with contrast tassel details.',
    price: null, salePrice: null, category: 'Top Wear', productType: 'Designer kurtis',
    collection: 'Riwaayat Edit', occasion: 'Festive', fabric: null,
    colors: ['Rust'], sizes: [], stockBySize: {},
    images: ['/images/products/rust-printed-short-kurti.jpg'], featured: false, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-005', slug: 'lilac-occasion-anarkali', name: 'Lilac Occasion Anarkali',
    description: 'A soft lilac floor-length occasion silhouette.',
    price: null, salePrice: null, category: 'Traditional', productType: 'Anarkali',
    collection: 'Noor Edit', occasion: 'Reception', fabric: null,
    colors: ['Lilac'], sizes: [], stockBySize: {},
    images: ['/images/products/lilac-occasion-anarkali.jpg'], featured: true, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-006', slug: 'black-heart-overlay-dress', name: 'Black Heart Overlay Dress',
    description: 'A sheer heart-detail overlay styled with denim.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer long dresses',
    collection: 'Gul Collection', occasion: 'Party', fabric: null,
    colors: ['Black'], sizes: [], stockBySize: {},
    images: ['/images/products/black-heart-overlay-dress.jpg'], featured: false, newArrival: true, bestSeller: false,
  },
  {
    id: 'nk-007', slug: 'fuchsia-embroidered-pant-kurti-set', name: 'Fuchsia Embroidered Pant Kurti Set',
    description: 'A vibrant embroidered set with a coordinated flared bottom.',
    price: null, salePrice: null, category: 'Traditional', productType: 'Pant palazzo with kurti',
    collection: 'Gul Collection', occasion: 'Wedding', fabric: null,
    colors: ['Fuchsia'], sizes: [], stockBySize: {},
    images: ['/images/products/fuchsia-embroidered-pant-kurti-set.jpg'], featured: true, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-008', slug: 'black-lace-mini-dress', name: 'Black Lace Mini Dress',
    description: 'A black mini dress finished with sheer embroidered lace.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer short dresses',
    collection: 'Noor Edit', occasion: 'Party', fabric: null,
    colors: ['Black'], sizes: [], stockBySize: {},
    images: ['/images/products/black-lace-mini-dress.jpg'], featured: false, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-009', slug: 'denim-ruffle-dress', name: 'Denim Ruffle Dress',
    description: 'A dark denim dress with a fitted bodice and layered ruffle hem.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer short dresses',
    collection: 'Riwaayat Edit', occasion: 'Party', fabric: null,
    colors: ['Denim'], sizes: [], stockBySize: {},
    images: ['/images/products/denim-ruffle-dress.jpg'], featured: false, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-010', slug: 'burgundy-draped-two-piece-set', name: 'Burgundy Draped Two-Piece Set',
    description: 'A rich burgundy two-piece look with a draped skirt.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer two-piece set',
    collection: 'Gul Collection', occasion: 'Party', fabric: null,
    colors: ['Burgundy'], sizes: [], stockBySize: {},
    images: ['/images/products/burgundy-draped-two-piece-set.jpg'], featured: false, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-011', slug: 'silver-sequin-two-piece-set', name: 'Silver Sequin Two-Piece Set',
    description: 'A silver sequin co-ord with a matching mini skirt.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer two-piece set',
    collection: 'Noor Edit', occasion: 'Party', fabric: null,
    colors: ['Silver'], sizes: [], stockBySize: {},
    images: ['/images/products/silver-sequin-two-piece-set.jpg'], featured: false, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-012', slug: 'ivory-satin-two-piece-set', name: 'Ivory Satin Two-Piece Set',
    description: 'An ivory satin top and skirt with sheer sleeve details.',
    price: null, salePrice: null, category: 'Western Wear', productType: 'Designer two-piece set',
    collection: 'Meher Collection', occasion: 'Reception', fabric: null,
    colors: ['Ivory'], sizes: [], stockBySize: {},
    images: ['/images/products/ivory-satin-two-piece-set.jpg'], featured: false, newArrival: false, bestSeller: true,
  },
  {
    id: 'nk-013', slug: 'white-lace-flared-pants', name: 'White Lace Flared Pants',
    description: 'White flared trousers with an all-over lace finish.',
    price: null, salePrice: null, category: 'Bottoms', productType: 'Designer pants',
    collection: 'Heritage Edit', occasion: 'Party', fabric: null,
    colors: ['White'], sizes: [], stockBySize: {},
    images: ['/images/products/white-lace-flared-pants.jpg'], featured: false, newArrival: false, bestSeller: false,
  },
]

export const products: Product[] = catalogue.map(product => ({
  ...product,
  stock: Object.values(product.stockBySize).reduce((total, quantity) => total + Math.max(0, quantity), 0),
}))

export const unitPrice = (product: Product): number | null => product.salePrice ?? product.price
export const stockForSize = (product: Product, size: string): number => Math.max(0, product.stockBySize[size] ?? 0)
export const inventoryConfigured = (product: Product): boolean => Object.keys(product.stockBySize).length > 0
