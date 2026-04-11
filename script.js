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

  // ① すでに引いたかチェック
  const userQuery = query(
    collection(db, "lotteryResults"),
    where("instagramId", "==", userId)
  );

  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    const data = userSnapshot.docs[0].data();

    if (data.result === "当選") {
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

  // ② 当選者数チェック
  const winQuery = query(
    collection(db, "lotteryResults"),
    where("result", "==", "当選")
  );

  const winSnapshot = await getDocs(winQuery);
  const winCount = winSnapshot.size;

  let isWin = false;

  // ③ 10人未満なら30%抽選
  if (winCount < 10) {
    isWin = Math.random() < 0.3;
  } else {
    isWin = false;
  }

  // ④ 表示
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

  // ⑤ 保存
  await addDoc(collection(db, "lotteryResults"), {
    instagramId: userId,
    result: isWin ? "当選" : "ハズレ",
    time: new Date()
  });
});
