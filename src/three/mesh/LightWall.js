import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/lightWall/vertexShader.glsl";
import fragment from "@/shader/lightWall/fragmentShader.glsl";

export default class LightWall {
  constructor(
    radius = 5,
    length = 2,
    position = { x: 0, z: 0 },
    color = 0xff0000,
  ) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, 2, 32, 1, false);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 1, position.z);
    this.mesh.geometry.computeBoundingBox();
    let { min, max } = this.mesh.geometry.boundingBox;
    let uHeight = max.y - min.y;
    // boundingBox指的是geometry的包围盒
    // 这里的光圈的高度是通过计算geometry的boundingBox的最大值和最小值来计算的
    this.material.uniforms.uHeight = { value: uHeight };
    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
