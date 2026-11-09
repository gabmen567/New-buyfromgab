# Customer accounts

## Separate login page and social login

Customers log in at `/login.html`. The storefront Account page links there when signed out. Google and Microsoft buttons read the enabled providers from Supabase public auth settings; they become usable automatically after configuration. OAuth uses PKCE and returns to `/login.html`. No provider secret belongs in the website code.

1. In Supabase Authentication → URL Configuration, add `https://v0-buy-from-gab.vercel.app/login.html` to Redirect URLs, plus the corresponding URL for any other connected production domain.
2. In Google Cloud Console, create an OAuth web client. Add `https://creyqlxwbftswksfbldi.supabase.co/auth/v1/callback` as an authorized redirect URI. Configure the consent screen and publishing/test users as appropriate. Enter its client ID and secret in Supabase Authentication → Sign In / Providers → Google, then enable it. See [Supabase Google setup](https://supabase.com/docs/guides/auth/social-sign-in/auth-google).
3. In Microsoft Entra, register a web application supporting organizational and personal Microsoft accounts so Outlook/Hotmail customers can use it. Set the web redirect URI to `https://creyqlxwbftswksfbldi.supabase.co/auth/v1/callback`. Create a client secret and enter its value and the application client ID under Supabase's Azure (Microsoft) provider. Use the common tenant for organizational and personal accounts. The website requests the required `email` scope. See [Supabase Microsoft setup](https://supabase.com/docs/guides/auth/social-sign-in/auth-azure).
4. Test each provider with an account you control, including cancellation, logout and re-login. The providers were disabled when this feature was implemented; live OAuth cannot be verified until they are configured.

The storefront Account page uses Supabase email/password authentication with a customer session separate from the admin session. It supports signup, login, logout, email-confirmation callbacks and password reset callbacks. Signup does not grant an admin role. No new database migration is required.

In Supabase → Authentication → URL Configuration, set the Site URL to the production storefront origin and add its exact homepage URL to Redirect URLs (for example `https://v0-buy-from-gab.vercel.app/`). Add `https://buyfromgab.vercel.app/` when that domain points to this project. Enable the Email provider and allow new user signups. Keep email confirmation enabled if you want verified email addresses. Configure production SMTP for reliable confirmation and reset emails.

Check signup with a real email you control, follow its confirmation link, log out and log in again. Test Forgot password and follow its reset link. Existing cart, favourites, order history and delivery details remain device-local; this change does not sync them to accounts.
