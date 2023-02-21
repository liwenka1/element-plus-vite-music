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
    <el-table-column prop="name" label="歌曲" />
    <el-table-column prop="ar[0].name" label="歌手" />
    <el-table-column prop="al.name" label="专辑" />
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
  console.log(row);
  playerStore.usePlayer(row);
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
