import { defineStore } from "pinia";
import { uselyric, useDetail } from "~/api/api";
import type { Song, SongAl, SongAr } from "~/models/song";
import type { PlayListDetailTracks } from "~/models/playlist";

//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions

export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      audio: {},
      audioList: [] as any,
      id: 0,
      songs: {} as Song,
      al: {} as SongAl,
      ar: [] as SongAr[],
      alia: [] as string[],
      lyric: "",
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
    getArName(ar: any[]) {
      let res = "";
      for (let i = 0; i < ar.length; i++) {
        res += ar[i].name;
        if (i !== ar.length - 1) {
          res += "/";
        }
      }
      return res;
    },
    async usePlayer(row: Song) {
      let url = await this.getSongUrl(row.id);
      let lrc = await this.getlyric(row.id);
      let author = this.getArName(row.ar);
      this.getAudio(author, row.name, url, row.al.picUrl, lrc);
    },
    async usePlayerAll(playList: PlayListDetailTracks[]) {
      for (let i = 0; i < playList.length; i++) {
        await this.usePlayer(playList[i]);
      }
    },
    async getDetail() {
      const res = await useDetail(this.id);
      this.songs = res;
      this.al = res.al;
      this.ar = res.ar;
      this.alia = res.alia;
    },
    async getDetaillyric() {
      const res = await this.getlyric(this.id);
      this.lyric = this.formartLyric(res);
    },
    formartLyric(lyric: string) {
      const lrcReg = /^\[(\d{2}):(\d{2}.\d{2,})\]\s*(.+)$/;
      const lyricLis = lyric.split("\n");
      let res = [] as any;
      lyricLis.forEach((item) => {
        const arr = lrcReg.exec(item);

        if (!arr) {
          return;
        }
        res.push({ txt: arr[3] });
      });
      return res;
    },
  },
});
