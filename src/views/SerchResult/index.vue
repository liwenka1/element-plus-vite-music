<template>
  <el-card>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-change="handleChange"
    >
      <el-tab-pane label="单曲" name="songs"
        ><songs class="w-80% m-0"
      /></el-tab-pane>
      <el-tab-pane label="专辑" name="albums"
        ><albums class="w-80% m-0"
      /></el-tab-pane>
      <el-tab-pane label="歌手" name="artists"
        ><artists class="w-80% m-0"
      /></el-tab-pane>
      <el-tab-pane label="歌单" name="playlists"
        ><playlists class="w-80% m-0"
      /></el-tab-pane>
      <el-tab-pane label="MV" name="mvs"><mv class="w-80% m-0" /></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import songs from "./songs.vue";
import albums from "./albums.vue";
import artists from "./artists.vue";
import playlists from "./playlists.vue";
import mv from "./mv.vue";

import { useSerchStore } from "~/store/serch";

const activeName = ref("songs");
const store = useSerchStore();
const handleChange = (name) => {
  store.getSearchType(name);
};
onMounted(() => {
  store.getSearchType(activeName.value);
});
</script>

<style></style>
