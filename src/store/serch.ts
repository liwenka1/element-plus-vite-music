import { defineStore } from "pinia";
import {
  useSearchHotDetail,
  useSearchSuggest,
  useCloudsearch,
} from "~/api/api";
import type { SearchSuggest } from "~/models/search";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useSerchStore = defineStore("serch", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 10,
      keywords: "",
      name: "songs",
      type: 1 as any,
      mapType: new Map([
        ["songs", 1],
        ["albums", 10],
        ["artists", 100],
        ["playlists", 1000],
        ["mvs", 1004],
      ]),
      searchHotDetail: [] as any,
      result: {} as SearchSuggest,
      resultList: [] as any,
      cloudsearctResult: {} as any,
    };
  },

  getters: {
    cloudsearctList: (state) => {
      return state.cloudsearctResult[state.name];
    },
  },

  actions: {
    async getSearchHotDetail() {
      this.searchHotDetail = await useSearchHotDetail();
      this.resultList = [];
      this.resultList.push({
        label: "hot",
        options: [...this.searchHotDetail],
      });
    },
    async getSearchSuggest() {
      this.result = await useSearchSuggest(this.keywords);
      this.resultList = [];
      if (this.result !== undefined) {
        this.result.order.forEach((item) => {
          for (const key in this.result) {
            if (key === item) {
              if (key === "albums") {
                this.result[key].forEach((ele) => {
                  ele.name = ele.name + " - " + ele.artist.name;
                });
              }
              this.resultList.push({
                label: item,
                options: [...this.result[key]],
              });
            }
          }
        });
      }
    },
    async getCloudsearch() {
      this.cloudsearctResult = await useCloudsearch(
        this.keywords,
        this.currentPage,
        this.pageSize,
        this.type
      );
    },
    getSearchType(name: string) {
      this.type = this.mapType.get(name);
      this.name = name;
      this.getCloudsearch();
    },
  },
});
