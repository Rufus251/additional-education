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

      <blue-button-full
        :isDisabled="(MainValid && InfoValid && SectionValid) === false"
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
        CourseAdditionalNames: [],
        File: false,
        MinHoursNames: 0,
      },

      // Change Course Info
      InfoValid: false,
      Info:{
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
