<template>
  <div class="flex mt-10">
    <el-card class="w-35% h-70">
      <span class="text-3xl font-black">{{ songs.name }}</span>
      <p>
        <span class="text-xl text-black text-opacity-50">{{ alia[0] }}</span>
      </p>
      <p class="translate-y-10">
        <span class="text-black text-opacity-50">歌手：</span>
        <span
          class="cursor-pointer hover:underline"
          v-for="(item, index) in ar"
          @click="goDiscoverAritist(item.id)"
          >{{ item.name }}<i v-if="index != ar.length - 1">/</i></span
        >
      </p>
      <p class="translate-y-15">
        <span class="text-black text-opacity-50">所属专辑：</span>
        <span
          class="cursor-pointer hover:underline"
          @click="goDiscoverAlbum(al.id)"
          >{{ al.name }}</span
        >
      </p>
      <p class="translate-y-20">
        <span class="text-black text-opacity-50"
          ><i class="iconfont icon-play" @click="playMusic(songs)"></i>
          立即播放</span
        >
      </p>
    </el-card>
    <el-card class="w-45% h-140 text-center overflow-y-auto overscroll-none">
      <p class="text-3xl font-black">歌词</p>
      <p v-for="item in lyric">{{ item.txt }}</p>
    </el-card>
    <el-card
      class="w-20% h-20% text-center bg-no-repeat bg-center bg-contain p-5"
      style="background-image: url(/src/assets/img/disc.png)"
    >
      <el-image
        class="rounded-full mt-2"
        style="width: 80%; height: 80%"
        :src="al.picUrl"
      />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "~/store/player";
import { storeToRefs } from "pinia";

const store = usePlayerStore();
const { songs, al, ar, alia, lyric } = storeToRefs(store);
const router = useRouter();
onMounted(async () => {
  let query = router.currentRoute.value.query;
  store.id = query.id;
  store.getDetail();
  store.getDetaillyric();
});

const playMusic = (row) => {
  store.usePlayer(row);
};

const goDiscoverAritist = (id) => {
  router.push({
    path: "/discover/artist",
    query: {
      id: id,
    },
  });
};
const goDiscoverAlbum = (id) => {
  router.push({
    path: "/discover/album",
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
