<template>
  <AlbumList
    :paginationIf="true"
    :data="hotAlbums"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :small="small"
    :disabled="disabled"
    :background="background"
    :total="artist.albumSize || 0"
    :handleSizeChange="handleSizeChange"
    :handleCurrentChange="handleCurrentChange"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArtistStore } from "~/store/artist";
import { storeToRefs } from "pinia";

const store = useArtistStore();
const { currentPage, pageSize, artist, hotAlbums } = storeToRefs(store);
const router = useRouter();
onMounted(() => {
  let query = router.currentRoute.value.query;
  store.id = query.id;
  store.getArtist();
  store.getArtistAlbum();
});
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getArtistAlbum();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getArtistAlbum();
};
</script>

<style lang="less" scoped></style>
