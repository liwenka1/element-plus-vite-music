<template>
  <el-card shadow="always">
    <el-row>
      <h3
        class="text-4xl font-semibold w-40 inline-block cursor-pointer"
        @click="goRank"
      >
        热门推荐
      </h3>
      <el-button
        v-for="(item, i) in hotList"
        :key="i"
        class="text-lg mt-3 ml-10"
        link
        @click="buttonClick(item.name)"
      >
        {{ item.name }}
      </el-button>
    </el-row>
    <el-row>
      <PlaylistsList :paginationIf="false" :data="personalizedList" />
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useIndexStore } from "~/store/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const hotList = ref([
  { id: 1, name: "华语" },
  { id: 2, name: "流行" },
  { id: 3, name: "摇滚" },
  { id: 4, name: "民谣" },
  { id: 5, name: "电子" },
]);
const store = useIndexStore();
const { personalizedList } = storeToRefs(store);
onMounted(async () => {
  store.getTopPlaylistHighquality();
});

const buttonClick = async (cat) => {
  store.cat = cat;
  store.getTopPlaylistHighquality();
};

const router = useRouter();
const goRank = () => {
  router.push({
    path: "playlist",
  });
};
</script>

<style lang="less" scoped></style>
