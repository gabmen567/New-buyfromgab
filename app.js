try{var t=localStorage.getItem("bazaar-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}

/* Settings: currency, WhatsApp number, payment options */

/* ====== Settings you can change ====== */
const CURRENCY = "GHS";   // Paystack and Hubtel in Ghana use Ghana cedis
const LOCALE = "en-GH";

/* ====== Payments ====== */
const WHATSAPP_NUMBER = "233545359058";      // digits only, with country code
const WHATSAPP_DISPLAY = "+233 54 535 9058";
// Set enabled: true on Paystack or Hubtel once you have integrated them.
const PAYMENT_METHODS = [
  { id: "whatsapp", name: "Pay via WhatsApp", note: "Send your order and pay by chatting with us on " + WHATSAPP_DISPLAY, enabled: true },
  { id: "paystack", name: "Paystack",         note: "Cards and mobile money", enabled: false },
  { id: "hubtel",   name: "Hubtel",           note: "Mobile money, cards and more", enabled: false }
];

/* Price ranges shown in the category page filter (min is included, max is not) */
const PRICE_RANGES = [
  { label: "Under 150",      min: 0,     max: 150 },
  { label: "150 - 950",      min: 150,   max: 950 },
  { label: "950 - 4.1 k",    min: 950,   max: 4100 },
  { label: "4.1 - 12 k",     min: 4100,  max: 12000 },
  { label: "More than 12 k", min: 12000, max: Infinity }
];

/* Delivery: orders over this amount get free delivery */
const DELIVERY = { freeOver: 500, note: "The delivery fee for smaller orders is confirmed with you on WhatsApp." };

/* Promo codes (SAMPLE: edit or delete). percent = % off the subtotal, min = smallest subtotal that qualifies */
const COUPONS = { WELCOME10: { percent: 10, min: 0, label: "10% off" } };

/* How many products a list shows before the "Show more" button */
const PAGE_SIZE = 24;

/* Categories shown on the landing page */

/* ====== Categories (shown on the landing page, in this order) ======
   lines: title line breaks on phone/tablet. dlines: title line breaks on desktop.
   art: picture size/position on phone and tablet. d: picture width/right offset on desktop. */
const { CATEGORIES, ART, BANNERS, PRODUCTS, SUBCATS, TOP_IDS, dealPct, COLLECTION_NAMES } = window.StoreCatalog;
let storefrontContent = null;
const initialCategoryLayout = window.StoreContent.clone(CATEGORIES);

/* Sample reviews */

/* ====== Reviews ======
   SAMPLE REVIEWS: placeholder text so you can see the layout.
   Replace them with real customer reviews, or delete them (set SAMPLE_REVIEWS = {}).
   Format: productId: [ { name, rating (1-5), text, date: "YYYY-MM-DD" } ] */
const SAMPLE_REVIEWS = {
  1:  [{ name: "Ama K.",    rating: 5, date: "2026-09-02", text: "My son plays with these every day. The blocks are smooth and well made." },
       { name: "Kofi B.",   rating: 4, date: "2026-08-11", text: "Good quality and a nice size. I wish the set came with a few more pieces." }],
  3:  [{ name: "Yaw M.",    rating: 5, date: "2026-09-10", text: "Fast and easy to control. The battery lasted longer than I expected." },
       { name: "Efua A.",   rating: 3, date: "2026-08-20", text: "Fun toy, but it's hard to steer on rough ground." }],
  7:  [{ name: "Akosua D.", rating: 5, date: "2026-09-18", text: "Clear sound and very comfortable. I wore them for hours with no problem." },
       { name: "Kwame O.",  rating: 4, date: "2026-09-01", text: "Pairing was quick and the battery is good. The case feels a little plain." }],
  8:  [{ name: "Abena T.",  rating: 4, date: "2026-08-29", text: "Does everything I need and the screen is bright. Steps count looks accurate." },
       { name: "Nana S.",   rating: 3, date: "2026-07-30", text: "Nice watch, but the strap could be softer." }],
  9:  [{ name: "Esi P.",    rating: 5, date: "2026-09-14", text: "Surprisingly loud for its size. I take it everywhere." },
       { name: "Kojo L.",   rating: 4, date: "2026-08-05", text: "Great sound for the price. Bass is decent." }],
  13: [{ name: "Adwoa R.",  rating: 5, date: "2026-09-08", text: "Easy to swallow and the tub is handy. I'll order again." },
       { name: "Selorm H.", rating: 4, date: "2026-08-17", text: "Good value for the quantity." }],
  14: [{ name: "Ama K.",    rating: 5, date: "2026-09-12", text: "Everything I need is neatly packed. Perfect for the car." },
       { name: "Yaw M.",    rating: 4, date: "2026-07-25", text: "Compact and well organised." }],
  19: [{ name: "Kofi B.",   rating: 5, date: "2026-09-16", text: "Soft cotton and a comfortable fit. It held up well in the wash." },
       { name: "Efua A.",   rating: 4, date: "2026-08-22", text: "Nice colour. Runs slightly large." }],
  22: [{ name: "Kwame O.",  rating: 5, date: "2026-09-20", text: "Light and comfortable straight out of the box." },
       { name: "Abena T.",  rating: 4, date: "2026-08-14", text: "Good grip and good cushioning for the price." }],
  25: [{ name: "Esi P.",    rating: 5, date: "2026-09-05", text: "Beautiful colour and it stays on for hours." },
       { name: "Nana S.",   rating: 4, date: "2026-08-09", text: "Smooth to apply. A little drying after a long day." }],
  31: [{ name: "Adwoa R.",  rating: 5, date: "2026-09-11", text: "Heats evenly and nothing sticks. Cleans up easily." },
       { name: "Kojo L.",   rating: 4, date: "2026-08-03", text: "Solid pot with a tight lid. Handles stay cool." }],
  35: [{ name: "Selorm H.", rating: 4, date: "2026-09-09", text: "Boils fast and shuts off by itself. Does the job." },
       { name: "Akosua D.", rating: 3, date: "2026-08-01", text: "Works well, but it's a bit noisy." }]
};

/* Helpers and app state */

/* ====== Helpers ====== */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY }).format(n);
const catName = (id) => CATEGORIES.find(c => c.id === id)?.name || "Category";
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let reduceMotion = motionPreference.matches;
motionPreference.addEventListener("change", e => { reduceMotion = e.matches; });

/* ====== State ====== */
let filter = "all";
let query = "";
let keepQuery = false;   // true while a search is being opened, so the search word is kept
let routedOnce = false;  // false until the first page has been shown
let sortBy = "featured", minP = "", maxP = "", minRating = 0, priceIdx = -1, collection = "", subSel = "";
const brandSet = new Set();
let lastList = null;
let lastRouteColl = false;
let legalKey = "privacy";
let pdQty = 1;
let currentProd = null;
let lastOrder = null;
let cart = {}; // { productId: qty }
try { cart = JSON.parse(localStorage.getItem("bazaar-cart") || "{}") || {}; } catch (e) { cart = {}; }
let userReviews = {};
try { userReviews = JSON.parse(localStorage.getItem("bazaar-reviews") || "{}") || {}; } catch (e) { userReviews = {}; }
const saveReviews = () => { try { localStorage.setItem("bazaar-reviews", JSON.stringify(userReviews)); } catch (e) {} };
let favs = [];
try { favs = (JSON.parse(localStorage.getItem("bazaar-favs") || "[]") || []).filter(Number.isInteger); } catch (e) { favs = []; }
const saveFavs = () => { try { localStorage.setItem("bazaar-favs", JSON.stringify(favs)); } catch (e) {} };
const isFav = (id) => favs.includes(id);
const HEART_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.900 3.600 4.500 7 4.500c2 0 3.400 1.100 5 3 1.600-1.900 3-3 5-3 3.400 0 5.400 3.400 4.200 6.700-1.700 4.700-9.200 9.300-9.200 9.300Z"/></svg>`;
const saveCart = () => { try { localStorage.setItem("bazaar-cart", JSON.stringify(cart)); } catch (e) {} };

/* Store logic: cart totals, promo code, delivery, saved details, order history, recently viewed, recent searches */

/* ====== Saved data (kept in this browser) ====== */
const loadData = (key, fallback) => {
  try { const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; }
};
const saveData = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} };

let couponCode = loadData("bazaar-coupon", "");
let couponMsg = "";
let orders = loadData("bazaar-orders", []);        // newest first
let profile = loadData("bazaar-profile", {});      // name, phone, email, address
let recent = loadData("bazaar-recent", []);        // recently viewed product ids, newest first
let searches = loadData("bazaar-searches", []);    // recent searches
let pageLimit = PAGE_SIZE;                     // how many products the list shows

/* ====== Totals ====== */
function cartSummary() {
  const lines = cartLines();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.p.price, 0);
  const c = COUPONS[couponCode];
  const discount = c && subtotal >= (c.min || 0) ? Math.round(subtotal * c.percent) / 100 : 0;
  const after = Math.max(0, subtotal - discount);
  const free = subtotal >= DELIVERY.freeOver;   // judged on the order value before any promo code
  return { lines, count, subtotal, discount, coupon: discount > 0 ? couponCode : "", total: after, free, toFree: Math.max(0, DELIVERY.freeOver - subtotal) };
}
function applyCoupon(raw) {
  const code = String(raw || "").trim().toUpperCase();
  if (!code) return "Enter a promo code.";
  const c = COUPONS[code];
  if (!c) return "That code isn't valid.";
  if (cartSummary().subtotal < (c.min || 0)) return "Spend " + money(c.min) + " or more to use " + code + ".";
  couponCode = code; saveData("bazaar-coupon", couponCode);
  return code + " applied: " + c.label + ".";
}
function removeCoupon() { couponCode = ""; couponMsg = ""; saveData("bazaar-coupon", ""); }

/* ====== Orders, recently viewed, searches, saved details ====== */
function saveOrder(o) {
  orders = [{ ...o, date: new Date().toISOString(), status: "Sent on WhatsApp" }, ...orders.filter(x => x.ref !== o.ref)].slice(0, 30);
  saveData("bazaar-orders", orders);
}
function addRecent(id) { recent = [id, ...recent.filter(x => x !== id)].slice(0, 10); saveData("bazaar-recent", recent); }
function addSearch(q) {
  q = String(q).trim(); if (q.length < 2) return;
  searches = [q, ...searches.filter(s => s.toLowerCase() !== q.toLowerCase())].slice(0, 6); saveData("bazaar-searches", searches);
}
function saveProfile(p) { profile = { ...profile, ...p }; saveData("bazaar-profile", profile); }

/* Ghana phone numbers: 024 123 4567, 0241234567, +233 24 123 4567 */
const phoneOk = (v) => /^(?:\+?233|0)\d{9}$/.test(String(v).replace(/[\s\-()]/g, ""));
const inStock = (p) => p.stock !== 0;
const trackUrlFor = (ref) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello, I'd like to track my order." + (ref ? " Order: " + ref : ""));

/* Drawing the landing tiles, lists, filters and product page */

/* ====== Landing tiles ====== */
const ARROW_UR = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10"/></svg>`;
const ARROW_R = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>`;
function categoryTileHTML(c, selectedCategory = "") {
  if (c.fullImageMode && c.fullImage) return `<a class="tile full-image${c.wide ? " tile-wide" : ""}" href="#/c/${c.id}" data-cat="${c.id}" aria-label="${esc(c.name)}">${fullDesignHTML(c)}</a>`;
  const m = c.lines.map(esc).join("<br>");
  const d = c.dlines.map(esc).join("<br>");
  const a = c.art;
  const art = ART[c.id] ? `<img class="tile-art" src="${esc(ART[c.id])}" alt="" draggable="false" style="--w:${a.w};--r:${a.r};${a.t !== undefined ? "--t:" + a.t : "--b:" + a.b};--dw:${c.d.w};--dr:${c.d.r}">` : "";
  const action = c.cta ? `<span class="tile-cta">${esc(c.cta)}${ARROW_R}</span>` : `<span class="tile-go">${ARROW_UR}</span>`;
  const current = selectedCategory === c.id ? ' aria-current="page"' : "";
  return `<a class="tile${c.wide ? " tile-wide" : ""}" href="#/c/${c.id}" data-cat="${c.id}" aria-label="${esc(c.name)}"${current}><span class="tile-title"><span class="tm">${m}</span><span class="td">${d}</span></span>${action}${art}</a>`;
}
function renderTiles() {
  $("#category-grid").innerHTML = CATEGORIES.map(c => categoryTileHTML(c)).join("");
}

/* ====== Chips ====== */
function renderChips() {
  const all = [{ id: "all", name: "All" }, ...CATEGORIES];
  $("#chips").innerHTML = all.map(c =>
    `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${filter === c.id}">${esc(c.name)}</button>`
  ).join("");
}

