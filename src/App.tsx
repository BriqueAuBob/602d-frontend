import { Canvas } from "@react-three/fiber";
import SceneContent from "./components/scene/Content";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas id="canvas" camera={{ position: [0, 5, 10], fov: 75 }} flat>
        <SceneContent />
      </Canvas>
    </div>
  );
}
