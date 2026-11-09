/* Run before styles so a saved preference is applied without a theme flash. */
(() => {
  let theme = "light";
  try {
    const saved = localStorage.getItem("bazaar-theme");
    if (["light", "dark", "auto"].includes(saved)) theme = saved;
  } catch { /* Light mode also works when browser storage is unavailable. */ }
  document.documentElement.setAttribute("data-theme", theme);
})();
