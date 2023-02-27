import { defineStore } from "pinia";
import { useArtistList, useartists, useArtistAlbum } from "~/api/api";
import type { Artist } from "~/models/artist";
import type { Song } from "~/models/song";
import type { Album } from "~/models/album";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useArtistStore = defineStore("artist", {
  state: () => {
    return {
      id: 0,
      artist: {} as Artist,
      hotSongs: [] as Song[],
      artists: [] as Artist[],
      hotAlbums: [] as Album[],
      busy: false,
      activeName: "songs",
      pageData: {
        type: -1,
        area: -1,
        initial: "-1",
        page: 1,
        limit: 24,
      },
      currentPage: 1,
      pageSize: 12,
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
    async getArtist() {
      let res = await useartists(this.id);
      this.artist = res.artist;
      this.hotSongs = res.hotSongs;
    },
    async getArtistAlbum() {
      let res = await useArtistAlbum(this.id, this.limit, this.offset);
      this.hotAlbums = res.hotAlbums;
    },
  },
});
