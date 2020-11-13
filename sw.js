var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'index.html',
  'about.html',
  '/css/styles.css',
  '/js/main.js'
];

self.addEventListener('install', function (e) {
    console.log("Service Worker: Installed");
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log("Service Worker: Documents Cached");
                self.skipWaiting();
            })
    );
});
   
self.addEventListener('fetch', e => {
    console.log("Service Worker: Fetching from Cache");
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('activate', function (event) {   
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});