<template>
  <SongsList :paginationIf="false" :data="hotSongs" />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArtistStore } from "~/store/artist";
import { storeToRefs } from "pinia";

const store = useArtistStore();
const { hotSongs } = storeToRefs(store);
const router = useRouter();
onMounted(() => {
  let query = router.currentRoute.value.query;
  store.id = query.id;
  store.getArtist();
});
</script>

<style lang="less" scoped></style>
