<template>
  <section class="addCourse">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <!-- Create Course Start -->
      <AddCourseMain
        v-if="faculties && eduTypes && diplomType && courseAdditional"
        :faculties="faculties"
        :eduTypes="eduTypes"
        :diplomType="diplomType"
        :courseAdditional="courseAdditional"
        v-model:MainValidProp="MainValid"
        v-model:CourseProp="Course"
      ></AddCourseMain>
      {{ Course }}

      <!-- Change Course Info Start -->
      <AddCourseInfo
        v-model:InfoValidProp="InfoValid"
        v-model:InfoProp="Info"
      ></AddCourseInfo>
      {{ Info }}
      <!-- Add Course Section -->
      <AddCourseSection
        v-model:SectionValidProp="SectionValid"
        v-model:SectionsProp="Sections"
      ></AddCourseSection>
      {{ Sections }}

      <!-- && InfoValid && SectionValid -->
      <blue-button-full
        :isDisabled="(MainValid ) === false"
        @click="AddCourse(Course, Info, Sections)"
      >
        Создать курс
      </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import AddCourseMain from "./AddCourse__Main.vue";
import AddCourseInfo from "./AddCourse__Info.vue";
import AddCourseSection from "./AddCourse__Section.vue";

import axios from "axios";
export default {
  components: {
    AddCourseMain,
    AddCourseInfo,
    AddCourseSection,
  },
  props: {
    select: Number,
    faculties: Array,
    eduTypes: Array,
    diplomType: Array,
    courseAdditional: Array,
  },
  data() {
    return {
      // Create Course
      MainValid: false,
      Course: {
        CourseName: "",
        FacultyName: "",
        EduTypesName: "",
        DiplomTypesName: "",
        CourseAdditionalName: "",
        File: false,
        MinHours: 0,
      },

      // Change Course Info
      InfoValid: false,
      Info: {
        AuthorName: "",
        MinMaxHours: "",
        CourseGoal: "",
        EducationForm: "",
        CertificationType: "",
        AuthorInfo: ["", "", "", ""],
      },

      // Add Section
      SectionValid: false,
      Sections: [],
      // to do:
      // module validation
    };
  },
  methods: {
    async AddCourse(Main, Info, Sections) {
      const main_res = await this.AddMain(Main);
      console.log(main_res);
      // const info_res = await this.AddInfo(Info)
      // console.log(info_res)
      // const section_res = await this.AddSection(Sections)
      // console.log(section_res)
      Info = Sections;
      Sections = Info;
    },

    async AddMain(Main) {
      console.log(Main);
      let formdata = new FormData();

      const educationTypeId = this.eduTypes.find(
        (edu) => edu.name === Main.EduTypesName
      ).id;
      const facultyId = this.faculties.find(
        (fac) => fac.name === Main.FacultyName
      ).id;
      const DiplomTypesName = this.diplomType.find(
        (dip) => dip.name === Main.DiplomTypesName
      ).id;
      const coursesToAdditionalId = this.courseAdditional.find(
        (adi) => adi.name === Main.CourseAdditionalName
      ).id;

      formdata.append("authorId", "1");
      formdata.append("courseName", Main.CourseName);
      formdata.append("educationTypeId", educationTypeId);
      formdata.append("facultyId", facultyId);
      formdata.append("diplomTypeId", DiplomTypesName);
      formdata.append("coursesToAdditionalId", coursesToAdditionalId);
      formdata.append("minHours", +Main.MinHours);
      formdata.append("file", Main.File[0]);

      console.log(formdata);
      
      const URL = 'http://localhost:3000/course/addCourse'
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res
    },
    async AddInfo(Info) {
      console.log(Info);
    },
    async AddSection(Section) {
      console.log(Section);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
h2 {
  margin-top: 30px;
}
.v-btn {
  margin-top: 20px;
}
</style>
