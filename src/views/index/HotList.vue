<template>
  <el-card shadow="always">
    <el-row>
      <h3
        class="text-4xl font-semibold w-40 inline-block cursor-pointer"
        @click="buttonClick('全部')"
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
      <playlistsList :paginationIf="false" :data="personalizedList" />
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTopPlaylistHighquality } from "~/api/api";
import playlistsList from "~/components/PlaylistsList/index.vue";

const hotList = ref([
  { id: 1, name: "华语" },
  { id: 2, name: "流行" },
  { id: 3, name: "摇滚" },
  { id: 4, name: "民谣" },
  { id: 5, name: "电子" },
]);
let personalizedList = ref([]);
onMounted(async () => {
  const res = await useTopPlaylistHighquality({ limit: 6 });
  personalizedList.value = res.playlists;
});

const buttonClick = async (cat) => {
  const res = await useTopPlaylistHighquality({ limit: 6, cat: cat });
  personalizedList.value = res.playlists;
};
</script>

<style lang="less" scoped></style>
