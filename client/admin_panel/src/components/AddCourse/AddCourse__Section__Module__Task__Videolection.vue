<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <h4>Картинка лекции</h4>
      <v-file-input
        v-model="Task.lectionImg"
        variant="underlined"
      ></v-file-input>

      <v-text-field
        v-model="Task.lectionName"
        label="Название видеолекции"
        placeholder="Урок 1. Вступление"
        variant="underlined"
      >
      </v-text-field>
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
        lectionImg: "",
        lectionName: "",
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
