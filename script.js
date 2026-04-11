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

    if (data.result.includes("当選")) {
      result.innerText = `🎉当選🎉
たんぽぽ変身動画プレゼント！

この画面をスクショして
変身させたいペットのお顔がはっきり写った写真と一緒に
DMで送ってください🌼`;
    } else {
      result.innerText = `今回はハズレ😢
でも“変身画像”プレゼント🎁

変身させたいペットのお顔がはっきりわかる写真を
DMで送ってください😆`;
    }

    return;
  }

  // 抽選
  const isWin = Math.random() < 0.5;

  if (isWin) {
    result.innerText = `🎉当選🎉
たんぽぽ変身動画プレゼント！

この画面をスクショして
変身させたいペットのお顔がはっきり写った写真と一緒に
DMで送ってください🌼`;
  } else {
    result.innerText = `今回はハズレ😢
でも“変身画像”プレゼント🎁

変身させたいペットのお顔がはっきりわかる写真を
DMで送ってください😆`;
  }

  await addDoc(collection(db, "lotteryResults"), {
    instagramId: userId,
    result: isWin ? "当選" : "ハズレ",
    time: new Date()
  });
});
