# Customer accounts

The storefront Account page uses Supabase email/password authentication with a customer session separate from the admin session. It supports signup, login, logout, email-confirmation callbacks and password reset callbacks. Signup does not grant an admin role. No new database migration is required.

In Supabase → Authentication → URL Configuration, set the Site URL to the production storefront origin and add its exact homepage URL to Redirect URLs (for example `https://v0-buy-from-gab.vercel.app/`). Add `https://buyfromgab.vercel.app/` when that domain points to this project. Enable the Email provider and allow new user signups. Keep email confirmation enabled if you want verified email addresses. Configure production SMTP for reliable confirmation and reset emails.

Check signup with a real email you control, follow its confirmation link, log out and log in again. Test Forgot password and follow its reset link. Existing cart, favourites, order history and delivery details remain device-local; this change does not sync them to accounts.
