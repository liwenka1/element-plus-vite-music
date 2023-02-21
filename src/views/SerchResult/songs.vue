<template>
  <el-card>
    <SongsList
      v-if="cloudsearctList"
      :data="cloudsearctList"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="cloudsearctResult.songCount || 0"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
      :handleMouseEnter="handleMouseEnter"
      :handleMouseOut="handleMouseOut"
    />
    <NoList v-if="!cloudsearctList" />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useSerchStore } from "~/store/serch";
import { storeToRefs } from "pinia";
import { copyObj } from "~/utils/utils";

const store = useSerchStore();
const { currentPage, pageSize, cloudsearctList, cloudsearctResult } =
  storeToRefs(store);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getCloudsearch();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getCloudsearch();
};

//单元格hover事件
const handleMouseEnter = (row) => {
  //console.log(row, column, cell, event);
  let Arr = copyObj(store.cloudsearctResult.songs);
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.cloudsearctResult.songs = copyObj(Arr);
};
const handleMouseOut = () => {
  for (let index = 0; index < store.cloudsearctList.length; index++) {
    const element = store.cloudsearctList[index];
    element["hoverFlag"] = false;
  }
};
</script>

<style lang="less" scoped></style>
