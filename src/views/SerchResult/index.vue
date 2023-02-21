<template>
  <el-card>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-change="handleChange"
    >
      <el-tab-pane label="单曲" name="songs"
        ><songs v-if="activeName == 'songs'"
      /></el-tab-pane>
      <el-tab-pane label="专辑" name="albums"
        ><albums v-if="activeName == 'albums'"
      /></el-tab-pane>
      <el-tab-pane label="歌手" name="artists"
        ><artists v-if="activeName == 'artists'"
      /></el-tab-pane>
      <el-tab-pane label="歌单" name="playlists"
        ><playlists v-if="activeName == 'playlists'"
      /></el-tab-pane>
      <el-tab-pane label="MV" name="mvs"
        ><mv v-if="activeName == 'mvs'"
      /></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import songs from "./songs.vue";
import albums from "./albums.vue";
import artists from "./artists.vue";
import playlists from "./playlists.vue";
import mv from "./mv.vue";

import { useSerchStore } from "~/store/serch";
import { storeToRefs } from "pinia";

const store = useSerchStore();
const { activeName } = storeToRefs(store);
const handleChange = (name) => {
  store.activeName = name;
  store.type = store.mapType.get(name);
  router.push({
    path: "/search",
    query: {
      keywords: store.keywords,
      type: store.type,
    },
  });
  store.getCloudsearch();
};
const router = useRouter();
onMounted(() => {
  let query = router.currentRoute.value.query;
  store.keywords = query.keywords;
  store.type = query.type;
  store.getCloudsearch();
});
</script>

<style></style>
