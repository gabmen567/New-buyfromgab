/* Fixed-size banner/product cropper. Files stay local until Apply crop is used. */
(() => {
  "use strict";
  const dialog = document.createElement("dialog");
  dialog.className = "image-crop-dialog";
  dialog.setAttribute("aria-labelledby", "crop-title");
  dialog.innerHTML = `<div class="crop-heading"><div><span class="eyebrow">MAKE IT FIT</span><h2 id="crop-title">Position your image</h2><p id="crop-size"></p></div><button class="crop-close" type="button" aria-label="Cancel cropping">×</button></div>
    <p class="crop-instructions" id="crop-instructions">Drag the image to reposition it. Use the slider to zoom. You can also focus the image and use the arrow keys.</p>
    <div class="crop-stage"><canvas id="crop-canvas" tabindex="0" aria-label="Image crop position" aria-describedby="crop-instructions"></canvas><div class="crop-grid" aria-hidden="true"></div></div>
    <div class="crop-controls"><label for="crop-zoom">Zoom</label><input id="crop-zoom" type="range" min="1" max="4" step="0.01" value="1"><output id="crop-zoom-value" for="crop-zoom">100%</output><button class="secondary-button" id="crop-reset" type="button">Reset</button></div>
    <p class="crop-message" id="crop-message" role="status"></p><div class="crop-actions"><button class="secondary-button" id="crop-cancel" type="button">Cancel</button><button class="primary-button" id="crop-apply" type="button">Apply crop</button></div>`;
  document.body.append(dialog);
  const $ = selector => dialog.querySelector(selector);
  const canvas = $("canvas"), context = canvas.getContext("2d"), zoomInput = $("#crop-zoom");
  let state = null, opening = false;
  function constrain() {
    state.x = Math.min(0, Math.max(state.width - state.image.naturalWidth * state.scale, state.x));
    state.y = Math.min(0, Math.max(state.height - state.image.naturalHeight * state.scale, state.y));
  }
  function draw() {
    if (!state) return;
    constrain();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high";
    context.drawImage(state.image, state.x, state.y, state.image.naturalWidth * state.scale, state.image.naturalHeight * state.scale);
  }
  function zoom(value) {
    if (!state || state.saving) return;
    const centerX = (state.width / 2 - state.x) / state.scale;
    const centerY = (state.height / 2 - state.y) / state.scale;
    state.zoom = Math.max(1, Math.min(4, value)); state.scale = state.baseScale * state.zoom;
    state.x = state.width / 2 - centerX * state.scale; state.y = state.height / 2 - centerY * state.scale;
    zoomInput.value = state.zoom; $("#crop-zoom-value").value = Math.round(state.zoom * 100) + "%";
    draw();
  }
  function reset() {
    if (!state || state.saving) return;
    state.zoom = 1; state.scale = state.baseScale;
    state.x = (state.width - state.image.naturalWidth * state.scale) / 2;
    state.y = (state.height - state.image.naturalHeight * state.scale) / 2;
    zoomInput.value = "1"; $("#crop-zoom-value").value = "100%"; draw();
  }
  function finish(result) {
    if (!state) return;
    const { resolve, url, focus } = state;
    state = null; opening = false; URL.revokeObjectURL(url);
    if (dialog.open) dialog.close();
    focus?.focus(); resolve(result);
  }
  canvas.addEventListener("pointerdown", event => {
    if (!state || state.saving || event.button !== 0 || state.pointer) return;
    state.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId); canvas.focus();
  });
  canvas.addEventListener("pointermove", event => {
    if (!state?.pointer || state.saving || event.pointerId !== state.pointer.id) return;
    const bounds = canvas.getBoundingClientRect();
    state.x += (event.clientX - state.pointer.x) * state.width / bounds.width;
    state.y += (event.clientY - state.pointer.y) * state.height / bounds.height;
    state.pointer.x = event.clientX; state.pointer.y = event.clientY; draw();
  });
  for (const event of ["pointerup", "pointercancel", "lostpointercapture"]) canvas.addEventListener(event, () => { if (state) state.pointer = null; });
  canvas.addEventListener("wheel", event => { if (state && !state.saving) { event.preventDefault(); zoom(state.zoom + (event.deltaY < 0 ? .1 : -.1)); } }, { passive: false });
  canvas.addEventListener("keydown", event => {
    if (!state || state.saving) return;
    const movement = event.shiftKey ? 30 : 10;
    if (event.key === "ArrowLeft") state.x -= movement;
    else if (event.key === "ArrowRight") state.x += movement;
    else if (event.key === "ArrowUp") state.y -= movement;
    else if (event.key === "ArrowDown") state.y += movement;
    else if (event.key === "+" || event.key === "=") zoom(state.zoom + .1);
    else if (event.key === "-") zoom(state.zoom - .1);
    else return;
    event.preventDefault(); draw();
  });
  zoomInput.addEventListener("input", () => zoom(Number(zoomInput.value)));
  $("#crop-reset").addEventListener("click", reset);
  for (const selector of [".crop-close", "#crop-cancel"]) $(selector).addEventListener("click", () => { if (!state?.saving) finish(null); });
  dialog.addEventListener("cancel", event => { event.preventDefault(); if (!state?.saving) finish(null); });
  dialog.addEventListener("close", () => { if (state) finish(null); });
  $("#crop-apply").addEventListener("click", async () => {
    if (!state || state.saving) return;
    const current = state; current.saving = true;
    dialog.querySelectorAll("button, input").forEach(element => { element.disabled = true; });
    $("#crop-message").textContent = "Preparing your cropped image…";
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", .92));
      if (!blob) throw new Error("Could not prepare this crop. Please try another image.");
      const extension = blob.type === "image/webp" ? "webp" : "png";
      const name = current.file.name.replace(/\.[^.]+$/, "") + `-${current.width}x${current.height}.${extension}`;
      finish(new File([blob], name, { type: blob.type }));
    } catch (error) { current.saving = false; $("#crop-message").textContent = error.message; }
    finally { dialog.querySelectorAll("button, input").forEach(element => { element.disabled = false; }); }
  });
  window.ImageCropper = { async open(file, { width, height }) {
    if (opening || state) throw new Error("Finish the current crop first.");
    if (!["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"].includes(file.type)) throw new Error("Choose a PNG, JPG, WebP, GIF or AVIF image.");
    if (file.size > 20 * 1024 * 1024) throw new Error("Choose a source image under 20 MB.");
    opening = true;
    const url = URL.createObjectURL(file), image = new Image();
    try { image.src = url; await image.decode(); }
    catch { opening = false; URL.revokeObjectURL(url); throw new Error("This image could not be opened. Please choose another file."); }
    return new Promise(resolve => {
      canvas.width = width; canvas.height = height;
      state = { image, file, width, height, url, resolve, focus: document.activeElement, saving: false, baseScale: Math.max(width / image.naturalWidth, height / image.naturalHeight) };
      $(".crop-stage").style.width = `min(100%, calc(52svh * ${width / height}))`;
      $("#crop-size").textContent = `${width} × ${height} px · Source: ${image.naturalWidth} × ${image.naturalHeight} px`;
      $("#crop-message").textContent = "Only the part inside the frame will be saved. Animated images become a still image.";
      reset(); dialog.showModal(); canvas.focus();
    });
  } };
})();
