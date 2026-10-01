// Payment is NOT processed here. To add Razorpay:
// 1. On a server (Netlify Function / Supabase Edge Function) create an order using the secret key.
// 2. Load checkout.js, open it with VITE_RAZORPAY_KEY_ID and the returned order id.
// 3. Verify the signature server-side before marking the order paid.
export type PaymentMethod = 'upi'|'card'|'netbanking'|'cod'
export const paymentService = {
  async start(_m:PaymentMethod,_amount:number):Promise<{status:'pending-integration'}> { return { status:'pending-integration' } }
}
