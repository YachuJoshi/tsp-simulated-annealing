import { City } from "./city";

export function getRandomValue(countA: number, countB: number = 0) {
  return {
    valueA: Math.floor(Math.random() * countA),
    valueB: Math.floor(Math.random() * (countB || countA)),
  };
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

export function swap<T>(array: T[], indexA: number, indexB: number) {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}
