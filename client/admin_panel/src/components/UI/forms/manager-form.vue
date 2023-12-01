<template>
  <v-form v-model="valid" ref="form">
    <v-autocomplete
      label="Выберите менеджера"
      :items="managers"
      variant="underlined"
    ></v-autocomplete>

    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Имя"
      variant="underlined"
    >
    </v-text-field>

    <v-text-field
      v-model="number"
      :rules="numberRules"
      label="8 (800) 000-00-00"
      variant="underlined"
    >
    </v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      variant="underlined"
    >
    </v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'Обязательное поле']"
      label="Я согласен с условиями обработки персональных данных."
      required
      hide-details
      class="caption"
    ></v-checkbox>

    <blue-button-full :isDisabled="!valid">
      Получить консультацию
    </blue-button-full>
  </v-form>
</template>

<script>
export default {
  name: "ManagerForm",
  data() {
    return {
      valid: "",
      managers: ["Менеджер 1", "Менеджер 2", "Менеджер 3"],

      name: "",
      nameRules: [],
      number: "",
      numberRules: [],
      email: "",
      emailRules: [],
      checkbox: false,
    };
  },
};
</script>

<style scoped lang="scss">
.v-form {
  max-width: 570px;
  width: 100%;

  padding-top: 40px;
  padding-left: 60px;
  padding-bottom: 40px;
  padding-right: 60px;

  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05);

  @media (max-width: 1300px) {
    margin-top: 20px;
    padding: 20px;

    margin-right: auto;
    margin-left: auto;
  }

  .v-btn {
    margin-top: 30px;
  }
}
</style>
