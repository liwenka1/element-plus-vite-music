<template>
  <el-container>
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main>
      <Header />
      <Main />
    </el-main>
  </el-container>
  <Player />
</template>

<script setup>
import {} from "vue";
import Sidebar from "../src/components/Sidebar/indexe.vue";
</script>

<style lang="scss" scoped></style>
