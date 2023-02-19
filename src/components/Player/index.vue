<template>
  <palayer />
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "~/store/player";
import palayer from "./player.vue";

const store = usePlayerStore();
const { songUrl } = storeToRefs(store);
onMounted(() => {
  store.getSongUrl();
});
</script>

<style lang="scss" scoped></style>
