import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");
const files = [
  "index.html", "login.html", "customer-auth.css", "app.js", "styles.css", "classic.css", "typography.css", "catalog-defaults.js",
  "store-config.js", "store-content.js", "customer-auth.js", "track-order.js", "theme-init.js",
  "assets/fonts/Ubuntu-Regular.ttf", "assets/fonts/Ubuntu-Medium.ttf", "assets/fonts/Ubuntu-Bold.ttf", "assets/fonts/UFL.txt",
  "admin/index.html", "admin/app.js", "admin/styles.css", "admin/classic.css",
  "admin/storefront.html", "admin/storefront.js", "admin/storefront.css", "admin/image-cropper.js",
  "help/index.html", "shipping/index.html", "returns/index.html", "track-order/index.html"
];

// Emit only public web assets, never SQL, credentials, docs or local browser data.
await mkdir(output, { recursive: true });
for (const file of files) {
  const destination = join(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, file), destination);
}
await writeFile(join(output, "deploy-version.json"), JSON.stringify({
  commit: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  builtAt: new Date().toISOString()
}) + "\n");
const allowed = new Set([...files, "deploy-version.json"]);
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await check(path);
    else if (!entry.isFile() || !allowed.has(relative(output, path).split(sep).join("/"))) {
      throw new Error("Unexpected file in deployment output: " + relative(output, path));
    }
  }
}
await check(output);
console.log(`Prepared ${files.length} public files and deployment version in dist/.`);
