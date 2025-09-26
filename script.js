// Loader
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Typewriter
const text = "Discover my projects, skills, and achievements.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();

// Fancy Title color
const title = document.querySelector('.fancy-title');
const originalColor = '#0af';
title.addEventListener('mousemove', () => {
  title.style.color = `hsl(${Math.random()*360},80%,70%)`;
});
title.addEventListener('mouseleave', () => { title.style.color = originalColor; });

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.6;
  reveals.forEach(el => { 
    if(el.getBoundingClientRect().top < trigger) el.classList.add('active'); 
  });
});

// Project Cards Animation
const cards = document.querySelectorAll(".project-card");
window.addEventListener("scroll", () => {
  cards.forEach(card => {
    if(card.getBoundingClientRect().top < window.innerHeight - 100) card.classList.add("show");
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    themeToggle.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeToggle.textContent = "Light Mode";
  }
});

// Void Background
const canvasVoid = document.getElementById("voidBackground");
const ctxVoid = canvasVoid.getContext("2d");
canvasVoid.width = window.innerWidth;
canvasVoid.height = window.innerHeight;
let mouse = { x: canvasVoid.width/2, y: canvasVoid.height/2 };
document.addEventListener("mousemove", e => { mouse.x=e.clientX; mouse.y=e.clientY; });
function drawVoid() {
  ctxVoid.clearRect(0,0,canvasVoid.width,canvasVoid.height);
  ctxVoid.beginPath();
  ctxVoid.arc(mouse.x,mouse.y,200,0,Math.PI*2);
  const gradient = ctxVoid.createRadialGradient(mouse.x,mouse.y,50,mouse.x,mouse.y,200);
  gradient.addColorStop(0,"rgba(0,0,0,0.8)");
  gradient.addColorStop(1,"transparent");
  ctxVoid.fillStyle = gradient;
  ctxVoid.fill();
  requestAnimationFrame(drawVoid);
}
drawVoid();

// Galaxy Canvas
const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Stars
let stars = [];
for(let i=0;i<150;i++){
  stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+1, baseR: Math.random()*2+1, dy: Math.random()*0.3+0.1, pulseDir: Math.random()>0.5?1:-1 });
}

// Shooting Stars
let shootingStars = [];
function createShootingStar() {
  shootingStars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height/2, len: Math.random()*80+50, speed: Math.random()*5+5, angle: Math.random()*0.2-0.1, opacity: Math.random()*0.5+0.5 });
}
setInterval(createShootingStar, Math.random()*3000+3000);

// Draw Loop
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  if(document.body.classList.contains("light")) ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach((s)=>{
    s.r += 0.02*s.pulseDir;
    if(s.r > s.baseR+1 || s.r < s.baseR-0.5) s.pulseDir*=-1;

    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = document.body.classList.contains("light") ? "black" : "white";
    ctx.fill();

    s.y -= s.dy;
    if(s.y<0) s.y = canvas.height;

    // Only mouse lines
    const dx=s.x-mouse.x;
    const dy=s.y-mouse.y;
    const distMouse=Math.hypot(dx,dy);
    if(distMouse<120){
      ctx.beginPath();
      ctx.moveTo(s.x,s.y);
      ctx.lineTo(mouse.x,mouse.y);
      ctx.strokeStyle="rgba(0,255,255,0.25)";
      ctx.shadowColor="rgba(0,255,255,0.3)";
      ctx.shadowBlur=8;
      ctx.stroke();
      ctx.shadowBlur=0;
    }
  });

  // Shooting Stars
  shootingStars.forEach((star,i)=>{
    ctx.beginPath();
    ctx.moveTo(star.x,star.y);
    ctx.lineTo(star.x-star.len*Math.cos(star.angle), star.y-star.len*Math.sin(star.angle));
    ctx.strokeStyle=`rgba(255,255,255,${star.opacity})`;
    ctx.lineWidth=2;
    ctx.stroke();

    star.x += star.speed*Math.cos(star.angle);
    star.y += star.speed*Math.sin(star.angle);

    if(star.x>canvas.width || star.y>canvas.height) shootingStars.splice(i,1);
  });

  requestAnimationFrame(draw);
}
draw();
