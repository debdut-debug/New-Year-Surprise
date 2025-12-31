console.log("JS loaded ✅");

// ===== Typing Effect =====
const greeting = document.getElementById("greeting");
const text = "🎉 Happy New Year! 🥳";
let index = 0;

function typeEffect() {
  if(index < text.length){
    greeting.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect,150);
  }
}
typeEffect();

// ===== Countdown =====
const countdown = document.getElementById("countdown");
let count = 3; // ✅ 3 সেকেন্ড
const timer = setInterval(()=>{
  countdown.innerText = `Revealing surprise in ${count}...`;
  count--;
  if(count < 0){
    clearInterval(timer);
    countdown.innerText = "🎊 Surprise Time! 🎊";
  }
},1000);

// ===== Puzzle / Secret Message =====
const buttons = document.querySelectorAll("#puzzle button");
const secret = document.getElementById("secretMessage");
const audio = document.getElementById("celebrateSound");

// Correct sequence: 2,4,1,3
const correctSequence = [2,4,1,3];
let userSequence = [];

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    userSequence.push(parseInt(btn.dataset.value));

    if(userSequence.length === correctSequence.length){
      const correct = userSequence.every((v,i) => v===correctSequence[i]);
      if(correct){
        secret.classList.remove("hidden");  // Show secret message
        audio.play();                        // Play celebration music
        fireworks();                          // Show fireworks
      } else {
        userSequence = [];
        shakePuzzle();                        // Wrong sequence → shake
      }
    }
  });
});

function shakePuzzle(){
  const puzzle = document.getElementById("puzzle");
  puzzle.classList.add("shake");
  setTimeout(()=>puzzle.classList.remove("shake"),500);
}

// ===== Fireworks =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function fireworks(){
  for(let i=0;i<200;i++){
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height;
    const r = Math.random()*4+2;
    const color = `hsl(${Math.random()*360},100%,50%)`;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.fillStyle = color;
    ctx.fill();
  }
  setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),800);
}
