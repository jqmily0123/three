<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup></script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
