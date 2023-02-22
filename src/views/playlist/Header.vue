<template>
  <el-card>
    <span class="text-3xl font-semibold">{{ cat }}</span>
    <el-popover placement="bottom-start" :width="1400" trigger="click">
      <template #reference>
        <el-button class="ml-5 mb-3"
          >选择分类 <i class="iconfont icon-arrow ml-2"></i
        ></el-button>
      </template>
      <div class="flex flex-col">
        <el-button
          class="my-2 text-xl font-semibold w-20"
          link
          @click="catClick('全部')"
          >全部风格</el-button
        >
        <ul v-for="(item, i) in topCat" :key="i" class="flex my-2">
          <span class="text-xl font-semibold">{{ item }}</span>
          <li v-for="cat in playListCat[i]">
            <el-button
              link
              :class="{
                'active-rank': cat.name === store.cat,
              }"
              class="ml-5"
              @click="catClick(cat.name)"
            >
              {{ cat.name }}
            </el-button>
          </li>
        </ul>
      </div>
    </el-popover>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlayListCatList, useTopPlaylist } from "~/api/api";
import { usePlayListStore } from "~/store/playList";
import { storeToRefs } from "pinia";

const store = usePlayListStore();
const { cat } = storeToRefs(store);
let topCat = ref({});
let playListCat = ref([]);
onMounted(async () => {
  const res = await usePlayListCatList();
  topCat.value = res.categories;
  for (let index = 0; index < 5; index++) {
    let arr = [];
    res.sub.forEach((item) => {
      if (item.category == index) {
        arr.push(item);
      }
    });
    playListCat.value.push(arr);
    arr = [];
  }
  const playList = await useTopPlaylist({ limit: 18, offset: 0, cat: "全部" });
  store.playList = playList;
});
const catClick = async (cat) => {
  const playList = await useTopPlaylist({
    limit: store.limit,
    offset: store.offset,
    cat: cat,
  });
  store.cat = cat;
  store.playList = playList;
};
</script>

<style lang="scss" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
</style>
