<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
//这个是用来创建调整面板gui对象
import gui from "@/three/gui";

//导入场景
import scene from "@/three/scene";
//导入相机
import camera from "@/three/camera";
//导入控制器
import controls from "@/three/controls";
//导入辅助坐标系
import axisHelper from "@/three/axisHelper";
//导入渲染器
import renderer from "@/three/renderer";
// 导入每一帧的执行函数
import animate from "@/three/animate";
// 初始化调整屏幕
import "@/three/init";
import { onMounted, ref } from "vue";
import createMesh from "@/three/createMesh";
const sceneDiv = ref(null);
scene.add(camera);
scene.add(axisHelper);
// 创建物体
createMesh();

// scene.add(controls);
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});
</script>
<style scoped lang="less">
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
