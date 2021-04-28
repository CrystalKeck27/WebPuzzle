import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {Ball} from "../math/ball.js";

// noinspection DuplicatedCode
@Component({
  selector: "app-game-canvas",
  templateUrl: "./game-canvas.component.html",
  styleUrls: ["./game-canvas.component.css"]
})
export class GameCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("canvasElement") canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  balls: Ball[];
  movements: (() => void)[];
  movement: number;

  constructor() {
    this.balls = [];
    this.movements = [
      this.bounce.bind(this),
      this.noGrav.bind(this),
      this.repel.bind(this),
      this.gravitron.bind(this)
    ];
    this.movement = 0;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.background("#EEE");
    this.initBalls();
    requestAnimationFrame(this.animate.bind(this));
    setInterval(this.nextMovement.bind(this), 10000);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.movements[this.movement]();
  }

  nextMovement() {
    this.movement++;
    if (this.movement >= this.movements.length) this.movement = 0;
  }

  initBalls() {
    for (let i = 0; i < 10; i++) {
      this.balls[i] = {
        x: this.width / 2,
        y: this.height / 2,
        vx: Math.random() * 6 - 3,
        vy: Math.random() * 2 - 1,
        rad: 5
      };
    }
  }

  background(color: string | CanvasGradient | CanvasPattern): void {
    this.context.save();
    this.context.resetTransform();
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  render() {
    this.background("#EEE");
    this.context.fillStyle = "#50A";
    for (let ball of this.balls) {
      this.context.beginPath();
      this.context.ellipse(ball.x, ball.y, ball.rad, ball.rad, 0, 0, 2 * Math.PI);
      this.context.fill();
    }
  }

  bounce() {
    for (let ball of this.balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < ball.rad) ball.vx = Math.abs(ball.vx);
      else if (ball.x > this.width - ball.rad) ball.vx = -Math.abs(ball.vx);
      if (ball.y < ball.rad) ball.vy = Math.abs(ball.vy);
      else if (ball.y > this.height - ball.rad) ball.vy = -Math.abs(ball.vy);
      else ball.vy += 0.1;
    }
  }

  noGrav() {
    for (let ball of this.balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < ball.rad) ball.vx = Math.abs(ball.vx);
      else if (ball.x > this.width - ball.rad) ball.vx = -Math.abs(ball.vx);
      if (ball.y < ball.rad) ball.vy = Math.abs(ball.vy);
      else if (ball.y > this.height - ball.rad) ball.vy = -Math.abs(ball.vy);
    }
  }

  repel() {
    for (let ball of this.balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < ball.rad) ball.vx = Math.abs(ball.vx);
      else if (ball.x > this.width - ball.rad) ball.vx = -Math.abs(ball.vx);
      if (ball.y < ball.rad) ball.vy = Math.abs(ball.vy);
      else if (ball.y > this.height - ball.rad) ball.vy = -Math.abs(ball.vy);
      for (const repBall of this.balls) {
        if(repBall != ball) {
          let influence = 1 / (Math.sqrt((ball.x - repBall.x) ** 2 + (ball.y - repBall.y) ** 2) + 1);
          let angle = Math.atan2(ball.y - repBall.y, ball.x - repBall.x);
          ball.vx += influence * Math.cos(angle);
          ball.vy += influence * Math.sin(angle);
        }
      }
    }
  }

  gravitron() {
    for (let ball of this.balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < ball.rad) ball.vx = Math.abs(ball.vx);
      else if (ball.x > this.width - ball.rad) ball.vx = -Math.abs(ball.vx);
      if (ball.y < ball.rad) ball.vy = Math.abs(ball.vy);
      else if (ball.y > this.height - ball.rad) ball.vy = -Math.abs(ball.vy);
      for (const repBall of this.balls) {
        if(repBall != ball) {
          let influence = 1 / (Math.sqrt((ball.x - repBall.x) ** 2 + (ball.y - repBall.y) ** 2) + 1);
          let angle = Math.atan2(ball.y - repBall.y, ball.x - repBall.x);
          ball.vx += influence * Math.cos(angle);
          ball.vy += influence * Math.sin(angle);
        }
      }
      let influence = Math.sqrt((ball.x - this.width/2) ** 2 + (ball.y - this.height/2) ** 2) / 1000;
      let angle = Math.atan2(ball.y - this.height/2, ball.x - this.width/2);
      ball.vx += -influence * Math.cos(angle);
      ball.vy += -influence * Math.sin(angle);
      ball.vy += 0.05 * Math.cos(angle);
      ball.vx += -0.05 * Math.sin(angle);
      ball.vx *= 0.9;
      ball.vy *= 0.9;
    }
  }

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }
}
