import { EncodedPoint, Point } from "../types/types";
import { decodePoint, encodePoint } from "./encodeDecodePoint";

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomPoint = (
  min: number,
  max: number,
  pointsList: Set<String>
) => {
  let candidate: EncodedPoint | null = null;

  do {
    candidate = encodePoint({
      x: getRandomInt(min, max),
      y: getRandomInt(min, max),
      z: getRandomInt(min, max),
    });
  } while (pointsList.has(candidate));

  return candidate;
};

export const generatePoints = (
  numberOfPoints: number,
  min: number,
  max: number
) => {
  const pointsList = new Set<EncodedPoint>();

  for (let i = 0; i < numberOfPoints; i++) {
    // Creating three random coordinates for a final point in a 3D space
    const point = generateRandomPoint(min, max, pointsList);
    pointsList.add(point);
    const xMax = getRandomInt(0, 4),
      yMax = getRandomInt(0, 4),
      zMax = getRandomInt(0, 4);

    const p = decodePoint(point);

    for (let x = 0; x <= xMax; x++) {
      for (let y = 0; y <= yMax; y++) {
        for (let z = 0; z <= zMax; z++) {
          const newPoint = {
            x: p.x + x,
            y: p.y + y,
            z: p.z + z,
          };
          if (
            (x === 0 && y === 0 && z === 0) ||
            newPoint.x > max ||
            newPoint.y > max ||
            newPoint.z > max ||
            newPoint.x < min ||
            newPoint.y < min ||
            newPoint.z < min
          ) {
            continue;
          }

          pointsList.add(encodePoint(newPoint));
        }
      }
    }
  }

  const obstacles = Array.from(pointsList).map((point) => decodePoint(point));

  const defaultStartPoint = decodePoint(
    generateRandomPoint(min, max, pointsList)
  );
  const defaultEndPoint = decodePoint(
    generateRandomPoint(min, max, pointsList)
  );

  return {
    obstaclesArray: obstacles,
    defaultEdgePoints: [defaultStartPoint, defaultEndPoint],
  };
};

export const getAllPossibleEdgePoints = (
  pointArr: Point[],
  min: number,
  max: number
) => {
  const allPossiblePoints = new Set<Point>();
  for (let x = min; x <= max; x++) {
    for (let y = min; y <= max; y++) {
      for (let z = min; z <= max; z++) {
        allPossiblePoints.add({ x: x, y: y, z: z });
      }
    }
  }
  return getArraysDifference(Array.from(allPossiblePoints), pointArr);
};

const getArraysDifference = (arrA: Point[], arrB: Point[]) => {
  const isSamePoint = (a: Point, b: Point) =>
    a.x === b.x && a.y === b.y && a.z === b.z;

  const onlyInLeft = (arr1: Point[], arr2: Point[], compareFunction: any) =>
    arr1.filter(
      (leftValue) =>
        !arr2.some((rightValue) => compareFunction(leftValue, rightValue))
    );

  const onlyInA = onlyInLeft(arrA, arrB, isSamePoint);

  const result = [...onlyInA];
  return result;
};
