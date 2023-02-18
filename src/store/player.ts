import { defineStore } from "pinia";
import { useSongUrl } from "~/api/api";

//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      id: 447281461,
      songUrl: "",
      arr: [
        "http://m8.music.126.net/20230218161234/9eee661054c2063099a9eba9e8f79b57/ymusic/7028/f41d/6d13/39818fbb2c4c0139bc1b0d92eb99f079.mp3",
        "http://m701.music.126.net/20230218161739/f68f51b9a0b74acd11bcf55ada40b45b/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24947970981/a9c0/ae55/3b63/10987da45939de0ac0f275b7a61c1416.mp3",
      ],
    };
  },

  getters: {},

  actions: {
    async getSongUrl() {
      let res = await useSongUrl(this.id);
      this.songUrl = res[0].url;
    },
  },
});
