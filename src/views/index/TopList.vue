<template>
  <div class="flex">
    <el-card shadow="always" v-for="item in playList" class="w-25%">
      <el-image
        :src="item.coverImgUrl"
        style="width: 100px; height: 100px"
      ></el-image>
      <div class="inline-block">
        <span
          class="text-3xl font-semibold transform translate-x-3 -translate-y-10 block cursor-pointer hover:underline"
          :title="item.name"
          @click="handelChange(item.id)"
          >{{ item.name }}</span
        >
        <i
          class="iconfont icon-play block translate-x-3 -translate-y-10 w-22px"
          title="播放"
          @click="playMusicAll(item.tracks)"
        ></i>
      </div>
      <el-table :data="item.tracks.slice(0, 10)" stripe>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="歌曲">
          <template #default="scope">
            <span
              class="truncate cursor-pointer hover:underline"
              :title="scope.row.name"
              >{{ scope.row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <i
              class="iconfont icon-play"
              title="播放"
              @click="playMusic(scope.row)"
            ></i>
          </template> </el-table-column
      ></el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexStore } from "~/store/index";
import { usePlayerStore } from "~/store/player";
import { useRouter } from "vue-router";

const store = useIndexStore();
const { playList } = storeToRefs(store);
onMounted(async () => {
  store.getPlayListDetail();
});

//播放音乐
const playerStore = usePlayerStore();
const playMusic = (row) => {
  playerStore.usePlayer(row);
};

//播放歌单
const playMusicAll = (row) => {
  playerStore.usePlayerAll(row);
};

//路由跳转
const router = useRouter();
const handelChange = (id) => {
  router.push({
    path: "/rank",
    query: {
      id: id,
    },
  });
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 22px;
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    color: var(--color-text-height);
  }
}
</style>
