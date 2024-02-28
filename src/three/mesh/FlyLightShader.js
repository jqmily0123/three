import * as THREE from "three";
import vertex from "@/shader/flyLine/vertexShader.glsl";
import fragment from "@/shader/flyLine/fragmentShader.glsl";
import gsap from "gsap";
export default class FlyLine {
  constructor(position = { x: -5, z: 0 }, color = 0x00ffff) {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(position.x / 2, 4, position.z / 2),
      new THREE.Vector3(position.x, 0, position.z),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    const points = this.lineCurve.getPoints(1000);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    // 给每一个顶点设置属性
    const aSizeArray = new Float32Array(points.length);
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i;
    }
    console.log(aSizeArray);
    //每一个顶点都对应一个aSize属性
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(aSizeArray, 1),
    );
    // 设置着色器材质
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uLength: { value: points.length },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      // side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.mesh = new THREE.Points(this.geometry, this.material);
    gsap.to(this.material.uniforms.uTime, {
      value: 1000,
      duration: 2,
      repeat: -1,
      ease: "none",
    });
  }
}
