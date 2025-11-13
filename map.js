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
