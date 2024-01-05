<template>
  <v-form v-model="valid" ref="form">
    <h4>{{ HeaderProp }}</h4>
    <v-file-input v-model="BlogBlock.file" variant="underlined"></v-file-input>
  </v-form>
</template>

<script>
export default {
  props: {
    FileProp: Object,
    HeaderProp: String,
  },
  data() {
    return {
      //     valid: false,

      BlogBlock: {
        file:{}
      },
    };
  },
  watch: {
    //   valid(value) {
    //     this.$emit("update:TaskValidProp", value || false);
    //   },
    BlogBlock: {
      handler() {
        this.$emit("update:FileProp", this.BlogBlock.file || []);
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