/* ====== Brands menu and collections ====== */
function brandsInScope() {
  const counts = {};
  PRODUCTS.filter(p => (filter === "all" || p.cat === filter) && (!subSel || p.sub === subSel)).forEach(p => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
}
function buildBrandUI() {
  const brands = brandsInScope();
  [...brandSet].forEach(b => { if (!brands.some(([x]) => x === b)) brandSet.delete(b); });
  $("#brand-filter").innerHTML = `<option value="">All brands</option>` + brands.map(([b, n]) => `<option value="${esc(b)}">${esc(b)} (${n})</option>`).join("");
  $("#brands-pop").innerHTML = `<button class="brand-opt" type="button" data-brand="" aria-pressed="true">All brands</button>` +
    brands.map(([b, n]) => `<button class="brand-opt" type="button" data-brand="${esc(b)}" aria-pressed="false"><span>${esc(b)}</span><span class="n">${n}</span></button>`).join("");
  setBrandPop(false);
  syncBrandUI();
}
function syncBrandUI() {
  const one = brandSet.size === 1 ? [...brandSet][0] : "";
  $("#brand-filter").value = one;
  $("#brands-label").textContent = !brandSet.size ? "Brands" : one ? "Brands: " + one : "Brands: " + brandSet.size + " selected";
  $("#brands-btn").classList.toggle("active", brandSet.size > 0);
  document.querySelectorAll(".brand-opt").forEach(b => b.setAttribute("aria-pressed", b.dataset.brand ? brandSet.has(b.dataset.brand) : !brandSet.size));
  document.querySelectorAll("[data-coll]").forEach(b => b.setAttribute("aria-pressed", b.dataset.coll === collection));
}
function setBrandPop(open) {
  $("#brands-pop").hidden = !open;
  $("#brands-btn").setAttribute("aria-expanded", String(open));
}

function subName() {
  const sc = (SUBCATS[filter] || []).find(x => x.id === subSel);
  return sc ? sc.name : "";
}
function renderSubcats() {
  const subs = filter === "all" ? [] : (SUBCATS[filter] || []);
  const total = PRODUCTS.filter(p => p.cat === filter).length;
  $("#subcats").innerHTML = subs.length
    ? `<a class="chip" href="#/c/${filter}" ${!subSel ? 'aria-current="true"' : ""}>All <span class="n">${total}</span></a>` +
      subs.map(sc => `<a class="chip" href="#/c/${filter}/${sc.id}" ${subSel === sc.id ? 'aria-current="true"' : ""}>${esc(sc.name)} <span class="n">${sc.items.length}</span></a>`).join("")
    : "";
}

/* ====== Favourites ====== */
function favBtnHTML(p, big) {
  const on = isFav(p.id);
  return big
    ? `<button class="fav-btn big" type="button" data-fav="${p.id}" aria-pressed="${on}">${HEART_SVG}<span>Favourite</span></button>`
    : `<button class="fav-btn" type="button" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? "Remove" : "Add"} ${esc(p.name)} ${on ? "from" : "to"} favourites">${HEART_SVG}</button>`;
}
function toggleFav(id) {
  const p = PRODUCTS.find(x => x.id === id); if (!p) return;
  const adding = !isFav(id);
  favs = adding ? [...favs, id] : favs.filter(x => x !== id);
  saveFavs();
  document.querySelectorAll('[data-fav="' + id + '"]').forEach(b => {
    b.setAttribute("aria-pressed", adding);
    if (!b.classList.contains("big")) b.setAttribute("aria-label", (adding ? "Remove " : "Add ") + p.name + (adding ? " from" : " to") + " favourites");
  });
  if (view === "favourites") renderFavourites();
  toast(adding ? "Saved to favourites" : "Removed from favourites");
}
function renderFavourites() {
  const list = [...favs].reverse().map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  $("#favourites-page").innerHTML = `
    <a class="back-link" href="#/">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      Back to categories
    </a>
    <h1 class="page-title">Your favourites</h1>
    ${list.length
      ? `<div class="products">${list.map(cardHTML).join("")}</div>`
      : `<div class="thanks"><p>You haven't saved anything yet. Tap the heart on a product to keep it here.</p><a class="add-btn" href="#/all">Browse products</a></div>`}`;
}

/* ====== Ratings ====== */
function ratingStats(id) {
  const list = [...(userReviews[id] || []).map(r => ({ ...r, mine: true })), ...(SAMPLE_REVIEWS[id] || [])]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const count = list.length;
  const avg = count ? list.reduce((t, r) => t + r.rating, 0) / count : 0;
  const dist = [0, 0, 0, 0, 0, 0];
  list.forEach(r => { dist[r.rating]++; });
  return { list, count, avg, dist };
}
function ratingLineHTML(id) {
  const { count, avg } = ratingStats(id);
  if (!count) return `<span class="rating-line">No reviews yet</span>`;
  return `<span class="rating-line"><span class="stars" style="--r:${avg.toFixed(2)}" role="img" aria-label="Rated ${avg.toFixed(1)} out of 5"></span><span><strong>${avg.toFixed(1)}</strong> (${count})</span></span>`;
}

/* ====== Products ====== */
function cardHTML(p) {
  return `
    <article class="card" data-cat="${p.cat}">
      ${favBtnHTML(p)}
      ${(p.oldPrice || p.best || p.flash || p.isNew || !inStock(p)) ? `<div class="badges">${!inStock(p) ? `<span class="badge-out">Out of stock</span>` : ""}${p.oldPrice ? `<span class="badge-deal">-${dealPct(p)}%</span>` : ""}${p.flash ? `<span class="badge-flash">⚡ Flash</span>` : ""}${p.isNew ? `<span class="badge-new">New</span>` : ""}${p.best ? `<span class="badge-best">Best seller</span>` : ""}</div>` : ""}
      <div class="thumb">${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">` : `<span role="img" aria-label="${esc(p.name)}">${esc(p.emoji)}</span>`}</div>
      <div class="card-body">
        <span class="card-cat">${esc(p.brand)} · ${esc(catName(p.cat))}</span>
        <a class="card-link card-name" href="#/p/${p.id}">${esc(p.name)}</a>
        ${ratingLineHTML(p.id)}
        ${view === "list" && collection === "top" ? `<span class="sold">${p.sold} sold</span>` : ""}
        <div class="card-foot">
          <span class="price-wrap"><span class="price">${money(p.price)}</span>${p.oldPrice ? `<s class="was">${money(p.oldPrice)}</s>` : ""}</span>
          <button class="add-btn" type="button" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart"${inStock(p) ? "" : " disabled"}>${inStock(p) ? "+" : "Sold out"}</button>
        </div>
      </div>
    </article>`;
}

/* does a product pass the current filters? (skip = leave one filter out, to count how many it would match) */
function matches(p, skip) {
  const q = query.trim().toLowerCase();
  const lo = parseFloat(minP), hi = parseFloat(maxP);
  const range = priceIdx >= 0 ? PRICE_RANGES[priceIdx] : null;
  return (filter === "all" || p.cat === filter) &&
    (!q || p.name.toLowerCase().includes(q) || catName(p.cat).toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
    (!subSel || p.sub === subSel) &&
    (skip === "brand" || !brandSet.size || brandSet.has(p.brand)) &&
    (collection !== "deals" || p.oldPrice) &&
    (collection !== "clearance" || dealPct(p) >= 20) &&
    (collection !== "new" || p.isNew) &&
    (collection !== "flash" || p.flash) &&
    (collection !== "best" || p.best) &&
    (collection !== "top" || filter !== "all" || TOP_IDS.has(p.id)) &&
    (skip === "price" || ((isNaN(lo) || p.price >= lo) && (isNaN(hi) || p.price <= hi) && (!range || (p.price >= range.min && p.price < range.max)))) &&
    (skip === "rating" || !minRating || ratingStats(p.id).avg >= minRating);
}

function renderProducts(keepLimit) {
  if (!keepLimit) pageLimit = PAGE_SIZE;
  const list = PRODUCTS.filter(p => matches(p));
  if (sortBy === "low") list.sort((a, b) => a.price - b.price);
  else if (sortBy === "high") list.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") list.sort((a, b) => { const A = ratingStats(a.id), B = ratingStats(b.id); return B.avg - A.avg || B.count - A.count; });
  else if (sortBy === "az") list.sort((a, b) => a.name.localeCompare(b.name));
  else if (collection === "top") list.sort((a, b) => b.sold - a.sold);
  const title = (filter === "all" ? "All products" : catName(filter)) + (subSel ? " · " + subName() : "") + (collection ? " · " + COLLECTION_NAMES[collection] : "") + (brandSet.size ? " · " + [...brandSet].join(", ") : "");
  $("#shop-title").textContent = title;
  $("#banner-title").textContent = subSel ? catName(filter) : title;
  document.title = title + " – BuyfromGAB";
  const count = list.length + (list.length === 1 ? " product" : " products");
  $("#result-count").textContent = count;
  $("#res-count").textContent = count;
  $("#banner-sub").textContent = count;
  applyEditedBanner();
  const shown = list.slice(0, pageLimit), left = list.length - shown.length;
  $("#product-grid").innerHTML = list.length ? shown.map(cardHTML).join("") : emptyResultsHTML();
  $("#show-more").hidden = left <= 0;
  $("#show-more").textContent = "Show more (" + left + " left)";
  updateSide();
  renderMobileCat(list);
}

function emptyResultsHTML() {
  const q = query.trim();
  return `<div class="empty"><p><strong>${q ? "No products found for “" + esc(q) + "”." : "No products match these filters."}</strong></p><p>Try a different word, or clear your filters.</p><p><button class="chip" type="button" data-clear-filters>Clear filters</button><a class="chip" href="#/">Browse categories</a></p></div>`;
}

function resetFilters() {
  sortBy = "featured"; minP = ""; maxP = ""; minRating = 0; priceIdx = -1; brandSet.clear(); collection = "";
  $("#sort").value = "featured"; $("#res-sort").value = "featured"; $("#min").value = ""; $("#max").value = ""; $("#min-rating").value = "0"; syncBrandUI();
}

/* ====== Category page on desktop: banner, sidebar, sub-category buttons ====== */
const itemsText = (n) => n + (n === 1 ? " Item" : " Items");
function buildSide() {
  $("#side-cats").innerHTML = CATEGORIES.map(c => `<a class="side-cat${filter === c.id ? " active" : ""}" href="#/c/${c.id}">${esc(c.name)}</a>`).join("");
  const brands = brandsInScope();
  $("#side-brand").innerHTML = brands.length
    ? brands.map(([b]) => `<label class="opt"><input type="checkbox" data-bcb="${esc(b)}"><span class="mark"></span><span class="nm">${esc(b)}</span><span class="ct" data-bct="${esc(b)}"></span></label>`).join("")
    : `<p class="side-empty">No brands</p>`;
  $("#side-price").innerHTML = PRICE_RANGES.map((r, i) => `<label class="opt"><input type="radio" name="price" value="${i}"><span class="mark round"></span><span class="nm">${esc(r.label)}</span><span class="ct" data-pct="${i}"></span></label>`).join("");
  $("#side-rating").innerHTML = [[0, "Any rating"], [4, "4 stars and up"], [3, "3 stars and up"]].map(([v, l]) => `<label class="opt"><input type="radio" name="ratingf" value="${v}"><span class="mark round"></span><span class="nm">${l}</span><span class="ct" data-rct="${v}"></span></label>`).join("");
}
function updateSide() {
  const byBrand = {};
  PRODUCTS.filter(p => matches(p, "brand")).forEach(p => { byBrand[p.brand] = (byBrand[p.brand] || 0) + 1; });
  document.querySelectorAll("[data-bcb]").forEach(cb => {
    const n = byBrand[cb.dataset.bcb] || 0;
    cb.checked = brandSet.has(cb.dataset.bcb);
    cb.disabled = !cb.checked && n === 0;
    cb.closest(".opt").querySelector(".ct").textContent = itemsText(n);
  });
  const forPrice = PRODUCTS.filter(p => matches(p, "price"));
  PRICE_RANGES.forEach((r, i) => {
    const n = forPrice.filter(p => p.price >= r.min && p.price < r.max).length;
    const inp = document.querySelector(`input[name="price"][value="${i}"]`); if (!inp) return;
    inp.checked = priceIdx === i; inp.disabled = priceIdx !== i && n === 0;
    inp.closest(".opt").querySelector(".ct").textContent = itemsText(n);
  });
  const forRating = PRODUCTS.filter(p => matches(p, "rating"));
  document.querySelectorAll('input[name="ratingf"]').forEach(inp => {
    const v = +inp.value, n = v ? forRating.filter(p => ratingStats(p.id).avg >= v).length : forRating.length;
    inp.checked = minRating === v; inp.disabled = minRating !== v && n === 0;
    inp.closest(".opt").querySelector(".ct").textContent = itemsText(n);
  });
}
function renderPills() {
  let html = "";
  if (filter === "all") {
    html = `<a class="pill active" href="${collection ? "#/all/" + collection : "#/all"}">All</a>` + CATEGORIES.map(c => `<a class="pill" href="#/c/${c.id}">${esc(c.name)}</a>`).join("");
  } else {
    const subs = SUBCATS[filter] || [];
    if (subs.length) html = `<a class="pill${!subSel ? " active" : ""}" href="#/c/${filter}">All</a>` + subs.map(sc => `<a class="pill${subSel === sc.id ? " active" : ""}" href="#/c/${filter}/${sc.id}">${esc(sc.name)}</a>`).join("");
  }
  $("#pill-row").innerHTML = html;
}
function renderBanner() {
  const pair = BANNERS[filter === "all" ? "_all" : filter] || BANNERS._all;
  const src = (v) => v.includes("/") ? v : ART[v];
  const banner = $("#cat-banner");
  banner.dataset.cat = filter;
  banner.dataset.kind = pair.every(v => v.includes("/")) ? "photo" : "art";
  $("#banner-left").src = src(pair[0]); $("#banner-right").src = src(pair[1]);
  $("#banner-left").hidden = false; $("#banner-right").hidden = false;
}

