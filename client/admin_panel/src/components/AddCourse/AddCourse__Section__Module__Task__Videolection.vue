<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="Task.videolectionName"
        label="Название видеолекции"
        placeholder="Урок 1. Вступление"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.descriptionHeader"
        label="Заголовок описания лекции"
        placeholder="Заголовок"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.descriptionContent"
        label="Текст описания"
        placeholder="lorem ipsum"
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="Task.homeworkName"
        label="Загловок домашки"
        placeholder="Дз номер 1. Тема 1"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.homeworkDesription"
        label="Загловок домашки"
        placeholder="Дз номер 1. Тема 1"
        variant="underlined"
      >
      </v-text-field>

      <h4>Видеолекция (mp4)</h4>
      <v-file-input v-model="Task.files[0]" variant="underlined"></v-file-input>
      <h4>Дз (pdf)</h4>
      <v-file-input v-model="Task.files[1]" variant="underlined"></v-file-input>
    </v-form>
  </section>
</template>

<script>
export default {
  props: {
    TaskValidProp: Boolean,
    TaskProp: Object,
  },
  data() {
    return {
      valid: false,

      Task: {
        videolectionName: "Урок 1. Вступление",
        descriptionHeader: "Описание курса",
        descriptionContent: "Lorem ipsum",
        homeworkName: "Задание 1",
        homeworkDesription: "Lorem ipsum",

        files: ["", ""]
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
