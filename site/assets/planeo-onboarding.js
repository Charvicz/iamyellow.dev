import { PlaneoAPI } from "/assets/planeo-api.js";

const branchSel = document.getElementById("branch");
const roleSel   = document.getElementById("role");
const btn       = document.getElementById("saveBtn");
const err       = document.getElementById("err");

function fail(msg){
  err.hidden = false;
  err.textContent = msg;
  btn.disabled = false;
}

async function loadBranches(){
  const res = await fetch("/api/branches.php", { credentials: "include" });
  const data = await res.json().catch(()=>({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || "Nepodařilo se načíst pobočky.");

  branchSel.innerHTML = `<option value="">Vyber pobočku…</option>` +
    data.branches.map(b => `<option value="${b.code}">${b.label}</option>`).join("");
}

async function save(){
  err.hidden = true;
  btn.disabled = true;

  const branch_code = branchSel.value;
  const job_role = roleSel.value;

  try{
    const r = await fetch("/api/onboarding.php", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      credentials: "include",
      body: JSON.stringify({ branch_code, job_role })
    });
    const data = await r.json().catch(()=>({}));
    if (!r.ok || data.ok === false) throw new Error(data.error || "Nepovedlo se uložit.");

    window.location.href = "/planeo/";
  }catch(e){
    fail(e.message || "Error");
  }finally{
    btn.disabled = false;
  }
}

btn.addEventListener("click", save);

loadBranches().catch(e => fail(e.message));
