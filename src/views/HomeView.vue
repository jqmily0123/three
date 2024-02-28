<template>
  <div class="home">
    <Scene :eventList="eventList"></Scene>
    <BigScreen :dataInfo="dataInfo" :eventList="eventList"></BigScreen>
  </div>
</template>
<script setup>
import Scene from "../components/Scene.vue";
import BigScreen from "../components/BigScreen.vue";
import vertex from "../shader/test/Vertex.glsl";
import { onMounted, reactive } from "vue";
import { getSmartCityInfo, getSmartCityList } from "../api/api.js";
import { ref } from "vue";
import gsap from "gsap";
// console.log(vertex);
const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
});
onMounted(() => {
  changeInfo();
  getEventList();
});

const changeInfo = async () => {
  //获取到的信息有事件的名称 类型 位置信息
  let res = await getSmartCityInfo();
  // console.log(res);
  for (let key in dataInfo) {
    dataInfo[key].name = res.data.data[key].name;
    dataInfo[key].unit = res.data.data[key].unit;
    // 盲猜这个的作用应该是 在1s时间内将数量加到number
    gsap.to(dataInfo[key], {
      number: res.data.data[key].number,
      duration: 1,
    });
  }
};
const eventList = ref([]);
const getEventList = async () => {
  let res = await getSmartCityList();
  // console.log(res);
  eventList.value = res.data.list;
  // console.log(eventList.value);
};
</script>
