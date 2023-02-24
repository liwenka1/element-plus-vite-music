<template>
  <el-card shadow="always">
    <el-row>
      <h3
        class="text-4xl font-semibold w-40 inline-block cursor-pointer"
        @click="goAlbum"
      >
        新碟上架
      </h3>
    </el-row>
    <el-row>
      <AlbumList :swiperIf="true" :paginationIf="false" :data="topAlbumList" />
    </el-row>
  </el-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useIndexStore } from "~/store/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useIndexStore();
const { topAlbumList } = storeToRefs(store);
onMounted(async () => {
  store.getAlbumNewest();
});
const router = useRouter();
const goAlbum = () => {
  router.push({
    path: "album",
  });
};
</script>

<style lang="less" scoped></style>
