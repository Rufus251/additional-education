<template>
  <section class="addCourse__Question">
    <v-form v-model="valid" ref="form">
      <div v-for="(testBlock, i) in TestQuestions" :key="i">
        <v-text-field
          v-model="testBlock.questionType"
          label="Тип вопроса"
          placeholder="radio, checkbox"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="testBlock.questionHeader"
          label="Заголовок вопроса"
          placeholder="Lorem ipsum"
          variant="underlined"
        >
        </v-text-field>
        <h4>Картинка вопроса</h4>
        <v-file-input
          v-model="testBlock.questionImg"
          variant="underlined"
        ></v-file-input>
        
        <!-- Варианты ответов -->
        <QuestionVariants
        v-model:QuestionVariantsProp="testBlock.testQuestionVariants">
        </QuestionVariants>
      </div>

      <BlueButton180
        @click="
          TestQuestions.push({
            questionType: '',
            queueNumber: 0,
            questionHeader: '',
            questionImg: '',

            testQuestionVariants: [],
          })
        "
      >
        + Test Question
      </BlueButton180>
      <BlueButton180
        v-if="TestQuestions.length > 0"
        @click="TestQuestions.pop()"
      >
        - Test Question
      </BlueButton180>
    </v-form>
  </section>
</template>

<script>
import QuestionVariants from "./AddCourse__Section__Module__Task__Test__Question__Variant.vue"
export default {
    components:{
        QuestionVariants
    },
  props: {
    LectionBlockValidProp: Boolean,
    TestQuestionsProp: Array,
  },
  data() {
    return {
      valid: false,

      TestQuestions: [],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:LectionBlockValidProp", value || false);
    },
    TestQuestions: {
      handler() {
        this.$emit("update:TestQuestionsProp", this.TestQuestions || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.addCourse__Question {
  margin-left: 100px;
}
.v-form {
  min-width: 300px;
}
</style>
