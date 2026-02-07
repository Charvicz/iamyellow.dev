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
  login(phone, pin) { return this._post("auth/login.php", { phone, pin }); },
  register(phone, pin) { return this._post("auth/register.php", { phone, pin }); },
  logout() { return this._post("auth/logout.php", {}); },

  // později: addSale/listSales...
};
