const input = document.getElementById("instagramId");
const button = document.getElementById("drawBtn");
const result = document.getElementById("result");

// 入力されたらボタンON
input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

// 抽選
button.addEventListener("click", () => {
  const r = Math.random() < 0.5 ? "当たり🎉" : "ハズレ😢";
  result.innerText = r;
});
