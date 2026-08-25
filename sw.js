const CACHE_NAME = "nordsweet-performance-calculator-v573";
const ASSETS = [
  "./",
  "./index.html",
  "./airspaces.html",
  "./airspaces-map.html",
  "./traffic.html",
  "./aircraft-data.js",
  "./aircraft-data/P2006T%20data.js",
  "./aircraft-data/P2008JC%20data.js",
  "./aircraft-data/P2002JR%20data.js",
  "./aircraft-data/C172%20data.js",
  "./aircraft-data/C172M%20data.js",
  "./aircraft-data/C152%20data.js",
  "./aircraft-data/C152.SP-RBB-data.js",
  "./aircraft-data/HUSK%20data.js",
  "./aircraft-data/FR172H%20data.js",
  "./aircraft-data/R172K%20data.js",
  "./aircraft-data/SD-4%20data.js",
  "./aircraft-data/C172.SP-ANT-data.js",
  "./airports.js",
  "./airports-cz-sk.js",
  "./navdata.js",
  "./Waypoints/index.js",
  "./Waypoints/Poland.js",
  "./airspace-api-config.js",
  "./airspace-tools.js",
  "./airport-frequencies-data.js",
  "./airspace-data/Poland_Airspaces.js",
  "./airspace-data/Poland_Airspaces_TODAY.js",
  "./airspace-data/Poland_Airspaces_TOMORROW.js",
  "./airspace-data/AUP_today.js",
  "./airspace-data/AUP_tomorrow.js",
  "./airspace-data/Slovakia_Airspaces.js",
  "./airspace-data/czech-aup-current.json",
  "./airspace-data/czech-aup-next.json",
  "./ground-data.js",
  "./charts/Poland/EPBC/National%20AIP/AD4.pdf",
  "./charts/Poland/EPKK/National%20AIP/AD2.pdf",
  "./charts/Poland/EPLS/National%20AIP/AD4.pdf",
  "./charts/Poland/EPNT/National%20AIP/AD4.pdf",
  "./charts/Poland/EPNT/National%20AIP/AD4-3.pdf",
  "./charts/Poland/EPPI/National%20AIP/AD4.pdf",
  "./charts/Poland/EPPO/National%20AIP/AD2.pdf",
  "./charts/Poland/EPZG/National%20AIP/AD2.pdf",
  "./atis-feed.js",
  "./atis-db-config.js",
  "./czech-ibs-api-config.js",
  "./aircraft-data/p2006t-performance.js",
  "./aircraft-data/husk-performance.js",
  "./aircraft-data/fr172h-performance.js",
  "./aircraft-data/r172k-performance.js",
  "./aircraft-data/sd4-performance.js",
  "./avwx-config.js",
  "./avwx-config.local.js",
  "./awos-api-config.js",
  "./traffic-proxy-config.js",
  "./traffic-identity-data.js",
  "./airports.json",
  "./aip_override.json",
  "./savedflights/manifest.json",
  "./companyflights/manifest.json",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg"
];

const NETWORK_FIRST_FILENAMES = new Set([
  "airspace-api-config.js",
  "awos-api-config.js",
  "traffic-proxy-config.js",
  "airspace-tools.js",
  "airspaces.html",
  "airspaces-editor.html",
  "airspaces-map.html",
  "traffic.html",
  "airport-frequencies-data.js",
  "airport-frequencies-editor.html",
  "ground-data.js",
  "index.js",
  "Poland.js",
  "AUP_today.js",
  "AUP_tomorrow.js",
  "czech-aup-current.json",
  "czech-aup-next.json",
  "Poland_Airspaces.js",
  "Poland_Airspaces_TODAY.js",
  "Poland_Airspaces_TOMORROW.js"
]);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

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
  const isDynamicFlightFile = url.pathname.includes("/companyflights/") || url.pathname.includes("/savedflights/");
  if (isDynamicFlightFile) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cachedResponse) => cachedResponse || Response.error()))
    );
    return;
  }

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
