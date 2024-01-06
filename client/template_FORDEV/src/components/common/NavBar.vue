<template>
  <div class="navbar">
    <v-layout>
      {{ userImgAndName }}
      <v-app-bar scroll-behavior="elevate" class="align-center py-4 px-7">
        <img src="./images/logo.png" alt="logo" />
        <v-spacer></v-spacer>
        <WhiteButton140 v-if="width >= 1000"> Все курсы </WhiteButton140>
        <v-spacer></v-spacer>
        <div class="refs d-flex" v-if="width >= 1500">
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="`${link.href}`"
            variant="text"
            class="text-none px-1"
          >
            {{ link.name }}
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn href="tel:88463754131" v-if="width >= 1000">
          <img src="./images/phone.png" alt="phone" />
          <p class="ml-2 menu">8 (846) 375-41-31</p>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          href="#"
          class="text-none"
          color="#3D8BE4"
          v-if="width >= 1000 && !isAuth"
        >
          <img src="./images/authCircle.png" alt="auth icon" />
          <p class="menu ml-2">Вход / Регистрация</p>
        </v-btn>
        <v-spacer></v-spacer>
        <a class="user" href="#" v-if="width >= 1000 && isAuth">
          <img
            :src="`http://localhost:3000/` + userImgAndName.img"
            alt="user photo"
          />
          <p class="ml-2 menu">
            {{ userImgAndName.familyName }} {{ userImgAndName.name }}
          </p>
        </a>
        <v-spacer></v-spacer>
        <v-menu v-if="width < 1500">
          <template v-slot:activator="{ props }">
            <v-btn color="#000" v-bind="props" icon>
              <svg
                class="v-icon__svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
              </svg>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="width < 1000" class="justify-center">
              <WhiteButton140> Все курсы </WhiteButton140>
            </v-list-item>
            <v-list-item
              class="justify-center menu"
              v-for="(link, i) in links"
              :key="i"
              :href="link.href"
            >
              {{ link.name }}
            </v-list-item>
            <v-list-item
              href="tel:88463754131"
              v-if="width < 1000"
              class="justify-center"
            >
              <div class="d-flex align-center">
                <img src="./images/phone.png" alt="phone" />
                <span class="ml-2 menu">8 (846) 375-41-31</span>
              </div>
            </v-list-item>
            <v-list-item
              v-if="width < 1000 && isAuth"
              class="justify-center menu"
            >
              <a class="user" href="#">
                <img
                  :src="`http://localhost:3000/` + userImgAndName.img"
                  alt="user photo"
                />
                <p class="ml-2 menu">
                  {{ userImgAndName.familyName }} {{ userImgAndName.name }}
                </p>
              </a>
            </v-list-item>
            <v-list-item
              href="#"
              v-if="width < 1000 && !isAuth"
              class="justify-center menu"
            >
              Вход / Регистрация
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    isAuth: Boolean,
    userImgAndName: Object,
  },
  data() {
    return {
      links: [
        {
          name: "Видеолекции",
          href: "#",
        },
        {
          name: "Тесты",
          href: "#",
        },
        {
          name: "Low Price",
          href: "#",
        },
        {
          name: "Блог",
          href: "#",
        },
        {
          name: "Об организации",
          href: "#",
        },
      ],
      width: document.documentElement.clientWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", this.getDimensions);
  },
  unmounted() {
    window.removeEventListener("resize", this.getDimensions);
  },
  methods: {
    getDimensions() {
      this.width = document.documentElement.clientWidth;
    },
  },
};
</script>

<style scoped lang="scss">
a {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.user {
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: 50px;

    border-radius: 50%;
  }
}
.refs {
  gap: 45px;
}
</style>
