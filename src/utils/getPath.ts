import { min, max } from "../constants/constants";
import {
  decodePoint,
  EncodedPoint,
  encodePoint,
  Point,
} from "./encodeDecodePoint";

/** d */
function weight(ep1: EncodedPoint, ep2: EncodedPoint) {
  const p1 = decodePoint(ep1);
  const p2 = decodePoint(ep2);
  const dX = p1.x - p2.x;
  const dY = p1.y - p2.y;
  const dZ = p1.z - p2.z;
  return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
}

function lowestFScore(
  openSet: Set<EncodedPoint>,
  fScores: Map<EncodedPoint, number>
) {
  let minFScore = Infinity;
  let minimalElement = null;

  for (const elem of openSet) {
    if (fScores.has(elem) && fScores.get(elem)! < minFScore) {
      minimalElement = elem;
      minFScore = fScores.get(minimalElement)!;
    }
  }
  return minimalElement!;
}

function getNeighbors(element: EncodedPoint, encodedObstaclesSet: Set<string>) {
  const range = [-1, 0, 1];
  const neighbors = [];

  for (const dX of range) {
    for (const dY of range) {
      for (const dZ of range) {
        const point = decodePoint(element);
        const maybeNeighbor = {
          x: point.x + dX,
          y: point.y + dY,
          z: point.z + dZ,
        };
        const encodedMaybeNeighbor = encodePoint(maybeNeighbor);
        if (encodedMaybeNeighbor === element) continue;
        if (encodedObstaclesSet.has(encodedMaybeNeighbor)) continue;

        if (point.x + dX < min) continue;
        if (point.x + dX > max) continue;

        if (point.y + dY < min) continue;
        if (point.y + dY > max) continue;

        if (point.z + dZ < min) continue;
        if (point.z + dZ > max) continue;

        neighbors.push(encodePoint(maybeNeighbor));
      }
    }
  }

  return neighbors;
}

function reconstructPath(
  cameFrom: Map<EncodedPoint, EncodedPoint>,
  current: EncodedPoint | undefined
) {
  let total_path = [current];

  while (current && cameFrom.has(current)) {
    current = cameFrom.get(current);
    total_path.push(current);
  }

  total_path.reverse();
  return total_path.map((point) => {
    return decodePoint(point!);
  });
}

export function aStar(
  startPoint: Point,
  endPoint: Point,
  encodedObstaclesSet: Set<string>
) {
  const encodedStartPoint = encodePoint(startPoint);
  const encodedEndPoint = encodePoint(endPoint);

  const openSet = new Set([encodedStartPoint]);

  const cameFrom = new Map();

  const gScore = new Map([[encodedStartPoint, 0]]);

  // `h` (heuristic)
  const estimateCost = (ep1: EncodedPoint) => weight(ep1, encodedEndPoint);

  const fScore = new Map([
    [encodedStartPoint, estimateCost(encodedStartPoint)],
  ]);

  while (openSet.size > 0) {
    const current = lowestFScore(openSet, fScore);
    if (current === encodedEndPoint) {
      return reconstructPath(cameFrom, encodedEndPoint);
    }

    openSet.delete(current);
    const neighbors = getNeighbors(current, encodedObstaclesSet);
    for (const neighbor of neighbors) {
      const tentative_gScore =
        getOrInf(gScore, current) + weight(current, neighbor);
      if (neighbor && tentative_gScore < getOrInf(gScore, neighbor)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentative_gScore);
        fScore.set(neighbor, tentative_gScore + estimateCost(neighbor));
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }

  return null;
}

const getOrInf = <K>(map: Map<K, number>, key: K): number => {
  return map.get(key) ?? Infinity;
};
