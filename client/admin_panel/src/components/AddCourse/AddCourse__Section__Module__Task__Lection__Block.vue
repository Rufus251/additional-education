<template>
  <section class="addCourse__Task">
    <v-form v-model="valid" ref="form">
      <div v-for="(lecBlock, i) in LectionBlocks" :key="i">
        <v-text-field
          v-model="lecBlock.header"
          label="Заголовок блока"
          placeholder="Глава 2. О позвоночных"
          variant="underlined"
        >
        </v-text-field>
        <v-text-field
          v-model="lecBlock.text"
          label="Текст блока"
          placeholder="Lorem ipsum"
          variant="underlined"
        >
        </v-text-field>
        <h4>Картинка блока</h4>
        <v-file-input
          v-model="lecBlock.img"
          variant="underlined"
        ></v-file-input>
      </div>

      <BlueButton180
        @click="
          LectionBlocks.push({
            header: '',
            text: '',
            img: '',
          })
        "
      >
        + LectionBlock
      </BlueButton180>
      <BlueButton180
        v-if="LectionBlocks.length > 0"
        @click="LectionBlocks.pop()"
      >
        - LectionBlock
      </BlueButton180>
    </v-form>
  </section>
</template>

<script>
export default {
  props: {
    LectionBlockValidProp: Boolean,
    LectionBlocksProp: Array,
  },
  data() {
    return {
      valid: false,

      LectionBlocks: [],
    };
  },
  watch: {
    valid(value) {
      this.$emit("update:LectionBlockValidProp", value || false);
    },
    LectionBlocks: {
      handler() {
        this.$emit("update:LectionBlocksProp", this.LectionBlocks || []);
      },
      deep: true,
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
</style>
