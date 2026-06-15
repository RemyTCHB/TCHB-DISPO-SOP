// Import the Firebase libraries into the background worker
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// Your exact Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd9AdG1Yl65SYscJT_hbqXa4HWzC4ky3k",
    authDomain: "dispo-ops.firebaseapp.com",
    projectId: "dispo-ops",
    storageBucket: "dispo-ops.firebasestorage.app",
    messagingSenderId: "933896335434",
    appId: "1:933896335434:web:1be42c24236eb05155b6b3"
};

// Initialize Firebase in the background
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications (when the app tab is closed)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || "New Alert";
  const notificationOptions = {
    body: payload.notification?.body || "Check your Dispo Ops Dashboard.",
    icon: '/icon.svg',
    badge: '/icon.svg'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});