/* ====== Product page ====== */
function renderProduct(p) {
  pdQty = 1;
  currentProd = p;
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const seen = recent.filter(id => id !== p.id).map(id => PRODUCTS.find(x => x.id === id)).filter(Boolean).slice(0, 4);
  const sub = (SUBCATS[p.cat] || []).find(x => x.id === p.sub);
  const out = !inStock(p), low = p.stock > 0 && p.stock <= 5;
  $("#product").innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/c/${p.cat}">${esc(catName(p.cat))}</a>${sub ? `<span aria-hidden="true">/</span><a href="#/c/${p.cat}/${sub.id}">${esc(sub.name)}</a>` : ""}<span aria-hidden="true">/</span><span aria-current="page">${esc(p.name)}</span></nav>
    <a class="back-link pd-back" href="#/c/${p.cat}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      Back to ${esc(catName(p.cat))}
    </a>
    <div class="pd" data-cat="${p.cat}">
      <div class="pd-thumb">${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}">` : `<span role="img" aria-label="${esc(p.name)}">${esc(p.emoji)}</span>`}</div>
      <div class="pd-info">
        <span class="card-cat">${esc(p.brand)} · ${esc(catName(p.cat))}</span>
        <h1>${esc(p.name)}</h1>
        <button class="rating-link" id="pd-rating" type="button" data-scroll-reviews>${ratingLineHTML(p.id)}</button>
        <p class="pd-price">${money(p.price)}${p.oldPrice ? ` <s class="was">${money(p.oldPrice)}</s> <span class="badge-deal">-${dealPct(p)}%</span>` : ""}</p>
        ${out ? `<p class="stock out">Out of stock</p>` : low ? `<p class="stock low">Only ${p.stock} left in stock</p>` : ""}
        <p class="pd-desc">${esc(p.desc)}</p>
        <div class="pd-buy">
          <div class="qty">
            <button type="button" data-pd-dec aria-label="Decrease quantity">−</button>
            <span id="pd-qty" aria-live="polite">1</span>
            <button type="button" data-pd-inc aria-label="Increase quantity">+</button>
          </div>
          <button class="add-btn big" type="button" data-add-pd="${p.id}"${out ? " disabled" : ""}>${out ? "Out of stock" : "Add to cart"}</button>
          <a class="add-btn big wa" id="pd-wa" href="${waProductUrl(p, 1)}" target="_blank" rel="noopener">${out ? "Ask on WhatsApp" : "Buy on WhatsApp"}</a>
          ${favBtnHTML(p, true)}
          <button class="fav-btn big share-btn" type="button" data-share="${p.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg><span>Share</span></button>
        </div>
        <ul class="pd-perks">
          <li>${ICONS.truck}<span><strong>Free delivery</strong> on orders over ${money(DELIVERY.freeOver)}</span></li>
          <li>${ICONS.box}<span><strong>7-day returns</strong> on eligible items</span></li>
          <li>${ICONS.chat}<span><strong>Order help</strong> on WhatsApp, ${WHATSAPP_DISPLAY}</span></li>
        </ul>
      </div>
    </div>
    <section class="reviews" id="reviews" aria-labelledby="rev-title"></section>
    ${related.length ? `<h2 class="related-title">More in ${esc(catName(p.cat))}</h2><div class="products">${related.map(cardHTML).join("")}</div>` : ""}
    ${seen.length ? `<h2 class="related-title" style="margin-top:40px">Recently viewed</h2><div class="products">${seen.map(cardHTML).join("")}</div>` : ""}`;
}

function renderReviews(p) {
  const st = ratingStats(p.id);
  const fmt = new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" });
  const when = (d) => { const t = new Date(d + "T00:00:00"); return isNaN(t) ? "" : fmt.format(t); };
  const summary = st.count ? `
    <div class="rev-summary">
      <div class="rev-avg">${st.avg.toFixed(1)}</div>
      <span class="stars" style="--r:${st.avg.toFixed(2)}" role="img" aria-label="Rated ${st.avg.toFixed(1)} out of 5"></span>
      <p class="rev-count">${st.count} ${st.count === 1 ? "review" : "reviews"}</p>
      ${[5, 4, 3, 2, 1].map(n => `<div class="bar-row"><span>${n} ★</span><span class="bar"><span style="width:${Math.round(st.dist[n] / st.count * 100)}%"></span></span><span>${st.dist[n]}</span></div>`).join("")}
    </div>` : `<div class="rev-summary"><p class="rev-empty">No ratings yet. Be the first to review this product.</p></div>`;
  const list = st.count ? `<ul class="rev-list">${st.list.map(r => `
      <li class="rev">
        <div class="rev-head">
          <span class="stars" style="--r:${r.rating}" role="img" aria-label="${r.rating} out of 5 stars"></span>
          <span class="rev-name">${esc(r.name)}</span>
          ${r.mine ? `<span class="badge">Your review</span>` : ""}
          <span class="rev-date">${when(r.date)}</span>
        </div>
        <p>${esc(r.text)}</p>
      </li>`).join("")}</ul>` : "";
  $("#reviews").innerHTML = `
    <h2 class="related-title" id="rev-title">Ratings and reviews</h2>
    <div class="rev-layout">${summary}<div>${list}</div></div>
    <form id="review-form" data-product="${p.id}">
      <fieldset class="co-card">
        <legend>Write a review</legend>
        <div class="wide">
          <span class="star-label">Your rating</span>
          <div class="star-input" role="radiogroup" aria-label="Your rating">
            ${[5, 4, 3, 2, 1].map(n => `<input type="radio" name="rating" id="rate${n}" value="${n}" required><label for="rate${n}" title="${n} ${n === 1 ? "star" : "stars"}"><span aria-hidden="true">★</span><span class="sr-only">${n} ${n === 1 ? "star" : "stars"}</span></label>`).join("")}
          </div>
        </div>
        <label class="field wide">Your name <input name="rname" required maxlength="40" autocomplete="name"></label>
        <label class="field wide">Your review <textarea name="rtext" rows="4" required minlength="10" maxlength="600" placeholder="What did you like or dislike?"></textarea></label>
        <p class="note wide">Reviews you post are saved in this browser.</p>
        <button class="add-btn big wide" type="submit">Submit review</button>
      </fieldset>
    </form>`;
}

/* Page navigation and routes */

/* ====== Views: home, list, product, checkout, thanks ====== */
/* ====== Navigation ======
   In-app links are handled here instead of by the browser, so they also work inside
   app viewers that show the page in a sandboxed frame. */
let routeOverride = null;
const currentHash = () => (routeOverride !== null ? routeOverride : location.hash);
function go(h) {
  routeOverride = null;
  if (location.hash === h) { route(); return; }
  try { location.hash = h; } catch (e) {}
  if (location.hash !== h) { routeOverride = h; route(); }
}

let view = "home";
const SECTIONS = { home: "#hero", list: "#products", product: "#product", favourites: "#favourites-page", account: "#account-page", legal: "#legal-page", cart: "#cart-page", page: "#page-x", checkout: "#checkout-page", thanks: "#thanks-page" };

/* top "Deals / New Arrivals / ..." menu and the bottom tab bar follow the page */
function syncTopNav() {
  const key = view === "home" ? "deals" : (view === "list" && filter === "all" ? collection : "");
  document.querySelectorAll("#top-nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === key));
  const dkey = view === "list" && filter === "all" ? collection : "";
  document.querySelectorAll("#d-nav a").forEach(a => a.classList.toggle("active", !!((a.dataset.nav && a.dataset.nav === dkey) || (a.dataset.cat && view === "list" && filter === a.dataset.cat && !collection))));
}
function setTabs(h) {
  let t = "home";
  if (view === "home") t = "home";
  else if (view === "list" || view === "product") t = "categories";
  else if (view === "account" || view === "favourites") t = "account";
  else if (view === "legal") t = "";
  else if (view === "page") t = (pageKey === "orders" || pageKey === "track") ? "account" : "";
  else if (view === "cart") t = "cart";
  else if (view === "checkout" || view === "thanks") t = "cart";
  document.querySelectorAll(".tab").forEach(b => {
    const on = b.dataset.tab === t;
    b.classList.toggle("active", on);
    if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
  });
}
function route() {
  const h = currentHash();
  const mc = h.match(/^#\/c\/([a-z]+)(?:\/([a-z0-9-]+))?$/);
  const mp = h.match(/^#\/p\/(\d+)$/);
  const mcoll = h.match(/^#\/all\/(deals|new|top|flash|clearance|best)$/);
  let routeColl = "";
  const prod = mp && PRODUCTS.find(p => p.id === +mp[1]);
  if (prod) view = "product";
  else if (mc && CATEGORIES.some(c => c.id === mc[1])) { filter = mc[1]; subSel = (SUBCATS[mc[1]] || []).some(x => x.id === mc[2]) ? mc[2] : ""; view = "list"; }
  else if (h === "#/categories") { filter = CATEGORIES[0]?.id || "all"; subSel = ""; view = "list"; }
  else if (mcoll) { filter = "all"; subSel = ""; routeColl = mcoll[1]; view = "list"; }
  else if (h === "#/all") { filter = "all"; subSel = ""; view = "list"; }
  else if (h === "#/favourites") view = "favourites";
  else if (h === "#/account") view = "account";
  else if (h === "#/privacy" || h === "#/terms") { view = "legal"; legalKey = h.slice(2); }
  else if (h === "#/checkout") view = "checkout";
  else if (h === "#/thanks") view = "thanks";
  else if (h === "#/cart") view = "cart";
  else if (["orders", "track", "help", "contact", "about", "delivery", "sell"].some(k => h === "#/" + k)) { view = "page"; pageKey = h.slice(2); }
  else if (h === "" || h === "#" || h === "#/") view = "home";
  else { view = "page"; pageKey = "notfound"; }

  if (view === "home") lastList = null;
  if (keepQuery) keepQuery = false; else { query = ""; setSearchValue(""); }
  if (view === "list") {
    if (lastList !== filter || routeColl || lastRouteColl) resetFilters();
    lastList = filter;
    if (routeColl) collection = routeColl;
    lastRouteColl = !!routeColl;
  }

  Object.entries(SECTIONS).forEach(([v, sel]) => { $(sel).hidden = v !== view; });
  document.body.dataset.view = view;
  $("#subnav").hidden = view !== "list";
  $("#top-nav").hidden = !(view === "home" || (view === "list" && filter === "all"));
  $("#search-band").classList.toggle("compact", $("#top-nav").hidden);
  $("#d-cat").value = view === "list" && filter !== "all" ? filter : "all";
  setBrandPop(false);
  closeSuggest();
  if ($("#drawer").classList.contains("open")) closeCart();
  if (view === "list") { renderChips(); renderSubcats(); renderPills(); buildBrandUI(); buildSide(); renderBanner(); renderProducts(); }
  if (view === "product") { addRecent(prod.id); renderProduct(prod); renderReviews(prod); }
  if (view === "favourites") renderFavourites();
  if (view === "checkout") renderCheckout();
  if (view === "thanks") renderThanks();
  if (view === "account") renderAccount();
  if (view === "legal") renderLegal(legalKey);
  if (view === "cart") renderCartPage();
  if (view === "page") renderPage(pageKey);
  syncTopNav(); setTabs(h);
  if (view !== "list") {
    document.title = view === "product" ? prod.name + " – BuyfromGAB"
      : view === "checkout" ? "Checkout – BuyfromGAB"
      : view === "favourites" ? "Favourites – BuyfromGAB"
      : view === "thanks" ? "Order received – BuyfromGAB"
      : view === "legal" ? LEGAL[legalKey].title + " – BuyfromGAB"
      : view === "cart" ? "Your cart – BuyfromGAB"
      : view === "page" ? PAGE_TITLES[pageKey] + " – BuyfromGAB"
      : view === "account" ? "Account – BuyfromGAB"
      : "BuyfromGAB – Shop by category";
  }
  document.dispatchEvent(new Event("shop:route"));
  window.scrollTo(0, 0);
  if (routedOnce) $("#top").focus({ preventScroll: true });
  routedOnce = true;
}
window.addEventListener("hashchange", () => { routeOverride = null; route(); });

/* Footer, track order link, account page and policy pages */

/* ====== Footer: social links, newsletter, privacy and terms ====== */
/* Paste your social page links here. Only the ones you fill in will show; WhatsApp always shows. */
const SOCIAL = { facebook: "", instagram: "", twitter: "", youtube: "" };
const SOCIAL_ICONS = {
  facebook: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>`,
  instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>`,
  twitter: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>`,
  youtube: `<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>`,
  whatsapp: `<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>`
};
function renderFooterSocial() {
  const links = Object.entries(SOCIAL).filter(([, url]) => /^https?:\/\//.test(url)).concat([["whatsapp", "https://wa.me/" + WHATSAPP_NUMBER]]);
  $("#f-social").innerHTML = links.map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k === "whatsapp" ? "WhatsApp" : k[0].toUpperCase() + k.slice(1)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SOCIAL_ICONS[k]}</svg></a>`).join("");
}
const LEGAL = {
  privacy: { title: "Privacy Policy", items: [
    ["What we collect", "When you place an order we ask for your name, phone number and delivery address, and optionally your email. This is sent to us on WhatsApp so we can confirm and deliver your order."],
    ["Saved on your device", "Your cart, favourites, reviews and light or dark setting are stored in your own browser. We do not receive them."],
    ["Payments", "This site does not collect or store card or mobile money details. Payment is arranged with you when we confirm your order."],
    ["Newsletter", "If you subscribe, we use your email only to send offers and updates. Message us on WhatsApp at any time to stop."],
    ["Contact", "Questions about your information? Chat with us on WhatsApp: " + WHATSAPP_DISPLAY + "."]
  ] },
  terms: { title: "Terms of Service", items: [
    ["Orders and prices", "Prices are shown in Ghana cedis (GH₵). We confirm availability and your total with you on WhatsApp before you pay."],
    ["Delivery", "We arrange delivery with you after your order is confirmed. Delivery times and fees depend on your location."],
    ["Returns", "You can return eligible items within 7 days. Message us on WhatsApp to arrange a return."],
    ["Reviews", "Please keep reviews honest and respectful. We may remove reviews that are abusive or misleading."],
    ["Contact", "Questions about these terms? Chat with us on WhatsApp: " + WHATSAPP_DISPLAY + "."]
  ] }
};
function renderLegal(key) {
  const d = LEGAL[key] || LEGAL.privacy;
  $("#legal-page").innerHTML = `<h1 class="page-title">${d.title}</h1><div class="legal">${d.items.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join("")}</div>`;
}

/* ====== Track order link and Account page ====== */
function trackUrl() {
  let ref = lastOrder && lastOrder.ref;
  if (!ref) { try { const o = JSON.parse(localStorage.getItem("bazaar-last-order") || "null"); ref = o && o.ref; } catch (e) {} }
  const text = "Hello, I'd like to track my order." + (ref ? " Order: " + ref : "");
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}
function updateTrackLink() { /* "Track your order" opens the Track page */ }

function savedTheme() {
  try { const t = localStorage.getItem("bazaar-theme"); return t === "light" || t === "dark" ? t : "auto"; } catch (e) { return document.documentElement.getAttribute("data-theme") || "auto"; }
}
function applyTheme(mode) {
  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
    try { localStorage.removeItem("bazaar-theme"); } catch (e) {}
  } else {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem("bazaar-theme", mode); } catch (e) {}
  }
  syncThemeSwitch();
}
/* desktop header helpers */
function setSearchValue(v) { ["#search", "#search-d"].forEach(sel => { const el = $(sel); if (el && el.value !== v) el.value = v; }); }
function closeUPops() {
  document.querySelectorAll(".u-pop").forEach(p => { p.hidden = true; });
  document.querySelectorAll("[data-upop]").forEach(b => b.setAttribute("aria-expanded", "false"));
}
const MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.500 8.500 0 1 1 9.500 4a7 7 0 0 0 10.500 10.500z"/></svg>`;
const SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/></svg>`;
const effectiveTheme = () => document.documentElement.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
function syncThemeSwitch() {
  const sw = $("#theme-switch"); if (!sw) return;
  const dark = effectiveTheme() === "dark";
  sw.setAttribute("aria-checked", String(dark)); sw.classList.toggle("on", dark);
  sw.querySelector(".knob").innerHTML = dark ? SUN : MOON;
}
function buildDeskUI() {
  $("#d-cat").innerHTML = `<option value="all">All Categories</option>` + CATEGORIES.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
}

/* Checkout page, WhatsApp order message and thank-you page */

/* ====== Checkout page ====== */
function cartTotal() { return cartSummary().total; }

function renderCheckout() {
  const s = cartSummary();
  const box = $("#checkout-page");
  if (!s.lines.length) {
    box.innerHTML = `<div class="empty-state"><h1 class="page-title">Your cart is empty</h1><p>Add a few products first, then come back to pay.</p><p><a class="add-btn big" href="#/">Browse categories</a></p></div>`;
    return;
  }
  const pf = profile || {};
  box.innerHTML = `
    <a class="back-link" href="#/cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      Back to cart
    </a>
    <h1 class="page-title">Checkout</h1>
    <div class="co">
      <form class="co-form" id="co-form">
        <fieldset class="co-card">
          <legend>Delivery details</legend>
          <label class="field wide">Full name <input name="name" required autocomplete="name" value="${esc(pf.name || "")}"></label>
          <label class="field">Phone number <input name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="024 123 4567" value="${esc(pf.phone || "")}"></label>
          <label class="field">Email (optional) <input name="email" type="email" autocomplete="email" placeholder="you@example.com" value="${esc(pf.email || "")}"></label>
          <label class="field wide">Delivery address <textarea name="address" rows="3" required autocomplete="street-address" placeholder="House number, street, area, city">${esc(pf.address || "")}</textarea></label>
          <label class="field wide">Delivery notes (optional) <textarea name="notes" rows="2" placeholder="Landmarks, gate details, best time to call"></textarea></label>
          <label class="remember wide"><input type="checkbox" name="remember" checked> Save my details on this device for next time</label>
        </fieldset>
        <fieldset class="co-card">
          <legend>Pay with</legend>
          ${PAYMENT_METHODS.map((m, i) => `<label class="pay-opt${m.enabled ? "" : " disabled"}"><input type="radio" name="method" value="${m.id}" ${m.enabled && i === 0 ? "checked" : ""} ${m.enabled ? "" : "disabled"}><span><strong>${m.name}</strong><small>${m.note}</small></span>${m.enabled ? "" : `<span class="soon">Coming soon</span>`}</label>`).join("")}
        </fieldset>
        <p class="co-error" id="co-error" role="alert" hidden></p>
        <button class="checkout" id="pay-btn" type="submit">Send order on WhatsApp</button>
      </form>
      <aside class="co-summary" aria-label="Order summary">
        <h3>Order summary</h3>
        ${s.lines.map(({ p, qty }) => `<div class="sum-row"><span>${esc(p.name)} × ${qty}</span><span>${money(p.price * qty)}</span></div>`).join("")}
        ${summaryRowsHTML(s)}
        <p class="note-small">${esc(DELIVERY.note)}</p>
        <p class="back-row"><a href="#/cart">Edit cart</a></p>
      </aside>
    </div>`;
}

const newRef = () => "BZ" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

function waUrl(order) {
  if (!order) return "https://wa.me/" + WHATSAPP_NUMBER;
  const lines = [
    "Hello, I'd like to place an order.",
    "",
    "Order: " + order.ref,
    "Name: " + order.name,
    "Phone: " + order.phone,
    "Delivery address: " + order.address,
    ...(order.notes ? ["Delivery notes: " + order.notes] : []),
    "",
    "Items:",
    ...order.items.map(i => "- " + i.qty + " × " + i.name + " (" + money(i.price * i.qty) + ")"),
    "",
    ...(order.discount ? ["Subtotal: " + money(order.subtotal), "Discount (" + order.coupon + "): -" + money(order.discount)] : []),
    "Delivery: " + (order.free ? "Free" : "To be confirmed"),
    "Total: " + money(order.total),
    "I'd like to pay via WhatsApp."
  ];
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
}

function waProductUrl(p, qty) {
  const lines = [
    inStock(p) ? "Hello, I'd like to buy this product:" : "Hello, is this product available again?",
    "",
    p.name + (p.brand ? " (" + p.brand + ")" : ""),
    "Quantity: " + qty,
    "Price: " + money(p.price) + " each",
    "Total: " + money(p.price * qty)
  ];
  if (/^https?:/.test(location.protocol)) lines.push("", "Link: " + location.href.split("#")[0] + "#/p/" + p.id);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
}

function renderThanks() {
  let o = lastOrder || orders[0];
  if (!o) { try { o = JSON.parse(localStorage.getItem("bazaar-last-order") || "null"); } catch (e) {} }
  cart = {}; saveCart(); removeCoupon(); renderCart();
  const first = o && o.name ? ", " + esc(o.name.split(" ")[0]) : "";
  $("#thanks-page").innerHTML = `
    <div class="thanks">
      <h1 class="page-title">Thank you${first}</h1>
      <p>${o ? "Your order is ready. Send it on WhatsApp so we can confirm it and arrange payment." : "Chat with us on WhatsApp to place an order or ask a question."}</p>
      ${o && o.ref ? `<div class="ref">Order ${esc(o.ref)}</div>` : ""}
      <p><a class="add-btn wa" href="${waUrl(o)}" target="_blank" rel="noopener">${o ? "Send order on WhatsApp" : "Chat on WhatsApp"}</a></p>
      ${o && o.items ? `<div class="order-card" style="text-align:left;margin:20px 0 8px"><ul class="oc-items">${o.items.map(i => `<li>${esc(i.name)} × ${i.qty}</li>`).join("")}</ul><div class="oc-foot"><strong>Total ${money(o.total)}</strong><span class="status">${o.free ? "Free delivery" : "Delivery confirmed on WhatsApp"}</span></div></div>` : ""}
      <p>You can also message us on ${WHATSAPP_DISPLAY}.</p>
      <p><a href="#/orders">My orders</a> · <a href="#/track">Track your order</a> · <a href="#/">Continue shopping</a></p>
    </div>`;
}

function showPayError(msg) {
  const el = $("#co-error"); if (!el) return;
  el.textContent = msg; el.hidden = false;
}

/* Cart, cart drawer and pop-up messages */

/* ====== Cart ====== */
function cartLines() {
  return Object.entries(cart).map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === +id), qty })).filter(l => l.p);
}
function renderCart() {
  const s = cartSummary(), lines = s.lines;
  ["#cart-count", "#cart-count-d"].forEach(sel => { $(sel).textContent = s.count; $(sel).hidden = !s.count; });
  $("#cart-total").textContent = money(s.total);
  $("#checkout").disabled = !lines.length;
  $("#cart-items").innerHTML = lines.length ? lines.map(({ p, qty }) => `
    <li class="cart-row">
      <div class="mini">${esc(p.emoji)}</div>
      <div><div class="nm">${esc(p.name)}</div><div class="pr">${money(p.price)}</div></div>
      <div class="qty">
        <button type="button" data-dec="${p.id}" aria-label="Remove one ${esc(p.name)}">−</button>
        <span>${qty}</span>
        <button type="button" data-inc="${p.id}" aria-label="Add one ${esc(p.name)}">+</button>
      </div>
    </li>`).join("")
    : `<li class="cart-empty">Your cart is empty. Add something you like.</li>`;
  if (view === "cart") renderCartPage();
}
function removeItem(id) { delete cart[id]; saveCart(); renderCart(); }
function saveForLater(id) { if (!isFav(id)) toggleFav(id); removeItem(id); }
function addToCart(id, n = 1) {
  cart[id] = (cart[id] || 0) + n;
  saveCart(); renderCart();
  document.dispatchEvent(new Event("shop:cart-add"));
  toast(`Added ${n > 1 ? n + " × " : ""}${PRODUCTS.find(p => p.id === id).name}`);
}
function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart(); renderCart();
}

/* ====== Drawer ====== */
let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  $("#drawer").classList.add("open"); $("#overlay").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#close-cart").focus();
}
function closeCart() {
  $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  if (lastFocus) lastFocus.focus();
}

/* ====== Toast ====== */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* Extra pages: cart, my orders, track order, help, contact, about, delivery and returns, sell, account, not found */

let pageKey = "help";
const PAGE_TITLES = { orders: "My orders", track: "Track your order", help: "Help & FAQ", contact: "Contact us", about: "About BuyfromGAB", delivery: "Delivery & returns", sell: "Sell on BuyfromGAB", notfound: "Page not found" };
const CHEV = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-left:auto;flex:none"><path d="m9 6 6 6-6 6"/></svg>`;
const ICON = (d) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  bag: ICON('<path d="M6 8h12l1 12H5z"/><path d="M9 8a3 3 0 0 1 6 0"/>'),
  heart: ICON('<path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.6 4.5 7 4.5c2 0 3.400 1.100 5 3 1.600-1.900 3-3 5-3 3.400 0 5.400 3.400 4.200 6.700-1.700 4.700-9.200 9.300-9.200 9.300Z"/>'),
  box: ICON('<path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z"/><path d="m4 7.4 8 4.600 8-4.600M12 12v9.200"/>'),
  help: ICON('<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 .9-1 1.700M12 17h.01"/>'),
  chat: ICON('<path d="M7.900 20A9 9 0 1 0 4 16.100L2 22z"/>'),
  truck: ICON('<path d="M2.500 6.500h10v9h-10zM12.500 9.500h4.200l3.300 3.300v2.700h-7.500"/><circle cx="7" cy="17.500" r="1.700"/><circle cx="16.500" cy="17.500" r="1.700"/>'),
  store: ICON('<path d="M3 9l1.500-5h15L21 9M3 9h18M3 9v11h18V9M9 20v-6h6v6"/>'),
  info: ICON('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500h.01"/>'),
  phone: ICON('<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>')
};
function sendWhatsApp(url, msgSel) {
  try { window.open(url, "_blank", "noopener"); } catch (e) {}
  const el = $(msgSel);
  if (el) el.innerHTML = `WhatsApp should open now. If it doesn't, <a href="${url}" target="_blank" rel="noopener">tap here</a>.`;
}

