const API = "/api"; // stejnej doménovej root => pohoda

async function api(path, opts = {}) {
  const r = await fetch(API + path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    credentials: "include",
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw data;
  return data;
}

export const PlaneoAPI = {
  register: (userId, pin) => api("/auth/register.php", { method: "POST", body: JSON.stringify({ userId, pin }) }),
  login: (userId, pin) => api("/auth/login.php", { method: "POST", body: JSON.stringify({ userId, pin }) }),
  logout: () => api("/auth/logout.php", { method: "POST" }),
  me: () => api("/me.php", { method: "GET" }),

  addSale: (payload) => api("/sales/add.php", { method: "POST", body: JSON.stringify(payload) }),
  listSales: (month) => api(`/sales/list.php?month=${encodeURIComponent(month)}`, { method: "GET" }),

  leaderboard: (month, sort="pz") => api(`/leaderboard.php?month=${encodeURIComponent(month)}&sort=${encodeURIComponent(sort)}`, { method: "GET" }),
};
