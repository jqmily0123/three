import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//场景开启阴影接收
renderer.shadowMap.enabled = true;
export default renderer;
