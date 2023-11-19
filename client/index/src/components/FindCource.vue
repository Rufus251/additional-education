<template>
  <section class="findCourseSlider">
    <h2>Найти то, что тебе нужно</h2>
    <div class="btns">
      <div class="btn" v-for="btn in faculty" :key="btn.id">
        <input
          v-model="sortType"
          :id="`${btn.id}`"
          type="radio"
          name="type"
          :value="`${btn.name}`"
        />
        <div class="label">
          <label :for="`${btn.id}`" @click="displayId = btn">
            <h5>
              {{ btn.name }}
            </h5>
          </label>
        </div>
      </div>
    </div>
    
    <CourseSlider :courses="courses" :faculties="faculty" :sortType="sortType">
    </CourseSlider>
  </section>
</template>

<script>
export default {
  props: {
    courses: Array,
    faculty: Array,
  },
  data() {
    return {
      sortType: "Все курсы",
    };
  },
};
</script>

<style lang="scss">
@import url(../styles/content/base.scss);
.findCourseSlider {
  max-width: 1200px;
  width: 100%;

  margin: auto;
  margin-top: 120px;

  @media (max-width: 1300px) {
    padding-top: 80px;
  }
  h2 {
    margin-left: 10px;
    margin-right: 10px;

    text-align: center;
  }
  .btns {
    margin-top: 30px;

    margin-left: 10px;
    margin-right: 10px;

    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;

    // custom input
    input {
      display: none;
    }
    input:checked ~ .label {
      color: var(--main-color);

      padding-bottom: 7px;
      border-bottom: 2px solid var(--main-color);
    }
    label {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;

      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
  .CourseSlider{
    margin-top: 60px;
  }
}
</style>
