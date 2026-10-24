/* =========================================================
   EDIT ONLY THIS CONFIG — baaki sab apne aap render hoga
   Photos: apni image ka path/URL daalo (e.g. "img/us1.jpg").
   Khali chhodo to emoji placeholder dikhega.
   ========================================================= */
const CONFIG = {
  herName: "Vandana",
  heroPhoto: "",

  honest: [
    "I've also wrote something for you down there just keep scrolling."
  ],
  //noButs: 'no "but". no "u also". no "i didn\'t mean it".',
  honestEnd: "I'm sorry for the mistakes I did.",

  drafts: [
    "",
    "Tell me what happend",
    "Nothing",
    "Ik somthing had happend just tell me now.",
    "No nothing had happend you just keep shut your mouth."
  ],
  avatar: "",
  chatFoot: "Ik everything about you that there's something in your mind 🤍",
  sideNote: "I'm not guessing to sound sweet ~ i finally sat down and thought about u instead of me.",

  promises: [
    "no more walking away mid-conversation. .",
    "Ham ek dusre ki baat ka bura nhi manenge.",
    "No more lambi Fights.",
    "No old fights dragged during present arguement."
  ],
  promiseDone: "held to it ~ every single one. written down. yours to hold me to 🤍",
  promiseIdle: n => n === 0 ? "0 ticked ~ take ur time, read them properly first"
                            : `${n} ticked ~ keep going, i mean all of them`,
  
  // baadal hatne par jo emoji girenge
  fallEmojis: ["🌸", "✨", "💖", "🌼", "🦋", "🌈", "🫶", "🌻", "⭐", "🍀"],
  
  skySteps: [
    "okay. it moved a little. 🥺 keep going ~",
    "almost. i can nearly see u through it.",
    "🌤️ there it is. that's what i've been missing all week ~ u."
  ],

  photos: [
    { src: "", emoji: "😄", caption: "BADMOS 🥹" },
    { src: "", emoji: "🌇", caption: "nothing special. that's the point." },
    { src: "", emoji: "🍜", caption: "Us doing fun ✦" },
    { src: "", emoji: "🌊", caption: " 🤍" },
    { src: "", emoji: "☀️", caption: "You at the mountains." }
  ],
  photoNote: "So I hope this would be enough for us ki next time ham cheeze jaldi fix krliya kre instead of streching them for long time.",

  letter: [
    "hey u 🤍,",
    "I've been carrying this around since it happened. not in a dramatic way ~ in the quiet way, where i keep replaying the exact second when we were fighting.",
    "I'm not sorry because u're upset with me. i'd be sorry even if u'd forgiven me on the spot.",
    "I'm sorry because i made the safest person in my life feel unsafe for a bit. and that's not a small thing to me.",
    "I am sorry. i love u. both of those are true at once."
  ],
  letterSign: "— me, still yours ✦",
  letterPS: "(this page stays up. so does the promise.)",

  yesReply: "u have no idea what that just did to me 🥹<br>i'm going to spend a long time making sure u never need this page again ~",
  waitReply: "Yes kar suar 😡."
};

/* ------------------- helpers ------------------- */
const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mk = (tag, cls, html) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html !== undefined) el.innerHTML = html;
  return el;
};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function fillMedia(el, src, fallback) {
  if (src) {
    const img = new Image();
    img.src = src; img.alt = '';
    img.onerror = () => { el.textContent = fallback; };
    el.textContent = '';
    el.appendChild(img);
  } else {
    el.textContent = fallback;
  }
}

/* ------------------- render ------------------- */
document.querySelectorAll('[data-bind="herName"]').forEach(n => n.textContent = CONFIG.herName);
fillMedia($('heroPhoto'), CONFIG.heroPhoto, '🥺');
fillMedia($('avatar'), CONFIG.avatar, '🤍');

CONFIG.honest.forEach(t => $('honestText').appendChild(mk('p', '', t)));
$('noButs').textContent = CONFIG.noButs;
$('honestEnd').textContent = CONFIG.honestEnd;

// chat bubbles — appear one by one when the phone enters view
const chat = $('chat');
const bubbles = CONFIG.drafts.map((t, i) => {
  const b = mk('div', 'bubble' + (i % 2 ? ' me' : ''), t);
  chat.appendChild(b);
  return b;
});
$('chatFoot').textContent = CONFIG.chatFoot;
$('sideNote').textContent = CONFIG.sideNote;

new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  bubbles.forEach((b, i) => setTimeout(() => b.classList.add('show'), reduceMotion ? 0 : i * 700));
  obs.disconnect();
}, { threshold: .25 }).observe(chat);

// promises
const list = $('promiseList');
const total = CONFIG.promises.length;
function updateCounter() {
  const n = list.querySelectorAll('.done').length;
  $('counter').textContent = `${n} / ${total}`;
  const msg = $('counterMsg');
  const all = n === total;
  msg.textContent = all ? CONFIG.promiseDone : CONFIG.promiseIdle(n);
  msg.classList.toggle('all', all);
}
CONFIG.promises.forEach(t => {
  const li = mk('li', '', `<span class="box">✓</span><span class="txt"></span>`);
  li.querySelector('.txt').textContent = t;
  li.tabIndex = 0;
  li.setAttribute('role', 'checkbox');
  li.setAttribute('aria-checked', 'false');
  const toggle = () => {
    li.classList.toggle('done');
    li.setAttribute('aria-checked', li.classList.contains('done'));
    updateCounter();
  };
  li.addEventListener('click', toggle);
  li.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
  });
  list.appendChild(li);
});
updateCounter();

