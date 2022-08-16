import { initCanvas } from "./canvas";
import { cloneDeep } from "lodash";
import { getCities, getTotalDistance, swap } from "./utils";

import "./style.css";

const distanceEl = document.getElementById("distance") as HTMLSpanElement;

let animationFrame: number;
let bestDistance: number;
let temperature = 10000;
const alpha = 0.99;
const totalCities = 20;
let cities = getCities(totalCities);

const { canvas, ctx } = initCanvas();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cities.length - 1; i++) {
    const city = cities[i];
    const nextCity = cities[i + 1];
    ctx.beginPath();
    ctx.moveTo(city.x, city.y);
    ctx.lineTo(nextCity.x, nextCity.y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  cities.forEach((city) => {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(city.x, city.y, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  });
}

function update() {
  distanceEl.textContent = `${bestDistance}`;
  temperature *= alpha;
  console.log(temperature);

  if (temperature <= 0) {
    cancelAnimationFrame(animationFrame);
  }

  const currentDistance = getTotalDistance(cities);

  const indexA = Math.floor(Math.random() * totalCities);
  const indexB = Math.floor(Math.random() * totalCities);
  const newCities = cloneDeep(cities);
  swap(newCities, indexA, indexB);
  const newDistance = getTotalDistance(newCities);

  const factor = Math.exp(
    -Math.abs(newDistance - currentDistance) / temperature
  );

  if (newDistance < currentDistance) {
    cities = [...newCities];
    bestDistance = newDistance;
  } else if (factor > Math.random()) {
    cities = [...newCities];
  }
}

function animate() {
  animationFrame = requestAnimationFrame(animate);

  draw();
  update();
}

animate();
