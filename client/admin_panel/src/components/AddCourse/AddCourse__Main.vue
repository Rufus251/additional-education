<template>
  <section class="addCourse__Main">
    <v-form v-model="valid" ref="form">
      <h2>Основная информация</h2>
      <v-text-field
        v-model="CourseName"
        :rules="CourseNameRules"
        label="Название курса"
        variant="underlined"
      >
      </v-text-field>
      <v-autocomplete
        v-model="FacultyName"
        :rules="FacultyNameRules"
        label="Выберите факультет"
        :items="faculties.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="EduTypesName"
        :rules="EduTypesNameRules"
        label="Выберите тип обучения"
        :items="eduTypes.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="DiplomTypesName"
        :rules="DiplomTypesNameRules"
        label="Выберите тип документа"
        :items="diplomType.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-autocomplete
        v-model="CourseAdditionalNames"
        :rules="CourseAdditionalNamesRules"
        label="Выберите дополнительное"
        :items="courseAdditional.map((elem) => elem.name)"
        variant="underlined"
        multiple
      ></v-autocomplete>
      <v-file-input v-model="File" variant="underlined"></v-file-input>
      <v-text-field
        v-model="MinHours"
        :rules="MinHoursRules"
        label="Минимальное кол-во часов"
        variant="underlined"
      >
      </v-text-field>
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

    MainValid: Boolean,
    CourseNameProp: String,
    FacultyNameProp: String,
    EduTypesNameProp: String,
    DiplomTypesNameProp: String,
    CourseAdditionalNamesProp: Array,
    FileProp: Object,
    MinHoursProp: Array,
  },
  data() {
    return {
      valid: false,

      // Create Course
      CourseName: "Очень крутое название",
      CourseNameRules: [v => v !== "" || "Введите название"],

      FacultyName: "",
      FacultyNameRules: [v => v.length > 0 || "Выберите факультет"],
      EduTypesName: "",
      EduTypesNameRules: [v => v.length > 0 || "Выберите тип"],
      DiplomTypesName: "",
      DiplomTypesNameRules: [v => v.length > 0 || "Выберите тип диплома"],
      CourseAdditionalNames: [],
      CourseAdditionalNameRules: [],

      File: false,
      FileRules: [v => v.length > 0 || "Выберите файл"],

      MinHours: "250",
      MinHoursRules: [v => v.length > 0 || "Введите число"],
    };
  },
  watch:{
    valid(value){
        this.$emit('update:MainValidProp', value || false)
    },
    CourseName(value){
        this.$emit('update:CourseNameProp', value)
    },
    FacultyName(value){
        this.$emit('update:FacultyNameProp', value)
    },
    EduTypesName(value){
        this.$emit('update:EduTypesNameProp', value)
    },
    DiplomTypesName(value){
        this.$emit('update:DiplomTypesNameProp', value)
    },
    CourseAdditionalNames(value){
        this.$emit('update:CourseAdditionalNamesProp', value)
    },
    File(value){
        this.$emit('update:FileProp', value)
    },
    MinHours(value){
        this.$emit('update:MinHoursProp', value)
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
</style>
