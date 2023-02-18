<template>
  <el-card class="absolute bottom-0 left-0 w-20%">
    <span v-for="(item, index) in store.arr">{{ index }}</span>
    <audio
      :src="songUrl"
      type="audio/mp3"
      controls="controls"
      class="w-100%"
    ></audio>
  </el-card>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "~/store/player";

const store = usePlayerStore();
const { songUrl } = storeToRefs(store);
onMounted(() => {
  store.getSongUrl();
});
</script>

<style lang="scss" scoped></style>
