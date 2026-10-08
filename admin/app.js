(() => {
  "use strict";

  const DEMO_EMAIL = "admin@buyfromgab.com";
  const DEMO_PASSWORD = "GabDemo2026!";
  const DATA_KEY = "buyfromgab-admin-demo-data";
  const SESSION_KEY = "buyfromgab-admin-demo-session";
  const money = (amount) => new Intl.NumberFormat(data.settings?.country === "Ghana" ? "en-GH" : "en", { style: "currency", currency: data.settings?.currency || "GHS", maximumFractionDigits: 2 }).format(amount);
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const icons = {
    overview: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
    orders: '<svg viewBox="0 0 24 24"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z"/><path d="m4.5 7.8 7.5 4.4 7.5-4.4M12 12.2V21"/></svg>',
    products: '<svg viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v9"/></svg>',
    customers: '<svg viewBox="0 0 24 24"><path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 11a3.5 3.5 0 0 0 0-7M21 20v-1.6a3.4 3.4 0 0 0-2.6-3.3"/></svg>',
    analytics: '<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    revenue: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M3 3h2l2.2 12h11.9L21 7H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>',
    customersMetric: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5a3.5 3.5 0 0 1 0 6.8M18 14a5.5 5.5 0 0 1 3.5 5"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>'
  };
  const seed = {
    products: [
      { id: "PRD-1001", name: "Wireless Headphones Pro", category: "Electronics", price: 349.99, stock: 28, sold: 124, status: "Active", emoji: "🎧", image: "" },
      { id: "PRD-1002", name: "Classic Building Blocks Set", category: "Toys", price: 189.5, stock: 42, sold: 98, status: "Active", emoji: "🧱", image: "" },
      { id: "PRD-1003", name: "Daily Glow Face Serum", category: "Beauty", price: 125, stock: 6, sold: 87, status: "Active", emoji: "🧴", image: "" },
      { id: "PRD-1004", name: "Cotton Everyday Tee", category: "Clothes", price: 89.99, stock: 0, sold: 76, status: "Active", emoji: "👕", image: "" },
      { id: "PRD-1005", name: "Portable Blender Bottle", category: "Home & kitchen", price: 220, stock: 19, sold: 64, status: "Active", emoji: "🥤", image: "" },
      { id: "PRD-1006", name: "Daily Care Vitamin C", category: "Pharmacy", price: 75, stock: 35, sold: 53, status: "Active", emoji: "💊", image: "" },
      { id: "PRD-1007", name: "Soft Plush Teddy Bear", category: "Toys", price: 145, stock: 3, sold: 41, status: "Active", emoji: "🧸", image: "" },
      { id: "PRD-1008", name: "Smart Watch Series 3", category: "Electronics", price: 499, stock: 12, sold: 38, status: "Active", emoji: "⌚", image: "" },
      { id: "PRD-1009", name: "Hydrating Body Lotion", category: "Beauty", price: 95, stock: 0, sold: 29, status: "Draft", emoji: "🧴", image: "" }
    ],
    orders: [
      { id: "BG-2048", customer: "Ama Mensah", email: "ama.mensah@example.com", items: 3, total: 624.5, status: "Processing", date: "2026-10-08" },
      { id: "BG-2047", customer: "Kofi Asare", email: "kofi.asare@example.com", items: 1, total: 349.99, status: "Paid", date: "2026-10-08" },
      { id: "BG-2046", customer: "Abena Owusu", email: "abena.owusu@example.com", items: 2, total: 234.5, status: "Shipped", date: "2026-10-07" },
      { id: "BG-2045", customer: "Yaw Boateng", email: "yaw.boateng@example.com", items: 4, total: 785, status: "Pending", date: "2026-10-07" },
      { id: "BG-2044", customer: "Akosua Appiah", email: "akosua.appiah@example.com", items: 1, total: 125, status: "Delivered", date: "2026-10-06" },
      { id: "BG-2043", customer: "Kojo Frimpong", email: "kojo.frimpong@example.com", items: 2, total: 409.5, status: "Delivered", date: "2026-10-05" },
      { id: "BG-2042", customer: "Efua Boateng", email: "efua.boateng@example.com", items: 1, total: 220, status: "Cancelled", date: "2026-10-04" },
      { id: "BG-2041", customer: "Kwame Addo", email: "kwame.addo@example.com", items: 3, total: 325, status: "Paid", date: "2026-10-03" },
      { id: "BG-2040", customer: "Esi Arthur", email: "esi.arthur@example.com", items: 2, total: 274.99, status: "Delivered", date: "2026-10-02" }
    ],
    customers: [
      { name: "Ama Mensah", email: "ama.mensah@example.com", phone: "+233 24 123 4567", orders: 8, spent: 2348.5, joined: "2026-04-12", area: "Accra" },
      { name: "Kofi Asare", email: "kofi.asare@example.com", phone: "+233 20 456 7890", orders: 5, spent: 1820, joined: "2026-05-08", area: "Tema" },
      { name: "Abena Owusu", email: "abena.owusu@example.com", phone: "+233 55 234 5678", orders: 4, spent: 965.5, joined: "2026-05-19", area: "Kumasi" },
      { name: "Yaw Boateng", email: "yaw.boateng@example.com", phone: "+233 27 987 6543", orders: 3, spent: 1275, joined: "2026-06-02", area: "Accra" },
      { name: "Akosua Appiah", email: "akosua.appiah@example.com", phone: "+233 24 876 5432", orders: 6, spent: 1987, joined: "2026-06-20", area: "Cape Coast" },
      { name: "Kojo Frimpong", email: "kojo.frimpong@example.com", phone: "+233 50 112 2334", orders: 2, spent: 608.5, joined: "2026-07-11", area: "Accra" },
      { name: "Efua Boateng", email: "efua.boateng@example.com", phone: "+233 26 443 2211", orders: 2, spent: 480, joined: "2026-08-01", area: "Tema" },
      { name: "Kwame Addo", email: "kwame.addo@example.com", phone: "+233 54 667 7889", orders: 4, spent: 1435, joined: "2026-08-21", area: "Kumasi" }
    ],
    settings: { storeName: "BuyfromGAB", email: "hello@buyfromgab.com", phone: "+233 54 535 9058", currency: "GHS", country: "Ghana" }
  };
  let data = loadData();
  let activeView = "overview";
  let toastTimeout;

  function loadData() {
    try {
      const stored = JSON.parse(localStorage.getItem(DATA_KEY) || "null");
      if (stored && Array.isArray(stored.products) && Array.isArray(stored.orders) && Array.isArray(stored.customers)) {
        return { ...seed, ...stored, settings: { ...seed.settings, ...(stored.settings || {}) } };
      }
    } catch (error) {
      console.error("Could not load demo dashboard data.", error);
    }
    return JSON.parse(JSON.stringify(seed));
  }

  function saveData() {
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Could not save demo dashboard data.", error);
      showToast("Could not save changes in this browser.");
      return false;
    }
    return true;
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
  }

  function formatDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-GH", options).format(date);
  }

  function statusClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }

  function statusPill(status) {
    return `<span class="status-pill ${statusClass(status)}">${escapeHTML(status)}</span>`;
  }

  function avatar(name, index = 0) {
    const colors = ["", "coral", "mint", "blue"];
    return `<span class="mini-avatar ${colors[index % colors.length]}">${escapeHTML(initials(name))}</span>`;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2600);
  }

  function renderIcons() {
    $$("[data-icon]").forEach((element) => { element.innerHTML = icons[element.dataset.icon] || ""; });
  }

  function renderShell() {
    const loggedIn = sessionStorage.getItem(SESSION_KEY) === "true";
    $("#login-screen").hidden = loggedIn;
    $("#app-shell").hidden = !loggedIn;
    if (loggedIn) renderView(activeView);
  }

  function setView(view) {
    activeView = view;
    $$(".nav-item[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    $("#page-crumb").textContent = ({ overview: "Overview", orders: "Orders", products: "Products", customers: "Customers", analytics: "Analytics", settings: "Settings" })[view] || "Overview";
    $("#sidebar").classList.remove("open");
    $("#sidebar-scrim").classList.remove("visible");
    renderView(view);
  }

  function heading(title, subtitle, actions = "") {
    return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
  }

  function metricCard(title, value, trend, description, icon, tone = "") {
    const trendClass = trend.startsWith("-") ? "trend-down" : "trend-up";
    return `<article class="metric-card"><div class="metric-top"><span>${title}</span><span class="metric-icon ${tone}">${icons[icon]}</span></div><div class="metric-value">${value}</div><div class="metric-foot"><span class="${trendClass}">${trend}</span><span>${description}</span></div></article>`;
  }

  function chartSVG() {
    const values = [32, 44, 38, 60, 54, 72, 65, 89, 76, 102, 91, 116];
    const max = 125;
    const points = values.map((value, index) => `${40 + index * 43},${190 - value / max * 155}`).join(" ");
    const area = `40,190 ${points} 513,190`;
    const labels = ["Sep 10", "Sep 14", "Sep 18", "Sep 22", "Sep 26", "Sep 30", "Oct 04", "Oct 08"];
    return `<svg class="revenue-chart" viewBox="0 0 540 225" role="img" aria-label="Revenue line chart over the last 30 days">
      <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#8a70ed" stop-opacity=".22"/><stop offset="100%" stop-color="#8a70ed" stop-opacity="0"/></linearGradient></defs>
      <line class="chart-grid-line" x1="40" y1="35" x2="525" y2="35"/><line class="chart-grid-line" x1="40" y1="75" x2="525" y2="75"/><line class="chart-grid-line" x1="40" y1="115" x2="525" y2="115"/><line class="chart-grid-line" x1="40" y1="155" x2="525" y2="155"/><line class="chart-grid-line" x1="40" y1="190" x2="525" y2="190"/>
      <text class="chart-label" x="2" y="38">GHS 1.2k</text><text class="chart-label" x="8" y="78">GHS 900</text><text class="chart-label" x="8" y="118">GHS 600</text><text class="chart-label" x="8" y="158">GHS 300</text><text class="chart-label" x="22" y="193">0</text>
      <polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/>
      ${values.map((value, index) => `<circle class="chart-point" cx="${40 + index * 43}" cy="${190 - value / max * 155}" r="${index === values.length - 1 ? 4 : 2.5}"/>`).join("")}
      ${labels.map((label, index) => `<text class="chart-label" x="${40 + index * 69}" y="213" text-anchor="middle">${label}</text>`).join("")}
    </svg>`;
  }

  function orderDonut() {
    const total = data.orders.length;
    const counts = [
      { name: "Delivered", color: "#20a779", count: data.orders.filter((order) => order.status === "Delivered").length },
      { name: "Processing", color: "#eea43c", count: data.orders.filter((order) => ["Processing", "Pending"].includes(order.status)).length },
      { name: "Shipped", color: "#5499dc", count: data.orders.filter((order) => order.status === "Shipped").length },
      { name: "Cancelled", color: "#dd7478", count: data.orders.filter((order) => order.status === "Cancelled").length }
    ];
    let offset = 0;
    const circles = counts.map((item) => {
      const length = total ? item.count / total * 251 : 0;
      const circle = `<circle cx="70" cy="70" r="40" fill="none" stroke="${item.color}" stroke-width="13" stroke-dasharray="${length} ${251 - length}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"/>`;
      offset += length;
      return circle;
    }).join("");
    return `<svg class="donut-chart" viewBox="0 0 140 140" role="img" aria-label="${total} orders by status">${circles}<circle class="donut-center" cx="70" cy="70" r="30"/><text class="donut-center-text" x="70" y="72">${total}</text><text class="donut-center-label" x="70" y="87">ORDERS</text></svg>`;
  }

  function recentOrderRows(orders) {
    return orders.slice(0, 5).map((order, index) => `<tr>
      <td><span class="order-id">#${escapeHTML(order.id)}</span></td>
      <td><span class="customer-cell">${avatar(order.customer, index)}${escapeHTML(order.customer)}</span></td>
      <td>${order.items} item${order.items === 1 ? "" : "s"}</td>
      <td class="cell-strong">${money(order.total)}</td>
      <td>${statusPill(order.status)}</td>
      <td>${formatDate(order.date, { month: "short", day: "numeric" })}</td>
    </tr>`).join("");
  }

  function activityItems() {
    const order = data.orders[0];
    const product = data.products.find((item) => item.stock <= 6);
    const customer = data.customers[0];
    return `<div class="activity-list">
      <div class="activity-item"><span class="activity-dot"></span><div class="activity-copy"><strong>New order received</strong><br>${order ? `Order #${escapeHTML(order.id)} from ${escapeHTML(order.customer)}` : "Your latest order activity will appear here."}<small>Just now · Orders</small></div></div>
      <div class="activity-item"><span class="activity-dot orange"></span><div class="activity-copy"><strong>Inventory needs attention</strong><br>${product ? `${escapeHTML(product.name)} has only ${product.stock} left` : "All product stock levels look good"}<small>Inventory · Products</small></div></div>
      <div class="activity-item"><span class="activity-dot green"></span><div class="activity-copy"><strong>New customer joined</strong><br>${customer ? escapeHTML(customer.name) : "Your customer list is ready"}<small>This week · Customers</small></div></div>
    </div>`;
  }

  function renderOverview() {
    const revenue = data.orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
    const pending = data.orders.filter((order) => ["Pending", "Processing"].includes(order.status)).length;
    const lowStock = data.products.filter((product) => product.stock <= 6 && product.status === "Active").length;
    $("#pending-count").textContent = pending;
    const actions = `<span class="date-chip">◷ &nbsp;Last 30 days &nbsp;⌄</span><button class="primary-button compact" data-action="add-product">＋ Add product</button>`;
    const recent = [...data.orders].sort((a, b) => b.date.localeCompare(a.date));
    const deliveredTotal = data.orders.filter((order) => order.status === "Delivered").length;
    const topProducts = [...data.products].sort((a, b) => b.sold - a.sold).slice(0, 4);
    $("#page-content").innerHTML = `${heading("Good morning, Gabriella 👋", "Here’s what’s happening with your store today.", actions)}
      <div class="metric-grid">
        ${metricCard("Total revenue", money(revenue), "+12.8%", "vs. previous 30 days", "revenue")}
        ${metricCard("Total orders", String(data.orders.length), "+8.2%", "vs. previous 30 days", "bag", "green")}
        ${metricCard("Products sold", String(data.products.reduce((sum, product) => sum + product.sold, 0)), "+5.4%", "vs. previous 30 days", "cart", "orange")}
        ${metricCard("Customers", String(data.customers.length), "+3.1%", "vs. previous 30 days", "customersMetric", "blue")}
      </div>
      <div class="chart-layout">
        <section class="panel"><div class="panel-heading"><div><h2>Revenue over time</h2><p>Daily sales performance · Last 30 days</p></div><select class="select-control" aria-label="Revenue period" id="chart-period"><option>Last 30 days</option><option>Last 7 days</option><option>This year</option></select></div><div class="chart-wrap">${chartSVG()}</div></section>
        <section class="panel donut-panel"><div class="panel-heading"><div><h2>Orders by status</h2><p>A snapshot of your order fulfilment</p></div></div><div class="donut-area">${orderDonut()}<div class="legend">${[
          { name: "Delivered", color: "#20a779", count: deliveredTotal },
          { name: "Processing", color: "#eea43c", count: pending },
          { name: "Shipped", color: "#5499dc", count: data.orders.filter((order) => order.status === "Shipped").length },
          { name: "Cancelled", color: "#dd7478", count: data.orders.filter((order) => order.status === "Cancelled").length }
        ].map((item) => `<div class="legend-row"><span class="legend-dot" style="background:${item.color}"></span>${item.name}<strong>${item.count}</strong></div>`).join("")}</div></div></section>
      </div>
      <div class="lower-grid">
        <section class="panel table-panel"><div class="panel-heading"><div><h2>Recent orders</h2><p>Keep an eye on your latest orders</p></div><button class="text-link" data-view-link="orders" type="button">View all orders →</button></div>
          <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>${recent.length ? recentOrderRows(recent) : `<tr><td colspan="6"><div class="empty-state">No orders yet.</div></td></tr>`}</tbody></table></div>
        </section>
        <section class="panel"><div class="panel-heading"><div><h2>Store activity</h2><p>${lowStock ? `${lowStock} product${lowStock === 1 ? "" : "s"} need attention` : "Your latest store updates"}</p></div></div>${activityItems()}</section>
      </div>`;
  }

  function renderOrders() {
    const query = ($("#orders-search")?.value || "").trim().toLowerCase();
    const status = $("#orders-filter")?.value || "All status";
    const orders = [...data.orders].sort((a, b) => b.date.localeCompare(a.date)).filter((order) => {
      const matchesText = !query || [order.id, order.customer, order.email].some((value) => value.toLowerCase().includes(query));
      return matchesText && (status === "All status" || order.status === status);
    });
    const body = orders.map((order, index) => `<tr>
      <td><span class="order-id">#${escapeHTML(order.id)}</span></td>
      <td><span class="customer-cell">${avatar(order.customer, index)}<span>${escapeHTML(order.customer)}<small style="display:block;margin-top:3px;color:#9ba3af;font-size:9px;font-weight:400">${escapeHTML(order.email)}</small></span></span></td>
      <td>${order.items} item${order.items === 1 ? "" : "s"}</td><td class="cell-strong">${money(order.total)}</td><td>${formatDate(order.date)}</td>
      <td><select class="inline-status" data-order-status="${escapeHTML(order.id)}" aria-label="Update order ${escapeHTML(order.id)} status">${["Pending", "Processing", "Paid", "Shipped", "Delivered", "Cancelled"].map((option) => `<option${order.status === option ? " selected" : ""}>${option}</option>`).join("")}</select></td>
    </tr>`).join("");
    $("#page-content").innerHTML = `${heading("Orders", "View, manage, and fulfil your customer orders.", `<button class="secondary-button compact export-button" data-action="export-orders">↓ &nbsp;Export orders</button>`)}
      <section class="panel table-panel page-panel"><div class="panel-heading"><div><h2>All orders <span style="color:#9ba3af;font-weight:500">(${orders.length})</span></h2><p>Update an order's status as it moves through fulfilment.</p></div></div>
      <div class="toolbar" style="padding:14px 15px"><label class="search-control">${icons.search}<input id="orders-search" type="search" placeholder="Search order or customer" value="${escapeHTML(query)}"></label><select class="select-control" id="orders-filter" aria-label="Filter orders by status"><option>All status</option>${["Pending", "Processing", "Paid", "Shipped", "Delivered", "Cancelled"].map((option) => `<option${status === option ? " selected" : ""}>${option}</option>`).join("")}</select><span class="toolbar-spacer"></span><span class="date-chip">◷ &nbsp;All time</span></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Order date</th><th>Status</th></tr></thead><tbody>${body || `<tr><td colspan="6"><div class="empty-state">No orders match your search.</div></td></tr>`}</tbody></table></div><div class="table-pagination">Showing ${orders.length ? 1 : 0}–${orders.length} of ${orders.length} orders <span>Demo data · all orders shown</span></div></section>`;
  }

  function renderProducts() {
    const query = ($("#products-search")?.value || "").trim().toLowerCase();
    const filter = $("#products-filter")?.value || "All categories";
    const products = data.products.filter((product) => (!query || `${product.name} ${product.id} ${product.category}`.toLowerCase().includes(query)) && (filter === "All categories" || product.category === filter));
    const rows = products.map((product) => {
      const stockStatus = product.stock === 0 ? statusPill("Out of stock") : product.stock <= 6 ? `<span class="status-pill pending">${product.stock} left</span>` : `<span style="color:#586474">${product.stock} in stock</span>`;
      return `<tr><td><div class="product-info"><span class="product-thumb">${product.image ? `<img src="${escapeHTML(product.image)}" alt="">` : product.emoji || "📦"}</span><span><strong>${escapeHTML(product.name)}</strong><small>${escapeHTML(product.id)}</small></span></div></td><td>${escapeHTML(product.category)}</td><td class="cell-strong">${money(product.price)}</td><td>${stockStatus}</td><td>${product.sold.toLocaleString("en-GH")}</td><td>${statusPill(product.status)}</td><td><div class="table-actions"><button class="small-action" type="button" data-edit-product="${escapeHTML(product.id)}">Edit</button><button class="small-action danger" type="button" data-delete-product="${escapeHTML(product.id)}">Delete</button></div></td></tr>`;
    }).join("");
    $("#page-content").innerHTML = `${heading("Products", "Manage your catalog, pricing, and inventory.", `<button class="primary-button compact" data-action="add-product">＋ Add product</button>`)}
      <section class="panel table-panel page-panel"><div class="toolbar" style="padding:14px 15px"><label class="search-control">${icons.search}<input id="products-search" type="search" placeholder="Search products" value="${escapeHTML(query)}"></label><select class="select-control" id="products-filter" aria-label="Filter products by category"><option>All categories</option>${["Toys", "Electronics", "Pharmacy", "Clothes", "Beauty", "Home & kitchen"].map((category) => `<option${filter === category ? " selected" : ""}>${category}</option>`).join("")}</select><span class="toolbar-spacer"></span><span class="date-chip">${products.length} products</span></div>
      <div class="data-table-wrap"><table class="data-table products-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Inventory</th><th>Sold</th><th>Status</th><th><span class="sr-only">Actions</span></th></tr></thead><tbody>${rows || `<tr><td colspan="7"><div class="empty-state">No products match your search.</div></td></tr>`}</tbody></table></div><div class="table-pagination">Showing ${products.length} of ${data.products.length} products <span>Inventory is stored in this browser</span></div></section>`;
  }

  function renderCustomers() {
    const query = ($("#customers-search")?.value || "").trim().toLowerCase();
    const customers = data.customers.filter((customer) => `${customer.name} ${customer.email} ${customer.area}`.toLowerCase().includes(query));
    const spent = data.customers.reduce((sum, customer) => sum + customer.spent, 0);
    const repeat = data.customers.filter((customer) => customer.orders > 1).length;
    const rows = customers.map((customer, index) => `<tr><td><span class="customer-cell">${avatar(customer.name, index)}<span>${escapeHTML(customer.name)}<small style="display:block;margin-top:3px;color:#9ba3af;font-size:9px;font-weight:400">${escapeHTML(customer.email)}</small></span></span></td><td>${escapeHTML(customer.phone)}</td><td>${escapeHTML(customer.area)}</td><td>${customer.orders}</td><td class="cell-strong">${money(customer.spent)}</td><td>${formatDate(customer.joined, { month: "short", day: "numeric", year: "numeric" })}</td></tr>`).join("");
    $("#page-content").innerHTML = `${heading("Customers", "Get to know the people shopping with your store.")}
      <div class="customer-cards"><article class="customer-card"><span>Total customers</span><strong>${data.customers.length}</strong></article><article class="customer-card"><span>Repeat customers</span><strong>${repeat}</strong></article><article class="customer-card"><span>Customer lifetime spend</span><strong>${money(spent)}</strong></article><article class="customer-card"><span>Average per customer</span><strong>${money(data.customers.length ? spent / data.customers.length : 0)}</strong></article></div>
      <section class="panel table-panel"><div class="toolbar" style="padding:14px 15px"><label class="search-control">${icons.search}<input id="customers-search" type="search" placeholder="Search customers" value="${escapeHTML(query)}"></label><span class="toolbar-spacer"></span><span class="date-chip">${customers.length} customers</span></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Customer</th><th>Phone</th><th>Location</th><th>Orders</th><th>Total spent</th><th>Joined</th></tr></thead><tbody>${rows || `<tr><td colspan="6"><div class="empty-state">No customers match your search.</div></td></tr>`}</tbody></table></div></section>`;
  }

  function renderAnalytics() {
    const revenue = data.orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
    const avgOrder = data.orders.length ? revenue / data.orders.filter((order) => order.status !== "Cancelled").length : 0;
    const top = [...data.products].sort((a, b) => b.sold - a.sold).slice(0, 6);
    $("#page-content").innerHTML = `${heading("Analytics", "Understand sales performance and product demand.", `<span class="date-chip">◷ &nbsp;Last 30 days &nbsp;⌄</span>`)}
      <div class="metric-grid">${metricCard("Gross sales", money(revenue), "+12.8%", "vs. previous period", "revenue")}${metricCard("Orders", String(data.orders.length), "+8.2%", "vs. previous period", "bag", "green")}${metricCard("Average order value", money(avgOrder), "+4.6%", "vs. previous period", "cart", "orange")}${metricCard("Conversion rate", "3.24%", "+0.6%", "vs. previous period", "analytics", "blue")}</div>
      <div class="analytics-grid"><section class="panel"><div class="panel-heading"><div><h2>Sales trend</h2><p>Revenue movement through the month</p></div></div><div class="chart-wrap" style="height:290px">${chartSVG()}</div></section>
      <section class="panel"><div class="panel-heading"><div><h2>Top products</h2><p>By units sold</p></div></div><div class="top-products">${top.map((product, index) => `<div class="top-product"><span class="top-product-rank">0${index + 1}</span><span class="top-product-name">${escapeHTML(product.name)}<small>${escapeHTML(product.category)} · ${product.sold} sold</small></span><span class="top-product-total">${money(product.sold * product.price)}</span></div>`).join("")}</div></section></div>
      <section class="panel table-panel"><div class="panel-heading"><div><h2>Sales by category</h2><p>Catalog sales summary</p></div></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Category</th><th>Products</th><th>Units sold</th><th>Sales value</th></tr></thead><tbody>${["Toys", "Electronics", "Pharmacy", "Clothes", "Beauty", "Home & kitchen"].map((category) => { const items = data.products.filter((product) => product.category === category); const units = items.reduce((sum, product) => sum + product.sold, 0); return `<tr><td class="cell-strong">${category}</td><td>${items.length}</td><td>${units}</td><td class="cell-strong">${money(items.reduce((sum, product) => sum + product.price * product.sold, 0))}</td></tr>`; }).join("")}</tbody></table></div></section>`;
  }

  function renderSettings() {
    const settings = data.settings;
    $("#page-content").innerHTML = `${heading("Settings", "Manage your store details and demo workspace preferences.")}
      <div class="settings-layout"><form id="settings-form" class="panel settings-form"><h2>Store details</h2><p>These details are saved only in your browser demo.</p>
        <label class="form-field">Store name<input name="storeName" required maxlength="80" value="${escapeHTML(settings.storeName)}"></label>
        <label class="form-field">Customer care email<input name="email" type="email" required value="${escapeHTML(settings.email)}"></label>
        <label class="form-field">Customer care phone<input name="phone" required value="${escapeHTML(settings.phone)}"></label>
        <div class="form-row"><label class="form-field">Currency<select name="currency"><option${settings.currency === "GHS" ? " selected" : ""}>GHS</option><option${settings.currency === "USD" ? " selected" : ""}>USD</option><option${settings.currency === "GBP" ? " selected" : ""}>GBP</option></select></label><label class="form-field">Country<input name="country" required value="${escapeHTML(settings.country)}"></label></div>
        <button class="primary-button" type="submit">Save store details</button>
      </form><aside class="demo-card"><h3>Demo workspace</h3><p>This dashboard uses sample data and a local browser-only demo login. Store changes do not reach the live storefront or a server.</p><p>To clear demo changes and restore the original sample data, use the reset action below.</p><button class="secondary-button compact" type="button" data-action="reset-demo">Reset demo data</button></aside></div>`;
  }

  function renderView(view) {
    renderIcons();
    if (view === "overview") renderOverview();
    else if (view === "orders") renderOrders();
    else if (view === "products") renderProducts();
    else if (view === "customers") renderCustomers();
    else if (view === "analytics") renderAnalytics();
    else if (view === "settings") renderSettings();
  }

  function openProductDialog(product) {
    const dialog = $("#product-dialog");
    const form = $("#product-form");
    form.reset();
    form.elements.productId.value = product?.id || "";
    if (product) {
      form.elements.name.value = product.name;
      form.elements.category.value = product.category;
      form.elements.price.value = product.price;
      form.elements.stock.value = product.stock;
      form.elements.status.value = product.status;
      form.elements.image.value = product.image || "";
      $("#product-dialog-title").textContent = "Edit product";
    } else {
      form.elements.status.value = "Active";
      $("#product-dialog-title").textContent = "Add product";
    }
    dialog.showModal();
    form.elements.name.focus();
  }

  function exportCSV(filename, rows) {
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function handleClick(event) {
    const nav = event.target.closest("[data-view]");
    if (nav) { setView(nav.dataset.view); return; }
    const viewLink = event.target.closest("[data-view-link]");
    if (viewLink) { setView(viewLink.dataset.viewLink); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "logout") {
      sessionStorage.removeItem(SESSION_KEY);
      renderShell();
      return;
    }
    if (action === "add-product") { openProductDialog(); return; }
    if (action === "export-orders") {
      exportCSV("buyfromgab-orders.csv", [["Order", "Customer", "Email", "Items", "Total (GHS)", "Status", "Date"], ...data.orders.map((order) => [order.id, order.customer, order.email, order.items, order.total, order.status, order.date])]);
      showToast("Orders exported to CSV.");
      return;
    }
    if (action === "reset-demo") {
      if (window.confirm("Reset all dashboard demo changes and restore the sample data?")) {
        data = JSON.parse(JSON.stringify(seed));
        saveData();
        setView("settings");
        showToast("Demo data has been reset.");
      }
      return;
    }
    const editButton = event.target.closest("[data-edit-product]");
    if (editButton) {
      const product = data.products.find((item) => item.id === editButton.dataset.editProduct);
      if (product) openProductDialog(product);
      return;
    }
    const deleteButton = event.target.closest("[data-delete-product]");
    if (deleteButton) {
      const product = data.products.find((item) => item.id === deleteButton.dataset.deleteProduct);
      if (product && window.confirm(`Delete "${product.name}" from the demo catalog?`)) {
        data.products = data.products.filter((item) => item.id !== product.id);
        if (saveData()) { renderProducts(); showToast("Product deleted."); }
      }
      return;
    }
    if (event.target.closest("[data-close-dialog]")) $("#product-dialog").close();
    if (event.target.closest("#mobile-menu")) {
      $("#sidebar").classList.add("open");
      $("#sidebar-scrim").classList.add("visible");
    }
    if (event.target.closest("#sidebar-scrim")) {
      $("#sidebar").classList.remove("open");
      $("#sidebar-scrim").classList.remove("visible");
    }
  }

  function handleSubmit(event) {
    if (event.target.id === "login-form") {
      event.preventDefault();
      const form = new FormData(event.target);
      const valid = form.get("email") === DEMO_EMAIL && form.get("password") === DEMO_PASSWORD;
      if (!valid) {
        $("#login-error").textContent = "Those demo credentials don’t match. Please use the credentials shown below.";
        $("#login-error").hidden = false;
        return;
      }
      $("#login-error").hidden = true;
      sessionStorage.setItem(SESSION_KEY, "true");
      renderShell();
      return;
    }
    if (event.target.id === "product-form") {
      event.preventDefault();
      const form = new FormData(event.target);
      const existing = data.products.find((product) => product.id === form.get("productId"));
      const name = String(form.get("name") || "").trim();
      if (!name) return;
      const product = {
        id: existing?.id || `PRD-${Date.now().toString().slice(-6)}`,
        name,
        category: String(form.get("category")),
        price: Number(form.get("price")),
        stock: Number(form.get("stock")),
        status: String(form.get("status")),
        image: String(form.get("image") || "").trim(),
        sold: existing?.sold || 0,
        emoji: existing?.emoji || "📦"
      };
      if (existing) data.products = data.products.map((item) => item.id === existing.id ? product : item);
      else data.products.unshift(product);
      if (saveData()) {
        $("#product-dialog").close();
        renderView(activeView);
        showToast(existing ? "Product updated." : "Product added to catalog.");
      }
      return;
    }
    if (event.target.id === "settings-form") {
      event.preventDefault();
      const form = new FormData(event.target);
      data.settings = Object.fromEntries(["storeName", "email", "phone", "currency", "country"].map((key) => [key, String(form.get(key)).trim()]));
      if (saveData()) showToast("Store details saved.");
    }
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", (event) => {
    if (event.target.id === "orders-search") {
      const value = event.target.value;
      renderOrders();
      $("#orders-search").focus();
      $("#orders-search").setSelectionRange(value.length, value.length);
    }
    if (event.target.id === "products-search") {
      const value = event.target.value;
      renderProducts();
      $("#products-search").focus();
      $("#products-search").setSelectionRange(value.length, value.length);
    }
    if (event.target.id === "customers-search") {
      const value = event.target.value;
      renderCustomers();
      $("#customers-search").focus();
      $("#customers-search").setSelectionRange(value.length, value.length);
    }
  });
  document.addEventListener("change", (event) => {
    if (event.target.id === "orders-filter") { renderOrders(); return; }
    if (event.target.id === "products-filter") { renderProducts(); return; }
    const orderId = event.target.dataset.orderStatus;
    if (orderId) {
      const order = data.orders.find((item) => item.id === orderId);
      if (order) {
        order.status = event.target.value;
        if (saveData()) { renderOrders(); $("#pending-count").textContent = data.orders.filter((item) => ["Pending", "Processing"].includes(item.status)).length; showToast(`Order #${order.id} updated.`); }
      }
    }
  });
  $$("[data-password-toggle]").forEach((button) => button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.textContent = visible ? "Hide" : "Show";
    button.setAttribute("aria-label", visible ? "Hide password" : "Show password");
  }));
  $("#current-year").textContent = new Date().getFullYear();
  renderIcons();
  renderShell();
})();
