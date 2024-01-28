const CACHE_NAME = "MoviesApp.v0.1.0";

const STATIC_ASSETS = [
    "/movies-app/index.html",
    "/movies-app/manifest.json",
    "/movies-app/static/js/main.js",
    "/movies-app/static/css/main.css",
]

function getDate() {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
      };
    
      const formattedDateTime = new Intl.DateTimeFormat('id-ID', options).format(new Date());
      const milliseconds = new Date().getMilliseconds().toString().padStart(3, '0');
    
      return `${formattedDateTime}.${milliseconds}`;
}

/* ---------- SW EVENTS ---------- */
self.addEventListener('install', event => {
    console.log(`-> [${getDate()}] type: %cinstall\n`, "color:fuchsia;font-weight:bold", event)

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(STATIC_ASSETS);  // TODO: FIX 
            })
    )
});

self.addEventListener('activate', event => {
    console.log(`-> [${getDate()}] type: %cactivate\n`, "color:fuchsia;font-weight:bold", event)

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        caches.delete(cache);
                    }
                })
            )
        })
    )
});

self.addEventListener('message', event => {
    console.log(`-> [${getDate()}] type: %cmessage\n`, "color:fuchsia;font-weight:bold", event.data)

    if (event.data.eventType === 'tesLoop') {
        for (var i = 0; i > event.data.data; ++i) {
            event.source.postMessage(`loop ${i}`)
        }
    }
});

/* ---------- SW FUNCTIONAL EVENTS ---------- */
self.addEventListener('fetch', event => {
    self.addEventListener('fetch', event => {
        console.log(`-> [${getDate()}] type: %cfetch\n`, "color:fuchsia;font-weight:bold", event.request.url);
    
        const baseUrl = self.location.href;
        const base = baseUrl.substring(0, baseUrl.lastIndexOf("/") + 1);
    
        let modifiedUrl;
    
        // Jika permintaan adalah untuk file yang ada dalam daftar STATIC_ASSETS
        if (STATIC_ASSETS.includes(event.request.url.replace(base, ''))) {
            modifiedUrl = event.request.url;
        } else {
            // Jika permintaan adalah untuk file lain, modifikasi URL
            modifiedUrl = base + event.request.url.substring(baseUrl.length);
        }
    
        const modifiedRequest = new Request(modifiedUrl);
        
        event.respondWith(
            caches.match(modifiedRequest)
                .then(response => response || fetch(modifiedRequest))
        );
    });
    
});


self.addEventListener('sync', event => {
    console.log(`-> [${getDate()}] type: %csync\n`, "color:fuchsia;font-weight:bold")
});

self.addEventListener('push', event => {
    console.log(`-> [${getDate()}] type: %cpush\n`, "color:fuchsia;font-weight:bold", event)
});