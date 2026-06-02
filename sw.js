const CACHE_NAME = "nordsweet-performance-calculator-v311";
const ASSETS = [
  "./",
  "./index.html",
  "./aircraft-data.js",
  "./aircraft-data/P2006T%20data.js",
  "./aircraft-data/P2008JC%20data.js",
  "./aircraft-data/P2002JR%20data.js",
  "./aircraft-data/C172%20data.js",
  "./aircraft-data/C152%20data.js",
  "./aircraft-data/HUSK%20data.js",
  "./airports.js",
  "./navdata.js",
  "./procedure-data.js",
  "./Waypoints/index.js",
  "./Waypoints/Poland.js",
  "./ground-data.js",
  "./charts/AD%202%20EPKK%202_upscaled_400.pdf",
  "./charts/AD_2_EPPO_2-1_upscaled_400.pdf",
  "./charts/AD%202%20EPZG%202_upscaled_400.pdf",
  "./charts/AD%204%20EPNT%202_upscaled_400.pdf",
  "./charts/AD_4_EPBC_2_upscaled_400.pdf",
  "./charts/AD_4_EPLS_2_upscaled_400.pdf",
  "./charts/AD_4_EPPI_2_upscaled_400.pdf",
  "./atis-feed.js",
  "./atis-db-config.js",
  "./checklist-data.js",
  "./p2006t-performance.js",
  "./husk-performance.js",
  "./avwx-config.js",
  "./airports.json",
  "./aip_override.json",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg"
];

const NETWORK_FIRST_FILENAMES = new Set([
  "ground-data.js"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const requestFilename = url.pathname.split("/").pop();
  if (NETWORK_FIRST_FILENAMES.has(requestFilename)) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cachedResponse) => cachedResponse || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate" || event.request.destination === "document") {
            return caches.match("./index.html");
          }
          return Response.error();
        });
    })
  );
});
