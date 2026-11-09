# Storefront editor

Open `/admin/storefront.html`, or choose **Edit storefront** in the admin sidebar.

## Everyday editing

1. Open **Homepage** to edit the main heading, introduction, small heading, footer copy and updates text. In **Your store promises**, edit each card’s title and supporting text, choose an icon visually (delivery truck, returns, support headset, payment card, security shield, package, clock or star), and toggle individual cards or the whole section. The preview updates as you edit. Existing saved content gains the original four promises automatically; no SQL migration is needed. Save a draft and preview, then publish to update the storefront.

   In **Social media links**, add your Facebook, Instagram, X (Twitter) and YouTube profile/channel URLs. The footer shows all four icons beside WhatsApp. A blank profile URL shows a non-clickable icon; a configured HTTPS URL makes it a link opening in a new tab. No profile URLs are guessed. Save and publish to update links on the storefront.
2. Open **Categories** to edit the ten category names, colours, tile artwork, button labels, wide tiles, order and visibility. Hiding a category also hides its products from the storefront.
3. Open **Category banners** and choose a page, including **All products**. Edit its text, background, left/right images and visibility. The right image is used on mobile.
4. Open **Promotional banners** to create homepage banners with a headline, supporting copy, uploaded image, button and destination. Shop destinations use `#/all`, `#/c/food`, `#/p/1`, etc. Full HTTPS links also work. Banners can be reordered or hidden.
5. Open **Products** to edit the real storefront catalog: name, description, brand, category/subcategory, selling/original price, stock, photo and collection flags. New products start hidden with zero stock. Existing products with unspecified stock retain their untracked availability; enter actual stock to show an exact quantity, or leave the field blank to keep it untracked. Zero marks a product out of stock.
6. **Save draft** preserves edits without changing the published store. **Preview** saves the draft and opens a draft storefront in another tab. **Publish store** saves and publishes the current content.

Image uploads support PNG, JPG, WebP, GIF and AVIF. Decorative banner/category images have empty alt text; product images use the product name. Use well-cropped transparent artwork for category tiles and separate desktop banner images. HTTP and script URLs are rejected.

### Uploading complete designs

Products have a direct **Upload product photo** file picker; recommended size is **1200 × 1200 px**. The editor reports the uploaded file's actual dimensions. You can still use a full HTTPS image URL.

For categories and banners, click **Upload desktop design & crop** to upload a finished composition containing your own text and artwork. Drag the image within the fixed crop frame, zoom with the slider (or mouse wheel), and choose **Apply crop**. Arrow keys reposition a focused image; **Reset** restores its initial centered position. Applying a desktop image automatically enables complete-design mode, replacing the standard text/artwork overlays. Use the separate mobile upload for a different mobile crop. **Cancel** or Escape leaves the existing image unchanged and uploads nothing. Product photo uploads also use a square crop frame.

Crops are exported at the exact dimensions listed below as WebP (or PNG if the browser cannot encode WebP). Source uploads can be up to 20 MB; saved images remain subject to the 5 MB connected-store limit or 1 MB local-preview limit. Animated sources are flattened to the selected still image. Re-upload a source to choose a different crop. Pasting an image URL bypasses cropping. Category names, banner headings and promotion headlines remain useful for navigation and accessible labels. Existing content remains compatible and standard layouts remain available when complete-design mode is off. No extra SQL migration is needed.

| Placement | Desktop design | Optional mobile design |
| --- | --- | --- |
| Standard category tile | 900 × 600 px (3:2) | 800 × 800 px (1:1) |
| Wide category tile | 1800 × 600 px (3:1) | 1600 × 800 px (2:1) |
| Category page banner, including All products | 1600 × 400 px (4:1) | 800 × 400 px (2:1) |
| Homepage promotional banner | 1200 × 600 px (2:1) | 800 × 400 px (2:1) |

The crop tool exports these exact sizes. Existing or URL-based images can have other dimensions: the storefront preserves the whole saved image using `object-fit: contain`, so a different aspect ratio can leave background space. On screens below 1100 px, the mobile image is used when supplied, otherwise the desktop image is reused. Keep important text/logos inset from the crop edges to allow for rounded corners. Save and preview both screen sizes before publishing.

Download a backup before making substantial changes. Restore loads the JSON into an unsaved draft and does not publish automatically. Keep backups private if they contain unreleased catalog information. A version check prevents overwriting a newer save from another tab/editor; download a backup and reload if this happens.

## Connect Supabase for publishing to every visitor

The checked-in `store-config.js` is intentionally empty. Until configured, the editor labels itself **Local preview** and saves only in this browser. It does not claim to update the hosted store. Use the same origin for the editor and storefront; a local static server is preferable to opening `file://` pages.

1. In the intended Supabase project, review and run `supabase/setup.sql` if it has not already been applied.
2. Review and run `supabase/storefront-content.sql`. This adds separate draft/published content documents, a revision-checked save function, and the `storefront-media` bucket. It does not import the dashboard's sample orders/customers.
3. Create the administrator under Supabase **Authentication → Users** and grant its `admin` role with the bootstrap statement at the end of `setup.sql`.
4. Set `supabaseUrl` and `publishableKey` in `store-config.js` to the project's public URL and public publishable (or legacy anon) key. Never use a secret/service-role key.
5. Deploy the code/config changes through the existing hosting workflow. Registration and deploying this code are separate from content publishing; after deployment, daily content edits require no deployment.
6. Sign in to `/admin/storefront.html` using the real administrator account, review the content/stock, and publish. Existing visitors receive changes when they reload or return focus to the storefront.

To move a local draft to the connected store: download its backup before changing configuration, sign in to the connected editor, restore the backup, review it and publish. The connection never silently imports local demo edits.

Public reads can see only the published content document. The draft requires administrator/staff access. Publishing uses authenticated RPC access; anonymous visitors cannot write. Image files in `storefront-media` are public by design, even before a draft is published; never upload private files. New image uploads use unique names and require an administrator/staff role. Old uploads are retained to avoid breaking published pages or backups; clean unused files manually in Supabase Storage when safe.

## Scope

This editor publishes the customer-facing catalog and presentation as a content document. The original admin dashboard's order/customer/analytics screens and **Demo inventory** remain sample reporting tools. They are not a live order-management backend. Storefront checkout continues to use the existing WhatsApp flow. Content stock is a displayed availability value, not a transactional reservation system. The relational `products` and order tables prepared in `setup.sql` are not synchronized with content-document products; use this editor as the source for the current WhatsApp storefront until a full commerce integration is implemented.

Supabase requires a live project, applied schema, public configuration, and a real administrator account. A public URL/key cannot run SQL or create administrator privileges. Remote authentication, database policy enforcement and uploads must be verified against that project after configuration.
# Grouped font sizes

Open **Font sizes** in the storefront editor. Each group has independent desktop (1100 px and wider) and mobile/tablet sizes. Use the number input arrows or type a whole number from 10 to 72 px. Blank means the original responsive sizing. Reset a group or all groups to restore automatic sizing. Save a draft, Preview, then Publish store to apply the settings for visitors. These settings change website text; text baked into an uploaded image must be changed in the original design.

