<template>
  <section class="addVideolection">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <v-autocomplete
        v-model="Videolection.FacultyName"
        :rules="FacultyNameRules"
        label="Выберите факультет"
        :items="faculties.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>

      <h4>Обложка (jpg)</h4>
      <v-file-input
        v-model="Videolection.files[0]"
        variant="underlined"
      ></v-file-input>
      <h4>Видеолекция (mp4)</h4>
      <v-file-input
        v-model="Videolection.files[1]"
        variant="underlined"
      ></v-file-input>
      <v-text-field
        v-model="Videolection.videolectionName"
        label="Название видеолекции"
        placeholder="Урок 1. Вступление"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Videolection.descriptionHeader"
        label="Заголовок описания лекции"
        placeholder="Заголовок"
        variant="underlined"
      >
      </v-text-field>
      <v-text-field
        v-model="Videolection.descriptionContent"
        label="Текст описания"
        placeholder="lorem ipsum"
        variant="underlined"
      >
      </v-text-field>

      <h4>Диплом (pdf)</h4>
      <v-file-input
        v-model="Videolection.files[2]"
        variant="underlined"
      ></v-file-input>

      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddVideolection(Videolection)"
      >
        Создать видеолекцию
      </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  props: {
    // TaskValidProp: Boolean,
    faculties: Array,
  },
  data() {
    return {
      // to do:
      // validation
      // valid: false,

      Videolection: {
        FacultyName: "",
        videolectionName: "Урок 1. Вступление",
        descriptionHeader: "Описание курса",
        descriptionContent: "Lorem ipsum",

        files: ["", "", ""],
      },
    };
  },
  methods: {
    // change userId
    async AddVideolection(Videolection) {
      this.progressMessage = "Тест добавляется, ожидайте...";

      const videolectionRes = await this.AddVideolectionMain(1, Videolection);
      
      await this.AddVideolectionInfo(videolectionRes.data.id, Videolection);

      this.progressMessage = "Тест добавлен!";
    },

    async AddVideolectionMain(userId, Videolection) {
      const facultyId = this.faculties.find(
        (fac) => fac.name === Videolection.FacultyName
      ).id;

      let formdata = new FormData();

      formdata.append("file", Videolection.files[0][0], "file1");
      formdata.append("lectionName", Videolection.videolectionName);

      const URL =
        "http://localhost:3000/videolection/addVideolection/" +
        userId +
        "/" +
        facultyId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddVideolectionInfo(VideolectionId, Videolection) {
      let formdata = new FormData();

      formdata.append("file", Videolection.files[1][0], "file1");
      formdata.append("file", Videolection.files[2][0], "file1");
      formdata.append("descriptionHeader", Videolection.descriptionHeader);
      formdata.append("description", Videolection.descriptionContent);

      const URL =
        "http://localhost:3000/videolection/changeVideolectionInfo/" +
        VideolectionId;
      const res = await axios.put(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
  },
  watch: {
    // valid(value) {
    //   this.$emit("update:TaskValidProp", value || false);
    // },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
