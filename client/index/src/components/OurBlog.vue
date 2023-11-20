<template>
  <div class="ourBlog">
    <header>
      <h2>Наш блог</h2>
      <blue-button180 :href="`https://google.com`">
        Читать больше
      </blue-button180>
    </header>
    <BlogSlider :blogs="blogs"> </BlogSlider>
  </div>
</template>

<script>
export default {
  props: {
    blogs: Array,
  },
};
</script>

<style scoped lang="scss">
a {
  color: #000;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
}
// slider left right btns in App.vue styles
.ourBlog {
  max-width: 1200px;
  width: 100%;

  margin: auto;
  padding-top: 120px;

  @media (max-width: 1300px) {
    padding-top: 80px;
  }
}

header {
  display: flex;

  justify-content: space-between;
  align-items: center;
  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
  }

  h2 {
    padding-left: 10px;
    padding-right: 10px;

    text-align: left;

    @media (max-width: 1300px) {
      text-align: center;
    }
  }
  .v-btn {
    @media (max-width: 1300px) {
      margin-top: 20px;
    }
  }
}
</style>
