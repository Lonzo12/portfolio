const SHADES = [
  { name: "Rosewater", hex: "#d98e9a", note: "Soft pink with a warm undertone" },
  { name: "Pistachio", hex: "#a9c6a0", note: "Pale green, creamy finish" },
  { name: "Oat Milk", hex: "#e6d3bc", note: "Neutral beige, goes with everything" },
  { name: "Merlot", hex: "#6f1d3b", note: "Deep wine red for autumn" },
  { name: "Cobalt Hour", hex: "#2f4fa3", note: "Saturated blue with a glossy shine" },
  { name: "Marigold", hex: "#e9b23a", note: "Warm yellow, bright and sunny" },
  { name: "Mocha", hex: "#6b4a3a", note: "Chocolate brown, satin finish" },
  { name: "Lilac Smoke", hex: "#b7a3c9", note: "Dusty purple with a cool tone" }
];

const root = document.documentElement;
const list = document.getElementById("shadeList");
const shadeName = document.getElementById("shadeName");
const shadeNote = document.getElementById("shadeNote");
const shadeField = document.getElementById("shade");

// Pick dark or light text depending on the shade's luminance
function readableOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.3 ? "#2b1733" : "#ffffff";
}

function applyShade(shade) {
  root.style.setProperty("--accent", shade.hex);
  root.style.setProperty("--on-accent", readableOn(shade.hex));
  shadeName.textContent = shade.name;
  shadeNote.textContent = shade.note;
  shadeField.value = shade.name;
}

SHADES.forEach((shade, i) => {
  const label = document.createElement("label");
  label.className = "shade";
  label.innerHTML = `<input type="radio" name="shade" value="${i}" ${i === 0 ? "checked" : ""}><span style="--c:${shade.hex}"></span>`;
  label.querySelector("input").setAttribute("aria-label", `${shade.name}: ${shade.note}`);
  list.appendChild(label);
});

list.addEventListener("change", (e) => {
  if (e.target.name === "shade") applyShade(SHADES[Number(e.target.value)]);
});
applyShade(SHADES[0]);

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
  formMsg.textContent = "Hour requested. We'll confirm by text. (Demo site: no data was sent.)";
  form.reset();
  shadeField.value = shadeName.textContent;
});
