<template>
  <section class="addCourse__Section">
    <v-form v-model="valid" ref="form">
      <h2>Содержание курса</h2>
      <section v-for="SCount in SectionsCounter" :key="SCount">
        <h3>Секция {{ SCount }}</h3>
        <v-text-field
          v-model="Sections[SCount - 1].hoursAmount"
          :rules="HoursAmountRules"
          label="Количество часов на секцию"
          placeholder="250"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="Sections[SCount - 1].cost"
          :rules="CostRules"
          label="Цена"
          placeholder="6000 рублей"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="Sections[SCount - 1].cashback"
          :rules="CashbackRules"
          label="Кешбек"
          placeholder="300"
          variant="underlined"
        >
        </v-text-field>

        <AddCourseSectionModule
          v-model:ModulesProp="Sections[SCount - 1].modules"
        >
        </AddCourseSectionModule>
      </section>
    </v-form>
    <BlueButton180
      v-if="SectionsCounter < MaxSectionsCounter"
      @click="
        SectionsCounter++;
        Sections.push({
          hoursAmount: 0,
          cost: 0,
          cashback: 0,
          modules: [],
        });
      "
    >
      + Секция
    </BlueButton180>
    <BlueButton180
      v-if="SectionsCounter > 1"
      @click="
        SectionsCounter--;
        Sections.pop();
      "
    >
      - Секция
    </BlueButton180>
  </section>
</template>

<script>
import AddCourseSectionModule from "./AddCourse__Section__Module.vue";
export default {
  components: {
    AddCourseSectionModule,
  },
  props: {
    SectionValidProp: Boolean,
    SectionsProp: Array,
  },
  data() {
    return {
      valid: false,

      // Add Section
      SectionsCounter: 1,
      MaxSectionsCounter: 4,

      Sections: [
        {
          hoursAmount: 0,
          cost: 0,
          cashback: "",
          modules: [],
        },
      ],
      SectionsCount: 1,

      // Rules
      HoursAmountRules: [(v) => v !== "" || "Введите количество часов"],
      CostRules: [(v) => v !== "" || "Введите цену"],
      CashbackRules: [(v) => v !== "" || "Введите кешбек"],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:SectionValidProp", value || false);
    },
    Sections: {
      handler() {
        this.$emit("update:SectionsProp", this.Sections || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
</style>
