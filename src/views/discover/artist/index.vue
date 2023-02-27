<template>
  <div class="flex mt-10">
    <el-card class="w-65%">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-change="handleChange"
      >
        <el-tab-pane label="热门单曲" name="songs">
          <Songs v-if="activeName == 'songs'" />
        </el-tab-pane>
        <el-tab-pane label="所有专辑" name="albums">
          <Albums v-if="activeName == 'albums'" />
        </el-tab-pane>
        <el-tab-pane label="相关mv" name="mv">
          <Mv v-if="activeName == 'mv'" />
        </el-tab-pane>
        <el-tab-pane label="艺人介绍" name="artist">
          <Artist v-if="activeName == 'artist'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="w-35% h-30%">
      <span class="text-3xl font-black">{{ artist.name }}</span>
      <span
        class="text-xl text-black text-opacity-50 inline-block translate-x-3"
        v-for="item in artist.alias"
        >{{ item
        }}<i v-if="item != artist.alias[artist.alias.length - 1]">;</i></span
      >
      <el-image
        class="rounded-md"
        style="width: 100%; height: 100%"
        :src="artist.picUrl"
      />
    </el-card>
  </div>
</template>

<script setup>
import { useArtistStore } from "~/store/artist";
import { storeToRefs } from "pinia";
import Songs from "./Songs.vue";
import Albums from "./Albums.vue";
import Mv from "./Mv.vue";
import Artist from "./Artist.vue";

const store = useArtistStore();
const { activeName, artist } = storeToRefs(store);
const handleChange = (name) => {
  store.activeName = name;
};
</script>

<style lang="less" scoped></style>
