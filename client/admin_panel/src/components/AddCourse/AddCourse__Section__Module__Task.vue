<template>
  <section class="addCourse__Tasks">
    <v-form v-model="valid" ref="form">
      <section v-for="(TType, i) in TaskType" :key="TType">
        <h3>Задание {{ i + 1 }} {{ TType }}</h3>

        <Videolection
          v-if="TType == 'Videolection'"
          v-model:TaskProp="Tasks[i]"
        ></Videolection>
        <Lection
          v-if="TType == 'Lection'"
          v-model:TaskProp="Tasks[i]"
        ></Lection>
        <Exam v-if="TType == 'Exam'" v-model:TaskProp="Tasks[i]"></Exam>
        <Test v-if="TType == 'Test'" v-model:TaskProp="Tasks[i]"></Test>
      </section>
    </v-form>
    <!-- Add buttons -->
    <BlueButton180
      v-if="TaskType.length < MaxTaskCounter"
      @click="
        TaskType.push('Videolection');
        Tasks.push({
          lectionImg: '',
          lectionName: '',
        });
      "
    >
      + Видеолекция
    </BlueButton180>
    <BlueButton180
      v-if="TaskType.length < MaxTaskCounter"
      @click="
        TaskType.push('Lection');
        Tasks.push({
          lessonName: '',
          queueNumber: 0,
          homeworkName: '',
          homeworkDesription: '',
          homeworkFile: {},
          lectionBlocks: [],
        });
      "
    >
      + Лекция
    </BlueButton180>
    <BlueButton180
      v-if="TaskType.length < MaxTaskCounter"
      @click="
        TaskType.push('Test');
        Tasks.push({
          testName: 'Оченб Важный ТЕЕЕСТ',
          descriptionHeader: 'Загловок описания',
          descriptionContent: 'Описание описания',
          timeForPass: '60',
          questionsAmount: '20',
          maxPoints: '60',
          pointForPass: '30',
          authorName: 'Иванов Иван',

          testQuestions: [],
        });
      "
    >
      + Тест
    </BlueButton180>
    <BlueButton180
      v-if="TaskType.length < MaxTaskCounter"
      @click="
        TaskType.push('Exam');
        Tasks.push({
          lessonName: '',
          queueNumber: 0,
          header: '',
          text: '',
          img: '',
          homeworkName: '',
          homeworkDesription: '',
          homeworkFile: '',
        });
      "
    >
      + Экзамен
    </BlueButton180>
    <BlueButton180
      v-if="TaskType.length > 0"
      @click="
        TaskType.pop();
        Tasks.pop();
      "
    >
      - Task
    </BlueButton180>
  </section>
</template>

<script>
import Videolection from "./AddCourse__Section__Module__Task__Videolection.vue";
import Lection from "./AddCourse__Section__Module__Task__Lection.vue";
import Exam from "./AddCourse__Section__Module__Task__Exam.vue";
import Test from "./AddCourse__Section__Module__Task__Test.vue";
export default {
  components: {
    Videolection,
    Lection,
    Test,
    Exam,
  },
  props: {
    TaskValidProp: Boolean,
    TasksProp: Array,
  },
  data() {
    return {
      valid: false,

      // Add Task
      TaskType: [],
      MaxTaskCounter: 4,

      Tasks: [],
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
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:TaskValidProp", value || false);
    },
    Tasks: {
      handler() {
        this.$emit("update:TasksProp", this.Tasks || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.addCourse__Tasks {
  margin-left: 100px;
}
.v-form {
  min-width: 300px;
}
</style>
