<template>
  <el-card>
    <h3 class="text-4xl font-semibold w-40 inline-block" @click="goRank">
      全部新碟
    </h3>
    <template v-for="(item, i) in hotList">
      <span
        class="text-lg mx-2 cursor-pointer hover:underline"
        link
        @click="areaClick(item.type)"
      >
        {{ item.name }} </span
      ><i v-if="i !== hotList.length - 1">/</i>
    </template>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAlbumStore } from "~/store/album";
import { storeToRefs } from "pinia";

const hotList = ref([
  { type: "ALL", name: "全部" },
  { type: "ZH", name: "华语" },
  { type: "EA", name: "欧美" },
  { type: "KR", name: "韩国" },
  { type: "JP", name: "日本" },
]);
const store = useAlbumStore();
const {} = storeToRefs(store);

onMounted(() => {
  store.getAlbumNew();
});

const areaClick = (area) => {
  store.area = area;
  store.getAlbumNew();
};
</script>

<style lang="less" scoped></style>
