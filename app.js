
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

  /* ====== Categories ====== */
  const CATEGORIES = [
    { id: "toys",  name: "Kids toys",   svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <rect x="14" y="74" width="92" height="30" rx="6" fill="currentColor"/>
        <rect x="26" y="44" width="46" height="30" rx="6" fill="currentColor" opacity=".78"/>
        <rect x="56" y="16" width="38" height="28" rx="6" fill="currentColor" opacity=".55"/>
        <g fill="var(--tile-bg)"><circle cx="34" cy="89" r="5"/><circle cx="60" cy="89" r="5"/><circle cx="86" cy="89" r="5"/>
        <circle cx="40" cy="59" r="5"/><circle cx="58" cy="59" r="5"/><circle cx="68" cy="30" r="4.5"/><circle cx="83" cy="30" r="4.5"/></g>
      </svg>` },
    { id: "tech",  name: "Electronics", svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M24 74V62a36 36 0 0 1 72 0v12" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
        <rect x="14" y="68" width="24" height="40" rx="12" fill="currentColor"/>
        <rect x="82" y="68" width="24" height="40" rx="12" fill="currentColor"/>
        <rect x="19" y="78" width="6" height="20" rx="3" fill="var(--tile-bg)"/>
        <rect x="95" y="78" width="6" height="20" rx="3" fill="var(--tile-bg)"/>
      </svg>` },
    { id: "pharm", name: "Pharmacy",    svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <g transform="rotate(-38 60 66)">
          <path d="M60 46H38a20 20 0 0 0 0 40h22Z" fill="currentColor" opacity=".55"/>
          <path d="M60 46h22a20 20 0 0 1 0 40H60Z" fill="currentColor"/>
        </g>
        <path d="M96 12v26M83 25h26" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
      </svg>` },
    { id: "cloth", name: "Clothes",     svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M42 16 14 34l12 24 14-8v58h40V50l14 8 12-24-28-18c-3 9-10 14-18 14s-15-5-18-14Z" fill="currentColor"/>
      </svg>` },
    { id: "beauty", name: "Beauty", svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <rect x="40" y="68" width="40" height="42" rx="8" fill="currentColor"/>
        <rect x="45" y="46" width="30" height="24" rx="4" fill="currentColor" opacity=".6"/>
        <path d="M49 46V28l11-16 11 16v18Z" fill="currentColor"/>
        <path d="M95 14l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="currentColor"/>
      </svg>` },
    { id: "home", name: "Home & kitchen", svg: `
      <svg class="pictogram" viewBox="0 0 120 120" aria-hidden="true">
        <rect x="20" y="58" width="80" height="48" rx="12" fill="currentColor"/>
        <rect x="6" y="68" width="16" height="9" rx="4.5" fill="currentColor" opacity=".6"/>
        <rect x="98" y="68" width="16" height="9" rx="4.5" fill="currentColor" opacity=".6"/>
        <path d="M28 56Q60 20 92 56Z" fill="currentColor" opacity=".8"/>
        <circle cx="60" cy="30" r="7" fill="currentColor"/>
      </svg>` }
  ];

  /* ====== Products (add an  img: "https://..."  field to use a real photo) ====== */
  const PRODUCTS = [
    { id: 1,  cat: "toys",  name: "Wooden building blocks", price: 18.50, emoji: "🧱" },
    { id: 2,  cat: "toys",  name: "Plush teddy bear",       price: 14.00, emoji: "🧸" },
    { id: 3,  cat: "toys",  name: "Remote control car",     price: 32.00, emoji: "🏎️" },
    { id: 4,  cat: "toys",  name: "100-piece jigsaw puzzle",price: 12.00, emoji: "🧩" },
    { id: 5,  cat: "toys",  name: "Wooden train set",       price: 27.50, emoji: "🚂" },
    { id: 6,  cat: "toys",  name: "Kids art kit",           price: 16.00, emoji: "🎨" },

    { id: 7,  cat: "tech",  name: "Wireless headphones",    price: 59.00, emoji: "🎧" },
    { id: 8,  cat: "tech",  name: "Smartwatch",             price: 89.00, emoji: "⌚" },
    { id: 9,  cat: "tech",  name: "Portable speaker",       price: 45.00, emoji: "🔊" },
    { id: 10, cat: "tech",  name: "Power bank 10,000 mAh",  price: 25.00, emoji: "🔋" },
    { id: 11, cat: "tech",  name: "Android smartphone",     price: 249.00, emoji: "📱" },
    { id: 12, cat: "tech",  name: "Wireless keyboard",      price: 35.00, emoji: "⌨️" },

    { id: 13, cat: "pharm", name: "Vitamin C tablets",      price: 9.50,  emoji: "💊" },
    { id: 14, cat: "pharm", name: "First aid kit",          price: 19.00, emoji: "🩹" },
    { id: 15, cat: "pharm", name: "Hand sanitizer 500 ml",  price: 4.50,  emoji: "🧴" },
    { id: 16, cat: "pharm", name: "Digital thermometer",    price: 12.00, emoji: "🌡️" },
    { id: 17, cat: "pharm", name: "Face masks, 50 pack",    price: 6.00,  emoji: "😷" },
    { id: 18, cat: "pharm", name: "Sunscreen SPF 50",       price: 11.00, emoji: "☀️" },

    { id: 19, cat: "cloth", name: "Cotton t-shirt",         price: 12.00, emoji: "👕" },
    { id: 20, cat: "cloth", name: "Denim jeans",            price: 38.00, emoji: "👖" },
    { id: 21, cat: "cloth", name: "Summer dress",           price: 29.00, emoji: "👗" },
    { id: 22, cat: "cloth", name: "Running sneakers",       price: 54.00, emoji: "👟" },
    { id: 23, cat: "cloth", name: "Zip hoodie",             price: 34.00, emoji: "🧥" },
    { id: 24, cat: "cloth", name: "Baseball cap",           price: 10.00, emoji: "🧢" },

    { id: 25, cat: "beauty", name: "Matte lipstick",         price: 9.00,  emoji: "💄" },
    { id: 26, cat: "beauty", name: "Perfume 50 ml",          price: 42.00, emoji: "🌸" },
    { id: 27, cat: "beauty", name: "Hydrating face cream",   price: 15.00, emoji: "🧴" },
    { id: 28, cat: "beauty", name: "Makeup brush set",       price: 18.00, emoji: "🖌️" },
    { id: 29, cat: "beauty", name: "Nail polish duo",        price: 7.50,  emoji: "💅" },
    { id: 30, cat: "beauty", name: "Hair dryer",             price: 36.00, emoji: "💨" },

    { id: 31, cat: "home", name: "Non-stick cooking pot",    price: 28.00, emoji: "🍲" },
    { id: 32, cat: "home", name: "Ceramic mug set",          price: 16.00, emoji: "☕" },
    { id: 33, cat: "home", name: "Table lamp",               price: 22.00, emoji: "💡" },
    { id: 34, cat: "home", name: "Cotton bedsheet set",      price: 33.00, emoji: "🛏️" },
    { id: 35, cat: "home", name: "Electric kettle",          price: 24.00, emoji: "🫖" },
    { id: 36, cat: "home", name: "Storage baskets, 3 pack",  price: 14.00, emoji: "🧺" }
  ];

  const DESC = {
    1:  "A set of smooth, colourful wooden blocks for stacking, sorting and building. Great for imaginative play and for practising balance and coordination.",
    2:  "A soft, huggable teddy bear with a plush coat and stitched face. A comforting companion for bedtime, car rides and play dates.",
    3:  "A fast, easy-to-steer remote control car with a rechargeable battery. Drives on pavement and indoors, with a simple controller that kids can use on their own.",
    4:  "A 100-piece jigsaw puzzle with a bright picture and thick, sturdy pieces. Works well as a quiet activity for one child or a team effort.",
    5:  "A wooden train set with tracks, carriages and a pull-along engine. Kids can rebuild the layout again and again, which keeps play fresh.",
    6:  "An art kit with crayons, coloured pencils, paints and paper in one box. Everything a young artist needs to start drawing straight away.",
    7:  "Over-ear wireless headphones with a padded headband and Bluetooth connection. Made for music, calls and long journeys, with a built-in microphone.",
    8:  "A smartwatch that shows the time, notifications and daily step count on a bright touchscreen. Pairs with your phone and tracks your activity.",
    9:  "A compact Bluetooth speaker with clear sound for its size. Easy to carry around the house, the yard or the beach.",
    10: "A slim 10,000 mAh power bank that keeps your phone charged on the go. Can recharge most phones more than once on a single charge.",
    11: "An Android smartphone with a large display, a dual camera and all-day battery life. A dependable everyday phone for calls, photos and apps.",
    12: "A slim wireless keyboard with quiet keys and a USB receiver. Works with laptops, desktops and many tablets.",
    13: "Vitamin C tablets for daily use as part of a balanced diet. Easy to swallow and packed in a resealable tub. Always follow the directions on the pack.",
    14: "A compact first aid kit with plasters, bandages, dressings and antiseptic wipes. Small enough for a car, a bag or a school.",
    15: "A 500 ml hand sanitizer with a pump top for easy use at home or in the office. Quick-drying and gentle on skin.",
    16: "A digital thermometer with a clear display and a fast reading. Simple to use for the whole family. Speak to a health professional about any health concern.",
    17: "A pack of 50 lightweight disposable face masks with soft ear loops. Comfortable for everyday use.",
    18: "A broad-spectrum SPF 50 sunscreen for face and body. Light on the skin and easy to spread. Reapply as directed on the label.",
    19: "A soft cotton t-shirt with a relaxed everyday fit. Breathable, easy to wash and simple to pair with almost anything.",
    20: "Classic denim jeans with a comfortable straight fit and a durable weave. A wardrobe staple for any season.",
    21: "A light summer dress with a flattering shape and a breathable fabric. Comfortable for warm days and easy to dress up or down.",
    22: "Lightweight running sneakers with a cushioned sole and breathable upper. Comfortable for workouts and for daily wear.",
    23: "A warm zip hoodie with a soft lining and front pockets. Perfect for cool mornings and relaxed weekends.",
    24: "An adjustable cotton baseball cap with a curved brim. Keeps the sun off and goes with any casual outfit.",
    25: "A creamy matte lipstick with rich colour and a comfortable feel. A single swipe gives full coverage.",
    26: "A 50 ml eau de parfum with a fresh floral scent. Long-lasting and suited to both day and evening.",
    27: "A light, hydrating face cream that sinks in quickly without a greasy feel. Suitable for daily use morning and night.",
    28: "A set of soft makeup brushes for foundation, powder, blush and eyeshadow. Comes in a handy pouch for travel.",
    29: "Two nail polish shades in a gift-ready pair. Smooth application and a glossy finish.",
    30: "A powerful hair dryer with several heat and speed settings. Dries hair quickly and includes a concentrator nozzle for styling.",
    31: "A non-stick cooking pot with a tight-fitting lid and cool-touch handles. Even heating makes it great for soups, stews and rice.",
    32: "A set of ceramic mugs that hold a generous serving of tea or coffee. Dishwasher safe and comfortable to hold.",
    33: "A table lamp with a warm glow and a sturdy base. Adds soft light to a bedside, desk or living room.",
    34: "A cotton bedsheet set with a fitted sheet, flat sheet and pillowcases. Soft, breathable and easy to wash.",
    35: "An electric kettle with an automatic switch-off and a wide opening for easy filling. Boils quickly for tea, coffee and noodles.",
    36: "A pack of 3 woven storage baskets in different sizes. Handy for toys, laundry, towels and shelves."
  };
  PRODUCTS.forEach(p => { p.desc = DESC[p.id] || ""; });

  /* ====== Brands, deals and sales ======
     PLACEHOLDER DATA: edit these to match your real stock.
     BRANDS:       productId -> brand name (shows in the Brands menu and filter)
     DEALS:        productId -> old price (the product's price above is the new, lower price)
     SOLD:         productId -> units sold (used for "Top selling")
     BEST_SELLERS: products you want to mark as best sellers */
  const BRANDS = {
    1: "Little Joy", 2: "Play Pals", 3: "Play Pals", 4: "Little Joy", 5: "Little Joy", 6: "Play Pals",
    7: "Panasonic", 8: "Samsung", 9: "LG", 10: "Nasco", 11: "Samsung", 12: "LG",
    13: "Wellcare", 14: "Healthy Life", 15: "Wellcare", 16: "Healthy Life", 17: "Wellcare", 18: "Healthy Life",
    19: "Urban Wear", 20: "Urban Wear", 21: "Sunday Style", 22: "Urban Wear", 23: "Sunday Style", 24: "Sunday Style",
    25: "Glow", 26: "Bloom", 27: "Glow", 28: "Bloom", 29: "Glow", 30: "Panasonic",
    31: "Midea", 32: "Nasco", 33: "Panasonic", 34: "Homely", 35: "Midea", 36: "Homely"
  };
  const DEALS = { 3: 40, 7: 75, 9: 55, 11: 289, 14: 24, 20: 48, 22: 65, 26: 55, 31: 35, 35: 30 };
  const SOLD = {
    1: 120, 2: 210, 3: 95, 4: 60, 5: 75, 6: 88, 7: 310, 8: 240, 9: 275, 10: 420, 11: 180, 12: 90,
    13: 350, 14: 140, 15: 500, 16: 160, 17: 260, 18: 110, 19: 380, 20: 290, 21: 200, 22: 230, 23: 170, 24: 150,
    25: 310, 26: 130, 27: 220, 28: 70, 29: 105, 30: 190, 31: 260, 32: 180, 33: 85, 34: 145, 35: 300, 36: 125
  };
  const BEST_SELLERS = new Set([2, 7, 10, 15, 19, 25, 31, 35]);
  PRODUCTS.forEach(p => {
    p.brand = BRANDS[p.id] || "BuyfromGAB";
    p.oldPrice = DEALS[p.id] || 0;
    p.sold = SOLD[p.id] || 0;
    p.best = BEST_SELLERS.has(p.id);
  });
  const dealPct = (p) => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const COLLECTION_NAMES = { deals: "New deals", top: "Top selling", best: "Best sellers" };

  /* ====== Sub-categories (PLACEHOLDERS: edit to match your stock) ======
     For each category: id, name, and the product ids that belong to it. */
  const SUBCATS = {
    toys:   [ { id: "blocks", name: "Blocks & puzzles", items: [1, 4] }, { id: "soft", name: "Soft toys", items: [2] },
              { id: "vehicles", name: "Vehicles & trains", items: [3, 5] }, { id: "art", name: "Arts & crafts", items: [6] } ],
    tech:   [ { id: "audio", name: "Audio", items: [7, 9] }, { id: "phones", name: "Phones & wearables", items: [8, 11] },
              { id: "accessories", name: "Accessories", items: [10, 12] } ],
    pharm:  [ { id: "vitamins", name: "Vitamins", items: [13] }, { id: "firstaid", name: "First aid", items: [14, 16] },
              { id: "hygiene", name: "Hygiene & protection", items: [15, 17, 18] } ],
    cloth:  [ { id: "tops", name: "Tops & hoodies", items: [19, 23] }, { id: "jeans", name: "Jeans", items: [20] },
              { id: "dresses", name: "Dresses", items: [21] }, { id: "shoes", name: "Shoes & caps", items: [22, 24] } ],
    beauty: [ { id: "makeup", name: "Makeup", items: [25, 28, 29] }, { id: "fragrance", name: "Fragrance", items: [26] },
              { id: "skin", name: "Skin care", items: [27] }, { id: "hair", name: "Hair", items: [30] } ],
    home:   [ { id: "kitchen", name: "Kitchen", items: [31, 32, 35] }, { id: "bedroom", name: "Bedroom", items: [34] },
              { id: "lighting", name: "Lighting & storage", items: [33, 36] } ]
  };
  Object.values(SUBCATS).forEach(subs => subs.forEach(sc => sc.items.forEach(id => {
    const prod = PRODUCTS.find(x => x.id === id); if (prod) prod.sub = sc.id;
  })));

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

  /* ====== Helpers ====== */
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY }).format(n);
  const catName = (id) => CATEGORIES.find(c => c.id === id).name;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ====== State ====== */
  let filter = "all";
  let query = "";
  let sortBy = "featured", minP = "", maxP = "", minRating = 0, brandSel = "", collection = "", subSel = "";
  let lastList = null;
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

  /* ====== Hero tiles ====== */
  function renderTiles() {
    $("#category-grid").innerHTML = CATEGORIES.map(c => {
      const count = PRODUCTS.filter(p => p.cat === c.id).length;
      return `<a class="tile" href="#/c/${c.id}" data-cat="${c.id}">
        ${c.svg}
        <span class="tile-name">${c.name}</span>
        <span class="tile-meta">${count} products</span>
      </a>`;
    }).join("");
  }

  /* ====== Chips ====== */
  function renderChips() {
    const all = [{ id: "all", name: "All" }, ...CATEGORIES];
    $("#chips").innerHTML = all.map(c =>
      `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${filter === c.id}">${c.name}</button>`
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
    if (brandSel && !brands.some(([b]) => b === brandSel)) brandSel = "";
    $("#brand-filter").innerHTML = `<option value="">All brands</option>` + brands.map(([b, n]) => `<option value="${esc(b)}">${esc(b)} (${n})</option>`).join("");
    $("#brands-pop").innerHTML = `<button class="brand-opt" type="button" data-brand="" aria-pressed="true">All brands</button>` +
      brands.map(([b, n]) => `<button class="brand-opt" type="button" data-brand="${esc(b)}" aria-pressed="false"><span>${esc(b)}</span><span class="n">${n}</span></button>`).join("");
    setBrandPop(false);
    syncBrandUI();
  }
  function syncBrandUI() {
    $("#brand-filter").value = brandSel;
    $("#brands-label").textContent = brandSel ? "Brands: " + brandSel : "Brands";
    $("#brands-btn").classList.toggle("active", !!brandSel);
    document.querySelectorAll(".brand-opt").forEach(b => b.setAttribute("aria-pressed", b.dataset.brand === brandSel));
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
      : `<button class="fav-btn" type="button" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? "Remove" : "Add"} ${p.name} ${on ? "from" : "to"} favourites">${HEART_SVG}</button>`;
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
        ${(p.oldPrice || p.best) ? `<div class="badges">${p.oldPrice ? `<span class="badge-deal">-${dealPct(p)}%</span>` : ""}${p.best ? `<span class="badge-best">Best seller</span>` : ""}</div>` : ""}
        <div class="thumb">${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : `<span role="img" aria-label="${p.name}">${p.emoji}</span>`}</div>
        <div class="card-body">
          <span class="card-cat">${p.brand} · ${catName(p.cat)}</span>
          <a class="card-link card-name" href="#/p/${p.id}">${p.name}</a>
          ${ratingLineHTML(p.id)}
          ${view === "list" && collection === "top" ? `<span class="sold">${p.sold} sold</span>` : ""}
          <div class="card-foot">
            <span class="price-wrap"><span class="price">${money(p.price)}</span>${p.oldPrice ? `<s class="was">${money(p.oldPrice)}</s>` : ""}</span>
            <button class="add-btn" type="button" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add</button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const q = query.trim().toLowerCase();
    const lo = parseFloat(minP), hi = parseFloat(maxP);
    const list = PRODUCTS.filter(p =>
      (filter === "all" || p.cat === filter) &&
      (!q || p.name.toLowerCase().includes(q) || catName(p.cat).toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
      (!subSel || p.sub === subSel) &&
      (!brandSel || p.brand === brandSel) &&
      (collection !== "deals" || p.oldPrice) &&
      (collection !== "best" || p.best) &&
      (isNaN(lo) || p.price >= lo) &&
      (isNaN(hi) || p.price <= hi) &&
      (!minRating || ratingStats(p.id).avg >= minRating)
    );
    if (sortBy === "low") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => { const A = ratingStats(a.id), B = ratingStats(b.id); return B.avg - A.avg || B.count - A.count; });
    else if (sortBy === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (collection === "top") list.sort((a, b) => b.sold - a.sold);
    $("#shop-title").textContent = (filter === "all" ? "All products" : catName(filter)) + (subSel ? " · " + subName() : "") + (collection ? " · " + COLLECTION_NAMES[collection] : "") + (brandSel ? " · " + brandSel : "");
    document.title = $("#shop-title").textContent + " – BuyfromGAB";
    $("#result-count").textContent = list.length + (list.length === 1 ? " product" : " products");
    $("#product-grid").innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<p class="empty">No products match these filters. Change the price range or reset the filters.</p>`;
  }

  function resetFilters() {
    sortBy = "featured"; minP = ""; maxP = ""; minRating = 0; brandSel = ""; collection = "";
    $("#sort").value = "featured"; $("#min").value = ""; $("#max").value = ""; $("#min-rating").value = "0"; syncBrandUI();
  }

  /* ====== Product page ====== */
  function renderProduct(p) {
    pdQty = 1;
    currentProd = p;
    const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    $("#product").innerHTML = `
      <a class="back-link" href="#/c/${p.cat}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        Back to ${catName(p.cat)}
      </a>
      <div class="pd" data-cat="${p.cat}">
        <div class="pd-thumb">${p.img ? `<img src="${p.img}" alt="${p.name}">` : `<span role="img" aria-label="${p.name}">${p.emoji}</span>`}</div>
        <div>
          <span class="card-cat">${p.brand} · ${catName(p.cat)}</span>
          <h1>${p.name}</h1>
          <button class="rating-link" id="pd-rating" type="button" data-scroll-reviews>${ratingLineHTML(p.id)}</button>
          <p class="pd-price">${money(p.price)}${p.oldPrice ? ` <s class="was">${money(p.oldPrice)}</s> <span class="badge-deal">-${dealPct(p)}%</span>` : ""}</p>
          <p class="pd-desc">${p.desc}</p>
          <div class="pd-buy">
            <div class="qty">
              <button type="button" data-pd-dec aria-label="Decrease quantity">−</button>
              <span id="pd-qty" aria-live="polite">1</span>
              <button type="button" data-pd-inc aria-label="Increase quantity">+</button>
            </div>
            <button class="add-btn big" type="button" data-add-pd="${p.id}">Add to cart</button>
            <a class="add-btn big wa" id="pd-wa" href="${waProductUrl(p, 1)}" target="_blank" rel="noopener">Buy on WhatsApp</a>
            ${favBtnHTML(p, true)}
          </div>
        </div>
      </div>
      <section class="reviews" id="reviews" aria-labelledby="rev-title"></section>
      ${related.length ? `<h2 class="related-title">More in ${catName(p.cat)}</h2><div class="products">${related.map(cardHTML).join("")}</div>` : ""}`;
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
  const SECTIONS = { home: "#hero", list: "#products", product: "#product", favourites: "#favourites-page", checkout: "#checkout-page", thanks: "#thanks-page" };

  function route() {
    const h = currentHash();
    const mc = h.match(/^#\/c\/([a-z]+)(?:\/([a-z0-9-]+))?$/);
    const mp = h.match(/^#\/p\/(\d+)$/);
    const prod = mp && PRODUCTS.find(p => p.id === +mp[1]);
    if (prod) view = "product";
    else if (mc && CATEGORIES.some(c => c.id === mc[1])) { filter = mc[1]; subSel = (SUBCATS[mc[1]] || []).some(x => x.id === mc[2]) ? mc[2] : ""; view = "list"; }
    else if (h === "#/all") { filter = "all"; subSel = ""; view = "list"; }
    else if (h === "#/favourites") view = "favourites";
    else if (h === "#/checkout") view = "checkout";
    else if (h === "#/thanks") view = "thanks";
    else view = "home";

    if (view === "home") { query = ""; $("#search").value = ""; lastList = null; }
    if (view === "list") { if (lastList !== filter) resetFilters(); lastList = filter; }

    Object.entries(SECTIONS).forEach(([v, sel]) => { $(sel).hidden = v !== view; });
    $("#subnav").hidden = view !== "list";
    setBrandPop(false);
    if (view === "list") { renderChips(); renderSubcats(); buildBrandUI(); renderProducts(); }
    if (view === "product") { renderProduct(prod); renderReviews(prod); }
    if (view === "favourites") renderFavourites();
    if (view === "checkout") renderCheckout();
    if (view === "thanks") renderThanks();
    if (view !== "list") {
      document.title = view === "product" ? prod.name + " – BuyfromGAB"
        : view === "checkout" ? "Checkout – BuyfromGAB"
        : view === "favourites" ? "Favourites – BuyfromGAB"
        : view === "thanks" ? "Order received – BuyfromGAB"
        : "BuyfromGAB – Shop by category";
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => { routeOverride = null; route(); });

  /* ====== Checkout page ====== */
  function cartTotal() { return cartLines().reduce((s, l) => s + l.qty * l.p.price, 0); }

  function renderCheckout() {
    const lines = cartLines();
    const box = $("#checkout-page");
    if (!lines.length) {
      box.innerHTML = `<div class="thanks"><h1 class="page-title">Your cart is empty</h1><p>Add a few products first, then come back to pay.</p><a class="add-btn" href="#/">Browse categories</a></div>`;
      return;
    }
    const total = cartTotal();
    box.innerHTML = `
      <a class="back-link" href="#/all">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        Keep shopping
      </a>
      <h1 class="page-title">Checkout</h1>
      <div class="co">
        <form class="co-form" id="co-form">
          <fieldset class="co-card">
            <legend>Delivery details</legend>
            <label class="field wide">Full name <input name="name" required autocomplete="name"></label>
            <label class="field">Phone number <input name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="024 123 4567"></label>
            <label class="field">Email (optional) <input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
            <label class="field wide">Delivery address <textarea name="address" rows="3" required autocomplete="street-address" placeholder="House number, street, area, city"></textarea></label>
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
          ${lines.map(({ p, qty }) => `<div class="sum-row"><span>${p.name} × ${qty}</span><span>${money(p.price * qty)}</span></div>`).join("")}
          <div class="sum-row sum-total"><span>Total</span><span>${money(total)}</span></div>
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
      "",
      "Items:",
      ...order.items.map(i => "- " + i.qty + " × " + i.name + " (" + money(i.price * i.qty) + ")"),
      "",
      "Total: " + money(order.total),
      "I'd like to pay via WhatsApp."
    ];
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  function waProductUrl(p, qty) {
    const lines = [
      "Hello, I'd like to buy this product:",
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
    let o = lastOrder;
    if (!o) { try { o = JSON.parse(localStorage.getItem("bazaar-last-order") || "null"); } catch (e) {} }
    cart = {}; saveCart(); renderCart();
    const first = o && o.name ? ", " + esc(o.name.split(" ")[0]) : "";
    $("#thanks-page").innerHTML = `
      <div class="thanks">
        <h1 class="page-title">Thank you${first}</h1>
        <p>${o ? "Your order is ready. Send it on WhatsApp so we can confirm it and arrange payment." : "Chat with us on WhatsApp to place an order or ask a question."}</p>
        ${o && o.ref ? `<div class="ref">Order ${esc(o.ref)}</div>` : ""}
        <p><a class="add-btn wa" href="${waUrl(o)}" target="_blank" rel="noopener">${o ? "Send order on WhatsApp" : "Chat on WhatsApp"}</a></p>
        <p>You can also message us on ${WHATSAPP_DISPLAY}.</p>
        <p><a href="#/">Continue shopping</a></p>
      </div>`;
  }

  function showPayError(msg) {
    const el = $("#co-error"); if (!el) return;
    el.textContent = msg; el.hidden = false;
  }

  /* ====== Cart ====== */
  function cartLines() {
    return Object.entries(cart).map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === +id), qty })).filter(l => l.p);
  }
  function renderCart() {
    const lines = cartLines();
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.p.price, 0);
    $("#cart-count").textContent = count;
    $("#cart-total").textContent = money(total);
    $("#checkout").disabled = !lines.length;
    $("#cart-items").innerHTML = lines.length ? lines.map(({ p, qty }) => `
      <li class="cart-row">
        <div class="mini">${p.emoji}</div>
        <div><div class="nm">${p.name}</div><div class="pr">${money(p.price)}</div></div>
        <div class="qty">
          <button type="button" data-dec="${p.id}" aria-label="Remove one ${p.name}">−</button>
          <span>${qty}</span>
          <button type="button" data-inc="${p.id}" aria-label="Add one ${p.name}">+</button>
        </div>
      </li>`).join("")
      : `<li class="cart-empty">Your cart is empty. Add something you like.</li>`;
  }
  function addToCart(id, n = 1) {
    cart[id] = (cart[id] || 0) + n;
    saveCart(); renderCart();
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

  /* ====== Events ====== */
  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip && chip.dataset.filter) { go(chip.dataset.filter === "all" ? "#/all" : "#/c/" + chip.dataset.filter); return; }
    const link = e.target.closest('a[href^="#/"]');
    if (link && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); go(link.getAttribute("href")); return; }
    if (!e.target.closest(".brand-menu")) setBrandPop(false);
    if (e.target.closest("#brands-btn")) { setBrandPop($("#brands-pop").hidden); return; }
    const bo = e.target.closest("[data-brand]");
    if (bo) { brandSel = bo.dataset.brand; setBrandPop(false); syncBrandUI(); renderProducts(); return; }
    const co = e.target.closest("[data-coll]");
    if (co) { collection = collection === co.dataset.coll ? "" : co.dataset.coll; syncBrandUI(); renderProducts(); return; }
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
  $("#close-cart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setBrandPop(false); if ($("#drawer").classList.contains("open")) closeCart(); } });
  $("#search").addEventListener("input", (e) => {
    query = e.target.value;
    if (view === "list") renderProducts();
    else if (query.trim()) go("#/all");
  });
  $("#sort").addEventListener("change", (e) => { sortBy = e.target.value; renderProducts(); });
  $("#min").addEventListener("input", (e) => { minP = e.target.value; renderProducts(); });
  $("#max").addEventListener("input", (e) => { maxP = e.target.value; renderProducts(); });
  $("#min-rating").addEventListener("change", (e) => { minRating = +e.target.value; renderProducts(); });
  $("#brand-filter").addEventListener("change", (e) => { brandSel = e.target.value; syncBrandUI(); renderProducts(); });
  $("#reset-filters").addEventListener("click", () => { resetFilters(); renderProducts(); });
  $("#checkout").addEventListener("click", () => {
    if (!cartLines().length) return;
    closeCart();
    go("#/checkout");
  });
  document.addEventListener("submit", (e) => {
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
    if (e.target.id !== "co-form") return;
    e.preventDefault();
    const lines = cartLines();
    if (!lines.length) return;
    const f = new FormData(e.target);
    const method = f.get("method");
    const chosen = PAYMENT_METHODS.find(m => m.id === method);
    if (!chosen || !chosen.enabled) { showPayError("Choose an available payment option."); return; }
    const order = {
      ref: newRef(),
      method,
      name: String(f.get("name")).trim(),
      phone: String(f.get("phone")).trim(),
      email: String(f.get("email") || "").trim(),
      address: String(f.get("address")).trim(),
      total: cartTotal(),
      items: lines.map(({ p, qty }) => ({ id: p.id, name: p.name, qty, price: p.price }))
    };
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

  /* ====== Theme (light / dark) ====== */
  const ICON_MOON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>`;
  const ICON_SUN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => document.documentElement.getAttribute("data-theme") || (prefersDark.matches ? "dark" : "light");
  function syncThemeButton() {
    const dark = currentTheme() === "dark";
    const b = $("#theme-toggle");
    b.innerHTML = dark ? ICON_SUN : ICON_MOON;
    b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  $("#theme-toggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("bazaar-theme", next); } catch (e) {}
    syncThemeButton();
  });
  prefersDark.addEventListener("change", syncThemeButton);

  /* ====== Init ====== */
  syncThemeButton();
  $("#year").textContent = new Date().getFullYear();
  renderTiles(); renderCart(); route();
