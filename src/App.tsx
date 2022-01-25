import { Graph } from "./components/Graph/Graph";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Slider } from "./components/Slider/Slider";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import {
  points,
  possibleEdgePoints,
  possibleEdgePointsNumber,
} from "./utils/points";
import { Environment } from "@react-three/drei";
import { ControlsContainer } from "./styled";
import * as THREE from "three";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 1;
    controls.maxDistance = 60;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export const App = () => {
  const [startPoint, setStartPoint] = useState(points.defaultEdgePoints[0]);
  const [endPoint, setEndPoint] = useState(points.defaultEdgePoints[1]);

  const handleStartPointChange = (index: number) => {
    setStartPoint(possibleEdgePoints[index]);
  };
  const handleEndPointChange = (index: number) => {
    setEndPoint(possibleEdgePoints[index]);
  };

  return (
    <>
      <ControlsContainer>
        <Slider
          min={0}
          max={possibleEdgePointsNumber - 1}
          onChange={handleStartPointChange}
          value={possibleEdgePoints.indexOf(startPoint)}
        />
        <Slider
          min={0}
          max={possibleEdgePointsNumber - 1}
          onChange={handleEndPointChange}
          value={possibleEdgePoints.indexOf(endPoint)}
        />
      </ControlsContainer>

      <Canvas camera={{ position: [5, -5, 5], fov: 75 }}>
        {window.innerWidth > 1000 ? (
          <Suspense fallback={null}>
            <Environment
              background={true}
              files={"sunset.hdr"}
              path={"/astar-3d-visualizer/"} //quick workaround for gh-pages
            />
            <Graph startPoint={startPoint} endPoint={endPoint} />
          </Suspense>
        ) : (
          <color attach={"background"} args={["gray"]} />
        )}
        <CameraController />
        <ambientLight intensity={1} color={0xffffff} />
        <pointLight position={[0, 0, 0]} />
        <EffectComposer multisampling={8}>
          <Bloom
            kernelSize={2}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.4}
            intensity={0.5}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};
