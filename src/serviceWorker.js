const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

async function registerValidSW(swUrl, config) {
    try {
        const registration = await navigator.serviceWorker.register(swUrl)
        
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return

            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // At this point, the updated precached content has been fetched,
                        // but the previous service worker will still serve the older
                        // content until all client tabs are closed.
                        console.log(
                            '%c// New content is available and will be used when all ' +
                            'tabs for this page are closed. See https://bit.ly/CRA-PWA.',
                            "color:#565d6a;font-style:italic"
                        );

                        // Execute callback
                        if (config && config.onUpdate) {
                            config.onUpdate(registration);
                        }
                    } else {
                        // At this point, everything has been precached.
                        // It's the perfect time to display a
                        // "Content is cached for offline use." message.
                        console.log(
                            '%c// Content is cached for offline use.',
                            'color:#565d6a;font-style:italic'
                        );

                        // Execute callback
                        if (config && config.onSuccess) {
                            config.onSuccess(registration);
                        }
                    }
                }

            }
        }
    } catch (error) {
        console.log(error)
    }

    navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Message from SW: ", event.data)
    })
}

function checkValidServiceWorker(swUrl, config) {
    console.log(
        "%c// Check if the sw can be found. If it can't reload the page.",
        "color:#565d6a;font-style:italic"
    )
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: {
            'Service-Worker': 'script',
            'Accept': 'text/javascript'
        },
    })
        .then((response) => {
            console.log(
                '%c// Ensure service worker exists, and that we really are getting a JS file.',
                'color:#565d6a;font-style:italic'
            )
            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                console.log(
                    '%c// No service worker found. Probably a different app. Reload the page.',
                    'color:#565d6a;font-style:italic'
                )
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registrationservice) => {
                    registrationservice.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                console.log(
                    "%c// Service worker found. Proceed as normal",
                    'color:#565d6a;font-style:italic'
                )
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function register(config) {
    console.log("---------- Register_SW ----------\n")
    if (/*process.env.NODE_ENV === 'production' &&*/ 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            console.log('> window.event: load')
            const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

            if (isLocalhost) {
                console.log(
                    "%c// This is running on localhost. Let's check if a service worker still exists or not.",
                    "color:#565d6a;font-style:italic")
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);

                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        '%c// This web app is being served cache-first by a service ' +
                        'worker. To learn more, visit https://bit.ly/CRA-PWA',
                        "color:#565d6a;font-style:italic");
                });
            } else {
                console.log(
                    '%c// Is not localhost. Just register service worker',
                    'color:#565d6a;font-style:italic')
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}

export function unregister() {
    console.log("---------- Unregister_SW ----------\n")
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registred) => {
                registred.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}
