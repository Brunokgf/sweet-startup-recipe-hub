# Project Rules

- Track Meta PageView after client navigation in the shared root; never infer a paid Purchase from a thank-you page or return to the tab, because neither confirms payment.

- Resolve CDN asset pointers through `src/lib/asset-url.ts` against the published Lovable origin so the same images work on external hosts such as Netlify.

- Keep social proof inside the WhatsApp-style carousel, using phone-like screenshots and unique, natural-looking avatars because credibility is central to this sales page.
- Keep the flavor showcase as a swipeable carousel with desktop arrows, progress, concise selling copy, and a final purchase CTA because most visitors arrive on mobile.