// Service intervals in miles (illustrative demo data)
const SERVICES = [
  { name: "Oil and filter change", every: 7500 },
  { name: "Tyre rotation and check", every: 7500 },
  { name: "Brake inspection", every: 12000 },
  { name: "Air and cabin filters", every: 15000 },
  { name: "Brake fluid change", every: 30000 },
  { name: "Coolant flush", every: 50000 },
  { name: "Spark plugs", every: 60000 },
  { name: "Transmission fluid", every: 60000 },
  { name: "Timing belt", every: 90000 }
];

const slider = document.getElementById("mileage");
const odometer = document.getElementById("odometer");
const dueList = document.getElementById("dueList");
const jobs = document.getElementById("jobs");

const fmt = (n) => n.toLocaleString("en-US");

function renderOdometer(value) {
  const digits = String(value).padStart(6, "0").split("");
  odometer.innerHTML = "";
  digits.forEach((d, i) => {
    if (i === 3) {
      const sep = document.createElement("div");
      sep.className = "wheel sep";
      sep.textContent = ",";
      odometer.appendChild(sep);
    }
    const w = document.createElement("div");
    w.className = "wheel";
    w.textContent = d;
    odometer.appendChild(w);
  });
}

function nextDue(mileage) {
  return SERVICES.map((s) => {
    const next = Math.max(s.every, Math.ceil(mileage / s.every) * s.every);
    return { name: s.name, next, left: next - mileage };
  })
    .sort((a, b) => a.left - b.left || a.name.localeCompare(b.name))
    .slice(0, 5);
}

function render() {
  const mileage = Number(slider.value);
  slider.setAttribute("aria-valuetext", `${fmt(mileage)} miles`);
  renderOdometer(mileage);
  const items = nextDue(mileage);
  dueList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = item.name;
    const when = document.createElement("span");
    when.className = "when";
    if (item.left <= 500) {
      when.classList.add("now");
      when.textContent = "Due now";
    } else {
      when.textContent = `in ${fmt(item.left)} mi, at ${fmt(item.next)}`;
    }
    li.append(name, when);
    dueList.appendChild(li);
  });
  window.__dueNames = items.map((i) => i.name);
}

slider.addEventListener("input", render);
document.getElementById("bookDue").addEventListener("click", () => {
  const miles = fmt(Number(slider.value));
  jobs.value = `Mileage ${miles}. Due: ${window.__dueNames.join(", ")}.`;
});
render();

// Booking form: client-side validation only (demo, nothing is sent)
const form = document.getElementById("bookForm");
const formMsg = document.getElementById("formStatus");
const dateInput = document.getElementById("date");
dateInput.min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    formMsg.hidden = true;
    return;
  }
  form.classList.remove("was-validated");
  formMsg.hidden = false;
  formMsg.textContent = "Slot requested. We'll confirm by text within the hour. (Demo site: no data was sent.)";
  form.reset();
});
