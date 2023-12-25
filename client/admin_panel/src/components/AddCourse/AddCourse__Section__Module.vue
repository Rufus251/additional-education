<template>
  <section class="addCourse__Module">
    <v-form v-model="valid" ref="form">
      <section v-for="MCount in ModuleCounter" :key="MCount">
        <h3>Модуль {{ MCount }}</h3>
        <v-text-field
          v-model="Modules[MCount - 1].hoursAmount"
          :rules="MinMaxHoursRules"
          label="Количество часов на модуль"
          placeholder="50"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="Modules[MCount - 1].moduleName"
          :rules="MinMaxHoursRules"
          label="Название модуля"
          placeholder="Модуль 1. Педагогика"
          variant="underlined"
        >
        </v-text-field>

        <AddCourseSectionModuleTask
          v-model:TasksProp="Modules[MCount - 1].tasks"
        ></AddCourseSectionModuleTask>
      </section>
    </v-form>
    <BlueButton180
      v-if="ModuleCounter < MaxModuleCounter"
      @click="
        ModuleCounter++;
        Modules.push({
          hoursAmount: 120,
          moduleName: 'Крутое название модуля',
          tasks: [],
        });
      "
    >
      + Модуль
    </BlueButton180>
    <BlueButton180
      v-if="ModuleCounter > 0"
      @click="
        ModuleCounter--;
        Modules.pop();
      "
    >
      - Модуль
    </BlueButton180>
  </section>
</template>

<script>
import AddCourseSectionModuleTask from "./AddCourse__Section__Module__Task.vue";
export default {
  components: {
    AddCourseSectionModuleTask,
  },
  props: {
    ModuleValidProp: Boolean,
    ModulesProp: Array,
  },
  data() {
    return {
      valid: false,

      // Add Module
      ModuleCounter: 0,
      MaxModuleCounter: 4,

      Modules: [],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:ModuleValidProp", value || false);
    },
    Modules: {
      handler() {
        this.$emit("update:ModulesProp", this.Modules || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.addCourse__Module {
  margin-left: 50px;
}
.v-form {
  min-width: 300px;
}
</style>
