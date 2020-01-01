import {
    register
} from 'register-service-worker';

const applicationServerPublicKey = 'BBcPVet4FAvCSZ_v7MHblg_pQ9BPNfTg5azdn-sWRiPIcADvAhD7LUo3iqln0n9UhTOZ37uafyNzTJO-2gE2m-s';

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}




//alert(process.env.NODE_ENV);
//if (process.env.NODE_ENV === 'production') {
//register(`${process.env.BASE_URL}sw.js`, {
register('./sw.js', {
    ready(event) {


        console.log(
            'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB'
        );
        swRegistration = event;

        function initialiseUI() {
            //pushButton.addEventListener('click', function () {
            //  pushButton.disabled = true;
            if (isSubscribed) {
                // TODO: Unsubscribe user
            } else {
                subscribeUser();
            }
            //});
        }


        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = (subscription !== null);

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                //updateBtn();
            });


        function updateBtn() {
            if (Notification.permission === 'denied') {
                //pushButton.textContent = 'Push Messaging Blocked.';
                //pushButton.disabled = true;
                updateSubscriptionOnServer(null);
                return;
            }
            if (isSubscribed) {
                //pushButton.textContent = 'Disable Push Messaging';
            } else {
                //pushButton.textContent = 'Enable Push Messaging';
            }

            //pushButton.disabled = false;
        }

        function subscribeUser() {
            const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
            swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
                .then(function (subscription) {
                    console.log('User is subscribed:', subscription);

                    updateSubscriptionOnServer(subscription);

                    isSubscribed = true;

                    updateBtn();
                })
                .catch(function (err) {
                    console.log('Failed to subscribe the user: ', err);
                    updateBtn();
                });
        }

        function updateSubscriptionOnServer(subscription) {
            // TODO: Send subscription to application server

            //const subscriptionJson = document.querySelector('.js-subscription-json');
            //const subscriptionDetails = document.querySelector('.js-subscription-details');

            if (subscription) {
                // Establecer elementos que puedan mostrarse para enviar datos de Push notifications
                //subscriptionJson.textContent = JSON.stringify(subscription);
                console.log(JSON.stringify(subscription));
                //subscriptionDetails.classList.remove('is-invisible');
            } else {
                //subscriptionDetails.classList.add('is-invisible');
            }
        }



        initialiseUI();



    },
    registered() {
        console.log('Service worker has been registered.');
    },
    cached() {
        console.log('Content has been cached for offline use.');
    },
    updatefound() {
        console.log('New content is downloading.');
    },
    updated() {
        console.log('New content is available; please refresh.');
    },
    offline() {
        console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
        console.error('Error during service worker registration:', error);
    }
});
//}