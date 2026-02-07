const heartsLayer = document.querySelector(".hearts");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const hint = document.getElementById("hint");

const dialog = document.getElementById("dialog");
const closeDialog = document.getElementById("closeDialog");

let noCount = 0;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  // Randomize color & size
  const colors = ["#ff4d6d", "#ff7aa2", "#ff2d55", "#ff9bbd", "#ff3b30"];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];

  const size = rand(10, 22);
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  const x = rand(0, window.innerWidth);
  heart.style.left = `${x}px`;
  heart.style.bottom = `-30px`;

  const duration = rand(4, 9);
  heart.style.animationDuration = `${duration}s`;

  heart.style.opacity = `${rand(0.5, 0.95)}`;

  heartsLayer.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

// Hearts loop
setInterval(spawnHeart, 180);

// Make "No" run away on hover or touch
function moveNoButton() {
  noCount += 1;

  const zoneRect = noZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Limit movement inside the no-zone
  const maxX = zoneRect.width - btnRect.width;
  const maxY = zoneRect.height - btnRect.height;

  // If the zone is small, temporarily expand it for more escape room
  if (maxX < 10 || maxY < 10) {
    noZone.style.width = "180px";
    noZone.style.height = "90px";
  }

  const x = rand(0, Math.max(0, maxX));
  const y = rand(0, Math.max(0, maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Hehe nope 😄",
    "Nice try 😋",
    "You sure? 🥺",
    "It’s a *Yes* day 💘",
    "Don’t be shy 😌",
    "I’ll wait… 😊",
    "C’monnn 💞",
  ];

  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Yes -> show cute dialog
yesBtn.addEventListener("click", () => {
  hint.textContent = "Best answer ever 💖";
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    alert("Yayyyy! 💖 You just made my day.");
  }
});

closeDialog.addEventListener("click", () => dialog.close());

// Also move No if clicked (just in case)
noBtn.addEventListener("click", moveNoButton);