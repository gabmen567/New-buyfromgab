/* Shared content transport. Remote writes require Supabase Auth and an admin role. */
(() => {
  "use strict";
  const config = window.STORE_CONFIG || {};
  const remote = Boolean(config.supabaseUrl && config.publishableKey);
  const base = String(config.supabaseUrl || "").replace(/\/$/, "");
  const key = "buyfromgab-content-v1-", sessionKey = key + "session";
  const clone = value => JSON.parse(JSON.stringify(value));
  const catalog = window.StoreCatalog;
  const categoryDefinitions = clone(catalog.CATEGORIES);
  const colours = { food: "#62dfb3", home: "#ffb46b", bath: "#f5d665", pharm: "#c8a5f5", tech: "#9cde65", cloth: "#f69fbb", beauty: "#7ed8da", toys: "#ffa28d", building: "#93bdf5", auto: "#b8ce78" };
  const promiseIcons = {
    truck: { label: "Delivery truck", paths: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>' },
    returns: { label: "Returns arrow", paths: '<path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12h-2"/>' },
    headset: { label: "Support headset", paths: '<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 12h3v7H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1ZM20 12h-3v7h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM19 19a3 3 0 0 1-3 3h-4"/>' },
    card: { label: "Payment card", paths: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>' },
    shield: { label: "Security shield", paths: '<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5zM8 11l3 3 5-6"/>' },
    package: { label: "Package", paths: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10M8 4l9 5"/>' },
    clock: { label: "Clock", paths: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>' },
    star: { label: "Quality star", paths: '<path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z"/>' }
  };
  function promiseIcon(key) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(promiseIcons[key] || promiseIcons.truck).paths}</svg>`;
  }
  function defaultPromises() {
    return [
      { icon: "truck", title: "Free Delivery", text: "For orders over GH₵500", visible: true },
      { icon: "returns", title: "7 Day Return", text: "7-Day Return Policy", visible: true },
      { icon: "headset", title: "Online Support", text: "24/7 Customer Support", visible: true },
      { icon: "card", title: "Secured Payment", text: "Secured", visible: true }
    ];
  }
  function image(value) {
    const url = String(value || "").trim();
    if (!url) return "";
    if (/^data:image\/(png|jpe?g|webp|gif|avif);base64,[a-z0-9+/=\s]+$/i.test(url)) return url;
    try { const parsed = new URL(url); return parsed.protocol === "https:" ? parsed.href : ""; } catch { return ""; }
  }
  function link(value) {
    const url = String(value || "").trim();
    if (/^#\/[a-z0-9/_-]*$/i.test(url)) return url;
    try { const parsed = new URL(url); return parsed.protocol === "https:" ? parsed.href : ""; } catch { return ""; }
  }
  function defaults() {
    return {
      schema: 1,
      homepage: { title: "What’s on your list?", subtitle: "All Categories · Everything you need, in one place.", kicker: "THE EVERYDAY COLLECTION", newsletterTitle: "A little more from GAB.", newsletterText: "Leave your email, then send your request on WhatsApp for offers and updates.", footerText: "Everything you need, in one place. Shop food, home essentials, electronics, fashion and more, and order easily on WhatsApp.", showBenefits: true, promises: defaultPromises() },
      categories: catalog.CATEGORIES.map(c => ({ id: c.id, name: c.name, color: colours[c.id], image: catalog.ART[c.id], visible: true, wide: Boolean(c.wide), cta: c.cta || "" })),
      products: catalog.PRODUCTS.map(p => ({ ...clone(p), stock: p.stock ?? null, visible: true })),
      banners: ["all", ...catalog.CATEGORIES.map(c => c.id)].map(id => {
        const pair = catalog.BANNERS[id === "all" ? "_all" : id] || catalog.BANNERS._all;
        return { id, title: id === "all" ? "All products" : catalog.CATEGORIES.find(c => c.id === id).name, subtitle: "", left: catalog.ART[pair[0]] || "", right: catalog.ART[pair[1]] || "", visible: true, color: colours[id] || "#e8e9f2" };
      }),
      promotions: []
    };
  }
  function validate(doc) {
    if (!doc || doc.schema !== 1 || !doc.homepage || !Array.isArray(doc.categories) || !Array.isArray(doc.products) || !Array.isArray(doc.banners) || !Array.isArray(doc.promotions)) throw new Error("This content file has an unsupported format.");
    if (!String(doc.homepage.title || "").trim()) throw new Error("Enter a homepage title.");
    if (doc.homepage.promises !== undefined) {
      if (!Array.isArray(doc.homepage.promises) || doc.homepage.promises.length > 8) throw new Error("Use up to eight store promises.");
      for (const promise of doc.homepage.promises) {
        if (!Object.hasOwn(promiseIcons, promise.icon) || typeof promise.title !== "string" || !promise.title.trim() || promise.title.length > 80 || typeof promise.text !== "string" || promise.text.length > 160 || typeof promise.visible !== "boolean") throw new Error("Each promise needs an icon, a title (up to 80 characters), supporting text (up to 160 characters), and a visibility setting.");
      }
    }
    const ids = new Set();
    for (const c of doc.categories) {
      if (!categoryDefinitions.some(original => original.id === c.id) || ids.has(c.id) || typeof c.name !== "string" || !c.name.trim() || !/^#[0-9a-f]{6}$/i.test(c.color)) throw new Error("Check the category names, identifiers and colours.");
      ids.add(c.id);
      if (c.image && !image(c.image)) throw new Error("Category images must be HTTPS URLs or uploaded images.");
      validateFullDesign(c);
    }
    if (ids.size !== categoryDefinitions.length) throw new Error("The category list is incomplete.");
    const products = new Set();
    for (const p of doc.products) {
      if (!Number.isSafeInteger(p.id) || p.id <= 0 || products.has(p.id) || !ids.has(p.cat) || typeof p.name !== "string" || !p.name.trim() || !Number.isFinite(p.price) || p.price < 0 || (p.stock !== null && (!Number.isInteger(p.stock) || p.stock < 0))) throw new Error("Check each product’s name, category, price and stock.");
      if (p.oldPrice && (!Number.isFinite(p.oldPrice) || p.oldPrice < p.price)) throw new Error("The original price must be at least the selling price.");
      if (p.img && !image(p.img)) throw new Error("Product images must be HTTPS URLs or uploaded images.");
      if (p.sub && !(catalog.SUBCATS[p.cat] || []).some(s => s.id === p.sub)) throw new Error("Choose a subcategory belonging to the product’s category.");
      products.add(p.id);
    }
    if (doc.banners.length !== ids.size + 1 || new Set(doc.banners.map(b => b.id)).size !== doc.banners.length) throw new Error("The banner list is incomplete.");
    for (const b of [...doc.banners, ...doc.promotions]) {
      validateFullDesign(b);
      if (!/^#[0-9a-f]{6}$/i.test(b.color)) throw new Error("Choose a valid banner colour.");
      for (const field of ["image", "left", "right"]) if (b[field] && !image(b[field])) throw new Error("Banner images must be HTTPS URLs or uploaded images.");
      if (b.link && !link(b.link)) throw new Error("Use a shop link such as #/all or a full HTTPS URL.");
    }
    if (doc.banners.some(b => b.id !== "all" && !ids.has(b.id))) throw new Error("A banner references an unknown category.");
    return doc;
  }
  function validateFullDesign(item) {
    for (const field of ["fullImage", "mobileImage"]) if (item[field] && !image(item[field])) throw new Error("Full designs must be uploaded images or HTTPS image URLs.");
    if (item.fullImageMode && !item.fullImage) throw new Error("Upload a complete desktop design, or turn off full-image mode before saving.");
  }
  function localRead(id) {
    const stored = localStorage.getItem(key + id);
    return stored ? JSON.parse(stored) : { content: null, version: 0 };
  }
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(sessionKey) || "null"); } catch { return null; }
  }
  async function request(path, { auth = false, ...options } = {}) {
    const session = auth ? await sessionForRequest() : null;
    const headers = { apikey: config.publishableKey, ...options.headers };
    if (session) headers.Authorization = "Bearer " + session.access_token;
    const response = await fetch(base + path, { ...options, headers, signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    let data; try { data = body ? JSON.parse(body) : null; } catch { data = null; }
    if (!response.ok) throw new Error(data?.message || data?.msg || data?.error_description || data?.error || `Store connection failed (${response.status}).`);
    return data;
  }
  async function sessionForRequest() {
    let session = getSession();
    if (!session) throw new Error("Sign in with your store administrator account.");
    if (session.expires_at <= Date.now() / 1000 + 60) {
      const refreshed = await request("/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
      session = { ...refreshed, expires_at: Date.now() / 1000 + refreshed.expires_in };
      sessionStorage.setItem(sessionKey, JSON.stringify(session));
    }
    return session;
  }
  async function signIn(email, password) {
    const session = await request("/auth/v1/token?grant_type=password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    sessionStorage.setItem(sessionKey, JSON.stringify({ ...session, expires_at: Date.now() / 1000 + session.expires_in }));
    try {
      const allowed = await request("/rest/v1/rpc/has_admin_access", { auth: true, method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!allowed) throw new Error("This account does not have store administrator access.");
    } catch (error) { sessionStorage.removeItem(sessionKey); throw error; }
  }
  async function read(id = "published") {
    if (!remote) return localRead(id);
    const rows = await request(`/rest/v1/storefront_documents?id=eq.${id}&select=content,version`, { auth: id === "draft" });
    return rows[0] || { content: null, version: 0 };
  }
  async function write(id, content, version) {
    validate(content);
    if (remote) return request("/rest/v1/rpc/save_storefront_content", { auth: true, method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ p_id: id, p_content: content, p_expected_version: version }) });
    const current = localRead(id);
    if (current.version !== version) throw new Error("Another editor saved changes. Reload before saving again.");
    const result = { content: clone(content), version: version + 1 };
    try { localStorage.setItem(key + id, JSON.stringify(result)); } catch { throw new Error("Browser storage is full. Use smaller images or connect Supabase for image storage."); }
    return result;
  }
  async function upload(file) {
    const types = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };
    if (!types[file.type]) throw new Error("Choose a PNG, JPG, WebP, GIF or AVIF image.");
    if (file.size > (remote ? 5 : 1) * 1024 * 1024) throw new Error(remote ? "Choose an image under 5 MB." : "Local previews support images under 1 MB. Connect Supabase for larger uploads.");
    if (!remote) return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error("Could not read this image.")); reader.readAsDataURL(file); });
    const path = crypto.randomUUID() + "." + types[file.type];
    await request("/storage/v1/object/storefront-media/" + path, { auth: true, method: "POST", headers: { "Content-Type": file.type, "Cache-Control": "3600" }, body: file });
    return base + "/storage/v1/object/public/storefront-media/" + path;
  }
  const initialContent = defaults();
  window.StoreContent = { remote, defaults: () => clone(initialContent), defaultPromises, promiseIcons, promiseIcon, validate, image, link, clone, read, write, upload, signIn, getSession, signOut: async () => {
    try { if (remote && getSession()) await request("/auth/v1/logout", { auth: true, method: "POST" }); }
    finally { sessionStorage.removeItem(sessionKey); }
  }, storageKey: key };
})();
