let sceneIndex = 0;
let bgIndex = 0;
let musicStarted = false;

const scenes = document.querySelectorAll(".scene");
const app = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
const finalText = document.getElementById("finalText");
const confirmBtn = document.getElementById("confirmBtn");
const music = document.getElementById("music");

const backgrounds = [
  "./img1.jpeg",
  "./img2.jpeg",
  "./img3.jpeg",
  "./img4.jpeg"
];

document.body.style.backgroundImage = `url("${backgrounds[0]}")`;

/* PARTÍCULAS */
function softExplosionAround(target, total = 35, duration = 2400) {
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const symbols = ["❤️", "🎈"];

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.position = "fixed";
    el.style.left = rect.left + Math.random() * rect.width + "px";
    el.style.top = rect.top + Math.random() * rect.height + "px";
    el.style.fontSize = Math.random() * 16 + 22 + "px";
    el.style.opacity = "1";
    el.style.pointerEvents = "none";
    el.style.zIndex = 9999;

    document.body.appendChild(el);

    el.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`, opacity: 0 }
    ], { duration });

    setTimeout(() => el.remove(), duration);
  }
}

/* CLICK GLOBAL */
document.addEventListener("click", e => {
  if (!musicStarted) {
    musicStarted = true;
    music.volume = 0.45;
    music.play().catch(()=>{});
    return;
  }
  handleExperienceClick();
});

function handleExperienceClick() {
  const activeScene = document.querySelector(".scene.active");
  softExplosionAround(activeScene);

  if (sceneIndex < scenes.length) {
    scenes[sceneIndex].classList.remove("active");
    sceneIndex++;

    if (sceneIndex < scenes.length) {
      scenes[sceneIndex].classList.add("active");
    } else {
      app.classList.remove("hidden");
    }
  }
}

/* BOTÓN */
nextBtn.addEventListener("click", e => {
  e.stopPropagation();
  softExplosionAround(nextBtn, 45);

  bgIndex++;
  if (bgIndex < backgrounds.length) {
    document.body.style.backgroundImage = `url("${backgrounds[bgIndex]}")`;
  } else {
    finalText.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    setTimeout(() => finalText.classList.add("show"), 150);
    nextBtn.style.display = "none";
  }
});

/* WHATSAPP */
confirmBtn.addEventListener("click", e => {
  e.stopPropagation();
  window.open("https://ccgvcastro.my.canva.site/danixa-ernesto");
});

/* CONTADOR */
const weddingDate = new Date("2026-02-28T00:00:00").getTime();
setInterval(() => {
  const diff = weddingDate - Date.now();
  if (diff < 0) return;

  days.textContent = Math.floor(diff / 86400000);
  hours.textContent = Math.floor((diff / 3600000) % 24);
  minutes.textContent = Math.floor((diff / 60000) % 60);
  seconds.textContent = Math.floor((diff / 1000) % 60);
}, 1000);
