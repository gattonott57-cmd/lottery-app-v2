alert("script動いてる");

import { db } from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("instagramId");
const button = document.getElementById("drawBtn");
const result = document.getElementById("result");

// 入力でボタンON
input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

// 抽選処理
button.addEventListener("click", async () => {
  const userId = input.value.trim().toLowerCase();

  try {
    // ★ 強制テスト保存（これで接続確認）
    await addDoc(collection(db, "test"), {
      check: "OK",
      time: new Date()
    });

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
ペットの写真と一緒にDMで送ってください🌼`;
      } else {
        result.innerText = `今回はハズレ😢
でも画像プレゼント🎁

ペットの写真をDMで送ってください😆`;
      }
      return;
    }

    // ② 当選数チェック
    const winQuery = query(
      collection(db, "lotteryResults"),
      where("result", "==", "当選")
    );

    const winSnapshot = await getDocs(winQuery);
    const winCount = winSnapshot.size;

    let isWin = false;

    // ③ 抽選ロジック
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
ペットの写真と一緒にDMで送ってください🌼`;
    } else {
      result.innerText = `今回はハズレ😢
でも画像プレゼント🎁

ペットの写真をDMで送ってください😆`;
    }

    // ⑤ 本番保存
    await addDoc(collection(db, "lotteryResults"), {
      instagramId: userId,
      result: isWin ? "当選" : "ハズレ",
      time: new Date()
    });

    console.log("保存成功🔥");

  } catch (e) {
  alert("エラー：" + e.message);
  result.innerText = "エラー発生：" + e.message;
}
});
