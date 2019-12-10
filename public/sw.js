/* eslint-disable */

/*
Chrome Web Server
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb
*/

/*
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// Añadir libreria Workbox
if (workbox) {
    console.log(`Se Cargo Workbox 🎉`);
} else {
    console.log(`No se pudo cargar Workbox 😬`);
}
*/


// Nombre de la version del cache
var CACHE_NAME = 'turepuesto_v1';

// Listado de variables a precache
var URLtoCatch = [
    './index.html',
    './favicon.ico',
    './style.css',
    './app.js',
    './img/repuestos.jpg',
    './img/icons/webapp-icon-80.png',
    './img/badge.png'
];



// Instalacion del SW
self.addEventListener('install', function (event) {
    //Perform Install
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Opened Cache');
            return cache.addAll(URLtoCatch);
        })
    );
});

// Solicitud de Red [Proxy Cache]
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Si hay respuesta devuelvela
                if (response) { return response; }

                // IMPORTANTE: Clonar la Solicitud. Una solicitud es un hilo y
                // solo puede ser usada una vez. Desde que lo usamos unicamente
                // por el buscador y otra por el cache para mostrar y almacenar
                // necesitamos clonar la solicitud.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // Verificamos i recibimos un codigo de respuesta válido
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANTE: Clonar la respuesta. Una respuesta es un
                        // hilo de uso unico y por eso queremos que el buscador
                        // la use asi como tambien el cache debe consumirla
                        // necesitamos clonarla asi tenemos 2 hilos.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activacion del SW
self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['turepuesto_v1', 'images-cache-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Entrada de notificacion
self.addEventListener('push', function (event) {
    const title = 'Notificaciones';
    const options = {
        body: 'Tu Repuesto.com',
        icon: 'img/icons/webapp-icon-80.png',
        badge: 'img/badge.png'
    };
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('http://google.com')
    );
});