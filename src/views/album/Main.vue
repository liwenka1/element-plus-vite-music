<template>
  <el-card>
    <AlbumList
      :paginationIf="true"
      :data="albumNewList"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="total"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useAlbumStore } from "~/store/album";
import { storeToRefs } from "pinia";

const store = useAlbumStore();
const { currentPage, pageSize, total, albumNewList } = storeToRefs(store);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getAlbumNew();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getAlbumNew();
};
</script>

<style lang="less" scoped></style>
