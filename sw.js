// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


//installation

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries',
    './',
    './components/entry-page.js',
    './components/journal-entry.js',
    './scripts/router.js',
    './scripts/script.js',
    './images/lab.jpg',
    './images/mountains.jpg',
    './images/sky.jpg',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


//activation

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

//fetch requests

self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request).then(function(response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});
