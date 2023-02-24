<template>
  <el-table
    :data="data"
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseOut"
    stripe
    :row-style="{ height: '60px' }"
  >
    <el-table-column type="index" label="序号" width="100">
      <template #default="scope">
        <i
          v-if="scope.row.hoverFlag"
          class="iconfont icon-play"
          title="播放"
          @click="playMusic(scope.row)"
        ></i>
        <div v-if="!scope.row.hoverFlag">
          <span>{{ scope.$index + 1 }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="歌曲">
      <template #default="scope">
        <span
          class="cursor-pointer hover:underline"
          @click="goDiscoverSong(scope.row.id)"
          >{{ scope.row.name }}</span
        >
      </template>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="scope">
        <span
          class="cursor-pointer hover:underline"
          v-for="(item, index) in scope.row.ar"
          @click="goDiscoverAritist(item.id)"
          >{{ item.name }}<i v-if="index != scope.row.ar.length - 1">/</i></span
        >
      </template>
    </el-table-column>
    <el-table-column label="专辑">
      <template #default="scope">
        <span
          class="cursor-pointer hover:underline"
          @click="goDiscoverAlbum(scope.row.al.id)"
          >{{ scope.row.al.name }}</span
        >
      </template>
    </el-table-column>
    <el-table-column label="时长" width="100">
      <template #default="scope">
        <i
          v-if="scope.row.hoverFlag"
          class="mr-3 iconfont icon-add"
          title="添加到列表"
        ></i>
        <i
          v-if="scope.row.hoverFlag"
          class="iconfont icon-collect"
          title="收藏"
        ></i>
        <div v-if="!scope.row.hoverFlag">
          <span>{{ useFormatDuring(scope.row.dt / 1000) }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :currentPage="currentPage"
    :page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total,sizes, prev, pager, next"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { useFormatDuring } from "~/utils/number";
import { usePlayerStore } from "~/store/player";
import { useRouter } from "vue-router";

const props = defineProps({
  data: Object,
  currentPage: Number,
  pageSize: Number,
  small: Boolean,
  disabled: Boolean,
  background: Boolean,
  total: Number,
  handleSizeChange: Function,
  handleCurrentChange: Function,
  handleMouseEnter: Function,
  handleMouseOut: Function,
});

//播放音乐
const playerStore = usePlayerStore();
const playMusic = (row) => {
  playerStore.usePlayer(row);
};

const router = useRouter();
const goDiscoverSong = (id) => {
  router.push({
    path: "/discover/song",
    query: {
      id: id,
    },
  });
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
  font-size: 22px;
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    color: var(--color-text-height);
  }
}
</style>
