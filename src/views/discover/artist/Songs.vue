<template>
  <SongsList
    :paginationIf="false"
    :data="hotSongs"
    :handleMouseEnter="handleMouseEnter"
    :handleMouseOut="handleMouseOut"
  />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArtistStore } from "~/store/artist";
import { storeToRefs } from "pinia";
import { copyObj } from "~/utils/utils";

const store = useArtistStore();
const { hotSongs } = storeToRefs(store);
const router = useRouter();
onMounted(() => {
  let query = router.currentRoute.value.query;
  store.id = query.id;
  store.getArtist();
});
//单元格hover事件
const handleMouseEnter = (row) => {
  //console.log(row, column, cell, event);
  let Arr = copyObj(store.hotSongs);
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.hotSongs = copyObj(Arr);
};
const handleMouseOut = () => {
  for (let index = 0; index < store.hotSongs.length; index++) {
    const element = store.hotSongs[index];
    element["hoverFlag"] = false;
  }
};
</script>

<style lang="less" scoped></style>
