import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Vector} from '../vector';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasElement') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  balls: [Vector];

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.background('#EEE');
  }

  background(color: string | CanvasGradient | CanvasPattern): void {
    this.context.save();
    this.context.resetTransform();
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  render() {

  }

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }
}
