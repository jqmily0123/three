//导入three.js
import * as THREE from "three";
//导入gsap
import gsap from "gsap";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//创建一个函数modifyCityMaterial，用于修改城市的材质
//createCity函数的调用栈
import modifyCityMaterial from "@/three/modify/modifyCityMaterial";
import MeshLine from "@/three/mesh/MeshLine";
import scene from "@/three/scene";
import FlyLine from "@/three/mesh/FlyLine";
import FlyLightShader from "@/three/mesh/FlyLightShader";
import LightRadar from "@/three/mesh/LightRadar";
import LightWall from "@/three/mesh/LightWall";
import AlarmSprite from "@/three/mesh/AlarmSprite";
export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    //这里的gltf.scene是一个THREE.Group对象，包含了整个场景的模型

    // console.log(gltf.scene);
    //遍历场景中的每一个模型 这里gltf.scene.traverse遍历的是scene的children属性
    //gltf.scene.children.forEach 等同于gltf.scene.traverse((item)=>{})
    // 在scene属性之中 包含一个一个的mesh对象 这些mesh对象每一个都包含了一个一个geometry对象和一个material对象
    gltf.scene.children.forEach((item) => {
      //item是一个THREE.Mesh对象
      // console.log(item);
      // console.log(item);

      //如果item的类型是Mesh表示的是建筑物群 这里的建筑物群里面有两个物体 一个是建筑物 一个是地面
      if (item.type == "Mesh") {
        item.material.side = THREE.DoubleSide;
        // console.log(item);
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33),
        });
        item.material = cityMaterial;
        modifyCityMaterial(item);
        //盘点一下给建筑物添加边线的步骤
        //1.将建筑物的geometry传入MeshLine的构造函数中
        //2.创建一个LineBasicMaterial对象
        //3.创建一个LineSegments对象
        if (item.name === "Layerbuildings") {
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x;
          meshLine.mesh.scale.set(size, size, size);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene);
    //添加飞线
    const flyLine = new FlyLine();
    // console.log(flyLine);
    scene.add(flyLine.mesh);
    //添加做色器飞线
    const flyLightShader = new FlyLightShader();
    scene.add(flyLightShader.mesh);
    //添加雷达
    const lightRadar = new LightRadar();
    scene.add(lightRadar.mesh);
    //添加光强
    const lightWall = new LightWall();
    scene.add(lightWall.mesh);
    const alarmSprite = new AlarmSprite();
    scene.add(alarmSprite.mesh);
    alarmSprite.onClick((event) => {
      console.log("火警", event);
    });
  });
}