/* ====== Cart page ====== */
function shipBarHTML(s) {
  const pct = Math.min(100, Math.round(s.subtotal / DELIVERY.freeOver * 100));
  return `<div class="ship-bar${s.free ? " done" : ""}"><p>${s.free ? "<strong>You've unlocked free delivery.</strong>" : `Add <strong>${money(s.toFree)}</strong> more to get free delivery.`}</p><div class="bar-track" role="progressbar" aria-label="Progress to free delivery" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div></div>`;
}
function summaryRowsHTML(s) {
  return `<div class="sum-row"><span>Subtotal</span><span>${money(s.subtotal)}</span></div>` +
    (s.discount ? `<div class="sum-row"><span>Discount (${esc(s.coupon)})</span><span>−${money(s.discount)}</span></div>` : "") +
    `<div class="sum-row"><span>Delivery</span><span>${s.free ? "Free" : "Confirmed on WhatsApp"}</span></div>` +
    `<div class="sum-row sum-total"><span>Total</span><span>${money(s.total)}</span></div>`;
}
function renderCartPage() {
  const s = cartSummary(), box = $("#cart-page");
  if (!s.lines.length) {
    box.innerHTML = `<h1 class="page-title">Your cart</h1><div class="empty-state"><p>Your cart is empty. Add a few things you like and they will show up here.</p><p><a class="add-btn big" href="#/">Browse categories</a> <a class="btn-outline" href="#/all/deals">See today's deals</a></p></div>`;
    return;
  }
  const rows = s.lines.map(({ p, qty }) => `
    <li class="cart-item" data-cat="${p.cat}">
      <a class="ci-thumb" href="#/p/${p.id}" aria-label="${esc(p.name)}">${p.img ? `<img src="${esc(p.img)}" alt="">` : p.emoji}</a>
      <div class="ci-main">
        <a class="ci-name" href="#/p/${p.id}">${esc(p.name)}</a>
        <div class="ci-meta">${esc(p.brand)} · ${money(p.price)}${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
        <div class="ci-actions"><button class="link-btn" type="button" data-rm="${p.id}">Remove</button>${isFav(p.id) ? "" : `<button class="link-btn" type="button" data-save-later="${p.id}">Save for later</button>`}</div>
      </div>
      <div class="ci-right">
        <div class="qty"><button type="button" data-dec="${p.id}" aria-label="Remove one ${esc(p.name)}">−</button><span>${qty}</span><button type="button" data-inc="${p.id}" aria-label="Add one ${esc(p.name)}">+</button></div>
        <strong>${money(p.price * qty)}</strong>
      </div>
    </li>`).join("");
  box.innerHTML = `
    <h1 class="page-title">Your cart <small class="count-note">${s.count} ${s.count === 1 ? "item" : "items"}</small></h1>
    <div class="co">
      <div>
        ${shipBarHTML(s)}
        <ul class="cart-list">${rows}</ul>
        <p class="back-row"><a class="back-link" href="#/all">Keep shopping</a></p>
      </div>
      <aside class="co-summary" aria-label="Order summary">
        <h3>Order summary</h3>
        ${summaryRowsHTML(s)}
        <form class="coupon" id="coupon-form">
          <label class="sr-only" for="coupon-input">Promo code</label>
          <input id="coupon-input" name="code" placeholder="Promo code" autocomplete="off" value="${esc(couponCode)}">
          <button class="chip" type="submit">Apply</button>
        </form>
        <p class="coupon-msg" role="status">${esc(couponMsg)}${couponCode && s.coupon ? ` <button class="link-btn" type="button" data-coupon-remove>Remove</button>` : ""}</p>
        <a class="checkout" href="#/checkout">Checkout</a>
        <p class="note-small">${esc(DELIVERY.note)}</p>
      </aside>
    </div>`;
}

