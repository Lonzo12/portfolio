// Estimates are illustrative demo data.
const REPAIRS = {
  washer: [
    { symptom: "Won't drain", cause: "Blocked drain pump or filter", time: "45–60 min", price: "$65–$110" },
    { symptom: "Shakes or bangs on spin", cause: "Worn shock absorbers or drum bearings", time: "1.5–2 h", price: "$120–$220" },
    { symptom: "Leaks water", cause: "Door seal or hose failure", time: "45–90 min", price: "$70–$150" },
    { symptom: "Won't start", cause: "Door lock or control board fault", time: "1–2 h", price: "$90–$260" }
  ],
  dishwasher: [
    { symptom: "Dishes come out dirty", cause: "Clogged spray arm or weak circulation pump", time: "45–75 min", price: "$70–$160" },
    { symptom: "Won't drain", cause: "Blocked filter or drain pump", time: "45 min", price: "$65–$120" },
    { symptom: "Dishes stay wet", cause: "Failed heating element", time: "1 h", price: "$110–$190" }
  ],
  fridge: [
    { symptom: "Too warm inside", cause: "Defrost heater or evaporator fan failure", time: "1–2 h", price: "$120–$280" },
    { symptom: "Freezer is iced up", cause: "Defrost system fault", time: "1.5 h", price: "$130–$260" },
    { symptom: "Loud humming or clicking", cause: "Condenser fan or start relay", time: "1 h", price: "$90–$200" }
  ],
  oven: [
    { symptom: "Doesn't heat", cause: "Bake element or igniter failure", time: "1 h", price: "$90–$210" },
    { symptom: "Wrong temperature", cause: "Thermostat sensor drift", time: "45–60 min", price: "$80–$160" },
    { symptom: "Door won't close", cause: "Hinge spring or latch wear", time: "45 min", price: "$70–$130" }
  ]
};

const applianceSelect = document.getElementById("appliance");
const symptomsBox = document.getElementById("symptoms");
const rCause = document.getElementById("r-cause");
const rTime = document.getElementById("r-time");
const rPrice = document.getElementById("r-price");
const rBook = document.getElementById("r-book");
const bookAppliance = document.getElementById("appliance-book");

function showResult(item) {
  rCause.textContent = item.cause;
  rTime.textContent = item.time;
  rPrice.textContent = item.price;
}

function renderSymptoms() {
  const key = applianceSelect.value;
  const list = REPAIRS[key];
  symptomsBox.innerHTML = "";
  list.forEach((item, i) => {
    const wrap = document.createElement("div");
    wrap.className = "symptom";
    const id = `sym-${key}-${i}`;
    wrap.innerHTML = `<input type="radio" name="symptom" id="${id}" value="${i}" ${i === 0 ? "checked" : ""}><label for="${id}"></label>`;
    wrap.querySelector("label").textContent = item.symptom;
    symptomsBox.appendChild(wrap);
  });
  showResult(list[0]);
}

applianceSelect.addEventListener("change", renderSymptoms);
symptomsBox.addEventListener("change", (e) => {
  if (e.target.name === "symptom") {
    showResult(REPAIRS[applianceSelect.value][Number(e.target.value)]);
  }
});
rBook.addEventListener("click", () => {
  bookAppliance.value = applianceSelect.value;
  const checked = symptomsBox.querySelector("input:checked");
  if (checked) {
    const item = REPAIRS[applianceSelect.value][Number(checked.value)];
    document.getElementById("details").value = item.symptom;
  }
});
document.getElementById("diagnose").addEventListener("submit", (e) => e.preventDefault());
renderSymptoms();

// Booking form: client-side validation only (demo, nothing is sent)
const form = document.getElementById("bookForm");
const formMsg = document.getElementById("formStatus");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    formMsg.hidden = true;
    return;
  }
  form.classList.remove("was-validated");
  formMsg.hidden = false;
  formMsg.textContent = "Request received. We'll call you within 30 minutes to confirm your window. (Demo site: no data was sent.)";
  form.reset();
});
