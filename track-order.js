document.querySelector("#track-order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const reference = String(new FormData(event.currentTarget).get("reference") || "").trim();
  if (!reference) return;
  const message = `Hi BuyfromGAB, please check the status of my order. Order reference: ${reference}`;
  window.open(`https://wa.me/233545359058?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
