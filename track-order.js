/* The standalone tracking form uses the same customer care flow as the store. */
document.getElementById("track-order-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const reference = form.elements.reference.value.trim();
  if (!reference) { form.elements.reference.focus(); return; }
  const message = "Hello BuyfromGAB, please check the status of my order. Reference: " + reference;
  const url = "https://wa.me/233545359058?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
  let status = document.getElementById("track-status");
  if (!status) {
    status = document.createElement("p");
    status.id = "track-status";
    status.setAttribute("role", "status");
    form.after(status);
  }
  status.replaceChildren(document.createTextNode("Continue in WhatsApp to request your update. "));
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open WhatsApp";
  status.append(link);
});
