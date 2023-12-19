<template>
  <section class="addCourse__Main">
    <v-form v-model="valid" ref="form">
      <h2>Основная информация</h2>
      <v-text-field
        v-model="Course.CourseName"
        :rules="CourseNameRules"
        label="Название курса"
        variant="underlined"
      >
      </v-text-field>
      <v-autocomplete
        v-model="Course.FacultyName"
        :rules="FacultyNameRules"
        label="Выберите факультет"
        :items="faculties.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="Course.EduTypesName"
        :rules="EduTypesNameRules"
        label="Выберите тип обучения"
        :items="eduTypes.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="Course.DiplomTypesName"
        :rules="DiplomTypesNameRules"
        label="Выберите тип документа"
        :items="diplomType.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="Course.CourseAdditionalName"
        :rules="CourseAdditionalNamesRules"
        label="Выберите дополнительное"
        :items="courseAdditional.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-file-input v-model="Course.File" variant="underlined"></v-file-input>
      <v-text-field
        v-model="Course.MinHours"
        :rules="MinHoursRules"
        label="Минимальное кол-во часов"
        variant="underlined"
      >
      </v-text-field>
      {{ Course }}
    </v-form>
  </section>
</template>

<script>
export default {
  props: {
    faculties: Array,
    eduTypes: Array,
    diplomType: Array,
    courseAdditional: Array,

    CourseProp: Object,
  },
  data() {
    return {
      valid: false,

      // Create Course
      Course: {
        CourseName: "Очень крутое название",
        FacultyName: "",
        EduTypesName: "",
        DiplomTypesName: "",
        CourseAdditionalName: "",
        File: false,
        MinHours: "250",
      },

      // Rules
      CourseNameRules: [(v) => v !== "" || "Введите название"],
      FacultyNameRules: [(v) => v.length > 0 || "Выберите факультет"],
      EduTypesNameRules: [(v) => v.length > 0 || "Выберите тип"],
      DiplomTypesNameRules: [(v) => v.length > 0 || "Выберите тип диплома"],
      CourseAdditionalNameRules: [],
      FileRules: [(v) => v.length > 0 || "Выберите файл"],
      MinHoursRules: [(v) => v.length > 0 || "Введите число"],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:MainValidProp", value || false);
    },
    Course: {
      handler(value) {
        this.$emit("update:CourseProp", value || {});
      },
      deep: true,
    }
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
</style>
