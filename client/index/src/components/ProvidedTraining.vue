<template>
  <div class="bg_color">
    <div class="providedTraining">
      <div class="content">
        <h2>Обучение за счёт вашей компании.</h2>
        <p class="text2">
          У нас действует 2 вида договора на обучение. По одному вы оплачиваете
          сами, а второй предлагает оплатить обучение за счёт вашей компании.
        </p>
        <blue-button180 :href="`https://google.com`">
          Выбрать курс
        </blue-button180>
      </div>
      <div class="scene">
        <img src="./../assets/ProvidedScene.png" alt="providedScene" />
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.bg_color{
  background-color: #F6F8F9;
}
.providedTraining {
  max-width: 1200px;
  width: 100%;

  

  padding-top: 120px;
  padding-bottom: 80px;

  margin-left: auto;
  margin-right: auto;

  display: flex;

  gap: 60px;

  @media (max-width: 1300px) {
    padding-top: 80px;
    text-align: center;
  }
  .content {
    @media (max-width: 1300px) {
      margin-left: auto;
      margin-right: auto;
    }
    h2 {
      max-width: 570px;
      width: 100%;

      @media (max-width: 1300px) {
        padding-left: 10px;
        padding-right: 10px;

        text-align: center;
      }
    }
    p {
      margin-top: 40px;

      max-width: 570px;
      width: 100%;

      @media (max-width: 1300px) {
        padding-left: 10px;
        padding-right: 10px;

        text-align: center;
      }
    }
    .v-btn {
      margin-top: 60px;

      @media (max-width: 1300px) {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  .scene {
    @media (max-width: 1300px) {
      display: none;
    }
  }
}
</style>
