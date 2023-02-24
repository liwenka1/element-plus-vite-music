<template>
  <div
    class="inline-block mt-5 mr-8 h-280px"
    v-for="(item, i) in data"
    :key="i"
  >
    <el-image
      :src="item.picUrl"
      style="width: 220px; height: 220px"
      @click="goDiscoverAritist(item.id)"
      class="rounded-md cursor-pointer"
    ></el-image>
    <span
      class="block truncate cursor-pointer w-220px text-lg hover:underline"
      :title="item.name"
      @click="goDiscoverAritist(item.id)"
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
});

const router = useRouter();
const goDiscoverAritist = (id) => {
  router.push({
    path: "/discover/artist",
    query: {
      id: id,
    },
  });
};
</script>

<style lang="less" scoped></style>
