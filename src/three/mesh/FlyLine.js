import * as THREE from "three";
import gsap from "gsap";
export default class FlyLine {
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(10, 0, 0),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    //下面的参数分别是：路径、路径上的点的数量、线的宽度、线的颜色、线的透明度
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 1000, 0.4, 2, false);
    // 设置飞线的材质
    const textLoader = new THREE.TextureLoader();
    //现在这个材质只显示了一半
    this.texture = textLoader.load("./textures/z_11.png");
    //设置材质的重复次数x方向重复1次，y方向重复2次
    this.texture.repeat.set(1, 2);
    //设置材质的环绕方式 重复环绕
    this.texture.wrapS = THREE.RepeatWrapping;
    //设置材质的环绕方式 镜像环绕

    // 在 Three.js 中，纹理（Texture）对象具有 wrapS 和 wrapT 属性，用于控制纹理在几何体表面上超出纹理坐标范围时的行为。
    // wrapS 控制纹理在水平方向上的重复方式。
    // wrapT 控制纹理在垂直方向上的重复方式。
    // THREE.RepeatWrapping 是 Three.js 中的一个常量，用于指定纹理超出坐标范围时的重复行为。
    // 具体地，THREE.RepeatWrapping 表示纹理将被无限地重复。这意味着，当纹理坐标超出了 [0, 1] 的范围时，纹理将在该方向上继续重复。
    // 因此，将 texture.wrapS 设置为 THREE.RepeatWrapping 表示纹理在水平方向上将被无限地重复，
    // 这样即使纹理坐标超出了 [0, 1] 的范围，纹理也会在水平方向上继续重复显示。
    this.texture.wrapT = THREE.MirroredRepeatWrapping;
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
    });
    // 创建飞线物体
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // console.log(this.mesh);
    // 创建飞线的动画 通过修改纹理的偏移量来实现飞线的动画效果
    gsap.to(this.texture.offset, {
      x: -2,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
