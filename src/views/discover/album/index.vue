<template>
  <div class="flex mt-10">
    <el-card class="w-30% h-220">
      <span class="text-3xl font-black">{{ album.name }}</span>
      <p class="translate-y-10">
        <span class="text-black text-opacity-50 -translate-y-5 inline-block">
          歌手：</span
        >
        <span
          class="text-black text-opacity-50 translate-x-2 -translate-y-5 inline-block cursor-pointer hover:underline"
          v-for="artist in artists"
          @click="goDiscoverAritist(artist.id)"
          >{{ artist.name
          }}<i v-if="artist != artists[artists.length - 1]">/</i></span
        >
      </p>
      <p class="translate-y-12.5">
        <span class="text-black text-opacity-50">
          发行时间：{{ useFilterTime(album.publishTime) }}</span
        >
      </p>
      <p class="translate-y-15">
        <span class="text-black text-opacity-50"
          ><i class="iconfont icon-play" @click="playMusicAll(songs)"></i>
          立即播放</span
        >
      </p>
    </el-card>
    <el-card class="w-50%">
      <SongsList
        :paginationIf="false"
        :data="songs"
        :handleMouseEnter="handleMouseEnter"
        :handleMouseOut="handleMouseOut"
      />
    </el-card>
    <el-card class="w-20% h-20% text-center">
      <el-image
        class="mt-2 rounded-md"
        style="width: 100%; height: 100%"
        :src="album.picUrl"
      />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAlbumStore } from "~/store/album";
import { usePlayerStore } from "~/store/player";
import { storeToRefs } from "pinia";
import { copyObj } from "~/utils/utils";
import { useFilterTime } from "~/utils/number";

const store = useAlbumStore();
const { album, artists, songs } = storeToRefs(store);

onMounted(async () => {
  let query = router.currentRoute.value.query;
  store.albumId = query.id;
  store.getAlbum();
});

//单元格hover事件
const handleMouseEnter = (row) => {
  //console.log(row, column, cell, event);
  let Arr = copyObj(store.songs);
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.songs = copyObj(Arr);
};
const handleMouseOut = () => {
  for (let index = 0; index < store.songs.length; index++) {
    const element = store.songs[index];
    element["hoverFlag"] = false;
  }
};

const playerStore = usePlayerStore();
const router = useRouter();
const playMusicAll = (row) => {
  playerStore.usePlayerAll(row);
};
const goDiscoverAritist = (id) => {
  router.push({
    path: "/discover/artist",
    query: {
      id: id,
    },
  });
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 20px;
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    color: var(--color-text-height);
  }
}
</style>
