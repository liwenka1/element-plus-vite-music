<template>
  <el-card>
    <PlaylistsList
    :data="playList.playlists"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :small="small"
    :disabled="disabled"
    :background="background"
    :total="playList.total || 100"
    :handleSizeChange="handleSizeChange"
    :handleCurrentChange="handleCurrentChange"
  />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { usePlayListStore } from "~/store/playList";
import { storeToRefs } from "pinia";

const store = usePlayListStore();
const { currentPage, pageSize, playList } = storeToRefs(store);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getTopPlaylist();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getTopPlaylist();
};
</script>

<style lang="scss" scoped></style>
