# New-buyfromgab
ecommerce

## Admin demo

For customer-facing content, open [`admin/storefront.html`](./admin/storefront.html) or choose **Edit storefront**. This separate editor manages the real homepage, category tiles, banners and product catalog, with drafts, previews, image uploads and publishing. See [the editor guide](./admin/STOREFRONT-EDITOR.md) for Supabase setup and the distinction between local publishing and publishing for every visitor.

The admin workspace uses the store's navy, green, and lavender palette with rounded panels and classic serif headings. It includes a responsive overview, order and stock shortcuts, notifications, searchable products and customers, product editing, order status updates, CSV order exports, analytics, and store settings.

The standalone demo dashboard is in [`admin/`](./admin/). With the local static server running, open `http://localhost:8001/admin/`.
The production site is at https://buyfromgab.vercel.app, and its admin dashboard is at https://buyfromgab.vercel.app/admin/.

- Email: `admin@buyfromgab.com`
- Password: `GabDemo2026!`

The dashboard uses sample data stored in the browser. Its client-side demo sign-in is not production authentication, and dashboard changes do not update the storefront or a live backend.

The production deployment was made from the Vercel CLI. GitHub is not connected to the Vercel project yet, so pushes to the repository will not automatically deploy until a GitHub login connection is added in Vercel.

## Supabase database

The complete, not-yet-applied database setup is in [`supabase/setup.sql`](./supabase/setup.sql). See [`supabase/README.md`](./supabase/README.md) for safe setup steps and current integration limitations.
