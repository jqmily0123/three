import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "@/three/camera";
import rendered from "./renderer";
const controls = new OrbitControls(camera, rendered.domElement);
controls.enabled = true;
export default controls;
