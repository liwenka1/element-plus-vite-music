<template>
  <el-skeleton v-if="swiperIf" :loading="false" animated>
    <template #template>
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
    </template>
    <template #default>
      <swiper
        :navigation="true"
        :slidesPerView="5"
        :spaceBetween="30"
        :loop="true"
        :centeredSlides="true"
        :pagination="{
          dynamicBullets: true,
        }"
        :modules="modules"
        class="banner_wrap"
      >
        <swiper-slide v-for="item of data" :key="item.pic">
          <el-image
            :src="item.picUrl"
            :alt="item.name"
            @click="goDiscoverAlbum(item.id)"
            class="-translate-x-220% rounded-md mb-10 cursor-pointer"
          >
            <template #placeholder>
              <div class="image-slot">
                <i class="iconfont icon-placeholder"></i>
              </div>
            </template>
          </el-image>
        </swiper-slide>
      </swiper>
    </template>
  </el-skeleton>
  <el-skeleton v-if="!swiperIf" :loading="false" animated>
    <template #template>
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
    </template>
    <template #default>
      <div
        class="inline-block mt-5 mr-8 h-280px"
        v-for="(item, i) in data"
        :key="i"
      >
        <el-image
          :src="item.picUrl"
          style="width:180px; height: 180px"
          @click="goDiscoverAlbum(item.id)"
          class="rounded-md cursor-pointer"
        ></el-image>
        <span
          class="block truncate cursor-pointer w-220px text-lg hover:underline"
          :title="item.name"
          @click="goDiscoverAlbum(item.id)"
          >{{ item.name }}</span
        >
        <span
          class="inline-block cursor-pointer hover:underline"
          @click="goDiscoverAritist(item.artist.id)"
        >
          {{ item.artist.name }}
        </span>
      </div>
    </template>
  </el-skeleton>
  <el-pagination
    v-if="paginationIf"
    :currentPage="currentPage"
    :page-size="pageSize"
    :page-sizes="[18, 30, 60, 90]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total,sizes, prev, pager, next"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "vue-router";
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y];

const props = defineProps({
  swiperIf: Boolean,
  paginationIf: Boolean,
  data: Object,
  currentPage: Number,
  pageSize: Number,
  small: Boolean,
  disabled: Boolean,
  background: Boolean,
  total: Number,
  handleSizeChange: Function,
  handleCurrentChange: Function,
});

const router = useRouter();
const goDiscoverAlbum = (id) => {
  router.push({
    path: "/discover/album",
    query: {
      id: id,
    },
  });
};
const goDiscoverAritist = (id) => {
  router.push({
    path: "/discover/artist",
    query: {
      id: id,
    },
  });
};
</script>

<style lang="less" scoped></style>
