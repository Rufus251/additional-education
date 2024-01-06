<template>
  <div class="bg_color">
    <div class="footer">
      <div class="content">
        <h5>Об организации</h5>
        <ul class="refBlock">
          <li>
            <a href="#" class="menu">Об УДПО</a>
          </li>
          <li>
            <a href="#" class="menu">Руководство</a>
          </li>
          <li>
            <a href="#" class="menu">Нормативные док</a>
          </li>
          <li>
            <a href="#" class="menu">Преподователи</a>
          </li>
          <li>
            <a href="#" class="menu">Образование</a>
          </li>
          <li>
            <a href="#" class="menu">Платные услуги</a>
          </li>
          <li>
            <a href="#" class="menu">Вакансии</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <h5>Обучение</h5>
        <ul class="refBlock">
          <li>
            <a href="#" class="menu">Курсы</a>
          </li>
          <li>
            <a href="#" class="menu">Видеолекции</a>
          </li>
          <li>
            <a href="#" class="menu">Тесты</a>
          </li>
          <li>
            <a href="#" class="menu">Low Price</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <h5>Медиа</h5>
        <ul class="refBlock">
          <li>
            <a href="#" class="menu">Блог</a>
          </li>
          <li>
            <a href="#" class="menu">Вопросы и ответы</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <h5>Об организации</h5>
        <ul class="refBlock">
          <li>
            <a href="#" class="menu">Об УДПО</a>
          </li>
          <li>
            <a href="#" class="menu">Руководство</a>
          </li>
          <li>
            <a href="#" class="menu">Нормативные док</a>
          </li>
          <li>
            <a href="#" class="menu">Преподователи</a>
          </li>
          <li>
            <a href="#" class="menu">Образование</a>
          </li>
          <li>
            <a href="#" class="menu">Платные услуги</a>
          </li>
          <li>
            <a href="#" class="menu">Вакансии</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <ul class="socialIcons">
          <li>
            <a href="#">
              <img src="./images/socialIcons/VK.png" alt="vk" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./images/socialIcons/Instagram.png" alt="instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./images/socialIcons/Facebook.png" alt="facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./images/socialIcons/Telegram.png" alt="telegram" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./images/socialIcons/WhatsApp.png" alt="whatsapp" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./images/socialIcons/Viber.png" alt="viber" />
            </a>
          </li>
        </ul>
        <div class="phone">
          <a href="tel:88463754131">
            <img src="./images/phone.png" alt="phone icon" />
            <p class="menu">8 (846) 375-41-31</p>
          </a>
          <p class="caption">Пн-Пт, 8:00-17:00 по МСК</p>
        </div>
        <div class="mail">
          <a href="#">
            <img src="./images/mail.png" alt="mail icon" />
            <p class="menu">mail@udpo.info</p>
          </a>
          <p class="caption">Круглосуточно, для подачи документов</p>
        </div>
        <div class="logo">
          <img src="./images/logo.png" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.bg_color {
  background-color: #f6f8f9;
}
a {
  text-decoration: none;
  color: #000000;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.footer {
  max-width: 1200px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
  padding-bottom: 60px;

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 1300px) {
    justify-content: center;
  }
  .content {
    @media (max-width: 1300px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    .refBlock {
      margin-top: 12px;

      list-style: none;

      li {
        margin-top: 10px;
      }
    }
    .socialIcons {
      list-style: none;

      display: flex;
      gap: 20px;
    }
    .phone,
    .mail {
      margin-top: 30px;
      a {
        display: flex;
        align-items: center;

        svg {
          width: 24px;
          height: 24px;
        }
      }
      p.menu {
        margin-left: 8px;
      }
    }
    .logo {
      margin-top: 30px;
    }
  }
}
</style>
