// 1. INTERCEPT THE PUSH EVENT BEFORE FIREBASE SEES IT
self.addEventListener('push', function(event) {
    if (event.data) {
        const payload = event.data.json();
        
        if (payload.notification) {
            // This completely blocks Firebase's default listener, stopping duplicates!
            event.stopImmediatePropagation(); 
            
            // Build our own custom notification with the TCHB logo
            const options = {
                body: payload.notification.body,
                icon: '/icon.svg', // Forces your TCHB logo!
                badge: '/icon.svg', // Small icon for the Android status bar
                data: payload.data
            };
            
            // Display it
            event.waitUntil(self.registration.showNotification(payload.notification.title, options));
        }
    }
});

// 2. HANDLE WHAT HAPPENS WHEN THEY TAP THE NOTIFICATION
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the popup
    
    // Focus the browser tab if it's open, or open a new one if the app is fully closed
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});

// 3. IMPORT AND INITIALIZE FIREBASE NORMALLY
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAd9AdG1Yl65SYscJT_hbqXa4HWzC4ky3k",
    authDomain: "dispo-ops.firebaseapp.com",
    projectId: "dispo-ops",
    storageBucket: "dispo-ops.firebasestorage.app",
    messagingSenderId: "933896335434",
    appId: "1:933896335434:web:1be42c24236eb05155b6b3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
