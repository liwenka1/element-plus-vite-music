import { defineStore } from "pinia";
import { usePlayListCatList, useTopPlaylist } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const usePlayListStore = defineStore("playList", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 18,
      cat: "全部",
      playList: [] as any,
      categories: [] as any,
      sub: [] as any,
    };
  },

  getters: {
    limit: (state) => {
      return state.pageSize;
    },
    offset: (state) => {
      return (state.currentPage - 1) * state.pageSize;
    },
  },

  actions: {
    async getTopPlaylist() {
      this.playList = await useTopPlaylist({
        limit: this.limit,
        offset: this.offset,
        cat: this.cat,
      });
    },
    async getPlayListCatList() {
      const res = await usePlayListCatList();
      this.categories = res.categories;
      this.sub = res.sub;
    },
  },
});
