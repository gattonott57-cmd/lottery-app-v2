import { db } from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("instagramId");
const button = document.getElementById("drawBtn");
const result = document.getElementById("result");

input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

button.addEventListener("click", async () => {
  const userId = input.value.trim().toLowerCase();

  const q = query(
    collection(db, "lotteryResults"),
    where("instagramId", "==", userId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();
    result.innerText = `もう引いてるで！結果：${data.result}`;
    return;
  }

  const r = Math.random() < 0.5 ? "当たり🎉" : "ハズレ😢";
  result.innerText = r;

  await addDoc(collection(db, "lotteryResults"), {
    instagramId: userId,
    result: r,
    time: new Date()
  });
});
