self.addEventListener('install', (installEvent)=> {
  installEvent.waitUntill(
    caches.open('dev-coffee-v1').then((cache)=> {
      cache.addAll(['/', '/index.html', '/css/style.css', '/js/app.js', '/images/'])
    })
  )
})

self.addEventListener('fetch', (event) => {
  if(!(event.request.url.indexOf('http') === 0)) return;
  console.log(event.request.url)

  event.respondWith(
    caches.match(event.request).then((cachedRessource) => {
      if (cachedRessource) {
        return cachedRessource
      }

      return fetch(event.request).then((response) => {
        const responseToCache = response.clone()
        caches.open('dev-coffee-v1').then((cache) => {
          cache.put(event.request, responseToCache)
        });
        return response;
      })
    })
  )

})