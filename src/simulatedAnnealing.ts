import { City } from "./city";
import { initCanvas } from "./canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./base";
import { getRandomValue, getTotalDistance, swap } from "./utils";

interface Props {
  cityCount?: number;
}

export class SA {
  alpha: 0.99;
  cities: City[];
  temperature: number;
  totalCities: number;
  bestDistance: number;
  animationFrame: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  distanceEl: HTMLSpanElement;

  constructor({ cityCount = 20 }: Props) {
    const { canvas, ctx } = initCanvas();
    this.canvas = canvas;
    this.ctx = ctx;
    this.cities = [];
    this.alpha = 0.99;
    this.totalCities = cityCount;
    this.temperature = 10000;
    this.bestDistance = Infinity;
    this.distanceEl = document.getElementById("distance") as HTMLSpanElement;

    this.initCities();
  }

  initCities = () => {
    for (let i = 0; i < this.totalCities; i++) {
      const { valueA: x, valueB: y } = getRandomValue(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      this.cities.push(new City({ x, y }));
    }
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Path
    for (let i = 0; i < this.cities.length - 1; i++) {
      const city = this.cities[i];
      const nextCity = this.cities[i + 1];
      city.drawPath(this.ctx, nextCity);
    }

    // Draw Cities
    this.cities.forEach((city) => {
      city.drawCity(this.ctx);
    });
  };

  update = () => {
    this.distanceEl.textContent = `${this.bestDistance}`;
    this.temperature *= this.alpha;

    if (this.temperature <= 0) {
      cancelAnimationFrame(this.animationFrame);
    }

    const currentDistance = getTotalDistance(this.cities);

    const { valueA: indexA, valueB: indexB } = getRandomValue(this.totalCities);
    const newCities = [...this.cities];
    swap(newCities, indexA, indexB);
    const newDistance = getTotalDistance(newCities);

    const factor = Math.exp(
      -Math.abs(newDistance - currentDistance) / this.temperature
    );

    if (newDistance < currentDistance) {
      this.cities = [...newCities];
      this.bestDistance = newDistance;
    } else if (factor > Math.random()) {
      this.cities = [...newCities];
    }
  };

  animate = () => {
    this.animationFrame = requestAnimationFrame(this.animate);
    this.draw();
    this.update();
  };
}
