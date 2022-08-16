import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./base";

interface City {
  x: number;
  y: number;
}

export function getCities(totalCities: number) {
  let cities: City[] = [];
  for (let i = 0; i < totalCities; i++) {
    const x = Math.floor(Math.random() * CANVAS_WIDTH);
    const y = Math.floor(Math.random() * CANVAS_HEIGHT);
    cities.push({ x, y });
  }

  return cities;
}

export function getTotalDistance(cities: City[]) {
  let distance = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    let cityA = cities[i];
    let cityB = cities[i + 1];
    let xValue = cityA.x - cityB.x;
    let yValue = cityA.y - cityB.y;
    let d = Math.floor(Math.sqrt(xValue * xValue + yValue * yValue));
    distance += d;
  }

  return distance;
}

export function swap<T extends City>(
  array: T[],
  indexA: number,
  indexB: number
) {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}
