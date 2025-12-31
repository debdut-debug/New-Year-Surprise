// Countdown
const countdownEl = document.getElementById('countdown');
const newYear = new Date(new Date().getFullYear() + 1, 0, 1);

function updateCountdown() {
  const now = new Date();
  const diff = newYear - now;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if(diff <= 0) countdownEl.textContent = "🎉 Happy New Year! 🎉";
}
setInterval(updateCountdown, 1000);

// Puzzle logic
const secretSequence = ["2","4","1","3"];
let userSequence = [];
const buttons = document.querySelectorAll("#puzzle button");
const messageEl = document.getElementById("secretMessage");
const sound = document.getElementById("celebrateSound");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    userSequence.push(button.dataset.value);
    checkSequence();
  });
});

function checkSequence() {
  for(let i=0;i<userSequence.length;i++){
    if(userSequence[i]!==secretSequence[i]){
      userSequence=[];
      return;
    }
  }
  if(userSequence.length===secretSequence.length){
    revealSecret();
  }
}

function revealSecret(){
  playSound();
  decodeMessage("You are amazing! May 2026 bring you joy and success! ✨");
}

function playSound(){ sound.play(); }

function decodeMessage(msg){
  messageEl.classList.remove("hidden");
  let display="";
  let i=0;
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const interval=setInterval(()=>{
    display="";
    for(let j=0;j<msg.length;j++){
      display += (j<=i ? msg[j] : chars[Math.floor(Math.random()*chars.length)]);
    }
    messageEl.textContent = display;
    i++;
    if(i>=msg.length) clearInterval(interval);
  },50);
}

// Fireworks
const canvas=document.getElementById('fireworks');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Firework{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=canvas.height;
    this.targetY=Math.random()*canvas.height/2;
    this.particles=[];
    this.exploded=false;
  }
  update(){
    if(!this.exploded){
      this.y-=5;
      if(this.y<=this.targetY){ this.explode(); this.exploded=true; }
    }
    this.particles.forEach(p=>p.update());
  }
  draw(){
    if(!this.exploded){
      ctx.beginPath();
      ctx.arc(this.x,this.y,3,0,Math.PI*2);
      ctx.fillStyle='white';
      ctx.fill();
    }
    this.particles.forEach(p=>p.draw());
  }
  explode(){ for(let i=0;i<40;i++) this.particles.push(new Particle(this.x,this.y)); }
}

class Particle{
  constructor(x,y){
    this.x=x; this.y=y;
    this.vx=Math.random()*6-3;
    this.vy=Math.random()*-6-3;
    this.alpha=1;
  }
  update(){ this.x+=this.vx; this.y+=this.vy; this.vy+=0.05; this.alpha-=0.02; }
  draw(){ ctx.globalAlpha=this.alpha; ctx.beginPath(); ctx.arc(this.x,this.y,2,0,Math.PI*2); ctx.fillStyle='yellow'; ctx.fill(); ctx.globalAlpha=1; }
}

const fireworks=[];
function animate(){
  ctx.fillStyle="rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if(Math.random()<0.05) fireworks.push(new Firework());
  fireworks.forEach((f,index)=>{
    f.update(); f.draw();
    if(f.particles.every(p=>p.alpha<=0)) fireworks.splice(index,1);
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize",()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
