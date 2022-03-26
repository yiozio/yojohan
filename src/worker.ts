const cacheName = 'yojohan-v1';
const appShellFiles = [
  '/',
  '/index.html',
  '/dist/yojohan.js',
  '/favicon.ico',
  '/favicon.png',
  '/normalize.css',
  '/PixelMplus12-Regular.ttf',
  '/manifest.json',
  'https://kit.fontawesome.com/a1efe07417.js'
];

self.addEventListener('install', (e: any) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    caches.match(e.request).then((r?: any) => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return (
        r ||
        fetch(e.request).then(response => {
          return caches.open(cacheName).then(cache => {
            console.log('[Service Worker] Caching new resource: ' + e.request.url);
            cache.put(e.request, response.clone()).then();
            return response;
          });
        })
      );
    })
  );
});
