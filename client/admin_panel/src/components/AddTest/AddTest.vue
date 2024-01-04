<template>
  <section class="addTest">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <v-autocomplete
        v-model="Test.FacultyName"
        :rules="FacultyNameRules"
        label="Выберите факультет"
        :items="faculties.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>
      <v-text-field
        v-model="Test.timeForPass"
        label="Время прохождения в минутах"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Test.questionsAmount"
        label="Количество вопросов в штуках"
        placeholder="20"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Test.authorName"
        label="Имя автора теста"
        placeholder="Иванов Иван"
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="Test.testName"
        label="Название теста"
        placeholder="60"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Test.descriptionHeader"
        label="Заголовок описания"
        placeholder="Заголовок важного теста"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Test.descriptionContent"
        label="Текст описания"
        placeholder="Описание важного теста"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Test.pointForPass"
        label="Количество очков для прохождения"
        placeholder="20"
        variant="underlined"
      >
      </v-text-field>

      <!-- Тестовые блоки -->
      <TestQuestion
        v-model:TestQuestionsProp="Test.testQuestions"
      ></TestQuestion>
      {{ progressMessage }}
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddTest(Test)"
      >
        Создать тест
      </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import TestQuestion from "./Test__Question.vue";

import axios from "axios";
export default {
  components: {
    TestQuestion,
  },
  props: {
    faculties: Array,
  },
  data() {
    return {
      // to do:
      // validation
      // valid: false,

      progressMessage: "",

      Test: {
        FacultyName: "",
        timeForPass: "60",
        questionsAmount: "20",
        authorName: "Иванов Иван",
        testName: "Оченб Важный ТЕЕЕСТ",

        descriptionHeader: "Загловок описания",
        descriptionContent: "Описание описания",
        pointForPass: "30",

        testQuestions: [],
      },
    };
  },
  methods: {
    async AddTest(Test) {
      this.progressMessage = "Тест добавляется, ожидайте...";

      const test = await this.AddTestMain(1, Test);

      const info = await this.AddTestInfo(test.data.id, Test);
      
      for (const question of Test.testQuestions) {
        const q_res = await this.AddTestQuestion(info.data.id, question);
        for (const variants of question.testQuestionVariants) {
          await this.AddQuestionVariant(q_res.data.id, variants);
        }
      }

      this.progressMessage = "Тест добавлен!";
    },

    async AddTestMain(userId, Test) {
      const facultyId = this.faculties.find(
        (fac) => fac.name === Test.FacultyName
      ).id;
      const URL =
        "http://localhost:3000/test/addTest/" + userId + "/" + facultyId;
      const res = await axios.post(URL, {
        timeToPass: +Test.timeForPass,
        askAmount: +Test.questionsAmount,
        authorName: Test.authorName,
        testName: Test.testName,
      });
      return res;
    },
    async AddTestInfo(testId, Test) {
      const URL = "http://localhost:3000/test/changeTestInfo/" + testId;
      const res = await axios.put(URL, {
        testHeader: Test.descriptionHeader,
        testDescription: Test.descriptionContent,
        pointsToPass: +Test.pointForPass,
      });
      return res;
    },

    async AddTestQuestion(TestId, Question) {
      let formdata = new FormData();

      formdata.append("file", Question.questionImg[0], "questionImg");
      formdata.append("taskType", Question.questionType);
      formdata.append("taskTitle", Question.questionHeader);
      
      const URL = "http://localhost:3000/test/addTestTask/" + TestId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddQuestionVariant(QuestionId, Variant) {
      const URL =
        "http://localhost:3000/test/addTestTaskAnswerVariant/" + QuestionId;
      const res = await axios.post(URL, {
        variantText: Variant.variantText,
        isRight: Variant.isTrue,
      });
      return res;
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

.v-btn{
  margin-top: 20px;
}
</style>
