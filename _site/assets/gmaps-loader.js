(function () {
  const key = window.GMAPS_API_KEY;

  if (!key) {
    console.warn("GMAPS key missing: set gmapsKey in data.");
    const msg = document.getElementById("errorMsg");
    if (msg) {
      msg.textContent = "⚠️ Google Maps API key missing. Map can't load.";
      msg.style.display = "block";
    }
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    encodeURIComponent(key) +
    "&libraries=places&callback=initMap";

  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
})();
