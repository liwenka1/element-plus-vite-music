import { defineStore } from "pinia";
import { useSongUrl } from "~/api/api";

//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions

// APlayer歌曲信息
class Audio {
  // 音频艺术家
  artist: String;
  // 音频名称
  name: String;
  // 音频链接
  url: String;
  // 音频封面
  cover: String;
  // 歌词
  lrc: String;

  constructor(
    artist: String,
    name: String,
    url: String,
    cover: String,
    lrc: String
  ) {
    this.artist = artist;
    this.name = name;
    this.url = url;
    this.cover = cover;
    this.lrc = lrc;
  }
}

export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      id: 447281461,
      songUrl: "",
      arr: [
        {
          author: "123",
          title: "123",
          url: "http://m801.music.126.net/20230219234617/c3d87034b7e2535547ff85b3afdd7371/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/22046760991/6d9b/eb87/f3de/a3cb8fd53c760fb3193b953df03b7531.mp3",
          pic: "123",
          lrc: "123",
        },
        {
          author: "456",
          title: "123",
          url: "http://m701.music.126.net/20230219235502/a4d89d63bec2d89a668bdb1160766712/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24922721521/6198/d48d/5ca1/39aeaee4a8c830b779df09f2b1f9ecb7.mp3",
          pic: "123",
          lrc: "123",
        },
      ],
    };
  },

  getters: {
    audioList: (state) =>
      state.arr.map(
        (value) =>
          new Audio(value.author, value.title, value.url, value.pic, value.lrc)
      ),
  },

  actions: {
    async getSongUrl() {
      let res = await useSongUrl(this.id);
      this.songUrl = res[0].url;
    },
  },
});
