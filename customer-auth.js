/* Customer authentication uses its own session, separate from the admin editor. */
(() => {
  "use strict";
  const config = window.STORE_CONFIG || {}, key = "buyfromgab-customer-session-v1";
  const base = String(config.supabaseUrl || "").replace(/\/$/, "");
  const esc = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  let session = null, mode = "login", busy = false, message = "", error = false, refreshing;
  try { session = JSON.parse(localStorage.getItem(key) || "null"); } catch {}
  const connected = Boolean(base && config.publishableKey);
  async function request(path, body, token, method = "POST") {
    const response = await fetch(base + "/auth/v1/" + path, {
      method, headers: { apikey: config.publishableKey, "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const failure = new Error(data.msg || data.message || data.error_description || "Unable to connect. Please try again.");
      failure.status = response.status; throw failure;
    }
    return data;
  }
  function persist(value) {
    session = value ? { access_token: value.access_token, refresh_token: value.refresh_token, expires_at: value.expires_at || Date.now()/1000 + value.expires_in, user: value.user } : null;
    try { if (session) localStorage.setItem(key, JSON.stringify(session)); else localStorage.removeItem(key); } catch {}
  }
  async function current() {
    if (!session) return null;
    if (session.expires_at > Date.now()/1000 + 60) return session;
    if (!refreshing) refreshing = request("token?grant_type=refresh_token", { refresh_token: session.refresh_token })
      .then(data => { persist(data); return session; })
      .catch(e => { if (e.status === 400 || e.status === 401) persist(null); throw e; }).finally(() => { refreshing = null; });
    return refreshing;
  }
  function render() {
    const host = document.getElementById("customer-auth"); if (!host) return;
    const signedIn = session?.user && session.expires_at > Date.now()/1000;
    host.innerHTML = `<div class="acct-card customer-auth"><h2>${signedIn ? "Welcome back" : mode === "signup" ? "Create your account" : mode === "reset" ? "Reset your password" : mode === "recover" ? "Choose a new password" : "Welcome to BuyfromGAB"}</h2>${signedIn && mode !== "recover" ? `<p>Signed in as <strong>${esc(session.user.email)}</strong></p><button type="button" class="add-btn" data-customer-logout ${busy ? "disabled" : ""}>${busy ? "Signing out…" : "Log out"}</button>` : `<p class="acct-note">${mode === "signup" ? "Join with your email and a password." : mode === "reset" ? "We’ll email you a link to reset your password." : mode === "recover" ? "Enter a new password for your account." : "Log in to your customer account, or create one below."}</p><form id="customer-auth-form"><fieldset ${busy || !connected ? "disabled" : ""}>${mode === "signup" ? '<label class="field">Full name<input name="name" required maxlength="100" autocomplete="name"></label>' : ""}${mode !== "recover" ? '<label class="field">Email address<input name="email" type="email" required autocomplete="email"></label>' : ""}${mode !== "reset" ? `<label class="field">Password<input name="password" type="password" required ${mode !== "login" ? 'minlength="8"' : ""} maxlength="128" autocomplete="${mode === "login" ? "current-password" : "new-password"}"></label>` : ""}${mode === "signup" || mode === "recover" ? '<label class="field">Confirm password<input name="confirm" type="password" required minlength="8" maxlength="128" autocomplete="new-password"></label><p class="acct-note">Use at least 8 characters.</p>' : ""}<button class="add-btn" type="submit">${busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "reset" ? "Send reset link" : mode === "recover" ? "Save new password" : "Log in"}</button></fieldset></form><div class="customer-auth-links">${mode !== "login" ? '<button type="button" data-customer-mode="login">Back to login</button>' : '<button type="button" data-customer-mode="signup">Create an account</button><button type="button" data-customer-mode="reset">Forgot password?</button>'}</div>`}<p class="customer-auth-message${error ? " is-error" : ""}" role="${error ? "alert" : "status"}" aria-live="polite">${esc(!connected ? "Account sign-in is temporarily unavailable." : message)}</p></div>`;
  }
  const redirect = () => location.origin + location.pathname;
  async function submit(form) {
    if (busy || !connected) return;
    const data = new FormData(form), email = String(data.get("email") || "").trim(), password = String(data.get("password") || "");
    if ((mode === "signup" || mode === "recover") && password !== data.get("confirm")) { message = "The passwords don’t match."; error = true; render(); return; }
    const action = mode;
    busy = true; message = ""; error = false; render();
    try {
      if (action === "login") {
        persist(await request("token?grant_type=password", { email, password })); message = "You’re logged in.";
      } else if (action === "signup") {
        const result = await request("signup?redirect_to=" + encodeURIComponent(redirect()), { email, password, data: { display_name: String(data.get("name") || "").trim() } });
        if (result.access_token) { persist(result); message = "Your account is ready."; }
        else { mode = "login"; message = "Check your email for a confirmation link, then return here to log in."; }
      } else if (action === "reset") {
        await request("recover?redirect_to=" + encodeURIComponent(redirect()), { email });
        message = "If an account exists for that email, you’ll receive a password reset link.";
      } else if (action === "recover") {
        const active = await current(); if (!active) throw new Error("This reset link has expired. Request a new one.");
        await request("user", { password }, active.access_token, "PUT"); mode = "login"; message = "Your password has been updated.";
      }
    } catch (e) { error = true; message = e.message; }
    finally { busy = false; render(); }
  }
  document.addEventListener("submit", e => { if (e.target.id === "customer-auth-form") { e.preventDefault(); submit(e.target); } });
  document.addEventListener("click", async e => {
    const button = e.target.closest("button"); if (!button || busy) return;
    if (button.dataset.customerMode) { mode = button.dataset.customerMode; message = ""; error = false; render(); }
    if (button.hasAttribute("data-customer-logout")) {
      busy = true; render();
      try { const active = await current(); if (active) await request("logout?scope=local", null, active.access_token); persist(null); message = "You’re logged out."; }
      catch(e) { error = true; message = e.message; }
      finally { busy = false; render(); }
    }
  });
  async function initialize() {
    const params = new URLSearchParams(location.hash.slice(1));
    if (params.has("access_token") || params.has("error_description")) {
      history.replaceState(null, "", location.pathname + location.search + "#/account");
      try {
        if (params.has("error_description")) throw new Error(params.get("error_description"));
        const token = params.get("access_token"), user = await request("user", null, token, "GET");
        persist({ access_token: token, refresh_token: params.get("refresh_token"), expires_in: Number(params.get("expires_in")) || 3600, user });
        mode = params.get("type") === "recovery" ? "recover" : "login";
        message = mode === "recover" ? "Set your new password below." : "Your email is confirmed. You’re logged in.";
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } catch(e) { message = e.message; error = true; render(); }
    } else {
      try { const active = await current(); if (active) { active.user = await request("user", null, active.access_token, "GET"); persist(active); } }
      catch(e) { if (e.status === 401 || e.status === 403) persist(null); message = e.message; error = true; }
    }
    render();
  }
  window.addEventListener("storage", e => { if (e.key === key) { try { session = JSON.parse(e.newValue); } catch { session = null; } render(); } });
  async function refreshSession() {
    if (!session || busy) return;
    try { await current(); } catch(e) { message = e.message; error = true; }
    render();
  }
  window.addEventListener("focus", refreshSession);
  setInterval(refreshSession, 60000);
  window.CustomerAuth = { render, current };
  initialize();
})();
