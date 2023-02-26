<template>
  <div
    v-infinite-scroll="load"
    :infinite-scroll-disabled="busy"
    infinite-scroll-immediate="false"
  >
    <div
      class="inline-block mt-5 mr-8 h-280px"
      v-for="(item, i) in data"
      :key="i"
    >
      <el-image
        :src="item.img1v1Url"
        style="width: 90%; height: 70%"
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
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  data: Object,
  busy: Boolean,
  load: Function,
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