/* ====== Pages ====== */
function renderPage(key) {
  const fn = { orders: renderOrders, track: renderTrack, help: renderHelp, contact: renderContact, about: renderAbout, delivery: renderDelivery, sell: renderSell, notfound: renderNotFound }[key] || renderNotFound;
  $("#page-x").innerHTML = fn();
}
function renderOrders() {
  if (!orders.length) return `<h1 class="page-title">My orders</h1><div class="empty-state"><p>You haven't placed an order on this device yet.</p><p><a class="add-btn big" href="#/">Start shopping</a></p></div>`;
  const fmt = new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" });
  return `<h1 class="page-title">My orders</h1><p class="acct-note">Your orders are saved on this device. We confirm each order with you on WhatsApp.</p>
    <ul class="order-list">${orders.map(o => `
      <li class="order-card">
        <div class="oc-head"><div><strong>Order ${esc(o.ref)}</strong><small>${fmt.format(new Date(o.date))}</small></div><span class="status">${esc(o.status || "Sent on WhatsApp")}</span></div>
        <ul class="oc-items">${o.items.map(i => `<li>${esc(i.name)} × ${i.qty}</li>`).join("")}</ul>
        <div class="oc-foot"><strong>${money(o.total)}</strong>
          <span class="oc-actions"><a class="chip" href="${trackUrlFor(o.ref)}" target="_blank" rel="noopener">Track on WhatsApp</a><button class="chip" type="button" data-reorder="${esc(o.ref)}">Order again</button></span></div>
      </li>`).join("")}</ul>`;
}
function renderTrack() {
  const last = (orders[0] && orders[0].ref) || (lastOrder && lastOrder.ref) || "";
  const recentOrders = orders.slice(0, 3);
  return `<h1 class="page-title">Track your order</h1>
    <div class="info-card static"><p>Enter your order number and we'll check it for you on WhatsApp. You get the number when you place an order.</p>
      <form class="inline-form" id="track-form">
        <label class="sr-only" for="track-ref">Order number</label>
        <input id="track-ref" name="ref" required placeholder="Order number, for example BZ1A2B3C" autocomplete="off" value="${esc(last)}">
        <button class="add-btn big" type="submit">Track on WhatsApp</button>
      </form>
      <p class="coupon-msg" id="track-msg" role="status"></p>
    </div>
    ${recentOrders.length ? `<h2 class="sec-title">Your recent orders</h2><ul class="order-list">${recentOrders.map(o => `<li class="order-card"><div class="oc-head"><div><strong>Order ${esc(o.ref)}</strong><small>${o.items.length} ${o.items.length === 1 ? "item" : "items"} · ${money(o.total)}</small></div><a class="chip" href="${trackUrlFor(o.ref)}" target="_blank" rel="noopener">Track</a></div></li>`).join("")}</ul><p class="back-row"><a href="#/orders">See all my orders</a></p>` : ""}
    <p class="acct-note">Can't find your order number? <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Chat with us</a> and we'll help.</p>`;
}
function renderHelp() {
  const faq = [
    ["How do I place an order?", "Add what you want to your cart, tap Checkout and fill in your delivery details. Your order opens in WhatsApp so you can send it to us, and we confirm it with you there."],
    ["How do I pay?", "After you send your order, we confirm the total and agree the payment with you on WhatsApp. Online payment with Paystack and Hubtel is coming soon."],
    ["Is delivery free?", "Orders over " + money(DELIVERY.freeOver) + " get free delivery. For smaller orders we confirm the delivery fee with you on WhatsApp, because it depends on your location."],
    ["How long will my order take?", "We tell you the delivery time when we confirm your order on WhatsApp, because it depends on where you are and what you ordered."],
    ["Can I return something?", "Yes. You can return eligible items within 7 days. Message us on WhatsApp with your order number and we will arrange it."],
    ["How do I track my order?", "Open Track your order, enter your order number and we check it for you on WhatsApp. Your recent orders are also saved in My orders on this device."],
    ["How do I use a promo code?", "Enter your code in your cart before you check out. The discount shows in your order summary."],
    ["Is my information safe?", "We only use your details to confirm and deliver your order. Your cart and favourites stay on your device. You can read more in our Privacy Policy."]
  ];
  return `<h1 class="page-title">Help & FAQ</h1><div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    <p class="acct-note">Still need help? <a href="#/contact">Contact us</a> or <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">chat on WhatsApp</a>.</p>`;
}
function renderContact() {
  const card = (href, ico, title, sub, ext) => `<a class="info-card link" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${ico}<span><strong>${title}</strong><small>${sub}</small></span>${CHEV}</a>`;
  return `<h1 class="page-title">Contact us</h1><p class="lead">We're here to help with orders, products and deliveries.</p>
    <div class="contact-grid">
      ${card("https://wa.me/" + WHATSAPP_NUMBER, ICONS.chat, "Chat on WhatsApp", WHATSAPP_DISPLAY + " · the fastest way to reach us", true)}
      ${card("tel:+" + WHATSAPP_NUMBER, ICONS.phone, "Call our hotline", "(054) 535 9058 · open 24/7", false)}
      ${card("#/help", ICONS.help, "Help & FAQ", "Answers to common questions", false)}
      ${card("#/track", ICONS.box, "Track your order", "Check where your order is", false)}
    </div>`;
}
function renderAbout() {
  return `<h1 class="page-title">About BuyfromGAB</h1><div class="legal">
    <h2>Everything you need, in one place</h2><p>BuyfromGAB brings food and groceries, home and kitchen essentials, bathroom and plumbing supplies, medication and supplements, electronics, clothing, personal care, children's items, building materials and car parts together in one store.</p>
    <h2>How it works</h2><p>Browse the store, add what you need to your cart and send your order to us on WhatsApp. We confirm it with you, agree payment and delivery, and keep you updated.</p>
    <h2>Get in touch</h2><p>Hotline (24/7): (054) 535 9058. WhatsApp: ${WHATSAPP_DISPLAY}.</p></div>`;
}
function renderDelivery() {
  return `<h1 class="page-title">Delivery & returns</h1><div class="legal">
    <h2>Delivery</h2><p>Orders over ${money(DELIVERY.freeOver)} get free delivery. For smaller orders we confirm the delivery fee with you on WhatsApp, because it depends on your location. We arrange the delivery time with you after your order is confirmed.</p>
    <h2>Returns</h2><p>You can return eligible items within 7 days. Message us on WhatsApp with your order number and we will arrange the return with you.</p>
    <h2>Need help?</h2><p>Chat with us on WhatsApp at ${WHATSAPP_DISPLAY} or visit <a href="#/help">Help & FAQ</a>.</p></div>`;
}
function renderSell() {
  return `<h1 class="page-title">Sell on BuyfromGAB</h1><p class="lead">Want to sell your products on BuyfromGAB? Tell us about your business and we'll reply on WhatsApp.</p>
    <form class="sell-form" id="sell-form"><fieldset class="co-card"><legend>Your details</legend>
      <label class="field">Your name <input name="name" required autocomplete="name"></label>
      <label class="field">Phone number <input name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="024 123 4567"></label>
      <label class="field wide">Business name (optional) <input name="business" autocomplete="organization"></label>
      <label class="field wide">What would you like to sell? <textarea name="products" rows="4" required placeholder="Tell us about your products"></textarea></label>
    </fieldset>
    <p class="co-error" id="sell-error" role="alert" hidden></p>
    <button class="add-btn big" type="submit">Send on WhatsApp</button><p class="coupon-msg" id="sell-msg" role="status"></p></form>`;
}
function renderNotFound() {
  return `<div class="empty-state"><h1 class="page-title">Page not found</h1><p>We couldn't find that page. It may have moved, or the link may be wrong.</p><p><a class="add-btn big" href="#/">Go to the home page</a></p>
    <p class="chips-row">${CATEGORIES.slice(0, 6).map(c => `<a class="chip" href="#/c/${c.id}">${esc(c.name)}</a>`).join("")}</p></div>`;
}

