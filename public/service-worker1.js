const CACHE_NAME = 'HNOFFLINE'
self.addEventListener('install', (event) => {
  console.log('service worker installed successfully ');
});

self.addEventListener('fetch', (event) => {
  let requestURl = new URL(event.request.url);
  // if(!requestURl.pathname.endsWith('.gif')) {
  //   console.log('sending request to server for resources');
  //   return fetch(event.request);
  // }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if(response) {
          console.log('returning response from cache');
          return response
        }

        let fetchRequest = event.request.clone();

        return fetch(fetchRequest)
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
});