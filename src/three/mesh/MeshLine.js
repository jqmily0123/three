import * as THREE from "three";
export default class MeshLine {
  constructor(geometry) {
    const edges = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    //这是一个线段对象
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = geometry;
    this.mesh = line;
  }
}
