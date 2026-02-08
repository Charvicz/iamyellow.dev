const branchSel = document.getElementById("branch");
const roleSel   = document.getElementById("role");
const btn       = document.getElementById("saveBtn");
const err       = document.getElementById("err");

function fail(msg) {
  err.hidden = false;
  err.textContent = msg;
  btn.disabled = false;
}

async function loadBranches() {
  const r = await fetch("/api/branches.php", { credentials: "include" });
  const data = await r.json().catch(() => ({}));

  if (!r.ok || data.ok === false) {
    throw new Error(data.error || "Nepodařilo se načíst pobočky.");
  }

  // ✅ value = b.id (číslo prodejny), text = b.label
  branchSel.innerHTML =
    `<option value="">Vyber pobočku…</option>` +
    data.branches
      .map((b) => `<option value="${b.id}">${b.label}</option>`)
      .join("");
}

async function save() {
  err.hidden = true;
  btn.disabled = true;

  const branch_id = branchSel.value; // string, ale bude jen číslo
  const job_role = roleSel.value;

  if (!branch_id) return fail("Vyber pobočku.");
  if (!/^\d+$/.test(branch_id)) return fail("Neplatné číslo pobočky.");

  try {
    const r = await fetch("/api/onboarding.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ branch_id, job_role }),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok || data.ok === false) {
      throw new Error(data.error || "Nepovedlo se uložit dotazník.");
    }

    // hotovo → app
    window.location.href = "/planeo/";
  } catch (e) {
    fail(e?.message || "Něco se posralo.");
  } finally {
    btn.disabled = false;
  }
}

btn.addEventListener("click", save);

loadBranches().catch((e) => fail(e?.message || "Nepodařilo se načíst pobočky."));
