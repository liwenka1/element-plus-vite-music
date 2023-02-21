<template>
  <div
    class="inline-block mt-5 mr-8 h-280px"
    v-for="(item, i) in data"
    :key="i"
  >
    <el-image
      :src="item.picUrl"
      style="width: 220px; height: 220px"
      class="rounded-md"
    ></el-image>
    <span
      class="block truncate cursor-pointer w-220px text-lg hover:underline"
      :title="item.name"
      >{{ item.name }}</span
    >
    <div class="mt-1">
      <span class="text-black text-opacity-50">by</span>
      <span class="translate-x-2 inline-block cursor-pointer hover:underline">
        {{ item.artist.name }}
      </span>
    </div>
  </div>
  <el-pagination
    v-if="paginationIf"
    :currentPage="currentPage"
    :page-size="pageSize"
    :page-sizes="[10, 30, 60, 90]"
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

const props = defineProps({
  paginationIf: Boolean,
  data: Object,
  currentPage: Number,
  pageSize: Number,
  small: Boolean,
  disabled: Boolean,
  background: Boolean,
  total: Number,
  handleSizeChange: Function,
  handleCurrentChange: Function,
});
</script>

<style lang="less" scoped></style>
