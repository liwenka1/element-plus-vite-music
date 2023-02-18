<template>
  <el-card>
    <mvlist
      :data="mvAllData.data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="count || 100"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMvListStore } from "~/store/mvlist";
import mvlist from "~/components/MvList/index.vue";

const store = useMvListStore();
const { currentPage, pageSize, count, mvAllData } = storeToRefs(store);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  store.pageSize = val;
  store.getMvAll();
};
const handleCurrentChange = (val) => {
  store.currentPage = val;
  store.getMvAll();
};
</script>

<style lang="scss" scoped></style>
