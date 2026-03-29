import { PlaneoAPI } from "/assets/planeo-api.js";

const elTabLogin = document.getElementById("tabLogin");
const elTabRegister = document.getElementById("tabRegister");
const elId = document.getElementById("phone");   // nechávám ID elementu, protože v .njk je to #phone
const elPin = document.getElementById("pin");
const elBtn = document.getElementById("goBtn");
const elErr = document.getElementById("err");

let mode = "login"; // "register"

function setMode(next) {
  mode = next;
  elTabLogin.classList.toggle("is-active", mode === "login");
  elTabRegister.classList.toggle("is-active", mode === "register");
  elBtn.textContent = mode === "login" ? "Přihlásit" : "Registrovat";
  elErr.hidden = true;
}

function normId(v) {
  // jen čísla + max 5 číslic
  return (v || "").replace(/\D+/g, "").slice(0, 5);
}
function normPin(v) {
  return (v || "").replace(/\D+/g, "").slice(0, 4);
}

function fail(msg) {
  elErr.hidden = false;
  elErr.textContent = msg;
  elBtn.disabled = false;
}

elTabLogin.addEventListener("click", () => setMode("login"));
elTabRegister.addEventListener("click", () => setMode("register"));

elId.addEventListener("input", () => { elId.value = normId(elId.value); });
elPin.addEventListener("input", () => { elPin.value = normPin(elPin.value); });

async function go() {
  elErr.hidden = true;
  elBtn.disabled = true;

  const id = normId(elId.value);
  const pin = normPin(elPin.value);

  // pracovní ID: 4–5 číslic
  if (!/^\d{4,5}$/.test(id)) return fail("Neplatné ID. Musí mít 4 nebo 5 číslic.");
  if (!/^\d{4}$/.test(pin)) return fail("PIN musí mít přesně 4 číslice.");

  try {
    if (mode === "login") await PlaneoAPI.login(id, pin);
    else await PlaneoAPI.register(id, pin);

    window.location.href = "/planeo/onboarding/";
  } catch (e) {
    fail(e?.message || "Něco se posralo.");
  } finally {
    elBtn.disabled = false;
  }
}

elBtn.addEventListener("click", go);
[elId, elPin].forEach((i) =>
  i.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go();
  })
);

setMode("login");
