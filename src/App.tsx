import { Graph } from "./components/Graph/Graph";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Slider } from "./components/Slider/Slider";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { IPoint, IPoints } from "./types/types";
import { Environment } from "@react-three/drei";
import { ControlsContainer, StyledButton } from "./styled";
import { pointsNumber, min, max } from "./constants/constants";
import { encodePoint } from "./utils/encodeDecodePoint";
import { generatePoints, getAllPossibleEdgePoints } from "./utils/getPointlist";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = false;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export const App = () => {
  const [edgePoints, setEdgePoints] = useState<IPoints["edgePoints"]>([]);
  const [possibleEdgePoints, setPossibleEdgepoints] = useState<IPoint[]>([]);
  const [obstaclesArray, setObstaclesArray] = useState<
    IPoints["obstaclesArray"]
  >([]);

  useEffect(() => {
    const points = generatePoints(pointsNumber, min, max);
    const getPossibleEdgePointsArr = Array.from(
      getAllPossibleEdgePoints(obstaclesArray, min, max)
    );
    setPossibleEdgepoints(getPossibleEdgePointsArr);
    setObstaclesArray(points.obstaclesArray);
  }, []);

  useEffect(() => {
    const points = generatePoints(pointsNumber, min, max);
    setEdgePoints(points.edgePoints);
  }, [obstaclesArray]);

  const handleStartPointChange = (index: number) => {
    setEdgePoints([possibleEdgePoints[index], edgePoints[1]]);
  };

  const handleEndPointChange = (index: number) => {
    setEdgePoints([edgePoints[0], possibleEdgePoints[index]]);
  };

  return (
    <>
      <ControlsContainer>
        <Slider
          min={0}
          max={possibleEdgePoints.length - 1}
          onChange={handleStartPointChange}
          value={possibleEdgePoints.indexOf(edgePoints[0])}
          name="Path start point"
        />
        <Slider
          min={0}
          max={possibleEdgePoints.length - 1}
          onChange={handleEndPointChange}
          value={possibleEdgePoints.indexOf(edgePoints[1])}
          name="Path end point"
        />
        <StyledButton
          onClick={() =>
            setObstaclesArray(
              generatePoints(pointsNumber, min, max).obstaclesArray
            )
          }
          type="button"
        >
          Regenerate
        </StyledButton>
      </ControlsContainer>

      <Canvas camera={{ position: [5, -5, 5], fov: 20 }}>
        {window.innerWidth > 1000 ? (
          <Suspense fallback={null}>
            <Environment
              background={true}
              files={"sunset.hdr"}
              path={"/astar-3d-visualizer/"} //quick workaround for gh-pages
            />
          </Suspense>
        ) : (
          <>
            <color attach={"background"} args={["gray"]} />
          </>
        )}
        <Graph
          points={{ obstaclesArray: obstaclesArray, edgePoints: edgePoints }}
          encodedObstaclesSet={
            new Set(obstaclesArray.map((point: IPoint) => encodePoint(point)))
          }
        />

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
