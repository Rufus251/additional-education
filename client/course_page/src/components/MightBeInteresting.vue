<template>
  <div class="mightBeInteresting">
    <header>
      <h2>Может быть интересным</h2>
      <blue-button180 :href="`#`">
        Смотреть больше
      </blue-button180>
    </header>
    <VideolectionsSlider :videolections="videolectionsProp"></VideolectionsSlider>
  </div>
</template>

<script>
export default {
  props:{
    videolectionsProp: Array
  }
};
</script>

<style scoped lang="scss">
.mightBeInteresting {
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
