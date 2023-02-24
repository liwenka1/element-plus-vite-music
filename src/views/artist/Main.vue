<template>
  <el-card>
    <ArtistsList
      :data="artists"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      :total="count"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
const { currentPage, pageSize, count, artists } = storeToRefs(store);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  store.pageSize = val;
  store.getArtistList();
};
const handleCurrentChange = (val) => {
  store.currentPage = val;
  store.getArtistList();
};
</script>

<style lang="scss" scoped></style>
