<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <section>
        <v-text-field
          v-model="Task.lessonName"
          label="Название лекции"
          placeholder="Урок 1. Вступление"
          variant="underlined"
        >
        </v-text-field>

        <!-- Блоки лекций -->
        <LectionBlock
          v-model:LectionBlocksProp="Task.lectionBlocks"
        ></LectionBlock>

        <!-- Домашка -->
        <v-text-field
          v-model="Task.homeworkName"
          label="Название домашки"
          placeholder="Задание х"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="Task.homeworkDesription"
          label="Описание домашки"
          placeholder="Описание домашки что делать"
          variant="underlined"
        >
        </v-text-field>
        <h4>Файл домашки</h4>
        <v-file-input
          v-model="Task.homeworkFile"
          variant="underlined"
        ></v-file-input>
      </section>
    </v-form>
  </section>
</template>

<script>
import LectionBlock from "./AddCourse__Section__Module__Task__Lection__Block.vue";
export default {
  components: {
    LectionBlock,
  },
  props: {
    TaskValidProp: Boolean,
    TaskProp: Object,
  },
  data() {
    return {
      valid: false,

      Task: {
        lessonName: "Урок Х. О чём то",
        queueNumber: 0,
        homeworkName: "Дз 1. О чём то",
        homeworkDesription: "lorem ipsum",
        homeworkFile: {},

        lectionBlocks: [],
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
