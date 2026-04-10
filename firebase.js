import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkW-DhXcYrlnFNSeQ9FEA_1pErUeRpnuo",
  authDomain: "lottery-app-5b7fd.firebaseapp.com",
  projectId: "lottery-app-5b7fd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
