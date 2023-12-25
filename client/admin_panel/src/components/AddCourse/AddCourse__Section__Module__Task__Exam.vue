<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="Task.examName"
        label="Название экзамена"
        placeholder="Экз по математике"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.header"
        label="Загловок описания экзамена"
        placeholder="lorem ipsum"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.text"
        label="Описание экзамена"
        placeholder="lorem ipsum"
        variant="underlined"
      >
      </v-text-field>
      
      <h4>Картинка экзамена</h4>
      <v-file-input v-model="Task.files[0]" variant="underlined"></v-file-input>
      
      <v-text-field
        v-model="Task.homeworkName"
        label="Название дз"
        placeholder="Lorem"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Task.homeworkDesription"
        label="Описание домашки"
        placeholder="lorem ipsum"
        variant="underlined"
      >
      </v-text-field>

      <h4>Файл домашки</h4>
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
        examName: "Экзамен 1",
        queueNumber: 0,
        header: "Заголовок",
        text: "Текст",
        homeworkName: "Название домашки",
        homeworkDesription: "Описание домашки lorem",
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
