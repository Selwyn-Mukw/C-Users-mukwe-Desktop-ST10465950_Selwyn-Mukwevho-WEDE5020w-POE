document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1. Accordion features
     ========================= */
  const accordionButtons = document.querySelectorAll(".accordion-btn");

  if (accordionButtons.length > 0) {
    accordionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;

        document.querySelectorAll(".accordion-content").forEach((item) => {
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
  }

  /* =========================
     2. Map features (Leaflet)
     Only run if #map exists AND L is defined
     ========================= */
  const mapElement = document.getElementById("map");
  if (mapElement && typeof L !== "undefined") {
    const map = L.map("map").setView([-26.8521, 26.6667], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([-26.8521, 26.6667])
      .addTo(map)
      .bindPopup("<b>Mbali Bakes</b><br>123 Kanana Road, Klerksdorp")
      .openPopup();
  } else {
    // console.log("Map not initialised on this page (no #map or no Leaflet).");
  }

  // contact-form.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return; // safety check

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop normal form submit

    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const messageType = document.getElementById("message-type").value;
    const messageText = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !messageType || !messageText) {
      status.textContent = "Please fill in all required fields.";
      status.style.color = "red";
      return;
    }

    // Very basic email check (good enough for front-end validation)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "red";
      return;
    }

    // Recipient (change this if you want a different address)
    const recipient = "mbali@mbakes.co.za";

    // Subject and body for the email
    const subject = `Website Contact Form - ${messageType}`;

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone/WhatsApp: ${phone}` : "",
      `Type of Message: ${messageType}`,
      "",
      "Message:",
      messageText
    ].filter(Boolean); // remove empty lines

    const body = bodyLines.join("\n");

    // Build mailto URL
    const mailtoLink =
      "mailto:" +
      encodeURIComponent(recipient) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    // Show a friendly status message
    status.textContent = "Opening your email app so you can send the message...";
    status.style.color = "green";

    // Open the user's email client with pre-filled email
    window.location.href = mailtoLink;

    // Optionally clear the form
    form.reset();
  });
});


  /*  4. Scroll reveal */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // 15% visible
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for very old browsers
    revealElements.forEach((el) => el.classList.add("active"));
  }

  /* =========================
     5. Cart / Add-to-cart logic
     ========================= */
 document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cart-item-count');
  const buttons = document.querySelectorAll('.buy-button[data-name], .add-to-cart[data-name]');

  // Load cart from localStorage (or empty array)
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
    }
    localStorage.setItem('cartCount', totalItems.toString());
  }

  // Initialise count on page load
  updateCartCount();

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price || '0');

      // If somehow no name, skip
      if (!name) return;

      const existing = cart.find((item) => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      updateCartCount();

      if (cartCountEl) {
        cartCountEl.classList.add('cart-bump');
        setTimeout(() => cartCountEl.classList.remove('cart-bump'), 300);
      }
    });
  });
});
});
document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cart-item-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Load cart from localStorage (or empty array)
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // --- helper to update count everywhere ---
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
    }
    localStorage.setItem('cartCount', totalItems.toString());
  }

  // Initialise count on page load
  updateCartCount();

  // --- add-to-cart click handler ---
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price || '0');

      // Check if item already in cart
      const existing = cart.find((item) => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update count + little bump animation
      updateCartCount();
      if (cartCountEl) {
        cartCountEl.classList.add('cart-bump');
        setTimeout(() => cartCountEl.classList.remove('cart-bump'), 300);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('product-search');
  const sortSelect = document.getElementById('product-sort');
  const grid = document.querySelector('.product-grid');

  // if we're not on the products page, just skip
  if (!searchInput || !sortSelect || !grid) return;

  // Keep original list of product cards
  const allCards = Array.from(grid.querySelectorAll('.product-card'));

  function getCardData(card) {
    const name = (card.querySelector('h3')?.textContent || '').toLowerCase();

    // Prefer data-price; fallback to text in .price
    const btn = card.querySelector('.buy-button, .add-to-cart');
    let price = NaN;
    if (btn && btn.dataset.price) {
      price = parseFloat(btn.dataset.price);
    }
    if (isNaN(price)) {
      const priceText = (card.querySelector('.price')?.textContent || '')
        .replace(/[^\d.]/g, '');
      price = parseFloat(priceText) || 0;
    }

    return { name, price };
  }

  function applyFiltersAndSort() {
    const query = searchInput.value.trim().toLowerCase();
    const sortValue = sortSelect.value;

    // 1️⃣ Filter
    let filtered = allCards.filter((card) => {
      const { name } = getCardData(card);
      return name.includes(query);
    });

    // 2️⃣ Sort
    if (sortValue !== 'default') {
      filtered.sort((a, b) => {
        const dataA = getCardData(a);
        const dataB = getCardData(b);

        switch (sortValue) {
          case 'price-asc':
            return dataA.price - dataB.price;
          case 'price-desc':
            return dataB.price - dataA.price;
          case 'name-asc':
            return dataA.name.localeCompare(dataB.name);
          case 'name-desc':
            return dataB.name.localeCompare(dataA.name);
          default:
            return 0;
        }
      });
    }

    // 3️⃣ Re-render grid
    grid.innerHTML = '';
    filtered.forEach((card) => grid.appendChild(card));
  }

  // Hook events
  searchInput.addEventListener('input', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
});

