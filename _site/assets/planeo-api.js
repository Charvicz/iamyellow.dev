export const PlaneoAPI = {
  async _post(path, body) {
    const r = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body || {}),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok || data.ok === false) throw new Error(data.error || "API error");
    return data;
  },

  async _get(path) {
    const r = await fetch(`/api/${path}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok || data.ok === false) throw new Error(data.error || "API error");
    return data;
  },

  me() { return this._get("me.php"); },

  // 🔥 posíláme { id, pin } (ne phone)
  login(id, pin) { return this._post("auth/login.php", { id, pin }); },
  register(id, pin) { return this._post("auth/register.php", { id, pin }); },

  logout() { return this._post("auth/logout.php", {}); },
};
