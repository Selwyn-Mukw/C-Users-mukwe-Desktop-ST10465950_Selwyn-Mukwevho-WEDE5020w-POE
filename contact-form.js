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
