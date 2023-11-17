<template>
  <div>
    <NavBar></NavBar>
  </div>
  <div class="content">
    <CatalogComponent
      v-if="
        courses &&
        eduTypes &&
        faculties &&
        diplomType &&
        courseAdditional &&
        courseToAdditional
      "
      :courses="courses"
      :eduTypes="eduTypes"
      :faculties="faculties"
      :diplomType="diplomType"
      :courseAdditional="courseAdditional"
      :courseToAdditional="courseToAdditional"
    ></CatalogComponent>
  </div>
</template>

<script>
import NavBar from "./components/common/NavBar.vue";
import CatalogComponent from "./components/CatalogComponent.vue";

import axios from "axios";
export default {
  name: "App",
  components: {
    NavBar,
    CatalogComponent,
  },
  data() {
    return {
      courses: false,
      eduTypes: false,
      faculties: false,
      diplomType: false,
      courseAdditional: false,
      courseToAdditional: false,
    };
  },
  methods: {
    async getCourses() {
      try {
        const coursesLink = "http://localhost:3000/course/courses";
        const courses = await axios.get(coursesLink);

        // this.courses = courses.data;
        this.courses = [];
        this.courses.push(...courses.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getEduTypes() {
      try {
        const eduTypesLink = "http://localhost:3000/sort/eduTypes";
        const eduTypes = await axios.get(eduTypesLink);

        this.eduTypes = eduTypes.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getFaculties() {
      try {
        const facultiesLink = "http://localhost:3000/sort/faculty";
        const faculties = await axios.get(facultiesLink);

        this.faculties = faculties.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getDiplomTypes() {
      try {
        const diplomTypeLink = "http://localhost:3000/sort/diplomType";
        const diplomType = await axios.get(diplomTypeLink);

        this.diplomType = diplomType.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseAdditional() {
      try {
        const courseAdditionalLink =
          "http://localhost:3000/sort/courseAdditional";
        const courseAdditional = await axios.get(courseAdditionalLink);

        this.courseAdditional = courseAdditional.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseToAdditional() {
      try {
        const courseToAdditionalLink =
          "http://localhost:3000/sort/courseToAdditional";
        const courseToAdditional = await axios.get(courseToAdditionalLink);

        this.courseToAdditional = courseToAdditional.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.getCourses();
    await this.getEduTypes();
    await this.getFaculties();
    await this.getDiplomTypes();
    await this.getCourseAdditional();
    await this.getCourseToAdditional();
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
.content {
  margin-top: 96px;
}
</style>
