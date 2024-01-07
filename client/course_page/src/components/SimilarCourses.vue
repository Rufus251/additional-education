<template>
  <div class="similarCourses">
    <header>
      <h2>Популярные программы</h2>
      <blue-button180 :href="`#`"> Смотреть больше </blue-button180>
    </header>
    <CourseSlider
      :courses="coursesProp"
      :faculties="facultiesProp"
      :sortType="'Все курсы'"
    ></CourseSlider>
  </div>
</template>

<script>
export default {
  props: {
    coursesProp: Array,
    facultiesProp: Array,
  },
};
</script>

<style scoped lang="scss">
.similarCourses {
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
