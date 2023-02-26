<template>
  <el-card>
    <ul v-for="(item, i) in topCat" :key="i" class="flex">
      <span class="text-xl font-semibold">{{ item }}</span>
      <li v-for="cat in catList[i]">
        <el-button
          :class="{
            'active-rank':
              (pageData.type === cat.type && i === '0') ||
              (pageData.area === cat.type && i === '1'),
          }"
          link
          class="ml-5"
          @click="catClick(cat, i)"
          >{{ cat.value }}</el-button
        >
      </li>
    </ul></el-card
  >
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
const { pageData } = storeToRefs(store);
onMounted(() => {
  store.getArtistList();
});
const topCat = ref({ 0: "类型", 1: "区域" });
const catList = ref([
  [
    { type: -1, value: "全部" },
    { type: 1, value: "男歌手" },
    { type: 2, value: "女歌手" },
    { type: 3, value: "乐队" },
  ],
  [
    { type: -1, value: "全部" },
    { type: 7, value: "华语" },
    { type: 96, value: "欧美" },
    { type: 8, value: "日本" },
    { type: 16, value: "韩国" },
    { type: 0, value: "其他" },
  ],
]);
const catClick = (cat, i) => {
  console.log(cat, i);
  if (i == 0) {
    store.pageData.page = 1;
    store.pageData.type = cat.type;
    store.getArtistList();
  } else if (i == 1) {
    store.pageData.page = 1;
    store.pageData.area = cat.type;
    store.getArtistList();
  }
};
</script>

<style lang="scss" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
</style>
