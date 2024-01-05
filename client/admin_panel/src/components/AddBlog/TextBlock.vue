<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="BlogBlock.header"
      label="Заголовок блога"
      placeholder="Заголовок абзаца"
      variant="underlined"
    >
    </v-text-field>
    <v-text-field
      v-model="BlogBlock.text"
      label="Текст абзаца"
      placeholder="Текст абзаца"
      variant="underlined"
    >
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    TaskProp: Object,
  },
  data() {
    return {
      //     valid: false,

      BlogBlock: {
        header: "test",
        text: "test",
      },
    };
  },
  watch: {
    //   valid(value) {
    //     this.$emit("update:TaskValidProp", value || false);
    //   },
    BlogBlock: {
      handler() {
        this.$emit("update:BlogBlockProp", this.BlogBlock || []);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;

  margin-left: 100px;
}
</style>
