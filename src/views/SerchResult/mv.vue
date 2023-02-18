<template>
  <el-card>
    <mvlist
      :data="cloudsearctList"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="cloudsearctResult.mvCount || 100"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSerchStore } from "~/store/serch";
import mvlist from "~/components/MvList/index.vue";

const store = useSerchStore();
const { currentPage, pageSize, cloudsearctResult, cloudsearctList } =
  storeToRefs(store);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  store.pageSize = val;
  store.getCloudsearch();
};
const handleCurrentChange = (val) => {
  store.currentPage = val;
  store.getCloudsearch();
};
</script>

<style lang="less" scoped></style>