/* ====== Account page ====== */
function renderAccount() {
  const mode = savedTheme(), pf = profile || {};
  const row = (href, ico, title, sub, ext) => `<a class="acct-row" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${ico}<span><strong>${title}</strong><small>${sub}</small></span>${CHEV}</a>`;
  $("#account-page").innerHTML = `
    <h1 class="page-title">Account</h1>
    <div class="acct-list">
      <form class="acct-card" id="profile-form">
        <h2>My details</h2><p class="acct-note">Saved on this device and filled in for you at checkout.</p>
        <label class="field">Full name <input name="name" autocomplete="name" value="${esc(pf.name || "")}"></label>
        <label class="field">Phone number <input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="024 123 4567" value="${esc(pf.phone || "")}"></label>
        <label class="field">Email (optional) <input name="email" type="email" autocomplete="email" value="${esc(pf.email || "")}"></label>
        <label class="field">Delivery address <textarea name="address" rows="2" autocomplete="street-address">${esc(pf.address || "")}</textarea></label>
        <p class="co-error" id="profile-error" role="alert" hidden></p>
        <button class="add-btn" type="submit">Save my details</button>
      </form>
      ${row("#/orders", ICONS.bag, "My orders", orders.length + " saved on this device")}
      ${row("#/favourites", ICONS.heart, "Favourites", favs.length + " saved")}
      ${row("#/track", ICONS.box, "Track your order", "Check where your order is")}
      ${row("#/help", ICONS.help, "Help & FAQ", "Answers to common questions")}
      ${row("#/delivery", ICONS.truck, "Delivery & returns", "Free delivery over " + money(DELIVERY.freeOver))}
      ${row("#/contact", ICONS.phone, "Contact us", "Hotline 24/7 · WhatsApp")}
      ${row("#/about", ICONS.info, "About BuyfromGAB", "Who we are")}
      ${row("#/sell", ICONS.store, "Sell on BuyfromGAB", "Become a seller")}
      ${row("https://wa.me/" + WHATSAPP_NUMBER, ICONS.chat, "Chat with us", WHATSAPP_DISPLAY, true)}
      <div class="acct-row static"><span><strong>Appearance</strong><small>Light, dark or match your device</small></span>
        <div class="seg" role="group" aria-label="Appearance">
          ${[["light", "Light"], ["dark", "Dark"], ["auto", "Auto"]].map(([m, l]) => `<button type="button" data-theme-set="${m}" aria-pressed="${mode === m}">${l}</button>`).join("")}
        </div>
      </div>
      <p class="acct-note">Sign-in is coming soon. Your cart, favourites, orders and details are saved on this device.</p>
    </div>`;
}

/* Search suggestions under the search boxes */

const SG_BOXES = [{ input: "#search", list: "#suggest-m" }, { input: "#search-d", list: "#suggest-d" }];
let sgActive = -1;

function sgItems(listEl) { return [...listEl.querySelectorAll(".sg-item, .sg-all")]; }
function closeSuggest() {
  SG_BOXES.forEach(b => { const l = $(b.list); if (l) { l.hidden = true; l.innerHTML = ""; } });
  sgActive = -1;
}
function buildSuggest(q) {
  const t = q.trim().toLowerCase();
  const row = (href, ico, title, sub, extra) => `<a class="sg-item" href="${href}"${extra || ""}><span class="sg-ico" aria-hidden="true">${ico}</span><span class="sg-txt"><strong>${esc(title)}</strong><small>${esc(sub)}</small></span></a>`;
  if (!t) {
    const rec = searches.map(s => row("#/all", "🕘", s, "Recent search", ` data-sg-q="${esc(s)}"`)).join("");
    const cats = CATEGORIES.slice(0, 5).map(c => row("#/c/" + c.id, "🗂️", c.name, "Category")).join("");
    return (rec ? `<p class="sg-title">Recent searches</p>${rec}` : "") + `<p class="sg-title">Popular categories</p>${cats}`;
  }
  const rank = (p) => { const n = p.name.toLowerCase(); return n.startsWith(t) ? 0 : n.includes(t) ? 1 : 2; };
  const prods = PRODUCTS.filter(p => p.name.toLowerCase().includes(t) || p.brand.toLowerCase().includes(t) || catName(p.cat).toLowerCase().includes(t)).sort((a, b) => rank(a) - rank(b)).slice(0, 5);
  const cats = CATEGORIES.filter(c => c.name.toLowerCase().includes(t)).slice(0, 2);
  if (!prods.length && !cats.length) return `<p class="sg-none">No matches for “${esc(q.trim())}”. Try another word, or <a href="#/">browse categories</a>.</p>`;
  return cats.map(c => row("#/c/" + c.id, "🗂️", c.name, "Category")).join("") +
    prods.map(p => `<a class="sg-item" href="#/p/${p.id}"><span class="sg-ico" aria-hidden="true">${esc(p.emoji)}</span><span class="sg-txt"><strong>${esc(p.name)}</strong><small>${esc(p.brand)} · ${esc(catName(p.cat))}</small></span><span class="sg-price">${money(p.price)}</span></a>`).join("") +
    `<a class="sg-all" href="#/all" data-sg-q="${esc(q.trim())}">See all results for “${esc(q.trim())}”</a>`;
}
function showSuggest(i) {
  closeSuggest();
  const list = $(SG_BOXES[i].list);
  list.innerHTML = buildSuggest(query); list.hidden = false;
}
function sgKey(e, i) {
  const list = $(SG_BOXES[i].list);
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (list.hidden) showSuggest(i);
    const items = sgItems(list); if (!items.length) return;
    e.preventDefault();
    sgActive = (sgActive + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items.forEach((x, k) => x.classList.toggle("active", k === sgActive));
    items[sgActive].scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter") {
    const items = sgItems(list);
    if (sgActive >= 0 && items[sgActive]) { e.preventDefault(); items[sgActive].click(); }
    else if (query.trim()) { e.preventDefault(); addSearch(query); closeSuggest(); if (view !== "list") { keepQuery = true; go("#/all"); } }
  } else if (e.key === "Escape" && !list.hidden) { e.preventDefault(); closeSuggest(); }
}

/* Phone and tablet category page: category tabs, sub-category rail, banner and product rows */

/* small picture for each sub-category in the left rail */
const SUB_ICONS = {
  blocks: "🧩", soft: "🧸", vehicles: "🚗", art: "🎨",
  audio: "🎧", phones: "📱", accessories: "🔌",
  vitamins: "💊", firstaid: "🩹", hygiene: "🧴",
  tops: "👕", jeans: "👖", dresses: "👗", shoes: "👟",
  makeup: "💄", fragrance: "🌸", skin: "🧴", hair: "💇",
  kitchen: "🍳", bedroom: "🛏️", lighting: "💡",
  rice: "🍚", canned: "🥫", cooking: "🫒",
  showers: "🚿", sinks: "🚽", fittings: "🔩",
  materials: "🧱", handtools: "🔨", safety: "⛑️",
  oils: "🛢️", interior: "💺", wipers: "🛞"
};

function mItemHTML(p) {
  const out = !inStock(p), rs = ratingStats(p.id);
  return `<article class="m-item${out ? " out" : ""}">
    <div class="m-thumb" aria-hidden="true">${p.img ? `<img src="${esc(p.img)}" alt="">` : `<span>${esc(p.emoji)}</span>`}</div>
    <div class="m-info">
      <a class="m-name" href="#/p/${p.id}">${esc(p.name)}</a>
      ${rs.count ? `<div class="m-rate"><strong>${rs.avg.toFixed(1)}</strong><span class="m-star" aria-hidden="true">★</span><span class="m-rc">(${rs.count})</span></div>` : ""}
      <div class="m-price"><strong>${money(p.price)}</strong>${p.oldPrice ? `<s>${money(p.oldPrice)}</s><em>-${dealPct(p)}%</em>` : ""}</div>
    </div>
    <button class="m-add" type="button" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart"${out ? " disabled" : ""}>${out ? "Sold out" : "+"}</button>
  </article>`;
}

