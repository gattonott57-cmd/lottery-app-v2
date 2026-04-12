import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZDWEhF76gHl2YlxGRYn5tNw8RbYnyyqc",
  authDomain: "lottery-app4-66c71.firebaseapp.com",
  projectId: "lottery-app4-66c71",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
