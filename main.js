console.log('JS OK');


if('serviceWorker' in navigator) {
    console.log('Service Worker disponível');
    window.addEventListener('load', () => {
        
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log(`ServiceWorker registration successful with scope: ${registration.scope}` );
            })

            .catch((err) => {
                console.log(`Registration Failed: ${err}`);
            });
    });
}
