import * as THREE from "three";
import camera from "@/three/camera";
import renderer from "@/three/renderer";
import controls from "@/three/controls";
import scene from "@/three/scene";
const clock = new THREE.Clock();
function animate() {
  // controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
export default animate;
