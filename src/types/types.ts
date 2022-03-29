export interface IPoint {
  x: number;
  y: number;
  z: number;
}

export type IEncodedPoint = string;

export interface IPoints {
  obstaclesArray: IPoint[];
  edgePoints: IPoint[];
}
