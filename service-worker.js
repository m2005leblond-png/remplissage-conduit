const CACHE_NAME = "calculateur-conduit-v1.0"; // Nouveau nom, version 1.0 !

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png"
];

// Installation : Mise en cache des fichiers essentiels
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Service Worker : Mise en cache des fichiers initiaux");
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error("Échec de la mise en cache initiale :", err))
  );
});

// Activation : Nettoyage des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker : Suppression de l'ancien cache", key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Stratégie Réseau d'abord pour app.js et style.css, sinon Cache
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.pathname.endsWith("app.js") || url.pathname.endsWith("style.css")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
