<template>
  <el-card shadow="always">
    <el-row>
      <h3
        class="text-4xl font-semibold w-40 inline-block cursor-pointer"
        @click="buttonClick('ALL')"
      >
        新碟上架
      </h3>
      <el-button
        v-for="(item, i) in hotList"
        :key="i"
        class="text-lg mt-3 ml-10"
        link
        @click="buttonClick(item.type)"
      >
        {{ item.name }}
      </el-button>
    </el-row>
    <el-row>
      <albumList :paginationIf="false" :data="topAlbumList" />
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAlbumNew } from "~/api/api";
import albumList from "~/components/AlbumList/index.vue";

const hotList = ref([
  { id: 0, name: "全部", type: "ALL" },
  { id: 1, name: "华语", type: "ZH" },
  { id: 2, name: "欧美", type: "EA" },
  { id: 3, name: "韩国", type: "KR" },
  { id: 4, name: "日本", type: "JP" },
]);
let topAlbumList = ref([]);
onMounted(async () => {
  const res = await useAlbumNew({
    offset: 0,
    limit: 6,
    area: "All",
  });
  topAlbumList.value = res.albums;
});

const buttonClick = async (area) => {
  const res = await useAlbumNew({ offset: 0, limit: 6, area: area });
  topAlbumList.value = res.albums;
};
</script>

<style lang="less" scoped></style>
