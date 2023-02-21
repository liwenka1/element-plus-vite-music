import { defineStore } from "pinia";
import { uselyric } from "~/api/api";
import type { Song } from "~/models/song";
import type {PlayListDetailTracks} from "~/models/playlist";

//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions

export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      audio: {},
      audioList: [] as any,
    };
  },

  getters: {},

  actions: {
    async getSongUrl(id: number) {
      return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    },
    async getlyric(id: number) {
      let res = await uselyric(id);
      return res.lrc.lyric;
    },
    getAudio(
      author: string,
      title: string,
      url: string,
      pic: string,
      lrc: string
    ) {
      this.audio = {
        name: author,
        artist: title,
        url: url,
        cover: pic,
        lrc: lrc,
      };
    },
    async usePlayer(row: Song) {
      let url = await this.getSongUrl(row.id);
      let lrc = await this.getlyric(row.id);
      this.getAudio(row.ar[0].name, row.name, url, row.al.picUrl, lrc);
    },
    async usePlayerAll(playList: PlayListDetailTracks[]) {
      for (let i = 0; i < playList.length; i++) {
        await this.usePlayer(playList[i]);
      }
    },
  },
});
