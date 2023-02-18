import { defineStore } from "pinia";
import { useMvAll } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useMvListStore = defineStore("mvList", {
  state: () => {
    return {
      area: "全部",
      type: "全部",
      order: "上升最快",
      mvAllData: {
        count: 0,
      },
      count: 0,
      currentPage: 1,
      pageSize: 18,
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
    async getMvAll() {
      this.mvAllData = await useMvAll(
        this.area,
        this.type,
        this.order,
        this.limit,
        this.offset
      );
      if (this.mvAllData.count) {
        this.count = this.mvAllData.count;
      }
    },
  },
});
