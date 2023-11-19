<template>
  <div class="lowPriceSlider">
    <h2>Low price</h2>
    <div class="textBtn">
      <p class="text2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et.
      </p>
      <blue-button180 :href="`https://google.com`">
        Смотреть больше
      </blue-button180>
    </div>
    <CourseSlider
      :courses="courses"
      :faculties="faculty"
      sortType="Все курсы"
      additional="Low Price"
    ></CourseSlider>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array,
    faculty: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.lowPriceSlider {
  max-width: 1200px;
  width: 100%;

  margin: auto;
  padding-top: 120px;

  @media (max-width: 1300px) {
    padding-top: 80px;
  }
}
h2 {
  padding-left: 10px;
  padding-right: 10px;

  text-align: left;

  @media (max-width: 1300px) {
    text-align: center;
  }
}

.textBtn {
  margin-top: 40px;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;

    .v-btn {
      margin-top: 20px;
    }
  }

  .text2 {
    padding-left: 10px;
    padding-right: 10px;

    max-width: 570px;
    width: 100%;

    @media (max-width: 1300px) {
      margin-left: auto;
      margin-right: auto;

      text-align: center;
    }
  }
}
</style>
