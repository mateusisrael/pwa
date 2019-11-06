var urlstoCache = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
    '/logo.png',
    '/mainfest.json',

];
var CACHE_NAME = 'my-site-cache-v1';


self.addEventListener('install', (event) => {   
    // Perform Install Steps

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache Aberto ', caches);
                return cache.addAll(urlstoCache);
            })

            .catch((err) => {
                console.log(err);
            })
    );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if(response) {
        console.log(`1 - Resposta do Cache`);
        return response;
      }

      var fetchRequest = event.request.clone();

      console.log('2 - Resposta da rede');
      return fetch(fetchRequest).then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Salvando resposta no cache!')
            cache.put(event.request, responseToCache); // Uncaught (in promise) TypeError: Request method 'POST' is unsupported
          });
        console.log('3 - Resposta da rede. Salva no cache');
        return response;
      })
    })
  );
});
