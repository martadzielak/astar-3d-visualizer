import { pointsNumber, min, max } from "../constants/constants";
import { encodePoint } from "./encodeDecodePoint";
import { generatePoints, getAllPossibleEdgePoints } from "./getPointlist";

export const points = generatePoints(pointsNumber, min, max);

export const possibleEdgePoints = Array.from(
  getAllPossibleEdgePoints(points.obstaclesArray, min, max)
);

export const possibleEdgePointsNumber = possibleEdgePoints.length;

export const obstaclesSet = new Set(points.obstaclesArray);

export const encodedObstaclesSet = new Set(
  points.obstaclesArray.map((point) => encodePoint(point))
);
