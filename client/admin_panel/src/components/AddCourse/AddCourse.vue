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
        v-model:CourseNameProp="CourseName"
        v-model:FacultyNameProp="FacultyName"
        v-model:EduTypesNameProp="EduTypesName"
        v-model:DiplomTypesNameProp="DiplomTypesName"
        v-model:CourseAdditionalNamesProp="CourseAdditionalNames"
        v-model:FileProp="File"
        v-model:MinHoursProp="MinHoursNames"
      ></AddCourseMain>

      <!-- Change Course Info Start -->
      <AddCourseInfo
        v-model:InfoValidProp="InfoValid"
        v-model:AuthorNameProp="AuthorName"
        v-model:MinMaxHoursProp="MinMaxHours"
        v-model:CourseGoalProp="CourseGoal"
        v-model:EducationFormProp="EducationForm"
        v-model:CertificationTypeProp="CertificationType"
        v-model:AuthorInfoProp="AuthorInfo"
      ></AddCourseInfo>

      <!-- Add Course Section -->
      <AddCourseSection
        v-model:SectionValidProp="SectionValid"
        v-model:SectionsProp="Sections"
      ></AddCourseSection>
      {{ Sections }}

      <blue-button-full :isDisabled="(MainValid && InfoValid && SectionValid) === false">
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

      // Add Section
      SectionValid: false,
      Sections: [],
      Section: {
        hoursAmount: 0,
        cost: 0,
        cashback: 0,

        modules: [],
        module: {
          hoursAmount: 0,
          moduleName: "string",

          tasks: [],
          videolection: {
            lectionImg: "string",
            lectionName: "string",
          },
          lection: {
            lessonName: "string",
            queueNumber: 0,
            homeworkName: "string",
            homeworkDesription: "string",
            homeworkFile: "string",

            lectionBlocks: [],
            lectionBlock: {
              header: "string",
              text: "string",
              img: "string",
            },
          },
          test: {
            timeToPass: 0,
            askAmount: 0,
            authorName: "string",

            testQuestions: [],
            testQuestion: {
              questionType: "string",
              queueNumber: 0,
              questionHeader: "string",
              questionImg: "string",

              testQuestionVariants: [],
              testQuestionVariant: {
                queueNumber: 0,
                variantText: "string",
                isTrue: true,
              },
            },
          },
          exam: {
            lessonName: "string",
            queueNumber: 0,
            header: "string",
            text: "string",
            img: "string",
            homeworkName: "string",
            homeworkDesription: "string",
            homeworkFile: "string",
          },
        },
      },
      SectionsCount: 0,
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
.v-btn{
  margin-top: 20px;
}
</style>
