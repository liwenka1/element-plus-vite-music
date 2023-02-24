import { defineStore } from "pinia";
import { useArtistList } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useArtistStore = defineStore("artist", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 18,
      count: 0,
      artists: [] as any,
    };
  },

  getters: {
    pageData: (state) => {
      return {
        type: -1,
        area: -1,
        initial: "-1",
        page: state.currentPage,
        limit: state.pageSize,
      };
    },
  },

  actions: {
    async getArtistList() {
      let res = await useArtistList(this.pageData);
      this.artists = res;
    },
  },
});
