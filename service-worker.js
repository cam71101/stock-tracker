// Use Workbox for simplified service worker management
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
    console.log('Workbox loaded successfully');

    // Cache strategy: Cache-first for same-origin JS/CSS assets only
    workbox.routing.registerRoute(
        ({url, request}) => url.origin === self.location.origin &&
                           (request.destination === 'script' || request.destination === 'style'),
        new workbox.strategies.CacheFirst({
            cacheName: 'assets',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 86400, // 24 hours
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'document',
        new workbox.strategies.NetworkFirst({
            cacheName: 'html',
        })
    );

    // Pre-cache local assets only (cross-origin resources cannot be precached)
    workbox.precaching.precacheAndRoute([
        {url: '/index-pwa.html', revision: '2026-02-10'}
    ]);

    // Runtime cache for cross-origin CDN resources
    workbox.routing.registerRoute(
        ({url}) => url.origin === 'https://unpkg.com' ||
                   url.origin === 'https://cdn.tailwindcss.com' ||
                   url.origin === 'https://cdnjs.cloudflare.com',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'cdn-cache',
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200], // 0 = opaque responses
                }),
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 86400 * 7, // 7 days
                }),
            ],
        })
    );

} else {
    console.error('Workbox failed to load');
}
