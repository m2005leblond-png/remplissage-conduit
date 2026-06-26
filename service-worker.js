// ==========================================
// CONFIGURATION DU SERVICE WORKER (v1.2)
// ==========================================
const CACHE_NAME = "calculateur-conduit-v1.0"; // Nouveau nom, version 1.2 !

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png"
];

// ==========================================
// 1. INSTALLATION : Mise en cache des fichiers
// ==========================================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Service Worker : Mise en cache des fichiers initiaux");
        return cache.addAll(ASSETS); // Correction ici : on utilise bien la variable ASSETS
      })
      .then(() => self.skipWaiting()) // Force le SW à s'installer immédiatement sans attendre
      .catch(err => console.error("Échec de la mise en cache initiale :", err))
  );
});

// ==========================================
// 2. ACTIVATION : Nettoyage automatique
// ==========================================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker : Suppression de l'ancien cache", key);
            return caches.delete(key); // Supprime les vieux résidus (comme votre ancien v2)
          }
        })
      )
    ).then(() => self.clients.claim()) // Prend le contrôle des pages ouvertes immédiatement
  );
});

// ==========================================
// 3. INTERCEPTION DES REQUÊTES (FETCH)
// ==========================================
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Stratégie Réseau d'abord pour app.js et style.css (pour voir vos modifications rapidement)
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
        .catch(() => caches.match(event.request)) // Si pas de réseau, on prend la version en cache
    );
    return;
  }

  // Stratégie Cache d'abord pour le reste (index.html, images, manifest)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
