const cacheName = 'yojohan-v1';
const appShellFiles = [
  '/',
  '/index.html',
  '/dist/yojohan.js',
  '/favicon.ico',
  '/favicon.png',
  '/normalize.css',
  '/PixelMplus12-Regular.ttf',
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
