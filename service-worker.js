const CACHE_NAME = "remplissage-conduit-v28";

// AJOUT : Inclusion de style.css, app.js et data.js dès le départ
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./data.js",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation : Mise en cache de TOUS les fichiers requis
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Service Worker : Mise en cache des fichiers initiaux");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch optimisé
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 1) Fichiers dynamiques/critiques ? STRATÉGIE : NETWORK FIRST
  // On tente le réseau pour avoir la dernière version, si échec (hors-ligne), on prend le cache.
  if (url.pathname.endsWith("app.js") ||
      url.pathname.endsWith("data.js") ||
      url.pathname.endsWith("style.css")) {

    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si la réponse est valide, on met à jour le cache à la volée
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Si pas de réseau, on bascule sur le cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // 2) Autres fichiers statiques (Images, Index, Manifest) ? STRATÉGIE : CACHE FIRST
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
