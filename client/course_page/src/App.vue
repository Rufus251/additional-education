<template>
  <NavBar :isAuth="isAuth" :userImgAndName="userImgAndName"></NavBar>

  <div
    class="contentApp"
    v-if="
      course && courseInfo && faculties && eduTypes && authorInfo && sections
    "
  >
    <HeaderScene
      :courseProp="course"
      :courseInfoProp="courseInfo"
      :imageProp="imageProp"
      :eduTypeProp="eduTypeProp"
    ></HeaderScene>
    <CourseInfo
      :courseInfoProp="courseInfo"
      :authorInfoProp="authorInfo"
    ></CourseInfo>
    <EducationalDiploma></EducationalDiploma>
    <CourseSignUp :sectionsProp="sections"></CourseSignUp>
    <ContactFormBlue></ContactFormBlue>
    <EducationPlan :sectionsProp="sections"></EducationPlan>
    <SimilarCourses
      v-if="courses"
      :coursesProp="courses"
      :facultiesProp="faculties"
    ></SimilarCourses>
    <EducationLicense></EducationLicense>
    <socialReposte></socialReposte>
    <CourseSignUp :sectionsProp="sections"></CourseSignUp>
    <MightBeInteresting v-if="videolections" :videolectionsProp="videolections"></MightBeInteresting>
    <ContactForm></ContactForm>
    <FooterComponent></FooterComponent>
  </div>
  <h2 class="contentApp" v-else>Курс не найден!</h2>
</template>

<script>
import NavBar from "./components/common/NavBar.vue";
import HeaderScene from "./components/HeaderScene.vue";
import CourseInfo from "./components/CourseInfo.vue";
import EducationalDiploma from "./components/EducationalDiploma.vue";
import CourseSignUp from "./components/CourseSignUp.vue";
import ContactFormBlue from "./components/ContactFormBlue.vue";
import EducationPlan from "./components/EducatuonPlan.vue";
import SimilarCourses from "./components/SimilarCourses.vue";
import EducationLicense from "./components/EducationLicense.vue";
import socialReposte from "./components/SocialReposte.vue";
import MightBeInteresting from "./components/MightBeInteresting.vue";
import ContactForm from "./components/ContactForm.vue";
import FooterComponent from "./components/common/FooterComponent.vue";

import axios from "axios";
export default {
  name: "App",
  components: {
    NavBar,
    HeaderScene,
    CourseInfo,
    EducationalDiploma,
    CourseSignUp,
    ContactFormBlue,
    EducationPlan,
    SimilarCourses,
    EducationLicense,
    socialReposte,
    MightBeInteresting,
    ContactForm,
    FooterComponent,
  },
  data() {
    return {
      isAuth: false,

      courses: false,
      course: false,
      courseInfo: false,
      authorInfo: false,
      sections: false,

      faculties: false,
      eduTypes: false,

      imageProp: false,
      eduTypeProp: false,

      videolections: false,
    };
  },
  methods: {
    async auth() {
      const jwt = localStorage.getItem("accessToken");
      if (!jwt) {
        return 0;
      }
      const checkJwtUrl = "http://localhost:3000/auth/checkJwt";
      const res = await axios.post(checkJwtUrl, {
        jwt,
      });
      if (res.data.user) {
        localStorage.setItem("accessToken", res.data.user.jwt);

        const getImageUrl =
          "http://localhost:3000/user/userImgAndName/" + res.data.user.id;
        const res2 = await axios.get(getImageUrl);

        this.isAuth = true;
        this.userImgAndName = res2.data;
      }
      return res;
    },

    async getCourse() {
      const id = this.getCourseId();
      const url = "http://localhost:3000/course/course/" + id;
      const res = await axios.get(url);

      this.course = res.data;

      await this.getCourseInfo(id);
    },
    async getCourseInfo(id) {
      const url = "http://localhost:3000/course/courseInfo/" + id;
      const res = await axios.get(url);

      this.courseInfo = res.data;
    },
    getCourseId() {
      let id = window.location.href.split("/");
      id = id[id.length - 1];
      return id;
    },

    async getFaculties() {
      try {
        const facultiesLink = "http://localhost:3000/sort/faculty";
        const faculties = await axios.get(facultiesLink);

        this.faculties = faculties.data;
        this.faculties.unshift({
          id: -1,
          name: "Все курсы",
        });

        this.changeImageProp();
      } catch (error) {
        console.log(error);
      }
    },
    changeImageProp() {
      const faculty = this.faculties.find(
        (fac) => fac.id === this.course.facultyId
      );
      this.imageProp = faculty.name;
    },

    async getEduTypes() {
      try {
        const eduTypesLink = "http://localhost:3000/sort/eduTypes";
        const eduTypes = await axios.get(eduTypesLink);

        this.eduTypes = eduTypes.data;

        this.changeEduTypeProp();
      } catch (error) {
        console.log(error);
      }
    },
    changeEduTypeProp() {
      const eduType = this.eduTypes.find(
        (eType) => eType.id === this.course.educationTypeId
      );
      this.eduTypeProp = eduType.name;
    },

    async getAuthorInfos() {
      try {
        const id = this.getCourseId();
        const url = "http://localhost:3000/course/authorInfos/" + id;
        const res = await axios.get(url);

        this.authorInfo = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getSections() {
      try {
        const id = this.getCourseId();
        const url = "http://localhost:3000/course/sections/" + id;
        const res = await axios.get(url);

        let sections = res.data;
        for (const i of sections) {
          i.modules = await this.getModules(i.id);
        }

        this.sections = sections;
      } catch (error) {
        console.log(error);
      }
    },
    async getModules(id) {
      const url = "http://localhost:3000/course/modules/" + id;
      const res = await axios.get(url);

      const sModule = res.data;
      for (const i of sModule) {
        i.tasks = await this.getTasks(i.id);
      }

      return sModule;
    },
    async getTasks(id) {
      const url = "http://localhost:3000/course/tasks/" + id;
      const res = await axios.get(url);

      return res.data;
    },

    async getCourses() {
      try {
        const coursesLink = "http://localhost:3000/course/courses";
        const courses = await axios.get(coursesLink);

        this.courses = courses.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getVideolections() {
      try {
        const videolectionLink =
          "http://localhost:3000/videolection/videolections";

        const videolections = await axios.get(videolectionLink);

        this.videolections = videolections.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.auth();
    await this.getCourse();
    await this.getFaculties();
    await this.getEduTypes();
    await this.getAuthorInfos();
    await this.getSections();
    await this.getCourses();
    await this.getVideolections();
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
.contentApp {
  margin-top: 96px;
}
</style>
