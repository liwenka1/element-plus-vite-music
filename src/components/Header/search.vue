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
    <template #prefix>
      <i class="iconfont icon-search"></i>
    </template>
    <el-option-group
      v-for="group in store.resultList"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.id"
        :label="item.name"
        :value="item.name"
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
  store.getSearchSuggest();
});

const remoteMethod = async (query) => {
  loading.value = true;
  if (query || store.keywords) {
    store.keywords = query || store.keywords;
    await store.getSearchSuggest();
    loading.value = false;
  }
};

const router = useRouter();
const handelChange = (val) => {
  if (val) {
    store.getCloudsearch();
    router.push({
      path: "/search",
      query: {
        keywords: store.keywords,
        type: store.type,
      },
    });
  }
};
</script>

<style lang="less" scoped></style>
