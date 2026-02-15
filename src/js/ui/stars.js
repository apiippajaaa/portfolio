const container = document.querySelector(".drift-stars");

const STAR_COUNT = 80;

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement("div");

  // random size group
  const types = ["small", "medium", "big"];
  const type = types[Math.floor(Math.random() * types.length)];

  star.classList.add("star", type);

  // random position
  star.style.left = Math.random() * 100 + "%";
  let y = Math.pow(Math.random(), 1.6) * 100;
  star.style.top = y + "%";

  // random animation duration
  star.style.animationDuration = 40 + Math.random() * 80 + "s";

  // random delay
  star.style.animationDelay = -Math.random() * 80 + "s";

  container.appendChild(star);
}
