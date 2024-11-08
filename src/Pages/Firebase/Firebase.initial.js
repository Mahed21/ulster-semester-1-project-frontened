import { initializeApp } from "firebase/app";
const initializeAuthentication = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDBYm9qXVci5mykJEyaBBQjiivApnQr0t0",
    authDomain: "tiktok-edc65.firebaseapp.com",
    projectId: "tiktok-edc65",
    storageBucket: "tiktok-edc65.appspot.com",
    messagingSenderId: "1057991155451",
    appId: "1:1057991155451:web:08b009b1a0a4610a599a5e",
  };
  const app = initializeApp(firebaseConfig);
};

export default initializeAuthentication;
// apiKey: "AIzaSyDBYm9qXVci5mykJEyaBBQjiivApnQr0t0",
// authDomain: "tiktok-edc65.firebaseapp.com",
// projectId: "tiktok-edc65",
// storageBucket: "tiktok-edc65.appspot.com",
// messagingSenderId: "1057991155451",
// appId: "1:1057991155451:web:08b009b1a0a4610a599a5e"
