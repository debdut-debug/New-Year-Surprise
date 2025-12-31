console.log("JS loaded ✅");

const buttons = document.querySelectorAll("#puzzle button");
const secret = document.getElementById("secretMessage");
const audio = document.getElementById("celebrateSound");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    secret.classList.remove("hidden");
    audio.play();
    alert("🎉 Surprise! 🎉");
  });
});
