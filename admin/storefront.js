(() => {
  "use strict";
  const cms = window.StoreContent, $ = s => document.querySelector(s);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  let doc, draftVersion = 0, publishedVersion = 0, dirty = false, busy = false;
  let section = ["homepage", "categories", "banners", "promotions", "products", "typography"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "homepage";
  let productIndex = 0, bannerIndex = 0, query = "";
  const get = path => path.split(".").reduce((value, part) => value?.[part], doc);
  function set(path, value) {
    const parts = path.split("."), field = parts.pop();
    const target = parts.reduce((item, part) => item[part], doc);
    target[field] = value; dirty = true;
    status("Unsaved changes. Save a draft to preview, or publish when ready.");
  }
  function status(message, error = false) {
    $("#editor-status").textContent = message;
    $("#editor-status").classList.toggle("error", error);
  }
  function field(label, path, type = "text", options = "") {
    const value = get(path) ?? "";
    return `<label class="form-field">${esc(label)}${type === "textarea" ? `<textarea data-bind="${path}">${esc(value)}</textarea>` : `<input type="${type}" data-bind="${path}" value="${esc(value)}" ${options}>`}</label>`;
  }
  const check = (label, path) => `<label class="editor-check"><input type="checkbox" data-bind="${path}" ${get(path) ? "checked" : ""}>${esc(label)}</label>`;
  function select(label, path, values) {
    return `<label class="form-field">${esc(label)}<select data-bind="${path}">${values.map(([value, name]) => `<option value="${esc(value)}" ${get(path) === value ? "selected" : ""}>${esc(name)}</option>`).join("")}</select></label>`;
  }
  function imageField(label, path, dimensions = "") {
    const source = cms.image(get(path));
    const crop = /(?:fullImage|mobileImage|\.img)$/.test(path) && dimensions.match(/(\d+)\s*×\s*(\d+)/);
    const cropAttributes = crop ? `data-crop-width="${crop[1]}" data-crop-height="${crop[2]}"` : "";
    return `<div class="editor-image">${source ? `<img src="${esc(source)}" alt="${esc(label)} preview">` : ""}<div><label class="form-field">Upload ${esc(label.toLowerCase())}${crop ? " & crop" : ""}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" data-upload="${path}" ${cropAttributes}></label>${dimensions ? `<p class="image-dimensions">${crop ? "Crop output" : "Recommended"}: <strong>${esc(dimensions)}</strong></p>` : ""}<label class="form-field">Or paste an image URL<input type="url" data-bind="${path}" value="${source.startsWith("data:") ? "" : esc(source)}" placeholder="${source.startsWith("data:") ? "Uploaded image · paste a URL to replace" : "https://…"}"></label><small>PNG, JPG, WebP, GIF or AVIF · ${crop ? "Source up to 20 MB; " : ""}${cms.remote ? "5 MB" : "1 MB in local mode"} ${crop ? "saved image" : "maximum"}</small>${source ? `<button type="button" class="small-action" data-clear-image="${path}">Remove image</button>` : ""}</div></div>`;
  }
  function fullDesignControls(path, type) {
    const item = get(path), category = type === "category";
    const desktop = category ? item.wide ? "1800 × 600 px (3:1)" : "900 × 600 px (3:2)" : type === "banner" ? "1600 × 400 px (4:1)" : "1200 × 600 px (2:1)";
    const mobile = category ? item.wide ? "1600 × 800 px (2:1)" : "800 × 800 px (1:1)" : "800 × 400 px (2:1)";
    return `<div class="full-design-settings"><p class="image-design-note">Upload your finished design, then drag and zoom it inside the crop frame. Applying a desktop design automatically replaces the website’s text and artwork overlays.</p>${imageField("Desktop design", path + ".fullImage", desktop)}${imageField("Mobile design (optional)", path + ".mobileImage", mobile)}${check("Use the complete design instead of the standard layout", path + ".fullImageMode")}</div>`;
  }
  function sectionHead(title, text, action = "") {
    return `<div class="editor-section-head"><div><h2>${title}</h2><p>${text}</p></div>${action}</div>`;
  }
  function reorder(collection, index, count) {
    return `<div class="editor-row-actions"><button type="button" class="secondary-button" data-move="${collection}:${index}:-1" ${index === 0 ? "disabled" : ""}>↑ Move up</button><button type="button" class="secondary-button" data-move="${collection}:${index}:1" ${index === count - 1 ? "disabled" : ""}>↓ Move down</button></div>`;
  }
  function bannerPreview(path) {
    const banner = get(path);
    if (banner.fullImageMode && banner.fullImage) return `<div class="banner-preview complete-design-preview"><img src="${esc(cms.image(banner.fullImage))}" alt="Complete design preview"></div>`;
    return `<div class="banner-preview" data-preview="${path}" style="background-color:${esc(banner.color)}">${banner.left ? `<img src="${esc(cms.image(banner.left))}" alt="">` : ""}<div><strong>${esc(banner.title)}</strong><p>${esc(banner.subtitle || "")}</p></div>${banner.right || banner.image ? `<img src="${esc(cms.image(banner.right || banner.image))}" alt="">` : ""}</div>`;
  }
  function promisesEditor() {
    return `<div class="editor-panel"><h2>Your store promises</h2><p>Edit the delivery, returns, support and payment messages shown below the category collection.</p>${check("Show the store promises section", "homepage.showBenefits")}<div class="promise-editors">${doc.homepage.promises.map((promise, i) => {
      const path = `homepage.promises.${i}`;
      return `<section class="promise-editor" aria-label="Promise ${i + 1}"><span class="editor-number">Promise ${i + 1}</span><div class="promise-preview" data-promise-preview="${i}">${cms.promiseIcon(promise.icon)}<span><strong>${esc(promise.title)}</strong><small>${esc(promise.text)}</small></span></div>${field("Title", path + ".title", "text", 'maxlength="80"')}${field("Supporting text", path + ".text", "text", 'maxlength="160"')}<fieldset class="promise-icon-picker"><legend>Choose an icon</legend><div>${Object.entries(cms.promiseIcons).map(([key, icon]) => `<button type="button" data-promise-icon="${i}:${key}" aria-pressed="${promise.icon === key}">${cms.promiseIcon(key)}<span>${esc(icon.label)}</span></button>`).join("")}</div></fieldset>${check("Show this promise", path + ".visible")}</section>`;
    }).join("")}</div></div>`;
  }
  function updatePromisePreviews() {
    document.querySelectorAll("[data-promise-preview]").forEach(preview => {
      const promise = doc.homepage.promises[Number(preview.dataset.promisePreview)];
      preview.innerHTML = `${cms.promiseIcon(promise.icon)}<span><strong>${esc(promise.title)}</strong><small>${esc(promise.text)}</small></span>`;
      preview.classList.toggle("is-hidden", !promise.visible);
    });
    document.querySelectorAll("[data-promise-icon]").forEach(button => {
      const [i, icon] = button.dataset.promiseIcon.split(":");
      button.setAttribute("aria-pressed", String(doc.homepage.promises[Number(i)].icon === icon));
    });
  }
  function render() {
    if (!doc.typography) doc.typography = {};
    for (const key of Object.keys(cms.typographyGroups)) if (!doc.typography[key]) doc.typography[key] = {};
    if (doc.homepage.promises === undefined) doc.homepage.promises = cms.defaultPromises();
    if (doc.homepage.socials === undefined) doc.homepage.socials = { facebook: "", instagram: "", twitter: "", youtube: "" };
    document.querySelectorAll("[data-section]").forEach(button => {
      if (button.dataset.section === section) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    let html = "";
    if (section === "typography") html = sectionHead("Font sizes, grouped your way", "Adjust each group separately for desktop and mobile. Leave a size blank to keep the original responsive design.", '<button type="button" class="secondary-button" data-reset-fonts>Reset all sizes</button>') + '<div class="editor-panel"><p>Sizes are in pixels (10–72). Save a draft and use Preview to review the actual storefront before publishing. Text inside uploaded designs is part of the image and is edited in your design file.</p></div>' + Object.entries(cms.typographyGroups).map(([key, group]) => `<div class="editor-panel"><h2>${esc(group.label)}</h2><div class="editor-grid">${field("Desktop size (px)", `typography.${key}.desktop`, "number", `min="10" max="72" step="1" placeholder="Auto (example ${group.desktop})"`)}${field("Mobile size (px)", `typography.${key}.mobile`, "number", `min="10" max="72" step="1" placeholder="Auto (example ${group.mobile})"`)}</div><p class="font-size-sample" data-font-sample="${key}">Your ${esc(group.label.toLowerCase())}</p><button type="button" class="small-action" data-reset-font="${key}">Reset this group</button></div>`).join("");
    if (section === "homepage") html = sectionHead("The first impression", "Shape the words that welcome customers into your store.") + `<div class="editor-panel">${field("Main heading", "homepage.title")}${field("Introduction", "homepage.subtitle", "textarea")}${field("Small heading above the title", "homepage.kicker")}</div>${promisesEditor()}<div class="editor-panel"><h2>Footer & updates</h2>${field("Updates heading", "homepage.newsletterTitle")}${field("Updates description", "homepage.newsletterText", "textarea")}${field("About the store", "homepage.footerText", "textarea")}</div><div class="editor-panel"><h2>Social media links</h2><p>Icons appear beside WhatsApp in the footer. Add your profile links to make them clickable; leave a link blank to show its icon without a link.</p>${field("Facebook profile URL", "homepage.socials.facebook", "url")}${field("Instagram profile URL", "homepage.socials.instagram", "url")}${field("X (Twitter) profile URL", "homepage.socials.twitter", "url")}${field("YouTube channel URL", "homepage.socials.youtube", "url")}</div>`;
    if (section === "categories") html = sectionHead("A colourful collection", "Edit category names, artwork, colours and their order. Hidden categories and their products disappear from the storefront.") + doc.categories.map((c, i) => `<div class="editor-panel"><span class="editor-number">Category ${i + 1} · ${esc(c.id)}</span><div class="editor-grid"><div>${field("Category name", `categories.${i}.name`)}${field("Background colour", `categories.${i}.color`, "color")}${field("Button label (optional)", `categories.${i}.cta`)}${check("Visible in store", `categories.${i}.visible`)}${check("Wide homepage tile", `categories.${i}.wide`)}</div><div>${fullDesignControls(`categories.${i}`, "category")}${!c.fullImageMode ? imageField("Category artwork", `categories.${i}.image`, "600 × 600 px, transparent background") : ""}</div></div>${reorder("categories", i, doc.categories.length)}</div>`).join("");
    if (section === "banners") {
      const i = Math.min(bannerIndex, doc.banners.length - 1), path = `banners.${i}`;
      html = sectionHead("Banners for every aisle", "Change the heading, background and both images on each category page.") + `<div class="editor-panel"><label class="form-field">Choose a page<select id="banner-picker">${doc.banners.map((b, index) => `<option value="${index}" ${index === i ? "selected" : ""}>${esc(b.id === "all" ? "All products" : doc.categories.find(c => c.id === b.id)?.name || b.id)}</option>`).join("")}</select></label>${fullDesignControls(path, section === "banners" ? "banner" : "promotion")}${bannerPreview(path)}${field("Banner heading", path + ".title")}${field("Supporting text", path + ".subtitle")}${field("Background colour", path + ".color", "color")}${check("Show this banner", path + ".visible")}${!get(path).fullImageMode ? `<div class="editor-grid"><div>${imageField("Left image", path + ".left")}</div><div>${imageField("Right image (also shown on mobile)", path + ".right")}</div></div>` : ""}</div>`;
    }
    if (section === "promotions") html = sectionHead("Something worth a closer look", "Promotional banners appear above the homepage category collection.", '<button class="primary-button" type="button" data-add-promotion>＋ Add banner</button>') + (doc.promotions.length ? doc.promotions.map((b, i) => {
      const path = `promotions.${i}`;
      return `<div class="editor-panel">${fullDesignControls(path, section === "banners" ? "banner" : "promotion")}${bannerPreview(path)}${field("Headline", path + ".title")}${field("Supporting text", path + ".subtitle", "textarea")}<div class="editor-grid">${field("Button label", path + ".cta")}${field("Destination (#/all, #/c/food or HTTPS URL)", path + ".link")}</div>${field("Background colour", path + ".color", "color")}${!b.fullImageMode ? imageField("Banner image", path + ".image") : ""}${check("Visible in store", path + ".visible")}${reorder("promotions", i, doc.promotions.length)}<div class="editor-row-actions"><button class="secondary-button danger-button" type="button" data-delete-promotion="${i}">Remove banner</button></div></div>`;
    }).join("") : '<div class="editor-empty">No promotional banners yet. Add your first banner to feature an offer or collection.</div>');
    if (section === "products") {
      productIndex = Math.min(productIndex, doc.products.length - 1);
      const i = productIndex, p = doc.products[i], path = `products.${i}`;
      html = sectionHead("Your storefront catalog", "These are the products customers see after you publish. Check prices and stock before publishing.", '<button class="primary-button" type="button" data-add-product>＋ Add product</button>') + `<div class="catalog-editor"><div><input class="catalog-filter" id="catalog-search" type="search" placeholder="Find a product…" aria-label="Search catalog" value="${esc(query)}"><div class="catalog-list" id="catalog-list">${productList()}</div></div>${p ? `<div class="editor-panel"><span class="editor-number">Product ${p.id}</span>${field("Product name", path + ".name")}${field("Description", path + ".desc", "textarea")}${field("Brand", path + ".brand")}<div class="editor-grid">${select("Category", path + ".cat", doc.categories.map(c => [c.id, c.name]))}${select("Subcategory", path + ".sub", (window.StoreCatalog.SUBCATS[p.cat] || []).map(s => [s.id, s.name]))}</div><div class="editor-grid">${field("Selling price (GHS)", path + ".price", "number", 'min="0" step="0.01"')}${field("Original price (0 for no discount)", path + ".oldPrice", "number", 'min="0" step="0.01"')}${field("Stock available (blank = not tracked)", path + ".stock", "number", 'min="0" step="1"')}${field("Fallback emoji", path + ".emoji")}</div>${imageField("Product photo", path + ".img", "1200 × 1200 px (1:1)")}${check("Visible in store", path + ".visible")}${check("New arrival", path + ".isNew")}${check("Best seller", path + ".best")}${check("Flash sale (set an original price too)", path + ".flash")}<div class="editor-row-actions"><button class="secondary-button danger-button" type="button" data-delete-product="${i}">Delete product</button></div></div>` : '<div class="editor-empty">Your catalog is empty. Add a product to start.</div>'}</div>`;
    }
    $("#content-fields").innerHTML = html;
    updateFontSamples();
    updatePromisePreviews();
  }
  function updateFontSamples() {
    document.querySelectorAll("[data-font-sample]").forEach(sample => {
      const sizes = doc.typography[sample.dataset.fontSample];
      const value = sizes.desktop ?? sizes.mobile ?? 24;
      sample.style.fontSize = `${Math.max(10, Math.min(72, Number(value) || 24))}px`;
    });
  }
  function productList() {
    const matches = doc.products.map((p, i) => ({ p, i })).filter(({ p }) => `${p.name} ${p.brand} ${p.id}`.toLowerCase().includes(query.toLowerCase()));
    return matches.map(({ p, i }) => `<button type="button" data-product-index="${i}" ${i === productIndex ? 'aria-current="true"' : ""}>${esc(p.name)}<small>GHS ${Number(p.price).toFixed(2)} · ${p.visible ? p.stock === null ? "Stock not tracked" : p.stock + " in stock" : "Hidden"}</small></button>`).join("") || '<p class="editor-empty">No matching products.</p>';
  }
  async function openEditor() {
    const [draft, published] = await Promise.all([cms.read("draft"), cms.read("published")]);
    doc = cms.clone(draft.content || published.content || cms.defaults()); cms.validate(doc);
    draftVersion = draft.version; publishedVersion = published.version;
    $("#editor-gate").hidden = true; $("#editor-workspace").hidden = false;
    $("#editor-mode").textContent = cms.remote ? "CONNECTED STORE · DRAFT EDITOR" : "LOCAL PREVIEW · THIS BROWSER ONLY";
    $("#publish-store").textContent = cms.remote ? "Publish store" : "Publish to this browser";
    $("#editor-signout").hidden = !cms.remote;
    status(cms.remote ? "Edits stay in draft until you publish. Published changes are visible to every visitor." : "Not connected yet. Publishing updates this browser’s storefront only; other visitors will not see these edits.");
    render();
  }
  async function operation(action) {
    if (busy) return;
    busy = true; $("#editor-workspace").inert = true;
    try { await action(); } catch (error) { status(error.message, true); }
    finally { busy = false; $("#editor-workspace").inert = false; }
  }
  async function saveDraft() {
    const result = await cms.write("draft", doc, draftVersion);
    draftVersion = result.version; dirty = false;
    status("Draft saved. Your published storefront has not changed.");
  }
  $("#save-draft").addEventListener("click", () => operation(saveDraft));
  $("#publish-store").addEventListener("click", () => operation(async () => {
    await saveDraft();
    const result = await cms.write("published", doc, publishedVersion); publishedVersion = result.version;
    status(cms.remote ? "Published. Your storefront will load the new content for every visitor." : "Published to this browser. Open the storefront in this browser to see your changes.");
  }));
  $("#preview-draft").addEventListener("click", () => {
    if (busy) return;
    const preview = window.open("about:blank", "_blank");
    if (preview) preview.opener = null;
    operation(async () => {
      try { await saveDraft(); if (preview) preview.location.href = new URL("../index.html?preview=1", location.href).href; else status("Draft saved. Allow pop-ups, then click Preview again."); }
      catch (error) { preview?.close(); throw error; }
    });
  });
  $("#content-fields").addEventListener("input", event => {
    const input = event.target;
    if (input.id === "catalog-search") { query = input.value; $("#catalog-list").innerHTML = productList(); return; }
    if (!input.dataset.bind) return;
    if (input.dataset.bind.startsWith("typography.")) {
      set(input.dataset.bind, input.value === "" ? null : Number(input.value));
      updateFontSamples(); return;
    }
    set(input.dataset.bind, input.type === "checkbox" ? input.checked : input.type === "number" ? (input.dataset.bind.endsWith(".stock") && input.value === "" ? null : Number(input.value)) : input.value);
    if (input.dataset.bind.startsWith("homepage.promises.")) updatePromisePreviews();
    if (input.dataset.bind.endsWith(".fullImageMode") || input.dataset.bind.endsWith(".wide")) { render(); return; }
    if (input.dataset.bind.endsWith(".cat")) {
      const p = doc.products[productIndex]; p.sub = window.StoreCatalog.SUBCATS[p.cat]?.[0]?.id || ""; render();
    }
    document.querySelectorAll("[data-preview]").forEach(preview => {
      const banner = get(preview.dataset.preview); preview.style.backgroundColor = banner.color;
      const title = preview.querySelector("strong"), text = preview.querySelector("p");
      if (title) title.textContent = banner.title;
      if (text) text.textContent = banner.subtitle || "";
    });
  });
  $("#content-fields").addEventListener("change", async event => {
    if (event.target.id === "banner-picker") { bannerIndex = Number(event.target.value); render(); }
    if (/\.(fullImage|mobileImage)$/.test(event.target.dataset.bind || "")) render();
    const path = event.target.dataset.upload;
    let file = event.target.files?.[0];
    if (path && file && event.target.dataset.cropWidth) {
      try {
        file = await window.ImageCropper.open(file, { width: Number(event.target.dataset.cropWidth), height: Number(event.target.dataset.cropHeight) });
        event.target.value = "";
        if (!file) return;
      } catch (error) { event.target.value = ""; status(error.message, true); return; }
    }
    if (path && file) operation(async () => {
      const temporaryURL = URL.createObjectURL(file), picture = new Image();
      let width, height;
      try { picture.src = temporaryURL; await picture.decode(); width = picture.naturalWidth; height = picture.naturalHeight; }
      catch { throw new Error("This image could not be opened. Choose a valid PNG, JPG, WebP, GIF or AVIF file."); }
      finally { URL.revokeObjectURL(temporaryURL); }
      const source = await cms.upload(file); set(path, source);
      if (path.endsWith(".fullImage")) set(path.replace(/\.fullImage$/, ".fullImageMode"), true);
      render();
      status(`Image uploaded: ${width} × ${height} px. Saved in the unsaved draft; publish to show it in your store.`);
    });
  });
  document.addEventListener("click", event => {
    if (busy || !doc) return;
    const target = event.target.closest("button"); if (!target) return;
    if (target.hasAttribute("data-reset-fonts")) { set("typography", {}); render(); return; }
    if (target.dataset.resetFont) { set(`typography.${target.dataset.resetFont}`, {}); render(); return; }
    if (target.dataset.promiseIcon) {
      const [i, icon] = target.dataset.promiseIcon.split(":");
      if (Object.hasOwn(cms.promiseIcons, icon)) { set(`homepage.promises.${Number(i)}.icon`, icon); updatePromisePreviews(); }
      return;
    }
    if (target.dataset.section) { section = target.dataset.section; history.replaceState(null, "", "#" + section); render(); return; }
    if (target.dataset.productIndex !== undefined) { productIndex = Number(target.dataset.productIndex); render(); return; }
    if (target.dataset.clearImage) { set(target.dataset.clearImage, ""); render(); return; }
    if (target.dataset.move) {
      const [collection, value, direction] = target.dataset.move.split(":"), index = Number(value), destination = index + Number(direction);
      if (destination < 0 || destination >= doc[collection].length) return;
      const [item] = doc[collection].splice(index, 1); doc[collection].splice(destination, 0, item); dirty = true; render(); status("Order updated in draft. Publish to apply it to your store."); return;
    }
    if (target.hasAttribute("data-add-promotion")) { doc.promotions.push({ id: crypto.randomUUID(), title: "A new favourite awaits", subtitle: "Discover something for your everyday.", cta: "Shop the collection", link: "#/all", image: "", color: "#d4f5db", visible: true }); dirty = true; render(); status("New banner added to draft."); }
    if (target.hasAttribute("data-add-product")) {
      const cat = doc.categories[0].id;
      doc.products.push({ id: Math.max(0, ...doc.products.map(p => p.id)) + 1, name: "New product", cat, sub: window.StoreCatalog.SUBCATS[cat]?.[0]?.id || "", brand: "BuyfromGAB", desc: "", price: 0, oldPrice: 0, stock: 0, img: "", emoji: "📦", visible: false, best: false, isNew: false, flash: false, sold: 0 }); productIndex = doc.products.length - 1; query = ""; dirty = true; render(); status("New product added as hidden. Set its details and turn on visibility when ready.");
    }
    for (const [attribute, collection] of [["deletePromotion", "promotions"], ["deleteProduct", "products"]]) {
      if (target.dataset[attribute] !== undefined && confirm(`Remove this ${collection === "products" ? "product" : "banner"} from the draft?`)) { doc[collection].splice(Number(target.dataset[attribute]), 1); dirty = true; render(); status("Removed from draft. The published store changes only when you publish."); }
    }
  });
  $("#export-content").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "buyfromgab-storefront-backup.json"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $("#import-content").addEventListener("change", event => operation(async () => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 8 * 1024 * 1024) throw new Error("Choose a backup under 8 MB.");
    const imported = JSON.parse(await file.text()); cms.validate(imported);
    if (!confirm("Replace the current draft with this backup? Your published store will not change yet.")) return;
    doc = imported; dirty = true; productIndex = 0; render(); status("Backup restored into the unsaved draft. Review it before publishing.");
  }));
  $("#editor-login").addEventListener("submit", async event => {
    event.preventDefault(); const form = event.currentTarget, button = form.querySelector("button"); button.disabled = true;
    try { await cms.signIn(form.elements.email.value.trim(), form.elements.password.value); form.elements.password.value = ""; await openEditor(); }
    catch (error) { $("#login-message").textContent = error.message; }
    finally { button.disabled = false; }
  });
  $("#open-local-editor").addEventListener("click", () => openEditor().catch(error => { $("#login-message").textContent = error.message; }));
  $("#editor-signout").addEventListener("click", async () => {
    if (dirty && !confirm("Leave without saving your draft changes?")) return;
    try { await cms.signOut(); } catch { /* The local session is cleared even if the network is unavailable. */ }
    dirty = false; location.reload();
  });
  window.addEventListener("beforeunload", event => { if (dirty) { event.preventDefault(); event.returnValue = ""; } });
  $("#editor-login").hidden = !cms.remote; $("#local-entry").hidden = cms.remote;
  if (cms.remote && cms.getSession()) openEditor().catch(error => { $("#login-message").textContent = error.message; });
})();
