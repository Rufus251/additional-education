<template>
  <Carousel ref="carousel" :breakpoints="breakpoints" v-model="currentSlide">
    <Slide v-for="video in videolections" :key="video.id">
      <a href="#">
        <div class="carousel__item">
          <img :src="`http://localhost:3000/` + video.lectionImg" alt="videolection image" />

          <div class="header">
            <h4>
              {{ video.lectionName }}
            </h4>
          </div>

          <div class="caption">
            <p class="caption name">{{ dataFixer(video.createdAt) }}</p>
            <img src="./slider-img/views.png" alt="views icon" />
            <p class="caption views">{{ video.views }}</p>
          </div>
        </div>
      </a>
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
  name: "VideolectionsSlider",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    videolections: Array,
  },
  data() {
    return {
      breakpoints: {
        320: {
          itemsToShow: 1,
          snapAlign: "center",
          wrapAround: "true",
        },
        600: {
          itemsToShow: 1.5,
          snapAlign: "center",
          wrapAround: "true",
        },
        800: {
          itemsToShow: 2,
          snapAlign: "center",
          wrapAround: "true",
        },
        1000: {
          itemsToShow: 2.5,
          snapAlign: "center",
          wrapAround: "true",
        },
        1300: {
          itemsToShow: 3,
          snapAlign: "center",
          wrapAround: "true",
        },
      },
    };
  },
  methods: {
    dataFixer(data) {
      data = data.slice(0, data.indexOf("T"));
      data = data.split("-");
      // год месяц день
      data[1] = this.monthFixer(data[1])
      return data[2] + " " + data[1] + " " + data[0];
    },
    monthFixer(monthNum) {
      switch (monthNum) {
        case "01":
          return "Jan";
        case "02":
          return "Feb";
        case "03":
          return "Mar";
        case "04":
          return "Apr";
        case "05":
          return "May";
        case "06":
          return "Jun";
        case "07":
          return "Jul";
        case "08":
          return "Aug";
        case "09":
          return "Sep";
        case "10":
          return "Oct";
        case "11":
          return "Nov";
        case "12":
          return "Dec";
        default:
          return "Ошибка";
      }
    },
  },
};
</script>

<style scoped lang="scss">
a:hover{
  opacity: 0.9;
}
.carousel {
  margin-top: 47px;
  margin-bottom: 100px;
  &__item {
    min-height: 300px;
    width: 100%;

    padding-bottom: 22px;

    img {
      width: 100%;

      border-radius: 20px;
    }
    .header {
      margin-top: 20px;
      text-align: left;

      @media (max-width: 450px) {
        text-align: center;
      }
    }
    .caption {
      margin-top: 20px;
      display: flex;

      opacity: 0.8;
      img {
        margin-top: 20px;
        margin-left: 15px;

        height: 14px;
        width: 14px;
      }

      .views {
        margin-left: 6px;
      }
    }
  }

  &__slide {
    padding: 26px;
  }
}
</style>
