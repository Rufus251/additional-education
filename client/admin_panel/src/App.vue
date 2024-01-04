<template>
  <NavBar></NavBar>
  <section class="content">
    <div class="btns" v-if="select == 0">
      <BlueButton180 @click="select = 1">Создать курс</BlueButton180>
      <BlueButton180 @click="select = 2">Создать тест</BlueButton180>
      <BlueButton180 @click="select = 3">Создать видеолекцию</BlueButton180>
    </div>
    <AddCourse
      v-if="
        select == 1 && faculties && eduTypes && diplomType && courseAdditional
      "
      v-model="select"
      :faculties="faculties"
      :eduTypes="eduTypes"
      :diplomType="diplomType"
      :courseAdditional="courseAdditional"
    >
    </AddCourse>
    <AddTest
      v-if="select == 2"
      v-model="select"
      :faculties="faculties"
    ></AddTest>
    <AddVideolection v-if="select == 3" v-model="select"></AddVideolection>
  </section>
</template>

<script>
import NavBar from "./components/common/NavBar.vue";

import AddCourse from "./components/AddCourse/AddCourse.vue";
import AddTest from "./components/AddTest/AddTest.vue";
import AddVideolection from "./components/AddVideolection/AddVideolection.vue";

import axios from "axios";

export default {
  name: "App",
  components: {
    NavBar,
    AddCourse,
    AddTest,
    AddVideolection,
  },
  data() {
    return {
      // 0 - admin, 1 - course, 2 - test, 3 - videolection
      select: 0,

      faculties: false,
      eduTypes: false,
      diplomType: false,
      courseAdditional: false,
    };
  },
  methods: {
    async getFaculties() {
      try {
        const facultiesLink = "http://localhost:3000/sort/faculty";
        const faculties = await axios.get(facultiesLink);

        this.faculties = faculties.data;
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
    async getDiplomType() {
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
  },
  async created() {
    await this.getFaculties();
    await this.getEduTypes();
    await this.getDiplomType();
    await this.getCourseAdditional();
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.content {
  margin-top: 96px;
  padding: 20px;
}
.btns {
  display: flex;
  flex-direction: column;

  gap: 30px;
}
</style>
