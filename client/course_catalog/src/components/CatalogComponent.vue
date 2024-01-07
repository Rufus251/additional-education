<template>
  <section class="content clearfix">
    <h2>Каталог курсов</h2>

    <section class="search">
      <TopMultisort
        variant="small"
        :facultiesArray="faculties"
        :courses="courses"
        v-model:autocomplete="autocompleteValue"
      >
      </TopMultisort>
    </section>

    <div class="w-100">
      <hr class="mt-5" />
    </div>

    <aside class="sort">
      <AsideCheckboxSort :types="types" v-model="checkbox"></AsideCheckboxSort>
    </aside>

    <div class="cards">
      <div class="card" v-for="course in sliceSortCourses" :key="course.id">
        <header>
          <p class="text1">
            {{ faculties.find((elem) => elem.id == course.facultyId).name }}
          </p>
          <img
            v-if="course.facultyId === 2"
            src="./common/images/courseImages/law.png"
            alt="Course Image"
          />
          <img
            v-else-if="course.facultyId === 3"
            src="./common/images/courseImages/medicine.png"
            alt="Course Image"
          />
          <img
            v-else-if="course.facultyId === 5"
            src="./common/images/courseImages/economy.png"
            alt="Course Image"
          />
          <img
            v-else-if="course.facultyId === 6"
            src="./common/images/courseImages/business.png"
            alt="Course Image"
          />
          <img
            v-else
            src="./common/images/courseImages/pedagogics.png"
            alt="Course Image"
          />
        </header>
        <h4>{{ course.courseName }}</h4>
        <footer>
          <div class="time">
            <img src="./common/images/clock.png" alt="clock icon" />
            <p class="caption">от {{ course.minHours }} ак.ч.</p>
          </div>

          <white-button140 :href="`#`"> Подробнее </white-button140>
        </footer>
      </div>
      <div class="btn" v-if="sortCoursesLength > downloadMoreButton">
        <blue-button180 @click="downloadMoreButton += 10">
          Загрузить ещё 10
        </blue-button180>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    courses: Array,
    eduTypes: Array,
    faculties: Array,
    diplomType: Array,
    courseAdditional: Array,
    courseToAdditional: Array,
  },
  data() {
    return {
      downloadMoreButton: 10,
      autocompleteValue: "",
      checkbox: [[], [], [], []],

      types: [
        {
          name: "Тип обучения",
          isOpen: false,
          array: [...this.eduTypes],
        },
        {
          name: "Факультет",
          isOpen: false,
          array: [...this.faculties],
        },
        {
          name: "Тип выдаваемого документа",
          isOpen: false,
          array: [...this.diplomType],
        },
        {
          name: "Дополнительно",
          isOpen: false,
          array: [...this.courseAdditional],
        },
      ],

      sortedCoursesLength: this.courses.length,
    };
  },
  computed: {
    sortCourses() {
      let courses = this.courses;
      const autocompleteValue = this.autocompleteValue;

      if (autocompleteValue) {
        courses = courses.filter((elem) =>
          elem.courseName.includes(autocompleteValue)
        );

        return courses;
      }

      const checkbox = this.checkbox;
      if (checkbox[0].length) {
        courses = courses.filter((course) =>
          checkbox[0].includes(course.educationTypeId)
        );
      }
      if (checkbox[1].length) {
        courses = courses.filter((course) =>
          checkbox[1].includes(course.facultyId)
        );
      }
      if (checkbox[2].length) {
        courses = courses.filter((course) =>
          checkbox[2].includes(course.diplomTypeId)
        );
      }
      if (checkbox[3].length) {
        let courseToAdditional = this.courseToAdditional;
        courseToAdditional = courseToAdditional.filter((cta) =>
          checkbox[3].includes(cta.courseAdditionalId)
        );
        courseToAdditional = courseToAdditional.map((cta) => cta.coursesId);

        courses = courses.filter((course) =>
          courseToAdditional.includes(course.id)
        );
      }
      return courses;
    },

    sliceSortCourses() {
      const sortedCourses = this.sortCourses;
      return sortedCourses.slice(0, this.downloadMoreButton);
    },

    sortCoursesLength() {
      const sortedCourses = this.sortCourses;
      return sortedCourses.length;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  max-width: 1200px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  padding-bottom: 40px;

  @media (max-width: 1220px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
h2 {
  padding-top: 90px;
  @media (max-width: 1220px) {
    text-align: center;
  }
}
.search {
  margin-top: 30px;
}
.sort {
  max-width: 366px;
  width: 100%;

  float: right;

  @media (max-width: 1220px) {
    float: none;
    margin: auto;
  }
}
.cards {
  float: left;

  margin-top: 40px;

  max-width: 784px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  gap: 50px;

  align-items: stretch;
  justify-content: center;

  @media (max-width: 1220px) {
    float: none;

    margin: auto;
    margin-top: 40px;
  }
  .card {
    position: relative;

    padding-top: 40px;
    padding-left: 30px;
    padding-right: 30px;
    //padding bottom + time block + margin from text
    padding-bottom: calc(30px + 40px + 30px);

    max-width: 367px;
    width: 100%;

    border-radius: 12px;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05);

    @media (max-width: 500px) {
      padding: 25px;
    }

    header {
      display: flex;
      justify-content: space-between;

      img {
        width: 115px;
        height: 70px;

        border-radius: 8px;

        @media (max-width: 400px) {
          display: none;
        }
      }
    }
    h4 {
      margin-top: 10px;
    }
    footer {
      position: absolute;
      bottom: 30px;

      margin-top: 30px;

      display: flex;
      justify-content: space-between;

      @media (max-width: 500px) {
        position: static;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      .time {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .v-btn {
        margin-left: 62px;
        @media (max-width: 500px) {
          margin-left: 0;
        }
      }
    }
  }
  .btn {
    width: 100%;

    display: flex;
    justify-content: center;
  }
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>
