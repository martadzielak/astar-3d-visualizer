export type EncodedPoint = string;
export interface Point {
  x: number;
  y: number;
  z: number;
}

export const encodePoint: (p: Point) => EncodedPoint = JSON.stringify;
export const decodePoint: (p: EncodedPoint) => Point = JSON.parse;
