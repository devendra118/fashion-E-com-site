# NK. fashnina storefront

Responsive React + Vite storefront updated with the product photos supplied for NK. fashnina and the Traditional, Western Wear, Bottoms and Top Wear catalog groups.

## Update product details

Edit `src/data/products.ts` in GitHub to manage each item's name, photo, category, price, sizes and size-level stock.

- Set `price` to the actual selling price in rupees. Leave it `null` until confirmed.
- Set `salePrice` to a sale price, or leave it `null`.
- Add supported sizes to `sizes`, then enter the quantity available for each size in `stockBySize`. A quantity of `0` makes that size unavailable.
- Set `images` to a file path under `public/images/products/`.
- Items without a price or available size cannot be purchased. They show as price-on-request/unavailable until the catalog values are filled in.

For example, for an item priced at ₹2,499 with 2 medium and 1 large in stock, use `price: 2499`, `sizes: ['S', 'M', 'L']` and `stockBySize: { S: 0, M: 2, L: 1 }`. To change its photo, add the new image to `public/images/products/` and update the matching path in `images`.

The 13 supplied photos are stored under `public/images/products/`. Local files are used instead of remote demo image URLs, so the storefront does not rely on third-party image links.

## Update product options

Edit `src/data/categories.ts` to add or rename product options. Use one of the group names as the product's `category` and copy the matching option into that item's `productType` in `src/data/products.ts`.

## GitHub and Netlify

Copy the **contents of this `nk` folder** to the root of the GitHub repository connected to Netlify. In Netlify, use:

- Base directory: blank
- Build command: `npm run build`
- Publish directory: `dist`

If you keep this project inside a GitHub subfolder named `nk`, set Netlify's base directory to `nk`. `netlify.toml` includes the single-page-app rewrite needed for direct visits to product and shop pages.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Orders and payments

The checkout currently sends an order request through WhatsApp. It does not charge a card or UPI payment, create a production order record, or connect to a payment gateway. Do not accept live online payments until Razorpay or another gateway is connected through a trusted server function and its payment signature is verified server-side. Never commit payment secrets to GitHub.

## Main files

- `src/data/products.ts` — product details, price, size availability and stock
- `src/data/categories.ts` — product groups and the selectable product options
- `public/images/products/` — supplied catalog photography
- `src/config/store.ts` — brand, contact, social and shipping details
- `src/services/payment.ts` — payment integration placeholder
- `netlify.toml` — Netlify build settings and SPA route rewrite
