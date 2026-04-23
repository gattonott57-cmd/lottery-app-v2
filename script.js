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
    // ① すでに引いたかチェック（1人1回）
    const userQuery = query(
      collection(db, "lotteryResults2"),
      where("instagramId", "==", userId)
    );

    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const data = userSnapshot.docs[0].data();

      if (data.result === "当選") {
        result.innerText = `🎉当選🎉
変身動画プレゼント！

この画面をスクショして
変身希望のペットの写真と一緒に
DMで送ってください🌼`;
      } else {
        result.innerText = `今回はハズレ😢
変身は800円で受付可能です。（通常1500円）
もちろんアレンジもOK🙆‍♂️
アクキーやマグも作成OK🙆‍♂️

また、ハズレを集めると良いことあるかも🤭🎁
スクショで保存しておいて下さい🤲`;
      }
      return;
    }

    // ② 当選数チェック
    const winQuery = query(
      collection(db, "lotteryResults2"),
      where("result", "==", "当選")
    );

    const winSnapshot = await getDocs(winQuery);
    const winCount = winSnapshot.size;

    let isWin = false;

    // ③ 抽選ロジック（当たり無限、当選確率30%）
    
      isWin = Math.random() < 0.3;
    

  

// ④ 表示
document.body.style.backgroundImage = 'url("IMG_3158.jpeg")';
if (isWin) {


 
      result.innerText = `🎉当選🎉
変身動画プレゼント！

この画面をスクショして
変身希望のペットの写真と一緒に
DMで送ってください🌼

アクキーやマグの作成もおすすめです！`;
    } else {
      result.innerText = `今回はハズレ😢
変身は800円で受付可能です（通常1500円）
もちろんアレンジもOK🙆‍♂️
アクキーやマグの作成もおすすめです！

また、ハズレを集めると良いことあるかも🤭🎁
是非スクショしておいて下さい🤲`;
    }

    // ⑤ 保存
    await addDoc(collection(db, "lotteryResults2"), {
      instagramId: userId,
      result: isWin ? "当選" : "ハズレ",
      time: new Date()
    });

  } catch (e) {
    alert("エラー：" + e.message);
    result.innerText = "エラー発生：" + e.message;
  }
});
