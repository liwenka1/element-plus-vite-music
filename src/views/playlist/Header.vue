<template>
  <el-card>
    <span class="text-4xl font-semibold">{{ cat }}</span>
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
        <ul v-for="(item, i) in categories" :key="i" class="flex my-2">
          <span class="text-xl font-semibold">{{ item }}</span>
          <li v-for="cat in sub">
            <el-button
              v-if="cat.category == i"
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
import { onMounted } from "vue";
import { usePlayListStore } from "~/store/playList";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = usePlayListStore();
const { cat, categories, sub } = storeToRefs(store);
onMounted(async () => {
  let query = router.currentRoute.value.query;
  store.cat = query.cat || "全部";
  store.getTopPlaylist();
  store.getPlayListCatList();
});

const router = useRouter();
const catClick = async (cat) => {
  store.cat = cat;
  store.getTopPlaylist();
  router.push({
    path: "/playlist",
    query: {
      cat: cat,
    },
  });
};
</script>

<style lang="scss" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
</style>
