<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
      <el-skeleton-item class="skeleton-img" variant="image" />
    </template>
    <template #default>
      <swiper
        :slidesPerView="4"
        :spaceBetween="30"
        :loop="true"
        :centeredSlides="true"
        :pagination="{
          dynamicBullets: true,
        }"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :modules="modules"
        class="banner_wrap"
      >
        <swiper-slide v-for="item of bannerList" :key="item.pic">
          <el-image
            :src="item.pic"
            :alt="item.typeTitle"
            class="translate-x-55% rounded-md mb-10"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useIndexStore } from "~/store/index";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y];

let loading = ref(true);
const store = useIndexStore();
const { bannerList } = storeToRefs(store);
onMounted(async () => {
  await store.getBannerList();
  loading.value = false;
});
</script>

<style lang="sass" scoped></style>
