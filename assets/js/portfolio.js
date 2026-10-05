(function () {
  var cfg = window.PORTFOLIO_CONFIG || { accessKey: "", products: [] };
  var ENDPOINT = "https://api.web3forms.com/submit";

  var list = document.getElementById("serviceList");
  var select = document.getElementById("product");
  var info = document.getElementById("productInfo");
  var infoName = document.getElementById("infoName");
  var infoPrice = document.getElementById("infoPrice");
  var infoNote = document.getElementById("infoNote");
  var form = document.getElementById("orderForm");
  var statusBox = document.getElementById("formStatus");
  var sendBtn = document.getElementById("sendBtn");

  document.getElementById("year").textContent = new Date().getFullYear();

  function money(n) { return "$" + n.toLocaleString("en-US"); }
  function findProduct(id) {
    for (var i = 0; i < cfg.products.length; i++) if (cfg.products[i].id === id) return cfg.products[i];
    return null;
  }

  // Services list and order form options come from one place: assets/js/config.js
  cfg.products.forEach(function (p) {
    var opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.from === null ? p.name : p.name + " (from " + money(p.from) + ")";
    select.appendChild(opt);

    if (p.from === null) return;
    var li = document.createElement("li");
    var name = document.createElement("h3");
    name.className = "service-name";
    name.textContent = p.name;
    var note = document.createElement("p");
    note.className = "service-note";
    note.textContent = p.note;
    var price = document.createElement("span");
    price.className = "service-price";
    price.textContent = "from " + money(p.from);
    var order = document.createElement("a");
    order.className = "service-order";
    order.href = "#order";
    order.textContent = "Order this";
    order.setAttribute("data-product", p.id);
    li.append(name, price, note, order);
    list.appendChild(li);
  });

  function showProduct() {
    var p = findProduct(select.value);
    if (!p) { info.hidden = true; return; }
    infoName.textContent = p.name;
    infoPrice.textContent = p.from === null ? "Price after we talk" : "from " + money(p.from);
    infoNote.textContent = p.note;
    info.hidden = false;
  }
  select.addEventListener("change", showProduct);

  list.addEventListener("click", function (e) {
    var a = e.target.closest("[data-product]");
    if (a) { select.value = a.getAttribute("data-product"); showProduct(); }
  });

  function showStatus(kind, text) {
    statusBox.hidden = false;
    statusBox.classList.toggle("is-error", kind === "error");
    statusBox.textContent = text;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      statusBox.hidden = true;
      return;
    }
    // Spam bots tick the hidden box. Pretend it worked and send nothing.
    if (document.getElementById("botcheck").checked) {
      showStatus("ok", "Thanks, your order is sent.");
      return;
    }
    if (!cfg.accessKey || cfg.accessKey.indexOf("PASTE_") === 0) {
      showStatus("error", "The order form isn't connected yet. Site owner: add your Web3Forms access key in assets/js/config.js.");
      return;
    }

    var p = findProduct(select.value);
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var payload = {
      access_key: cfg.accessKey,
      subject: "New order: " + p.name + " (" + name + ")",
      from_name: "Portfolio order form",
      name: name,
      email: email,
      product: p.name,
      starting_price: p.from === null ? "to discuss" : money(p.from),
      deadline: document.getElementById("deadline").value,
      current_site: document.getElementById("site").value.trim() || "none",
      message: document.getElementById("message").value.trim()
    };

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    statusBox.hidden = true;

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok && data.success, data: data }; });
      })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          form.classList.remove("was-validated");
          showProduct();
          showStatus("ok", "Thanks, your order is sent. I'll reply to " + email + ".");
        } else {
          showStatus("error", "The order wasn't sent: " + ((r.data && r.data.message) || "unknown error") + ". Please try again in a minute.");
        }
      })
      .catch(function () {
        showStatus("error", "Couldn't reach the server. Check your connection and try again.");
      })
      .then(function () {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send order";
      });
  });
})();
