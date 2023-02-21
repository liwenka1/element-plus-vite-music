<template>
  <el-select
    v-model="store.keywords"
    class="w-20%"
    filterable
    remote
    clearable
    reserve-keyword
    placeholder="请输入歌名、歌词、歌手或专辑"
    :remote-method="remoteMethod"
    :loading="loading"
    loading-text
    @change="handelChange"
  >
    <el-option-group
      v-for="group in store.resultList"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.id || item.score"
        :label="item.name || item.searchWord"
        :value="item.name || item.searchWord"
      />
    </el-option-group>
  </el-select>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSerchStore } from "~/store/serch";
import { useRouter } from "vue-router";

const store = useSerchStore();
const loading = ref(false);

onMounted(() => {
  store.keywords = sessionStorage.getItem("keywords");
  console.log(router.currentRoute.value.query);
  store.getSearchHotDetail();
  store.getSearchSuggest();
});

const remoteMethod = async (query) => {
  loading.value = true;
  if (query) {
    store.keywords = query;
    await store.getSearchSuggest();
    loading.value = false;
  } else {
    store.getSearchHotDetail();
    loading.value = false;
  }
};

const router = useRouter();
const handelChange = (val) => {
  if (val) {
    sessionStorage.setItem("keywords", val);
    store.keywords = val;
    store.getCloudsearch();
    router.push({
      path: "/search",
      query: {
        key: store.keywords,
      },
    });
  }
};
</script>

<style lang="less" scoped></style>
