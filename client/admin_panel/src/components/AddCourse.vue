<template>
  <section class="addCourse">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <!-- Create Course Start -->
      <AddCourseMain v-if="
      faculties && eduTypes && diplomType && courseAdditional"
      :faculties="faculties"
      :eduTypes="eduTypes"
      :diplomType="diplomType"
      :courseAdditional="courseAdditional"
      v-model:MainValidProp="MainValid"
      v-model:CourseNameProp="CourseName"
      v-model:FacultyNameProp="FacultyName"
      v-model:EduTypesNameProp="EduTypesName"
      v-model:DiplomTypesNameProp="DiplomTypesName"
      v-model:CourseAdditionalNamesProp="CourseAdditionalNames"
      v-model:FileProp="File"
      v-model:MinHoursProp="MinHoursNames"></AddCourseMain>
      <!-- Create Course End -->

      <!-- Change Course Info Start -->
      <AddCourseInfo
      v-model:InfoValidProp="InfoValid"
      v-model:AuthorNameProp="AuthorName"
      v-model:MinMaxHoursProp="MinMaxHours"
      v-model:CourseGoalProp="CourseGoal"
      v-model:EducationFormProp="EducationForm"
      v-model:CertificationTypeProp="CertificationType"
      v-model:AuthorInfoProp="AuthorInfo"></AddCourseInfo>
      <!-- Change Course Info End -->
      <blue-button-full :isDisabled="(MainValid && InfoValid) === false"> Создать курс </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import AddCourseMain from "./AddCourse__Main.vue"
import AddCourseInfo from "./AddCourse__Info.vue"

export default {
  components:{
    AddCourseMain,
    AddCourseInfo
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
      CourseName: "",
      FacultyName: "",
      EduTypesName: "",
      DiplomTypesName: "",
      CourseAdditionalNames: [],
      File: false,
      MinHoursNames: 0,

      // Change Course Info
      InfoValid: false,
      AuthorName: "",
      MinMaxHours: "",
      CourseGoal: "",
      EducationForm: "",
      CertificationType: "",
      AuthorInfo: ["", "", "", ""],

      // 
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
h2{
  margin-top: 30px;
}
</style>
