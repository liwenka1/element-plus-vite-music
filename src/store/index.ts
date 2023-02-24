import { defineStore } from "pinia";
import type { Banner } from "~/models/banner";
import type { PlayListDetail } from "~/models/playlist";
import type { Album } from "~/models/album";
import {
  useBanner,
  usePlayListDetail,
  useTopPlaylistHighquality,
  useAlbumNewest,
} from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      bannerList: [] as Banner[],
      topList: [
        { id: 19723756, name: "飙升榜" },
        { id: 3779629, name: "新歌榜" },
        { id: 2884035, name: "原创榜" },
        { id: 3778678, name: "热歌榜" },
      ],
      playList: [] as PlayListDetail[],
      cat: "",
      personalizedList: [] as PlayListDetail[],
      topAlbumList: [] as Album[],
    };
  },

  getters: {},

  actions: {
    async getBannerList() {
      this.bannerList = await useBanner();
    },
    async getTopPlaylistHighquality() {
      const res = await useTopPlaylistHighquality({
        limit: 6,
        cat: this.cat,
      });
      this.personalizedList = res.playlists;
    },
    async getAlbumNewest() {
      const res = await useAlbumNewest();
      this.topAlbumList = res.albums;
    },
    async getPlayListDetail() {
      if (this.playList.length == 0) {
        for (let i = 0; i < this.topList.length; i++) {
          const res = await usePlayListDetail(this.topList[i].id);
          this.playList.push(res);
        }
      }
    },
  },
});
