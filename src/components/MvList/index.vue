<template>
  <div class="inline-block my-5" v-for="(item, i) in data" :key="i">
    <el-image
      :src="item.cover"
      style="width: 300px; height: 167px"
      class="mr-8 rounded-md"
    ></el-image>
    <span
      class="block text-lg truncate cursor-pointer w-280px hover:underline"
      :title="item.name"
      >{{ item.name }}</span
    >
  </div>
  <el-pagination
    :currentPage="currentPage"
    :page-size="pageSize"
    :page-sizes="[18, 30, 60, 90]"
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
import { defineProps } from "vue";

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
});
</script>

<style lang="less" scoped></style>
