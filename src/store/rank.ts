import { defineStore } from "pinia";
import type { PlayListDetail } from "~/models/playlist";
import {
  useTopListDetail,
  usePlayListTrackAll,
  usePlaylistDetailDynamic,
  usePlayListDetail,
} from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useRankStore = defineStore("rank", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 10,
      songs: [] as any[],
      topList: [] as any[],
      mediaList: [] as any[],
      rankList: [] as any[],
      rank: {} as PlayListDetail,
      rankCount: {},
      creator: {},
    };
  },

  getters: {},

  actions: {
    async getTopListDetail() {
      if (this.rankList.length == 0) {
        const res = await useTopListDetail();
        res.forEach((item) => {
          if (item.ToplistType) {
            this.topList.push(item);
          } else {
            this.mediaList.push(item);
          }
        });
        this.rankList = this.topList;
      }
    },
    async getPlayListTrackAll() {
      const res = await usePlayListTrackAll(
        this.rank.id,
        this.pageSize,
        (this.currentPage - 1) * this.pageSize
      );
      this.songs = res;
    },
    async getPlaylistDetailDynamic() {
      const res = await usePlaylistDetailDynamic(this.rank.id);
      this.rankCount = res;
    },
    async getPlayListDetail() {
      const res = await usePlayListDetail(this.rank.id);
      this.rank = res;
      this.creator = res.creator;
    },
  },
});
