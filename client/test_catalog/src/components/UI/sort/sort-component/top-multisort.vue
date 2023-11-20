<template>
  <section class="sortSettings">
    <div class="found">
      <p class="text1">Найдено: {{ courses.length }}</p>
    </div>
    <div class="sortType" v-if="variant == `full`">
      <checkbox-switcher v-model="checkboxSwitcher" @change="emitCheckbox">
        <template v-slot:first><span>По популярности</span></template>
        <template v-slot:second><span>По дате обновления</span></template>
      </checkbox-switcher>
    </div>
    <div class="chooseTheme" v-if="variant == `full`">
      <v-autocomplete
        label="Выберите тему"
        :items="facultiesArray.map((elem) => elem.name)"
        v-model="chooseTheme"
        @input="emitChooseTheme"
        variant="underlined"
      ></v-autocomplete>
    </div>
    <div class="autocompleteFind">
      <v-autocomplete
        label="Поиск"
        :items="courses.map((elem) => elem.courseName)"
        v-model="autocomplete"
        @input="emitAutocomplete"
        variant="outlined"
      ></v-autocomplete>
    </div>
  </section>
</template>

<script>
export default {
  name: "TopMultisort",
  props: {
    // variant: small, full
    variant: String,
    courses: Array,
    facultiesArray: Array,
  },
  data() {
    return{
        checkboxSwitcher: false,
        chooseTheme: "",
        autocomplete: ""
    }
  },
  computed: {
    emitChooseTheme(){
        this.$emit("update:chooseTheme", this.chooseTheme);
        return true
    },
    emitCheckbox(){
        this.$emit("update:checkboxSwitcher", this.checkboxSwitcher);
        return true
    },
    emitAutocomplete(){
        this.$emit("update:autocomplete", this.autocomplete);
        return true
    }
  },
};
</script>

<style lang="scss" scoped>
.sortSettings {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;

  align-items: center;
  justify-content: space-between;

  @media(max-width:1200px){
    justify-content: space-around;
  }

  .found {
    margin-bottom: 10px;
  }
  .sortType {
    display: flex;
    gap: 10px;

    margin-bottom: 10px;

    text-align: center;
  }
  .chooseTheme {
    max-width: 233px;
    width: 100%;
  }
  .autocompleteFind {
    max-width: 291px;
    width: 100%;
  }
}
</style>
