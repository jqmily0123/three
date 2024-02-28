import camera from "@/three/camera";
import renderer from "@/three/renderer";

camera.aspect = window.innerHeight / window.innerHeight;
//更新摄像机的投影矩阵
camera.updateProjectionMatrix();

window.addEventListener("resize", () => {
  camera.aspect = window.innerHeight / window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //跟新渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});
