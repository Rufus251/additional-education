<template>
  <section class="addCourse__Info">
    <v-form v-model="valid" ref="form">
      <h2>Информация о курсе</h2>
      <v-text-field
        v-model="Info.AuthorName"
        :rules="AuthorNameRules"
        label="ФИО автора"
        placeholder="Буланов Максим Владимирович"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-for="AInfo in AuthorInfoCounter"
        :key="AInfo"
        v-model="Info.AuthorInfo[AInfo - 1]"
        :rules="AuthorInfoRules"
        label="Информация об авторе"
        placeholder="Профессиональный тьютор"
        variant="underlined"
      >
      </v-text-field>
      <BlueButton180 v-if="AuthorInfoCounter < 4" @click="AuthorInfoCounter++">
        + Об авторе
      </BlueButton180>
      <BlueButton180 v-if="AuthorInfoCounter > 0" @click="AuthorInfoCounter--">
        - Об авторе
      </BlueButton180>
      <v-text-field
        v-model="Info.MinMaxHours"
        :rules="MinMaxHoursRules"
        label="Мин-макс часов"
        placeholder="240-1000"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Info.CourseGoal"
        :rules="CourseGoalRules"
        label="Цель курса"
        placeholder="Сделать из вас..."
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Info.EducationForm"
        :rules="EducationFormRules"
        label="Форма обучения"
        placeholder="Вы будете обучаться в..."
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Info.CertificationType"
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
    InfoProp: Object,
  },
  data() {
    return {
      valid: false,

      // Create Course
      Info:{
        AuthorName: "Буланов Максим Владимирович",
        AuthorInfo: ["Профессиональный тьютор", 
        "Проектирует образовательные программы", 
        "Сооснователь проектов Место и образовательного бюро Розетка", 
        "Помогает ученикам найти собственный путь развития"],
        MinMaxHours: "250-1400",
        CourseGoal: "lorem ipsum lorem ipsum",
        EducationForm: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dо.",
        CertificationType: "Итоговое тестирование из 20 вопросов с вариантами ответов.",
      },

      AuthorInfoCounter: 4,
      
      // Rules
      AuthorInfoRules: [(v) => v !== "" || "Введите информацию"],
      AuthorNameRules: [(v) => v !== "" || "Введите ФИО автора"],
      MinMaxHoursRules: [(v) => v !== "" || "Введите количество часов"],
      CourseGoalRules: [(v) => v !== "" || "Введите цель курса"],
      EducationFormRules: [(v) => v !== "" || "Введите тип обучения"],
      CertificationTypeRules: [(v) => v !== "" || "Введите тип аттестации"],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:InfoValidProp", value || false);
    },
    Info:{
      handler(value){
        this.$emit("update:InfoProp", value || {});
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
