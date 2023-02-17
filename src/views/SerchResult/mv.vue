<template>
    <el-card
      v-for="(item, i) in store.cloudsearctList"
      :class="{ 'active-rank': item.id === store.id }"
      class="mb-4 rounded-lg cursor-pointer text-center"
      @click="checkoutRank(item.id, i)"
    >
      <el-image
        :src="item.cover"
        style="width: 45px; height: 45px"
        class="float-left mr-4 rounded-lg -translate-y-3"
      ></el-image
      >{{ item.name }}</el-card
    >
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useSerchStore } from "~/store/serch";
  
  const store = useSerchStore();
  </script>
  
  <style lang="less" scoped></style>
  