import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyU39C5CgxmjfI_yZgHYNukQPbzu25NH8",
  authDomain: "pokemonapi-9e401.firebaseapp.com",
  projectId: "pokemonapi-9e401",
  storageBucket: "pokemonapi-9e401.firebasestorage.app",
  messagingSenderId: "218413819271",
  appId: "1:218413819271:web:ec33006b5228167f4b1f22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
