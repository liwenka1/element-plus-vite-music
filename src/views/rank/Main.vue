<template>
  <el-card>
    <songsList
      :data="songs"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="rank.trackCount || 100"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
      :handleMouseEnter="handleMouseEnter"
      :handleMouseOut="handleMouseOut"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useRankStore } from "~/store/rank";
import { storeToRefs } from "pinia";
import songsList from "~/components/SongsList/index.vue";

const store = useRankStore();
const { currentPage, pageSize, rank, songs } = storeToRefs(store);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getPlayListTrackAll();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getPlayListTrackAll();
};

//单元格hover事件
const handleMouseEnter = (row) => {
  //console.log(row, column, cell, event);
  let Arr = JSON.parse(JSON.stringify(store.songs));
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.songs = JSON.parse(JSON.stringify(Arr));
};
const handleMouseOut = () => {
  for (let index = 0; index < store.songs.length; index++) {
    const element = store.songs[index];
    element["hoverFlag"] = false;
  }
};
</script>

<style lang="less" scoped></style>
