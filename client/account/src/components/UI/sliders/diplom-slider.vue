<template>
  <Carousel ref="carousel" :wrapAround="true" v-model="currentSlide">
    <Slide v-for="license in licenses" :key="license.id">
      <div class="carousel__item">
        <img src="@/components/UI/sliders/slider-img/license.png" alt="license" />
      </div>
    </Slide>
    <template #addons>
      <navigation>
        <template #next>
          <span>
            <svg
              class="carousel__icon"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Arrow pointing to the right"
            >
              <title>Arrow pointing to the right</title>
              <path
                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
              ></path>
            </svg>
          </span>
        </template>
        <template #prev>
          <span>
            <svg
              class="carousel__icon"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Arrow pointing to the left"
            >
              <title>Arrow pointing to the left</title>
              <path
                d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              ></path>
            </svg>
          </span>
        </template>
      </navigation>
    </template>
  </Carousel>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  name: "DiplomSlider",
  props:{
    licenses: Array,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>

<style scoped lang="scss">
.carousel {
  max-width: 390px;
  width: 100%;

  &__item {
    margin-bottom: 20px;

    padding-left: 10px;
    padding-right: 10px;

    img {
      width: 100%;
    }
  }
}
</style>