function renderMobileCat(list) {
  const on = filter !== "all";
  const prods = $("#products"), box = $("#m-cat"), f = $("#filters");
  prods.classList.toggle("mcat-on", on);
  document.body.classList.toggle("mcat-on", on);
  box.hidden = !on;
  /* the filter panel lives inside the new layout while it is shown */
  if (on) { if (f.parentElement.id !== "m-filters-slot") $("#m-filters-slot").appendChild(f); }
  else if (f.parentElement.id === "m-filters-slot") prods.insertBefore(f, prods.querySelector(".listing"));
  if (!on) return;

  const tabs = $("#m-tabs");
  tabs.innerHTML = CATEGORIES.map(c =>
    `<a class="m-tab" href="#/c/${c.id}"${c.id === filter ? ' aria-current="page"' : ""}>${esc(c.name)}</a>`
  ).join("");

  const subs = SUBCATS[filter] || [];
  const railItem = (href, ico, label, isOn) => `<a class="m-rail-item${isOn ? " active" : ""}" href="${href}"${isOn ? ' aria-current="true"' : ""}><span class="ri-ico" aria-hidden="true">${ico}</span><span class="ri-txt">${esc(label)}</span></a>`;
  $("#m-rail").innerHTML = railItem("#/c/" + filter, "🛍️", "All", !subSel) +
    subs.map(sc => railItem("#/c/" + filter + "/" + sc.id, SUB_ICONS[sc.id] || "•", sc.name, subSel === sc.id)).join("");

  const count = list.length + (list.length === 1 ? " product" : " products");
  const banner = $("#m-banner");
  banner.dataset.cat = filter;
  banner.innerHTML = `<div class="mb-text"><strong>${esc(catName(filter))}</strong><span>${count}</span></div><img src="${esc(ART[filter] || "")}" alt="">`;
  applyEditedBanner();
  $("#m-count").textContent = count;
  const nFilters = brandSet.size + (priceIdx >= 0 || minP || maxP ? 1 : 0) + (minRating ? 1 : 0) + (sortBy !== "featured" ? 1 : 0);
  $("#m-filter-btn").textContent = "Filter & sort" + (nFilters ? " (" + nFilters + ")" : "");

  const chev = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;
  const groups = subSel ? [[(subs.find(x => x.id === subSel) || {}).name || catName(filter), list, subSel]]
    : subs.length ? subs.map(sc => [sc.name, list.filter(p => p.sub === sc.id), sc.id]) : [[catName(filter), list, ""]];
  const html = groups.filter(g => g[1].length).map(([name, items, sid]) =>
    `<section class="m-group"><a class="mg-head" href="#/c/${filter}${sid ? "/" + sid : ""}"><h2>${esc(name)}</h2>${chev}</a><div class="m-rows">${items.map(mItemHTML).join("")}</div><div class="m-cards">${items.map(cardHTML).join("")}</div></section>`).join("");
  $("#m-groups").innerHTML = html || `<div class="m-group">${emptyResultsHTML()}</div>`;
}

/* Clicks, typing and form handling */

/* ====== Events ====== */
document.addEventListener("click", (e) => {
  const sg = e.target.closest("[data-sg-q]");
  if (sg) { e.preventDefault(); query = sg.dataset.sgQ; setSearchValue(query); addSearch(query); closeSuggest(); keepQuery = true; go("#/all"); return; }
  if (!e.target.closest(".search-box, .d-search")) closeSuggest();
  const chip = e.target.closest(".chip");
  if (chip && chip.dataset.filter) { go(chip.dataset.filter === "all" ? "#/all" : "#/c/" + chip.dataset.filter); return; }
  const link = e.target.closest('a[href^="#/"]');
  if (link && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); go(link.getAttribute("href")); return; }
  if (!e.target.closest(".brand-menu")) setBrandPop(false);
  const um = e.target.closest("[data-upop]");
  if (um) { const pop = um.parentElement.querySelector(".u-pop"); const open = pop.hidden; closeUPops(); pop.hidden = !open; um.setAttribute("aria-expanded", String(open)); return; }
  if (!e.target.closest(".u-wrap")) closeUPops();
  if (e.target.closest("#brands-btn")) { setBrandPop($("#brands-pop").hidden); return; }
  const bo = e.target.closest("[data-brand]");
  if (bo) { brandSet.clear(); if (bo.dataset.brand) brandSet.add(bo.dataset.brand); setBrandPop(false); syncBrandUI(); renderProducts(); return; }
  const co = e.target.closest("[data-coll]");
  if (co) { collection = collection === co.dataset.coll ? "" : co.dataset.coll; syncBrandUI(); syncTopNav(); renderProducts(); return; }
  const th = e.target.closest("[data-theme-set]");
  if (th) { applyTheme(th.dataset.themeSet); document.querySelectorAll("[data-theme-set]").forEach(b => b.setAttribute("aria-pressed", b === th)); return; }
  const rm = e.target.closest("[data-rm]");
  if (rm) { removeItem(+rm.dataset.rm); return; }
  const sl = e.target.closest("[data-save-later]");
  if (sl) { saveForLater(+sl.dataset.saveLater); return; }
  if (e.target.closest("[data-coupon-remove]")) { removeCoupon(); renderCart(); return; }
  const ro = e.target.closest("[data-reorder]");
  if (ro) {
    const o = orders.find(x => x.ref === ro.dataset.reorder);
    if (o) { o.items.forEach(i => { if (PRODUCTS.some(p => p.id === i.id)) cart[i.id] = (cart[i.id] || 0) + i.qty; }); saveCart(); renderCart(); toast("Items added to your cart"); go("#/cart"); }
    return;
  }
  const sh = e.target.closest("[data-share]");
  if (sh) {
    const p = PRODUCTS.find(x => x.id === +sh.dataset.share), url = location.href.split("#")[0] + "#/p/" + p.id;
    if (navigator.share) navigator.share({ title: p.name, text: p.name + " on BuyfromGAB", url }).catch(() => {});
    else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(() => toast("Link copied"), () => toast("Couldn't copy the link"));
    else toast("Copy the link from the address bar");
    return;
  }
  if (e.target.closest("#show-more")) { pageLimit += PAGE_SIZE; renderProducts(true); return; }
  if (e.target.closest("[data-clear-filters]")) { query = ""; setSearchValue(""); resetFilters(); renderProducts(); return; }
  const fav = e.target.closest("[data-fav]");
  if (fav) { toggleFav(+fav.dataset.fav); return; }
  if (e.target.closest("[data-scroll-reviews]")) { $("#reviews").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); return; }
  if (e.target.closest("[data-pd-inc]")) { pdQty = Math.min(pdQty + 1, 99); $("#pd-qty").textContent = pdQty; $("#pd-wa").href = waProductUrl(currentProd, pdQty); return; }
  if (e.target.closest("[data-pd-dec]")) { pdQty = Math.max(pdQty - 1, 1); $("#pd-qty").textContent = pdQty; $("#pd-wa").href = waProductUrl(currentProd, pdQty); return; }
  const addPd = e.target.closest("[data-add-pd]");
  if (addPd) { addToCart(+addPd.dataset.addPd, pdQty); return; }
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(+add.dataset.add); return; }
  const inc = e.target.closest("[data-inc]");
  if (inc) { changeQty(+inc.dataset.inc, 1); return; }
  const dec = e.target.closest("[data-dec]");
  if (dec) { changeQty(+dec.dataset.dec, -1); return; }
});
$("#open-cart").addEventListener("click", openCart);
$("#open-cart-d").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { setBrandPop(false); closeUPops(); closeSuggest(); if ($("#drawer").classList.contains("open")) closeCart(); }
  if (e.key === "Tab" && $("#drawer").classList.contains("open")) {
    const f = [...$("#drawer").querySelectorAll("button:not([disabled]), a[href], input")].filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});
$(".skip-link").addEventListener("click", (e) => { e.preventDefault(); $("#top").focus(); });
["#search", "#search-d"].forEach((sel, i) => {
  const el = $(sel);
  el.addEventListener("input", (ev) => { query = ev.target.value; setSearchValue(query); if (view === "list") renderProducts(); showSuggest(i); });
  el.addEventListener("focus", () => showSuggest(i));
  el.addEventListener("keydown", (ev) => sgKey(ev, i));
});
$("#d-search-btn").addEventListener("click", () => { if (query.trim()) addSearch(query); if (view !== "list" && query.trim()) { keepQuery = true; go("#/all"); } closeSuggest(); $("#search-d").focus(); });
$("#d-cat").addEventListener("change", (e) => go(e.target.value === "all" ? "#/all" : "#/c/" + e.target.value));
$("#sort").addEventListener("change", (e) => { sortBy = e.target.value; $("#res-sort").value = sortBy; renderProducts(); });
$("#res-sort").addEventListener("change", (e) => { sortBy = e.target.value; $("#sort").value = sortBy; renderProducts(); });
$("#min").addEventListener("input", (e) => { minP = e.target.value; renderProducts(); });
$("#max").addEventListener("input", (e) => { maxP = e.target.value; renderProducts(); });
$("#min-rating").addEventListener("change", (e) => { minRating = +e.target.value; renderProducts(); });
$("#side").addEventListener("change", (e) => {
  const t = e.target;
  if (t.matches("[data-bcb]")) { if (t.checked) brandSet.add(t.dataset.bcb); else brandSet.delete(t.dataset.bcb); syncBrandUI(); renderProducts(); }
  else if (t.name === "ratingf") { minRating = +t.value; $("#min-rating").value = String(minRating); renderProducts(); }
});
$("#side").addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches('input[name="price"]')) { if (priceIdx === +t.value) { priceIdx = -1; t.checked = false; } else priceIdx = +t.value; renderProducts(); }
});
$("#m-filter-btn").addEventListener("click", () => { const open = $("#products").classList.toggle("filters-open"); $("#m-filter-btn").setAttribute("aria-expanded", String(open)); });
$("#side-clear").addEventListener("click", () => { resetFilters(); renderProducts(); });
$("#brand-filter").addEventListener("change", (e) => { brandSet.clear(); if (e.target.value) brandSet.add(e.target.value); syncBrandUI(); renderProducts(); });
$("#reset-filters").addEventListener("click", () => { resetFilters(); renderProducts(); });
$("#open-filters").addEventListener("click", () => {
  if (view !== "list") go("#/all");
  setTimeout(() => $("#filters").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), 120);
});
$("#checkout").addEventListener("click", () => {
  if (!cartLines().length) return;
  closeCart();
  go("#/checkout");
});
document.addEventListener("submit", (e) => {
  if (e.target.id === "f-form") {
    e.preventDefault();
    const email = $("#f-email").value.trim();
    if (!email) return;
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello, please add me to your offers and updates list. My email: " + email);
    try { window.open(url, "_blank", "noopener"); } catch (err) {}
    $("#f-msg").innerHTML = `Thanks! WhatsApp will open so you can send your request. If it doesn't, <a href="${url}" target="_blank" rel="noopener">tap here</a>.`;
    $("#f-email").value = "";
    return;
  }
  if (e.target.id === "review-form") {
    e.preventDefault();
    const id = +e.target.dataset.product;
    const prod = PRODUCTS.find(x => x.id === id);
    const f = new FormData(e.target);
    const rating = Math.min(5, Math.max(1, parseInt(f.get("rating"), 10) || 0));
    const name = String(f.get("rname")).trim();
    const text = String(f.get("rtext")).trim();
    if (!prod || !rating || !name || text.length < 10) return;
    const d = new Date();
    const date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    (userReviews[id] = userReviews[id] || []).push({ name, rating, text, date });
    saveReviews();
    renderReviews(prod);
    $("#pd-rating").innerHTML = ratingLineHTML(id);
    toast("Thanks for your review");
    return;
  }
  if (e.target.id === "coupon-form") { e.preventDefault(); couponMsg = applyCoupon(new FormData(e.target).get("code")); renderCart(); return; }
  if (e.target.id === "track-form") { e.preventDefault(); sendWhatsApp(trackUrlFor(String(new FormData(e.target).get("ref")).trim()), "#track-msg"); return; }
  if (e.target.id === "sell-form") {
    e.preventDefault();
    const f = new FormData(e.target), err = $("#sell-error");
    if (!phoneOk(f.get("phone"))) { err.textContent = "Enter a valid Ghana phone number, for example 024 123 4567."; err.hidden = false; e.target.elements.phone.focus(); return; }
    err.hidden = true;
    const msg = ["Hello, I'd like to sell on BuyfromGAB.", "", "Name: " + String(f.get("name")).trim(), "Phone: " + String(f.get("phone")).trim(), ...(String(f.get("business")).trim() ? ["Business: " + String(f.get("business")).trim()] : []), "", "What I'd like to sell:", String(f.get("products")).trim()].join("\n");
    sendWhatsApp("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "#sell-msg");
    return;
  }
  if (e.target.id === "profile-form") {
    e.preventDefault();
    const f = new FormData(e.target), err = $("#profile-error"), phone = String(f.get("phone")).trim();
    if (phone && !phoneOk(phone)) { err.textContent = "Enter a valid Ghana phone number, for example 024 123 4567."; err.hidden = false; return; }
    err.hidden = true;
    saveProfile({ name: String(f.get("name")).trim(), phone, email: String(f.get("email")).trim(), address: String(f.get("address")).trim() });
    toast("Details saved");
    return;
  }
  if (e.target.id !== "co-form") return;
  e.preventDefault();
  const s = cartSummary();
  if (!s.lines.length) return;
  const f = new FormData(e.target);
  const method = f.get("method");
  const chosen = PAYMENT_METHODS.find(m => m.id === method);
  $("#co-error").hidden = true;
  if (!chosen || !chosen.enabled) { showPayError("Choose an available payment option."); return; }
  const phone = String(f.get("phone")).trim();
  if (!phoneOk(phone)) { showPayError("Enter a valid Ghana phone number, for example 024 123 4567."); e.target.elements.phone.focus(); return; }
  const order = {
    ref: newRef(), method,
    name: String(f.get("name")).trim(), phone,
    email: String(f.get("email") || "").trim(),
    address: String(f.get("address")).trim(),
    notes: String(f.get("notes") || "").trim(),
    subtotal: s.subtotal, discount: s.discount, coupon: s.coupon, free: s.free, total: s.total,
    items: s.lines.map(({ p, qty }) => ({ id: p.id, name: p.name, qty, price: p.price }))
  };
  if (f.get("remember")) saveProfile({ name: order.name, phone: order.phone, email: order.email, address: order.address });
  saveOrder(order);
  lastOrder = order;
  try { localStorage.setItem("bazaar-last-order", JSON.stringify(order)); } catch (err) {}
  // Open WhatsApp with the order; the thank-you page also has a button in case a pop-up is blocked.
  try { window.open(waUrl(order), "_blank", "noopener"); } catch (err) {}
  go("#/thanks");
});
$("#brand").addEventListener("click", (e) => {
  e.preventDefault();
  go("#/");
});

$("#theme-switch").addEventListener("click", () => { applyTheme(effectiveTheme() === "dark" ? "light" : "dark"); if (view === "account") renderAccount(); });
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncThemeSwitch);

