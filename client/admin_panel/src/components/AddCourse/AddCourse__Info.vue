<template>
  <section class="addCourse__Info">
    <v-form v-model="valid" ref="form">
      <h2>Информация о курсе</h2>
      <v-text-field
        v-model="AuthorName"
        :rules="AuthorNameRules"
        label="ФИО автора"
        placeholder="Буланов Максим Владимирович"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-for="AInfo in AuthorInfoCounter"
        :key="AInfo"
        v-model="AuthorInfo[AInfo - 1]"
        :rules="AuthorInfoRules"
        label="Информация об авторе"
        placeholder="Профессиональный тьютор"
        variant="underlined"
        @input="$emit(`update:AuthorInfoProp`, AuthorInfo);"
      >
      </v-text-field>
      <BlueButton180 v-if="AuthorInfoCounter < 4" @click="AuthorInfoCounter++">
        + Об авторе
      </BlueButton180>
      <BlueButton180 v-if="AuthorInfoCounter > 0" @click="AuthorInfoCounter--">
        - Об авторе
      </BlueButton180>
      <v-text-field
        v-model="MinMaxHours"
        :rules="MinMaxHoursRules"
        label="Мин-макс часов"
        placeholder="240-1000"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="CourseGoal"
        :rules="CourseGoalRules"
        label="Цель курса"
        placeholder="Сделать из вас..."
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="EducationForm"
        :rules="EducationFormRules"
        label="Форма обучения"
        placeholder="Вы будете обучаться в..."
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="CertificationType"
        :rules="CertificationTypeRules"
        label="Тип аттестации"
        placeholder="Тестирование из 20 вопросов"
        variant="underlined"
      >
      </v-text-field>
    </v-form>
  </section>
</template>

<script>
export default {
  props: {
    InfoValidProp: Boolean,
    AuthorNameProp: String,
    MinMaxHoursProp: String,
    CourseGoalProp: String,
    EducationFormProp: String,
    CertificationTypeProp: String,
    AuthorInfoProp: Array,
  },
  data() {
    return {
      valid: false,

      // Create Course
      AuthorName: "Буланов Максим Владимирович",
      AuthorNameRules: [(v) => v !== "" || "Введите ФИО автора"],
      AuthorInfoCounter: 4,
      AuthorInfo: ["Профессиональный тьютор", 
      "Проектирует образовательные программы", 
      "Сооснователь проектов Место и образовательного бюро Розетка", 
      "Помогает ученикам найти собственный путь развития"],
      AuthorInfoRules: [(v) => v !== "" || "Введите информацию"],

      MinMaxHours: "250-1400",
      MinMaxHoursRules: [(v) => v.length > 0 || "Введите количество часов"],
      CourseGoal: "lorem ipsum lorem ipsum",
      CourseGoalRules: [(v) => v.length > 0 || "Введите цель курса"],
      EducationForm: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dо.",
      EducationFormRules: [(v) => v.length > 0 || "Введите тип обучения"],
      CertificationType: "Итоговое тестирование из 20 вопросов с вариантами ответов.",
      CertificationTypeRules: [(v) => v.length > 0 || "Введите тип аттестации"],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:InfoValidProp", value || false);
    },
    AuthorName(value) {
      this.$emit("update:AuthorNameProp", value);
    },
    MinMaxHours(value) {
      this.$emit("update:MinMaxHoursProp", value);
    },
    CourseGoal(value) {
      this.$emit("update:CourseGoalProp", value);
    },
    EducationForm(value) {
      this.$emit("update:EducationFormProp", value);
    },
    CertificationType(value) {
      this.$emit("update:CertificationTypeProp", value);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
</style>
