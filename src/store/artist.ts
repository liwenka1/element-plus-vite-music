import { defineStore } from "pinia";
import { useArtistList } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useArtistStore = defineStore("artist", {
  state: () => {
    return {
      count: 0,
      artists: [] as any,
      busy: false,
      pageData: {
        type: -1,
        area: -1,
        initial: "-1",
        page: 1,
        limit: 24,
      },
    };
  },

  getters: {},

  actions: {
    async getArtistList() {
      let res = await useArtistList(this.pageData);
      this.artists = res.artists;
    },
    async getPushArtistList() {
      this.busy = true;
      let res = await useArtistList(this.pageData);
      this.artists.push(...res.artists);
      this.busy = !res.more;
    },
  },
});
