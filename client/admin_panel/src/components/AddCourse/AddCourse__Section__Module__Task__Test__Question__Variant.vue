<template>
  <section class="addCourse__Variants">
    <v-form v-model="valid" ref="form">
      <div v-for="(quesVariant, i) in QuestionVariants" :key="i">
        <v-text-field
          v-model="quesVariant.variantText"
          label="Текст ответа на вопрос"
          placeholder="Это Млекопитающие"
          variant="underlined"
        >
        </v-text-field>
        <v-checkbox
          v-model="quesVariant.isTrue"
          label="Вариант верный?"
          variant="underlined"
        >
        </v-checkbox>
      </div>

      <BlueButton180
        @click="
          QuestionVariants.push({
            queueNumber: 0,
            variantText: '',
            isTrue: false,
          })
        "
      >
        + Вариант ответа
      </BlueButton180>
      <BlueButton180
        v-if="QuestionVariants.length > 0"
        @click="QuestionVariants.pop()"
      >
        - Вариант ответа
      </BlueButton180>
    </v-form>
  </section>
</template>

<script>
export default {
  props: {
    LectionBlockValidProp: Boolean,
    QuestionVariantsProp: Array,
  },
  data() {
    return {
      valid: false,

      QuestionVariants: [],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:LectionBlockValidProp", value || false);
    },
    QuestionVariants: {
      handler() {
        this.$emit("update:QuestionVariantsProp", this.QuestionVariants || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.addCourse__Variants {
  margin-left: 100px;
}
.v-form {
  min-width: 300px;
}
</style>
