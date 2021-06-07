// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCA5nhr3qbdsXnzHGssmaJzY-IIVMvnKRo",
  authDomain: "upcoming-launches.firebaseapp.com",
  projectId: "upcoming-launches",
  storageBucket: "upcoming-launches.appspot.com",
  messagingSenderId: "398197679112",
  appId: "1:398197679112:web:1932d7f0a9856274691dbd",
  measurementId: "G-8E5Q1M3P98"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});