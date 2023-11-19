<template>
  <section class="topSlider">
    <header>
      <h2>Популярные программы</h2>
      <blue-button180 :href="`https://google.com`">
        Смотреть больше
      </blue-button180>
    </header>
    <CourseSlider
      :courses="courses"
      :faculties="faculty"
      sortType="Все курсы"
      additional="Top"
    >
    </CourseSlider>
  </section>
</template>

<script>
export default {
  props: {
    popularCourses: Array,
    faculty: Array,
    courses: Array,
  },
};
</script>

<style scoped lang="scss">
.topSlider {
  max-width: 1200px;
  width: 100%;

  margin: auto;
  padding-top: 120px;

  @media (max-width: 1300px) {
    padding-top: 80px;
  }
}

header {
  display: flex;

  justify-content: space-between;
  align-items: center;
  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
  }

  h2 {
    padding-left: 10px;
    padding-right: 10px;

    text-align: left;

    @media (max-width: 1300px) {
      text-align: center;
    }
  }
  .v-btn {
    @media (max-width: 1300px) {
      margin-top: 20px;
    }
  }
}
</style>
