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
