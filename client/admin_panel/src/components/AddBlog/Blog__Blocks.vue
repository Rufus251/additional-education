<template>
  <v-form v-model="valid" ref="form">
    <div v-for="(BlogBlock, i) in blogBlocks" :key="i">
      <TextBlock
        v-if="BlogBlock.header"
        v-model:BlogBlockProp="blogBlocks[i]"
      ></TextBlock>

      <FileBlock
        v-if="BlogBlock.imgUrl"
        v-model:FileProp="blogBlocks[i].imgUrl"
        :HeaderProp="'Картинка'"
      ></FileBlock>

      
      <FileBlock
      v-if="BlogBlock.videoUrl"
      v-model:FileProp="blogBlocks[i].videoUrl"
      :HeaderProp="'Видео'"
      ></FileBlock>

      <FileBlock
        v-if="BlogBlock.audioUrl"
        v-model:FileProp="blogBlocks[i].audioUrl"
        :HeaderProp="'Аудио'"
      ></FileBlock>
      
      <BlueButtonFull
        v-if="blogBlocks.length > 0"
        @click="blogBlocks.splice(i, 1)"
      >
        - block
      </BlueButtonFull>
    </div>
    <BlueButton180
      @click="
        blogBlocks.push({
          header: 'test',
          text: 'test',
        })
      "
    >
      + Статья
    </BlueButton180>
    <BlueButton180
      @click="
        blogBlocks.push({
          imgUrl: 'img',
        })
      "
    >
      + Картинка
    </BlueButton180>
    <BlueButton180
      @click="
        blogBlocks.push({
          videoUrl: 'video',
        })
      "
    >
      + Видео
    </BlueButton180>
    <BlueButton180
      @click="
        blogBlocks.push({
          audioUrl: 'audio',
        })
      "
    >
      + Аудио
    </BlueButton180>
  </v-form>
</template>

<script>
import TextBlock from "./TextBlock.vue";
import FileBlock from "./FileBlock.vue";
export default {
  components: {
    TextBlock,
    FileBlock,
  },
  props: {
    TestQuestionsProp: Array,
  },
  data() {
    return {
      // valid: false,

      blogBlocks: [],
    };
  },
  watch: {
    // valid(value) {
    //   this.$emit("update:LectionBlockValidProp", value || false);
    // },
    blogBlocks: {
      handler() {
        this.$emit("update:blogBlocksProp", this.blogBlocks || {});
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
.v-btn {
  margin-top: 20px;
}
</style>
