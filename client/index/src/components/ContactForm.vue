<template>
  <section class="bgColor">
    <div class="contactForm">
      <h2>Заполните форму обратной связи, если у вас остались вопросы</h2>

      <ManagerForm></ManagerForm>
    </div>
  </section>
</template>

<script>
</script>

<style scoped lang="scss">
.bgColor {
  background-color: #f6f8f9;
}
.contactForm {
  max-width: 1200px;
  width: 100%;

  margin-right: auto;
  margin-left: auto;
  padding-top: 120px;
  padding-bottom: 60px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 1300px) {
    flex-direction: column;

    justify-content: space-between;

    padding-left: 10px;
    padding-right: 10px;
  }
  h2 {
    max-width: 570px;
    width: 100%;

    @media (max-width: 1300px) {
      text-align: center;

      margin-right: auto;
      margin-left: auto;
    }
  }
}
</style>
