import {Vector} from "./vector.js";

export interface Ball extends Vector {
  rad: number;
  vx: number;
  vy: number;
}
