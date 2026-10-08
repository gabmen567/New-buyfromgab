# Supabase database setup

`setup.sql` is the complete initial database schema and reference-data setup for BuyfromGAB. It creates the catalog, customer/order flow, inventory history, product reviews, wishlists, discount codes, store/payment/shipping settings, administrator roles, row-level security policies, and reporting views.

## Apply it later

1. Create or open the intended Supabase project.
2. Open **SQL Editor** in that project.
3. Review `setup.sql`, then paste and run it as one script.
4. Create the real administrator account under **Authentication → Users**.
5. Uncomment and run the final administrator bootstrap statement in `setup.sql`, substituting that account's email.
6. Set actual product stock in the admin interface before accepting database-backed orders. Seeded catalog products intentionally start at zero stock.

The setup imports the storefront's six categories, 21 subcategories and 36 catalog products. It does not import placeholder customer reviews, browser dashboard customers/orders, or sample sales counts as real business data. Payment integrations remain disabled except for WhatsApp. No payment secrets are stored in the schema.

## Important

- This SQL is prepared but has **not** been run against a Supabase project.
- The current storefront and admin demo still use hard-coded/local-browser data. Applying the SQL does not connect either frontend to Supabase; that requires a separate integration change.
- The admin dashboard's displayed demo login is not a Supabase user or secure authentication. Create real accounts through Supabase Auth and grant an admin role with the bootstrap statement.
- The Supabase project URL alone is not sufficient to securely run SQL. Prefer the SQL Editor above, or use the Supabase CLI after authenticating locally. Never send or put a service-role key in the browser, source control, or chat.
- Public checkout must call the `place_order` RPC; direct public inserts into orders and order items are denied. The RPC validates current catalog prices and inventory in a transaction.
- Public order tracking must use both the generated order number and the secret `tracking_token` returned by `place_order`; do not expose the token in storefront URLs or logs.
