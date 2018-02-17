const CACHE_NAME = 'HNOFFLINE'

self.addEventListener('install', (event) => {
  console.log('service worker installed successfully ');
  self.skipWaiting()
    .then(() => {
      //service workers takes controll of its clients
      console.log('cliaming the clients in install');
      clients.claim().then(() => {
        console.log('clients are cliamed')
      })
      .catch((err) => {
        console.log('clients are cliam failed', err);
      });
    })
    .catch((err) => {})
});

/* Commonly will do the clean up the old cache process here */
self.addEventListener('activate', (evt) => {
  console.log('service worker is updated and activated');
});

/* Cache first approch */
function cacheFristMethod(event) {
  let requestURl = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if(response) {
          console.log('returning response from cache');
          return response
        }
        // if not cached the fetch from network and save it to cache
        //let fetchRequest = event.request.clone();

        return fetch(event.request)
          .then((response) => {

            if(!response || response.status != 200) {
              console.log('request result is not 200 response ', requestURl.pathname, response.status)
              return response;
            }

            let cacheReponse = response.clone();
            caches.open(CACHE_NAME)
            .then((cache) => {
              console.log('#####cached the response in cache');
              cache.put(event.request, cacheReponse);
            })
            return response;
          });

      })
  )
}

/* Cache and then update it with new data */
function cacheAndUpdate(event) {
  let requestURl = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then((cacheResponse) => {
        //let fetchRequest = event.request.clone();
        let fetchResult = fetch(event.request)
          .then((fetchResponse) => {
            if(!fetchResponse || fetchResponse.status != 200) {
              console.log('request result is not 200', requestURl.pathname, fetchResponse.status)
              return fetchResponse;
            }

            let responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME)
            .then((cache) => {
              console.log('#####cached the response in cache');
              cache.put(event.request, responseClone);
            })
            return fetchResponse;
          });

          return cacheResponse || fetchResult;
      })
  )
}

self.addEventListener('fetch', (event) => {
  cacheFristMethod(event);

  //cacheAndUpdate(event)


});