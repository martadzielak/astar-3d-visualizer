import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { FC, useMemo, useState } from "react";
import { IPoint, IPoints } from "../../types/types";
import { aStar } from "../../utils/getPath";

interface IGraphProps {
  points: IPoints;
  encodedObstaclesSet: Set<string>;
}

export const Graph: FC<IGraphProps> = ({ points, encodedObstaclesSet }) => {
  const [rotation, setRotation] = useState(0);
  useFrame(() => {
    setRotation(rotation + 1);
  });
  const path = useMemo(
    () =>
      aStar(points.edgePoints[0], points.edgePoints[1], encodedObstaclesSet),
    [points.edgePoints, encodedObstaclesSet]
  );

  return (
    <group scale={0.1} rotation={[0, rotation / 500, 0]}>
      <group>
        {points.obstaclesArray.map((point: IPoint, i: number) => {
          return (
            <mesh key={"point" + i} position={[point.x, point.y, point.z]}>
              <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={3}>
                <meshStandardMaterial
                  attach="material"
                  metalness={1}
                  bumpScale={0.001}
                  color={0x777777}
                />
              </RoundedBox>
            </mesh>
          );
        })}
      </group>
      <group>
        {[points.edgePoints[0], points.edgePoints[1]].map((point, i) => {
          return (
            <mesh key={"edgepoint" + i} position={[point.x, point.y, point.z]}>
              <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={3}>
                <meshStandardMaterial
                  attach="material"
                  color={0xfc766a}
                  emissive={0xfc766a}
                  emissiveIntensity={10}
                />
              </RoundedBox>
            </mesh>
          );
        })}
      </group>
      {path && (
        <group>
          {path.map((point, i) => {
            return (
              <mesh key={"path" + i} position={[point.x, point.y, point.z]}>
                <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={3}>
                  <meshStandardMaterial attach="material" color={0xfc766a} />
                </RoundedBox>
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};
