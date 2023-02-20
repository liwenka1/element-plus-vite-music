<template>
  <div class="flex space-x-10">
    <el-card shadow="always" v-for="item in playList" class="w-25%">
      <el-image
        :src="item.coverImgUrl"
        style="width: 100px; height: 100px"
      ></el-image>
      <el-table :data="item.tracks.slice(0, 10)" stripe>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="歌曲"
      /></el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexStore } from "~/store/index";

const store = useIndexStore();
const { playList } = storeToRefs(store);
onMounted(async () => {
  store.getPlayListDetail();
});
</script>

<style lang="less" scoped></style>
