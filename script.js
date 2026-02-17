// CURSOR CUSTOM
if(window.innerWidth>768){
const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";});
}else{document.querySelector(".cursor").style.display="none"}

// BUTTON CV ANIMATION
const btn=document.querySelector(".download-btn");
btn.addEventListener("click",()=>{
btn.innerText="Téléchargement...";
setTimeout(()=>{btn.innerText="Téléchargé ✔"},1500);});

// STATS COUNTER
const counters=document.querySelectorAll(".count");
counters.forEach(counter=>{
  counter.innerText='0';
  const updateCount=()=>{
    const target=+counter.getAttribute('data-target');
    const count=+counter.innerText;
    const increment=target/50;
    if(count<target){
      counter.innerText=Math.ceil(count+increment);
      setTimeout(updateCount,30);
    } else counter.innerText=target;
  };
  updateCount();
});

// MATRIX BACKGROUND
const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>?/\\|';
const fontSize=14;
const columns=canvas.width/fontSize;
const drops=[];
for(let x=0;x<columns;x++)drops[x]=Math.random()*canvas.height;
function draw(){
  ctx.fillStyle='rgba(0,0,0,0.05)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#00ff99';
  ctx.font=fontSize+'px monospace';
  for(let i=0;i<drops.length;i++){
    const text=letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height||Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw,50);
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
