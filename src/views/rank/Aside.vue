<template>
  <el-card
    v-for="item in topHeader"
    class="w-45% inline-block ml-4 rounded-lg cursor-pointer text-center"
    :class="{ 'active-top': topId === item.id }"
    @click="checkoutRank(item.id)"
  >
    <span :class="{ 'text-white': topId === item.id }">
      {{ item.name }}
    </span>
  </el-card>
  <el-card
    v-for="item in rankList"
    :key="item.id"
    :class="{ 'active-rank': rank.id === item.id }"
    class="w-45% inline-block ml-4 rounded-lg cursor-pointer text-center"
    @click="checkRank(item)"
  >
    <el-image
      :src="item.coverImgUrl"
      style="width: 45px; height: 45px"
      class="float-left mr-4 rounded-lg"
    ></el-image>
    <span class="block text-xl text-pink-400 truncate">{{ item.name }}</span>
    <span class="block text-black text-opacity-50">{{
      item.updateFrequency
    }}</span>
  </el-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRankStore } from "~/store/rank";
import { useRouter } from "vue-router";

const store = useRankStore();
const { rank, rankList } = storeToRefs(store);
const router = useRouter();
const topHeader = ref([
  { id: "TOP", name: "特色榜" },
  { id: "Medio", name: "媒体榜" },
]);
onMounted(async () => {
  store.rank.id = router.currentRoute.value.query.id || 19723756;
  store.getTopListDetail();
  store.getPlayListTrackAll();
  store.getPlaylistDetailDynamic();
  store.getPlayListDetail();
});

let topId = ref("TOP");
const checkoutRank = async (id) => {
  topId.value = id;
  if (id == "TOP") {
    store.rankList = store.topList;
    store.rank = store.rankList[0];
    store.getPlayListTrackAll();
    store.getPlaylistDetailDynamic();
    store.getPlayListDetail();
  } else {
    store.rankList = store.mediaList;
    store.rank = store.rankList[0];
    store.getPlayListTrackAll();
    store.getPlaylistDetailDynamic();
    store.getPlayListDetail();
  }
};

const checkRank = async (item) => {
  store.rank = item;
  store.getPlayListTrackAll();
  store.getPlaylistDetailDynamic();
  store.getPlayListDetail();
  router.push({
    path: "/rank",
    query: {
      id: item.id,
    },
  });
};
</script>

<style lang="less" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
.active-top {
  background-color: #ff641e;
  transition: background-color 0.8s ease-in;
}
</style>
