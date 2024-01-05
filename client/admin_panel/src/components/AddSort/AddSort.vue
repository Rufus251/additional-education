<template>
  <section class="addTest">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="name"
        label="Название факультета и тп"
        placeholder="Педагогика"
        variant="underlined"
      >
      </v-text-field>

      {{ progressMessage }}
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddEduTypes(name)"
      >
        Создать тип обучения
      </blue-button-full>
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddFaculty(name)"
      >
        Создать факультет
      </blue-button-full>
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddDiplomType(name)"
      >
        Создать тип выдаваемого документа
      </blue-button-full>
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddCourseAdditional(name)"
      >
        Создать дополнительно
      </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {
    faculties: Array,
    eduTypes: Array,
    diplomType: Array,
    courseAdditional: Array,
  },
  data() {
    return {
      // to do:
      // validation
      // valid: false,
      name: "",
      progressMessage: "",
    };
  },
  methods: {
    async AddEduTypes(name) {
      this.progressMessage = "Тип обучения добавляется, ожидайте...";

      const URL = "http://localhost:3000/sort/addEduTypes";
      await axios.post(URL, {
        name,
      });

      this.progressMessage = "Тип обучения добавлен!";
    },
    async AddFaculty(name) {
      this.progressMessage = "Факультет добавляется, ожидайте...";

      const URL = "http://localhost:3000/sort/addFaculty";
      await axios.post(URL, {
        name,
      });

      this.progressMessage = "Факультет добавлен!";
    },
    async AddDiplomType(name) {
      this.progressMessage = "Тип документа добавляется, ожидайте...";

      const URL = "http://localhost:3000/sort/addDiplomType";
      await axios.post(URL, {
        name,
      });

      this.progressMessage = "Тип документа добавлен!";
    },
    async AddCourseAdditional(name) {
      this.progressMessage = "Дополнительно добавляется, ожидайте...";

      const URL = "http://localhost:3000/sort/addCourseAdditional";
      await axios.post(URL, {
        name,
      });

      this.progressMessage = "Дополнительно добавлен!";
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

.v-btn {
  margin-top: 20px;
}
</style>
