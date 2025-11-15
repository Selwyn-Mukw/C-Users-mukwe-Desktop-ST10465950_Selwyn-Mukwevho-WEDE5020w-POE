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

  /* =========================
     3. Contact form features
     Only run if contact-form exists
     ========================= */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
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
  }

  /* =========================
     4. Scroll reveal
     ========================= */
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

