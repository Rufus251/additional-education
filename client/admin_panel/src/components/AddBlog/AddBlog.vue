<template>
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <v-autocomplete
        v-model="Blog.FacultyName"
        :rules="FacultyNameRules"
        label="Выберите факультет"
        :items="faculties.map((elem) => elem.name)"
        variant="underlined"
      ></v-autocomplete>

      <v-text-field
        v-model="Blog.blogTitle"
        label="Заголовок блога"
        placeholder="Как получить налоговый вычет за обучение: на что обратить внимание и стоит ли оформлять его через посредников"
        variant="underlined"
      >
      </v-text-field>

      <h4>Картинка блога</h4>
      <v-file-input
        v-model="Blog.blogImage"
        variant="underlined"
      ></v-file-input>

      <BlogBlock v-model:blogBlocksProp="Blog.blocks"></BlogBlock>

      {{ progressMessage }}
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddBlog(Blog)"
      >
        Создать блог
      </blue-button-full>
    </v-form>
</template>

<script>
import BlogBlock from "./Blog__Blocks.vue";

import axios from "axios";
export default {
  components: {
    BlogBlock,
  },
  props: {
    faculties: Array,
  },
  data() {
    return {
      // to do:
      // validation
      // valid: false,

      progressMessage: "",

      Blog: {
        FacultyName: "",
        blogTitle:
          "Как получить налоговый вычет за обучение: на что обратить внимание и стоит ли оформлять его через посредников",
        blogImage: "",

        blocks: [],
      },
    };
  },
  methods: {
    async AddBlog(Blog) {
      this.progressMessage = "Блог добавляется, ожидайте...";

      const blog = await this.AddBlogMain(1, Blog);

      for (const block of Blog.blocks) {
        await this.AddBlogBlock(blog.data.id, block);
      }

      this.progressMessage = "Блог добавлен!";
    },

    async AddBlogMain(userId, Blog) {
      const facultyId = this.faculties.find(
        (fac) => fac.name === Blog.FacultyName
      ).id;

      let formdata = new FormData();

      formdata.append("blogTitle", Blog.blogTitle);
      formdata.append("file", Blog.blogImage[0], "file");

      const URL =
        "http://localhost:3000/blog/addBlog/" + userId + "/" + facultyId;

      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddBlogBlock(blogId, blogBlock) {
      let formdata = new FormData();
      let URL = "http://localhost:3000/blog/";

      if (blogBlock.header) {
        URL += "addBlogText/" + blogId;
        const res = await axios.post(URL, {
          header: blogBlock.header,
          text: blogBlock.text,
        });
        return res;
      } else if (blogBlock.imgUrl) {
        URL += "addBlogImage/" + blogId;
        formdata.append("file", blogBlock.imgUrl[0], "file");
      } else if (blogBlock.videoUrl) {
        URL += "addBlogVideo/" + blogId;
        formdata.append("file", blogBlock.videoUrl[0], "file");
      } else if (blogBlock.audioUrl) {
        URL += "addBlogAudio/" + blogId;
        formdata.append("file", blogBlock.audioUrl[0], "file");
      }

      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}

.v-btn {
  margin-top: 20px;
}
</style>
