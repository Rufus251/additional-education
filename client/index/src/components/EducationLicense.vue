<template>
  <div class="license">
    <article>
      <h2>Лицензия на право ведения образовательной деятельности</h2>
      <p class="text1">
        Лицензия на осуществление образовательной деятельности №7536 от 16
        ноября 2020 года выдана ООО "Университет дополнительного
        профессионального образования". Лицензия дает право на осуществление
        образовательной деятельности по любым программам дополнительного
        профессионального образования и выдачу документов установленного
        образца. Лицензия выдана бессрочно и без дополнительных ограничений. Вы
        можете проверить лицинзию, с помощью специального сервиса Рособрнадзора,
        позволяющего получить информацию из сводного реестра лицензий. Для
        этого, достаточно просто указать номер лицензии - 7536 в соответствующее
        поле формы.
      </p>

      <div class="btns">
        <blue-button180 :href="`https://google.com`">
          Скачать PDF
        </blue-button180>
        <white-button225 :href="`https://google.com`">
          Проверить лицензию
        </white-button225>
      </div>
    </article>
    <DiplomSlider :licenses="licenses"> </DiplomSlider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      licenses: [
        {
          id: 1,
          img: "",
        },
        {
          id: 2,
          img: "",
        },
        {
          id: 3,
          img: "",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.license {
  max-width: 1200px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  padding-top: 120px;
  padding-bottom: 100px;

  display: flex;
  gap: 150px;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;

    padding-left: 15px;
    padding-right: 15px;
  }
  article {
    h2 {
      max-width: 570px;
      width: 100%;
      @media (max-width: 1300px) {
        text-align: center;
      }
    }
    p {
      margin-top: 40px;

      max-width: 570px;
      width: 100%;
      @media (max-width: 1300px) {
        text-align: center;
      }
    }
    .btns {
      margin-top: 60px;

      display: flex;
      gap: 20px;

      @media (max-width: 1300px) {
        flex-direction: column;
        justify-content: center;

        .v-btn {
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
