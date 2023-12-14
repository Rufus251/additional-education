<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="Task.timeToPass"
        label="Время на прохождение"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.askAmount"
        label="Количество вопросов"
        placeholder="20"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.authorName"
        label="Имя автора"
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
import TestQuestion from "./AddCourse__Section__Module__Task__Test__Question.vue";
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
        timeToPass: '',
        askAmount: '',
        authorName: '',

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
