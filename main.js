//accordion features
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".accordion-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;

      document.querySelectorAll(".accordion-content").forEach(item => {
        if (item !== content) {
          item.style.maxHeight = null;
          item.classList.remove("active");
        }
      });

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("active");
      }
    });
  });
});

//Map features
document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([-26.8521, 26.6667], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([-26.8521, 26.6667])
    .addTo(map)
    .bindPopup("<b>Mbali Bakes</b><br>123 Kanana Road, Klerksdorp")
    .openPopup();
});

//contact form features
// contact-form.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload

    // Basic form validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "⚠️ Please fill out all fields.";
      status.style.color = "red";
      return;
    }

    // Simulate successful submission
    status.textContent = "✅ Thank you, " + name + "! Your message has been sent.";
    status.style.color = "green";

    // Reset form
    form.reset();
  });
});
