//service request implementation

let Cache_Name = 'restaurant_review_v1';
let urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// install
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(Cache_Name).then(function(cache){
            console.log("opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// cache and return request
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});
