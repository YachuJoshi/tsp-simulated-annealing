interface CityProps {
  x: number;
  y: number;
}

export class City {
  x: number;
  y: number;

  constructor(props: CityProps) {
    this.x = props.x;
    this.y = props.y;
  }

  drawCity(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }

  drawPath(ctx: CanvasRenderingContext2D, next: City) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(next.x, next.y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
}
