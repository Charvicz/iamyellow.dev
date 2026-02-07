import { PlaneoAPI } from "/assets/planeo-api.js";

const elTabLogin = document.getElementById("tabLogin");
const elTabRegister = document.getElementById("tabRegister");
const elPhone = document.getElementById("phone");
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

function normPhone(v) { return (v || "").replace(/\D+/g, ""); }
function normPin(v) { return (v || "").replace(/\D+/g, "").slice(0, 4); }

elTabLogin.addEventListener("click", () => setMode("login"));
elTabRegister.addEventListener("click", () => setMode("register"));

elPhone.addEventListener("input", () => { elPhone.value = normPhone(elPhone.value); });
elPin.addEventListener("input", () => { elPin.value = normPin(elPin.value); });

async function go() {
  elErr.hidden = true;
  elBtn.disabled = true;

  const phone = normPhone(elPhone.value);
  const pin = normPin(elPin.value);

  if (phone.length < 6) return fail("Neplatné číslo/ID.");
  if (pin.length !== 4) return fail("PIN musí mít 4 čísla.");

  try {
    if (mode === "login") await PlaneoAPI.login(phone, pin);
    else await PlaneoAPI.register(phone, pin);

    // po loginu/registraci rovnou do menu
    window.location.href = "/planeo/";
  } catch (e) {
    fail(e?.message || "Fail");
  } finally {
    elBtn.disabled = false;
  }
}

function fail(msg) {
  elErr.hidden = false;
  elErr.textContent = msg;
  elBtn.disabled = false;
}

elBtn.addEventListener("click", go);
[elPhone, elPin].forEach(i => i.addEventListener("keydown", (e) => {
  if (e.key === "Enter") go();
}));

setMode("login");
