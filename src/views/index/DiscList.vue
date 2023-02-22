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
      <AlbumList :paginationIf="false" :data="topAlbumList" />
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAlbumNewest } from "~/api/api";

let topAlbumList = ref([]);
onMounted(async () => {
  const res = await useAlbumNewest();
  topAlbumList.value = res.albums;
  console.log(topAlbumList.value);
});
const router = useRouter();
const goAlbum = () => {
  router.push({
    path: "album",
  });
};
</script>

<style lang="less" scoped></style>
