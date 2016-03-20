var worker = new Worker('serviceworker-cache-polyfill.js');

worker.addEventListener('install', function(event) {

  if (self.skipWaiting) { self.skipWaiting(); }

  event.waitUntil(
    caches.open('flipCard').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/styles/main.css',
        '/scripts/main.js',
      ]);
    })
  );
});

worker.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

worker.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
