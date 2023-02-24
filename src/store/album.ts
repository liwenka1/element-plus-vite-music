import { defineStore } from "pinia";
import { useAlbumNew } from "~/api/api";
import type { Album } from "~/models/album";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useAlbumStore = defineStore("album", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 18,
      area: "",
      albumNewList: [] as Album[],
      total: 0,
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
    async getAlbumNew() {
      const res = await useAlbumNew({
        offset: this.offset,
        limit: this.limit,
        area: this.area,
      });
      this.albumNewList = res.albums;
      this.total = res.total;
    },
  },
});
