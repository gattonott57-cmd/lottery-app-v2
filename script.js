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

  try {
    const userQuery = query(
      collection(db, "lotteryResults4"),
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
DMで送ってください🌼
アクキーやマグもおすすめです😆`;
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

    let isWin = Math.random() < 0.3;

    document.body.style.backgroundImage = 'url("IMG_3361.jpeg")';

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

    await addDoc(collection(db, "lotteryResults4"), {
      instagramId: userId,
      result: isWin ? "当選" : "ハズレ",
      time: new Date()
    });

  } catch (e) {
    alert("エラー：" + e.message);
    result.innerText = "エラー発生：" + e.message;
  }
});
