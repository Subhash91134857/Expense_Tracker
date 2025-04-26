import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6QgcaljZm5ajNJeV1BOXzb9e66vDP870",
    authDomain: "expenseauth-831aa.firebaseapp.com",
    projectId: "expenseauth-831aa",
    storageBucket: "expenseauth-831aa.appspot.com",  // Corrected this line
    messagingSenderId: "912470160172",
    appId: "1:912470160172:web:b9ec0aa5d99244c2bef289",
    measurementId: "G-PDW9LJ5B9S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