/* Progressive motion: tune the --motion-* properties in styles.css. */
(() => {
  if (!Element.prototype.animate || !("IntersectionObserver" in window)) return;
  const targets = ".hero-title, .hero-sub, .tile, .benefits > li, .cat-banner, .m-banner, .card, .m-item, .m-rail-item, .pd-thumb, .pd-info, .page-head, .site-footer";
  const running = new Map();
  let seen = new WeakSet(), frame = 0;

  function settings() {
    const css = getComputedStyle(document.documentElement);
    return {
      duration: parseFloat(css.getPropertyValue("--motion-duration")) || 520,
      stagger: parseFloat(css.getPropertyValue("--motion-stagger")) || 45,
      distance: css.getPropertyValue("--motion-distance").trim() || "20px",
      easing: css.getPropertyValue("--motion-ease").trim() || "ease-out"
    };
  }
  function play(el, keyframes, options) {
    if (reduceMotion || !el.isConnected) return;
    running.get(el)?.cancel();
    const animation = el.animate(keyframes, options);
    running.set(el, animation);
    const clean = () => { if (running.get(el) === animation) running.delete(el); };
    animation.onfinish = clean;
    animation.oncancel = clean;
  }
  const observer = new IntersectionObserver(entries => {
    const config = settings();
    let index = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (seen.has(entry.target)) continue;
      seen.add(entry.target);
      play(entry.target, [
        { opacity: 0, translate: `0 ${config.distance}` },
        { opacity: 1, translate: "0 0" }
      ], { duration: config.duration, delay: Math.min(index++, 5) * config.stagger, easing: config.easing, fill: "backwards" });
    }
  }, { threshold: 0.06 });

  function scan() {
    frame = 0;
    if (reduceMotion) return;
    document.querySelectorAll(targets).forEach(el => {
      if (!seen.has(el) && !el.closest("[hidden]")) observer.observe(el);
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(scan); }
  function reset() {
    observer.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
    seen = new WeakSet();
    schedule();
  }
  document.addEventListener("shop:route", reset);
  document.addEventListener("shop:cart-add", () => {
    document.querySelectorAll("#cart-count, #cart-count-d, #open-cart, #open-cart-d").forEach(el => {
      if (!el.getClientRects().length) return;
      play(el, [{ scale: "1" }, { scale: "1.16", offset: .4 }, { scale: "1" }], { duration: 360, easing: "ease-out" });
    });
  });
  motionPreference.addEventListener("change", reset);
  // Observe only the storefront; animate newly rendered search/filter results too.
  new MutationObserver(() => {
    for (const el of running.keys()) {
      if (!el.isConnected) { running.get(el).cancel(); running.delete(el); }
    }
    schedule();
  }).observe($("#top"), { childList: true, subtree: true });
  document.addEventListener("focusin", e => {
    // Keyboard focus always reveals its destination immediately.
    for (const [el, animation] of running) {
      if (el.contains(e.target)) animation.cancel();
    }
  });
  schedule();
})();

/* Category rail: touch scrolling, arrow buttons and keyboard navigation. */
(() => {
  const tabs = $("#m-tabs"), previous = $("#categories-prev"), next = $("#categories-next");
  let scheduled = 0, activeHref = "";
  function update() {
    scheduled = 0;
    const max = Math.max(0, tabs.scrollWidth - tabs.clientWidth);
    previous.disabled = tabs.scrollLeft <= 1;
    next.disabled = tabs.scrollLeft >= max - 1;
  }
  function schedule() { if (!scheduled) scheduled = requestAnimationFrame(update); }
  function scroll(direction) {
    tabs.scrollBy({ left: direction * Math.max(160, tabs.clientWidth * .75), behavior: reduceMotion ? "auto" : "smooth" });
  }
  previous.addEventListener("click", () => scroll(-1));
  next.addEventListener("click", () => scroll(1));
  tabs.addEventListener("scroll", schedule, { passive: true });
  tabs.addEventListener("keydown", event => {
    // Links retain their normal keyboard behavior; the rail itself is scrollable.
    if (event.target !== tabs) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault(); scroll(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      tabs.scrollTo({ left: event.key === "Home" ? 0 : tabs.scrollWidth, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
  function revealActive() {
    requestAnimationFrame(() => {
      const active = tabs.querySelector('[aria-current="page"]');
      if (active && tabs.clientWidth && active.getAttribute("href") !== activeHref) {
        activeHref = active.getAttribute("href");
        const rail = tabs.getBoundingClientRect(), item = active.getBoundingClientRect();
        if (item.left < rail.left || item.right > rail.right) {
          tabs.scrollBy({ left: item.left - rail.left - (tabs.clientWidth - item.width) / 2, behavior: "auto" });
        }
      }
      schedule();
    });
  }
  new MutationObserver(revealActive).observe(tabs, { childList: true });
  if ("ResizeObserver" in window) new ResizeObserver(schedule).observe(tabs);
  else window.addEventListener("resize", schedule);
  document.addEventListener("shop:route", revealActive);
  schedule();
})();

/* Apply only published content, except in an explicitly requested admin preview. */
function fullDesignHTML(item) {
  const cms = window.StoreContent;
  return `<picture class="full-design">${item.mobileImage ? `<source media="(max-width: 1099px)" srcset="${esc(cms.image(item.mobileImage))}">` : ""}<img src="${esc(cms.image(item.fullImage))}" alt="" decoding="async"></picture>`;
}
function applyEditedBanner() {
  const edited = storefrontContent?.banners.find(b => b.id === filter);
  if (!edited) return;
  const desktop = $("#cat-banner"), mobile = $("#m-banner");
  desktop.hidden = edited.visible === false;
  mobile.hidden = edited.visible === false;
  desktop.style.backgroundColor = edited.color;
  mobile.style.backgroundColor = edited.color;
  for (const container of [desktop, mobile]) {
    container.querySelector(".full-design")?.remove();
    container.classList.toggle("full-image", Boolean(edited.fullImageMode && edited.fullImage));
    if (edited.fullImageMode && edited.fullImage) container.insertAdjacentHTML("beforeend", fullDesignHTML(edited));
  }
  if (edited.title) $("#banner-title").textContent = edited.title;
  if (edited.subtitle) $("#banner-sub").textContent = edited.subtitle;
  for (const [selector, source] of [["#banner-left", edited.left], ["#banner-right", edited.right]]) {
    const img = $(selector); img.hidden = !source;
    if (source) img.src = window.StoreContent.image(source);
  }
  const title = mobile.querySelector("strong"), subtitle = mobile.querySelector(".mb-text span");
  if (title && edited.title) title.textContent = edited.title;
  if (subtitle && edited.subtitle) subtitle.textContent = edited.subtitle;
  const img = mobile.querySelector(":scope > img");
  if (img) { img.hidden = !edited.right; if (edited.right) img.src = window.StoreContent.image(edited.right); }
}
function applyStorefrontDocument(content) {
  window.StoreContent.validate(content);
  storefrontContent = content;
  const originals = window.StoreContent.defaults().categories;
  const baseCategories = initialCategoryLayout;
  CATEGORIES.splice(0, CATEGORIES.length, ...content.categories.filter(c => c.visible !== false).map(c => {
    const base = baseCategories.find(x => x.id === c.id) || { art: { w: 82, r: 17, b: 12 }, d: { w: 144, r: 12 } };
    const renamed = originals.find(x => x.id === c.id)?.name !== c.name;
    return { ...base, ...c, lines: renamed || !base.lines ? c.name.split("\n") : base.lines, dlines: renamed || !base.dlines ? c.name.split("\n") : base.dlines };
  }));
  for (const c of content.categories) {
    ART[c.id] = window.StoreContent.image(c.image);
    document.documentElement.style.setProperty("--" + c.id, c.color);
  }
  const activeCategories = new Set(CATEGORIES.map(c => c.id));
  PRODUCTS.splice(0, PRODUCTS.length, ...content.products.filter(p => p.visible !== false && activeCategories.has(p.cat)).map(p => ({ ...p, img: window.StoreContent.image(p.img), brand: String(p.brand || "BuyfromGAB"), desc: String(p.desc || ""), emoji: String(p.emoji || "📦"), sold: Number(p.sold) || 0, sub: p.sub || SUBCATS[p.cat]?.[0]?.id || "" })));
  TOP_IDS.clear(); [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 12).forEach(p => TOP_IDS.add(p.id));
  const home = content.homepage;
  $("#hero-title").textContent = home.title;
  $(".hero-sub").textContent = home.subtitle || "";
  $("#hero").dataset.kicker = home.kicker || "";
  $(".benefits").hidden = home.showBenefits === false;
  $(".f-brand > p").textContent = home.footerText || "";
  $(".f-connect h2").textContent = home.newsletterTitle || "";
  $(".f-connect > p").textContent = home.newsletterText || "";
  let promotions = $("#store-promotions");
  if (!promotions) { promotions = document.createElement("div"); promotions.id = "store-promotions"; promotions.className = "store-promotions"; $(".hero-sub").after(promotions); }
  promotions.innerHTML = content.promotions.filter(b => b.visible !== false).map(b => b.fullImageMode && b.fullImage ? `<a class="store-promotion full-image" href="${esc(window.StoreContent.link(b.link) || "#/all")}" aria-label="${esc(b.title || "Shop collection")}">${fullDesignHTML(b)}</a>` : `<a class="store-promotion" href="${esc(window.StoreContent.link(b.link) || "#/all")}" style="background-color:${esc(b.color)}"><div><h2>${esc(b.title)}</h2><p>${esc(b.subtitle || "")}</p><span>${esc(b.cta || "Shop now")} →</span></div>${b.image ? `<img src="${esc(window.StoreContent.image(b.image))}" alt="">` : ""}</a>`).join("");
  buildDeskUI(); renderTiles(); renderCart(); route();
}
let storefrontVersion = -1;
async function refreshStorefrontContent() {
  try {
    const preview = new URLSearchParams(location.search).get("preview") === "1";
    const result = await window.StoreContent.read(preview ? "draft" : "published");
    if (result.content && result.version !== storefrontVersion) {
      applyStorefrontDocument(result.content); storefrontVersion = result.version;
      if (preview && !$("#draft-preview-label")) {
        const label = document.createElement("div"); label.id = "draft-preview-label"; label.className = "draft-preview-label";
        label.innerHTML = 'Draft preview · Changes are not published. <a href="admin/storefront.html">Return to editor</a>';
        document.body.prepend(label);
      }
    }
  } catch (error) { console.error("Store content could not be loaded.", error.message); }
}
window.addEventListener("storage", event => { if (event.key?.startsWith(window.StoreContent.storageKey)) refreshStorefrontContent(); });
window.addEventListener("focus", refreshStorefrontContent);

/* Start-up */

/* ====== Init ====== */
buildDeskUI();
renderFooterSocial();
syncThemeSwitch();
updateTrackLink();
$("#year").textContent = new Date().getFullYear();
renderTiles(); renderCart(); route();
refreshStorefrontContent();
