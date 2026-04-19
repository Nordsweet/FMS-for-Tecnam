self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("tecnam-cache").then(cache => cache.addAll(["/"]))
  );
});