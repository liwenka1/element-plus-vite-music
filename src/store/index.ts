import { defineStore } from "pinia";
import { usePlayListDetail } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      topList: [
        { id: 19723756, name: "飙升榜" },
        { id: 3779629, name: "新歌榜" },
        { id: 2884035, name: "原创榜" },
        { id: 3778678, name: "热歌榜" },
      ],
      playList: [] as any,
    };
  },

  getters: {},

  actions: {
    getPlayListDetail() {
      this.topList.forEach(async (item) => {
        const res = await usePlayListDetail(item.id);
        this.playList.push(res);
      });
    },
  },
});
