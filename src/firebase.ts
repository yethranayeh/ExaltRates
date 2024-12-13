import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API,
	authDomain: "exaltrates.firebaseapp.com",
	projectId: "exaltrates",
	storageBucket: "exaltrates.firebasestorage.app",
	messagingSenderId: "812815824984",
	appId: "1:812815824984:web:1545a696ee80527aadb22d",
	measurementId: "G-C7EKBYFMGM"
};

export const app = initializeApp(firebaseConfig);
