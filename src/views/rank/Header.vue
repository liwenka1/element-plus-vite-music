<template>
  <el-image
    :src="rank.coverImgUrl"
    style="width: 250px; height: 250px"
    class="rounded-lg"
  ></el-image>
  <el-card class="inline-block w-75% float-right h-250px rounded-lg">
    <span class="text-3xl font-black">{{ rank.name }}</span>
    <span class="text-black text-opacity-50 translate-x-3 inline-block"
      >({{ useFilterTime(rank.updateTime) }}更新)</span
    >
    <div class="transform translate-y-4">
      <el-image
        :src="creator.avatarUrl"
        style="width: 25px; height: 25px"
        class="rounded-full transform translate-y-2"
      >
      </el-image>
      <span class="text-black text-opacity-50 translate-x-3 inline-block">{{
        creator.nickname
      }}</span>
      <span class="text-black text-opacity-50 translate-x-6 inline-block">{{
        useFilterTime(rank.createTime)
      }}</span>
    </div>
    <div class="transform translate-y-8">
      <span class="text-black text-opacity-50"
        ><i class="iconfont icon-play" @click="playMusicAll(rank.tracks)"></i>
        播放全部</span
      >
      <span class="text-black text-opacity-50 translate-x-3 inline-block"
        ><i class="iconfont icon-playnum"></i>
        {{ useNumberFormat(rankCount.playCount) }}</span
      >
      <span class="text-black text-opacity-50 translate-x-6 inline-block"
        ><i class="iconfont icon-collect"></i>
        {{ useNumberFormat(rankCount.bookedCount) }}</span
      >
      <span class="text-black text-opacity-50 translate-x-9 inline-block"
        ><i class="iconfont icon-comment"></i>
        {{ useNumberFormat(rankCount.commentCount) }}</span
      >
    </div>
    <div class="transform translate-y-20">
      <span class="font-black">歌单简介：</span>
      <span class="text-black text-opacity-50">{{ rank.description }}</span>
    </div>
  </el-card>
</template>

<script setup>
import {} from "vue";
import { useRankStore } from "~/store/rank";
import { storeToRefs } from "pinia";
import { useNumberFormat, useFilterTime } from "~/utils/number";
import { usePlayerStore } from "~/store/player";

const store = useRankStore();
const { rank, rankCount, creator } = storeToRefs(store);

//播放歌单
const playerStore = usePlayerStore();
const playMusicAll = (row) => {
  playerStore.usePlayerAll(row);
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