// cloud — 3 pushes
// emoji shower: baadal hatne par upar se girte hain
function emojiShower(count = 45) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const e = mk('span', 'emoji-fall', CONFIG.fallEmojis[Math.floor(Math.random() * CONFIG.fallEmojis.length)]);
    e.style.left = Math.random() * 100 + 'vw';
    e.style.fontSize = 18 + Math.random() * 28 + 'px';
    e.style.animationDuration = 3 + Math.random() * 3 + 's';
    e.style.animationDelay = Math.random() * 1.8 + 's';
    e.style.setProperty('--sway', (Math.random() * 120 - 60) + 'px');
    e.style.setProperty('--spin', (Math.random() * 360 - 180) + 'deg');
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 8500);
  }
}
let pushes = 0;
const cloud = $('cloud'), skyBox = $('skyBox'), skyMsg = $('skyMsg');
const pushDist = [90, 190, 520]; // px per step
cloud.addEventListener('click', () => {
  if (pushes >= 3) return;
  const dir = pushes % 2 === 0 ? 1 : -1;
  const last = pushes === 2;
  cloud.style.setProperty('--push', `${(last ? 1 : dir) * pushDist[pushes]}px`);
  skyMsg.textContent = CONFIG.skySteps[pushes];
  pushes++;
  $('skyHint').style.opacity = 0;
  if (pushes === 3) {
    setTimeout(() => { cloud.classList.add('gone'); skyBox.classList.add('clear'); emojiShower(); }, 350);
  }
});

// photos — colour bleeds in as each one nears the centre of the screen
const gallery = $('gallery');
const shots = CONFIG.photos.map((p, i) => {
  const fig = mk('figure', 'shot');
  const frame = mk('div', 'frame');
  frame.style.setProperty('--tilt', (i % 2 ? 1.4 : -1.4) + 'deg');
  const img = mk('div', 'img');
  fillMedia(img, p.src, p.emoji);
  frame.appendChild(img);
  fig.appendChild(frame);
  fig.appendChild(mk('figcaption', '', p.caption));
  gallery.appendChild(fig);
  return { img, fig, p: 0 };
});
$('photoNote').textContent = CONFIG.photoNote;

// letter
const letter = $('letter');
CONFIG.letter.forEach(t => letter.appendChild(mk('p', '', t)));
letter.appendChild(mk('p', 'sign', CONFIG.letterSign));
letter.appendChild(mk('p', 'ps', CONFIG.letterPS));

// final answers
const reply = $('reply');
function showReply(html) { reply.innerHTML = html; reply.hidden = false; reply.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); }
$('btnYes').addEventListener('click', () => {
  showReply(CONFIG.yesReply);
  if (reduceMotion) return;
  for (let i = 0; i < 22; i++) {
    const h = mk('span', 'heart-float', ['🤍', '💗', '🫶'][i % 3]);
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = 18 + Math.random() * 26 + 'px';
    h.style.animationDelay = Math.random() * 1.2 + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5000);
  }
});
$('btnWait').addEventListener('click', () => showReply(CONFIG.waitReply));

/* ------------------- rain -> sunshine on scroll ------------------- */
const RAIN = [159, 176, 194];   // #9fb0c2
const SUN  = [255, 251, 243];   // #FFFBF3
const root = document.documentElement;
const themeMeta = document.querySelector('meta[name="theme-color"]');
let warm = 0;

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  warm = max > 0 ? clamp(scrollY / (max * 0.7)) : 0;   // fully sunny by ~70% of the page
  const c = RAIN.map((v, i) => Math.round(v + (SUN[i] - v) * warm));
  const rgb = `rgb(${c})`;
  document.body.style.background = rgb;
  root.style.setProperty('--warm', warm.toFixed(3));

  const mid = innerHeight / 2;
  shots.forEach(s => {
    const r = s.fig.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - mid);
    s.p = clamp(1 - d / (innerHeight * 0.55));
    s.img.style.filter = `grayscale(${(1 - s.p).toFixed(2)}) saturate(${(0.7 + s.p * 0.5).toFixed(2)})`;
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

const rainCanvas = $('rain');
const ctx = rainCanvas.getContext('2d');
let W, H, drops = [];
function sizeRain() {
  W = rainCanvas.width = innerWidth;
  H = rainCanvas.height = innerHeight;
  drops = Array.from({ length: Math.round(W / 9) }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    l: 10 + Math.random() * 16, v: 9 + Math.random() * 9
  }));
}
sizeRain();
addEventListener('resize', sizeRain);

function drawRain() {
  ctx.clearRect(0, 0, W, H);
  const intensity = 1 - warm;
  if (intensity > 0.02) {
    ctx.strokeStyle = `rgba(255,255,255,${(0.55 * intensity).toFixed(3)})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    const visible = Math.ceil(drops.length * intensity);
    for (let i = 0; i < visible; i++) {
      const d = drops[i];
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 2, d.y + d.l);
      d.y += d.v; d.x -= 0.6;
      if (d.y > H) { d.y = -d.l; d.x = Math.random() * W; }
    }
    ctx.stroke();
  }
  requestAnimationFrame(drawRain);
}
if (!reduceMotion) drawRain();
