// Single place to edit brand details.
export const store = {
  brandName: 'NK. fashnina',
  tagline: 'Contemporary silhouettes crafted with an Indian soul.',
  announcement: 'Discover the New Collection',
  location: 'Jaipur, Rajasthan, India',
  instagram: 'https://www.instagram.com/neha.kumaw288/',
  instagramHandle: '@neha.kumaw288',
  whatsapp: '', // digits with country code, e.g. 919876543210
  email: '', phone: '', youtube: '', facebook: '', pinterest: '',
  currency: 'INR',
  shippingMessage: 'Free shipping above ₹10,000.',
  freeShippingAbove: 10000, shippingFee: 500,
}
export const waLink = (text: string) =>
  store.whatsapp ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}` : ''
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
