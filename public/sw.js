const filesToCache = [
  "./",
  "js/modernizr.min.js",
  "js/plugins.js",
  "js/prototypes.js",
  "css/master.css",
  "css/normalize.css",
  "css/main.css",
];
// const vNum = Math.floor(Math.random() * 1000000000000) + 1;
const vNum = 1;
const staticCacheName = `benshada-cache-v${vNum}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName.toString()).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
