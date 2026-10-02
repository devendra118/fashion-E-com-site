import { stockImage } from './stockImages'

// These are the shop navigation groups and the editable styles in each group.
// Keep the style spelling here and in each product's `productType` the same.
export const categoryGroups = [
  {
    name: 'Traditional',
    slug: 'traditional',
    options: [
      'Cotton kurta set', 'Farsi set', 'Cotton skirts', 'Pant palazzo with kurti',
      'Cotton sari', 'Designer sari', 'Lehenga', 'Heavy lehenga',
      'Aesthetic pant kurti set', 'Sharara set', 'Anarkali', 'Cotton top and pants',
      'Velvet short kurta set', 'Velvet long kurta set',
    ],
  },
  {
    name: 'Western Wear',
    slug: 'western-wear',
    options: [
      'Cotton one-piece', 'Cotton dress', 'Designer short dresses',
      'Designer long dresses', 'Designer one-piece', 'Velvet designer dresses',
      'Velvet designer short dresses', 'Designer two-piece set',
    ],
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    options: [
      'Cotton pants', 'Cotton shorts', 'Cotton full skirt', 'Denim pants',
      'Denim shorts', 'Skirts', 'Designer skirts', 'Designer short skirts',
      'Velvet pants', 'Velvet shorts', 'Designer pants',
    ],
  },
  {
    name: 'Top Wear',
    slug: 'top-wear',
    options: [
      'Cotton tops', 'Cotton short kurtis', 'Cotton long kurtis', 'Cotton shirts',
      'Cotton shrugs', 'Designer tops', 'Designer crop tops', 'Designer kurtis',
      'Designer shirts', 'Denim shirts', 'Satin tops', 'Georgette tops',
      'Designer shrugs', 'Velvet tops', 'Velvet kurtis',
    ],
  },
] as const

export const categories = categoryGroups.map((group, i) => ({
  id: `c${i}`,
  slug: group.slug,
  name: group.name,
  image: stockImage(i, 900),
}))

export const productOptions = categoryGroups.flatMap(group =>
  group.options.map(name => ({ category: group.name, name })),
)

export const occasions = ['Wedding', 'Reception', 'Engagement', 'Mehendi', 'Haldi', 'Festive', 'Party']
