<template>
  <el-card>
    <ArtistsList :data="artists" :busy="busy" :load="load" />
  </el-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
const { artists, busy } = storeToRefs(store);
const load = () => {
  store.pageData.page++;
  store.getPushArtistList();
};
</script>

<style lang="scss" scoped></style>
