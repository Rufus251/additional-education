<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="Task.testName"
        label="Название теста"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.descriptionHeader"
        label="Заголовок описания"
        placeholder="Заголовок важного теста"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.descriptionContent"
        label="Текст описания"
        placeholder="Описание важного теста"
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="Task.timeForPass"
        label="Время прохождения в минутах"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.questionsAmount"
        label="Количество вопросов в штуках"
        placeholder="20"
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="Task.maxPoints"
        label="Максимальное количество очков"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.pointForPass"
        label="Количество очков для прохождения"
        placeholder="20"
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="Task.authorName"
        label="Имя автора теста"
        placeholder="Иванов Иван"
        variant="underlined"
      >
      </v-text-field>

      <!-- Тестовые блоки -->
      <TestQuestion
        v-model:TestQuestionsProp="Task.testQuestions"
      ></TestQuestion>
    </v-form>
  </section>
</template>

<script>
import TestQuestion from "./Task__Test__Question.vue";
export default {
  components: {
    TestQuestion,
  },
  props: {
    TaskValidProp: Boolean,
    TaskProp: Object,
  },
  data() {
    return {
      valid: false,

      Task: {
        testName: 'Оченб Важный ТЕЕЕСТ',
        descriptionHeader: "Загловок описания",
        descriptionContent: "Описание описания",
        timeForPass: "60",
        questionsAmount: '20',
        maxPoints: "60",
        pointForPass: '30',
        authorName: "Иванов Иван",

        testQuestions: [],
      },
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:TaskValidProp", value || false);
    },
    Task: {
      handler() {
        this.$emit("update:TaskProp", this.Task || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.addCourse__Task {
  margin-left: 100px;
}
.v-form {
  min-width: 300px;
}
</style>
