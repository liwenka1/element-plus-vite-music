<template>
  <div class="flex mt-10">
    <el-card class="w-30% h-220">
      <span class="text-3xl font-black">{{ rank.name }}</span>
      <p class="translate-y-10">
        <el-image
          class="rounded-md"
          style="width: 10%; height: 10%"
          :src="creator.avatarUrl"
        />
        <span
          class="text-black text-opacity-50 translate-x-2 -translate-y-5 inline-block"
          >{{ creator.nickname }}</span
        >
        <span
          class="text-black text-opacity-50 translate-x-8 -translate-y-5 inline-block"
          >{{ useFilterTime(rank.createTime) }} 创建</span
        >
      </p>
      <p class="translate-y-15">
        <span class="text-black text-opacity-50"
          ><i class="iconfont icon-play" @click="playMusicAll(rank.tracks)"></i>
          立即播放</span
        >
      </p>
      <p class="translate-y-20">
        <span>标签：</span>
        <span
          class="text-black text-opacity-50 mx-2 cursor-pointer hover:underline"
          v-for="item in rank.tags"
          @click="goPlaylist(item)"
          >{{ item }}</span
        >
      </p>
      <p class="translate-y-25">
        <span>介绍：</span>
        <span class="text-black text-opacity-50 mx-2">{{
          rank.description
        }}</span>
      </p>
    </el-card>
    <el-card class="w-50%">
      <SongsList
        :paginationIf="true"
        :data="songs"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :small="small"
        :disabled="disabled"
        :background="background"
        :total="rank.trackCount || 100"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
        :handleMouseEnter="handleMouseEnter"
        :handleMouseOut="handleMouseOut"
      />
    </el-card>
    <el-card class="w-20% h-20% text-center">
      <el-image
        class="mt-2 rounded-md"
        style="width: 100%; height: 100%"
        :src="rank.coverImgUrl"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRankStore } from "~/store/rank";
import { usePlayerStore } from "~/store/player";
import { storeToRefs } from "pinia";
import { copyObj } from "~/utils/utils";
import { useFilterTime } from "~/utils/number";

const store = useRankStore();
const { currentPage, pageSize, rank, songs, creator } = storeToRefs(store);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);
onMounted(async () => {
  let query = router.currentRoute.value.query;
  store.rank.id = query.id;
  store.getPlayListTrackAll();
  store.getPlayListDetail();
});
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getPlayListTrackAll();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getPlayListTrackAll();
};

//单元格hover事件
const handleMouseEnter = (row) => {
  //console.log(row, column, cell, event);
  let Arr = copyObj(store.songs);
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.songs = copyObj(Arr);
};
const handleMouseOut = () => {
  for (let index = 0; index < store.songs.length; index++) {
    const element = store.songs[index];
    element["hoverFlag"] = false;
  }
};

const playerStore = usePlayerStore();
const router = useRouter();
const playMusicAll = (row) => {
  playerStore.usePlayerAll(row);
};
const goPlaylist = async (cat) => {
  router.push({
    path: "/playlist",
    query: {
      cat: cat,
    },
  });
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 20px;
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    color: var(--color-text-height);
  }
}
</style>
