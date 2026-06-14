// By-import el Firebase libraries gowa el background worker
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// El configuration bta3et el app bta3ak
const firebaseConfig = {
    apiKey: "AIzaSyAd9AdG1Yl65SYscJT_hbqXa4HWzC4ky3k",
    authDomain: "dispo-ops.firebaseapp.com",
    projectId: "dispo-ops",
    storageBucket: "dispo-ops.firebasestorage.app",
    messagingSenderId: "933896335434",
    appId: "1:933896335434:web:1be42c24236eb05155b6b3"
};

// Initialize Firebase fel background
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Hena by-handle el notifications law el app ma2fool (Background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.svg',
    badge: '/icon.svg'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});