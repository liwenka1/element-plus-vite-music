<template>
  <el-card>
    <songsList
      :data="cloudsearctList"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="cloudsearctResult.songCount || 100"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
      :handleMouseEnter="handleMouseEnter"
      :handleMouseOut="handleMouseOut"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useSerchStore } from "~/store/serch";
import { storeToRefs } from "pinia";
import songsList from "~/components/SongsList/index.vue";

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
  let Arr = JSON.parse(JSON.stringify(store.cloudsearctList));
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.cloudsearctList = JSON.parse(JSON.stringify(Arr));
};
const handleMouseOut = () => {
  for (let index = 0; index < store.cloudsearctList.length; index++) {
    const element = store.cloudsearctList[index];
    element["hoverFlag"] = false;
  }
};
</script>

<style lang="less" scoped></style>
