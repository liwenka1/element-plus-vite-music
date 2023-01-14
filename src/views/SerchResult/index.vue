<template>
  <el-card>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="单曲" name="first"
        ><songs class="w-80% m-0"
      /></el-tab-pane>
      <el-tab-pane label="专辑" name="second">专辑</el-tab-pane>
      <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="MV" name="fifth">MV</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import songs from "./songs.vue";

const activeName = ref("first");

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style></style>
