const branchSel = document.getElementById("branch");
const roleSel   = document.getElementById("role");
const btn       = document.getElementById("saveBtn");
const err       = document.getElementById("err");

function showErr(msg){
  err.hidden = false;
  err.textContent = msg;
}
function clearErr(){
  err.hidden = true;
  err.textContent = "";
}

// vytáhne branch_id i kdyby select/value byly rozbitý
function getBranchIdSafe(){
  // 1) normálně value
  let v = (branchSel?.value || "").trim();

  // 2) selected option value
  if (!v && branchSel?.selectedOptions?.length) {
    v = (branchSel.selectedOptions[0].value || "").trim();
  }

  // 3) když ani to není, zkus vytáhnout číslo z textu: "PLANEO Kroměříž (1152)"
  if (!v && branchSel?.selectedOptions?.length) {
    const txt = (branchSel.selectedOptions[0].textContent || "").trim();
    const m = txt.match(/\((\d+)\)\s*$/);
    if (m) v = m[1];
  }

  return v;
}

async function loadBranches(){
  const r = await fetch("/api/branches.php", { credentials: "include" });
  const data = await r.json().catch(()=>({}));

  if (!r.ok || data.ok === false) throw new Error(data.error || "Nepodařilo se načíst pobočky.");

  // ✅ tady je nejdůležitější: option value="${b.id}"
  branchSel.innerHTML =
    `<option value="">Vyber pobočku…</option>` +
    (data.branches || []).map(b => `<option value="${b.id}">${b.label}</option>`).join("");
}

async function save(){
  clearErr();
  btn.disabled = true;

  const branch_id = getBranchIdSafe();
  const job_role = (roleSel?.value || "").trim();

  if (!branch_id) {
    btn.disabled = false;
    showErr("Vyber pobočku.");
    return;
  }
  if (!/^\d+$/.test(branch_id)) {
    btn.disabled = false;
    showErr("Neplatné číslo pobočky.");
    return;
  }

  try{
    const r = await fetch("/api/onboarding.php", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      credentials: "include",
      body: JSON.stringify({ branch_id, job_role })
    });
    const data = await r.json().catch(()=>({}));

    if (!r.ok || data.ok === false) throw new Error(data.error || "Nepovedlo se uložit.");

    window.location.href = "/planeo/";
  } catch(e){
    showErr(e?.message || "Něco se posralo.");
  } finally{
    btn.disabled = false;
  }
}

btn.addEventListener("click", save);
loadBranches().catch(e => showErr(e?.message || "Nepodařilo se načíst pobočky."));
