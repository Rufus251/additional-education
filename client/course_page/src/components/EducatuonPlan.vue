<template>
  <section>
    <header>
      <div class="header__text">
        <h2>Учебный план</h2>
        <p class="text2">курса повышения квалификации</p>
      </div>

      <blue-button180 :href="`#`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 9H15V3H9V9H5L12 17L19 9ZM4 19H20V21H4V19Z"
            fill="white"
          />
        </svg>
        Скачать
      </blue-button180>
    </header>

    <main>
      <div class="btns">
        <div class="btn" v-for="(btn, i) in sectionsProp" :key="btn">
          <input
            v-model="sortType"
            :id="btn + i"
            type="radio"
            name="type"
            :value="btn.hoursAmount"
          />
          <label :for="btn + i">
            <h5>{{ btn.hoursAmount }} ак. ч.</h5>
          </label>
        </div>
      </div>

      <div class="modules__header">
        <p class="text1">Название модуля, темы</p>
        <p class="text1">Кол-во часов</p>
        <p class="text1"></p>
      </div>
      <div class="modules" v-for="section in sectionsProp" :key="section.id">
        <div class="switch_hide" v-if="section.hoursAmount == sortType">
          <div
            class="module"
            v-for="moduule in section.modules"
            :key="moduule.name"
          >
            <hr />
            <div class="module__header">
              <h5>{{ moduule.moduleName }}</h5>
              <h5>{{ moduule.hoursAmount }} ак.ч.</h5>
              <input
                v-model="isOpen"
                :id="moduule.id"
                type="checkbox"
                name="isOpen"
                :value="moduule.id"
              />
              <label :for="moduule.id">
                <img src="../assets/arrow.png" alt="arrow icon" />
              </label>
            </div>
            <transition name="slide-fade">
              <ul v-if="isOpen.includes(moduule.id)">
                <li
                  class="module__content"
                  v-for="task in moduule.tasks"
                  :key="task.id"
                >
                  <p class="text3">{{ task.lessonName }}</p>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  props: {
    sectionsProp: Array,
  },
  data() {
    return {
      sortType: "250",
      isOpen: [],
    };
  },
};
</script>

<style scoped lang="scss">
section {
  max-width: 1200px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;
  padding-top: 120px;
  padding-bottom: 120px;

  @media (max-width: 1279px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
header {
  display: flex;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;

    text-align: center;
    .v-btn {
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
    }
  }
  &__text {
    p.text2 {
      margin-top: 20px;
    }
  }
}

.btns {
  margin-top: 30px;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;

  // custom input
  input {
    display: none;
  }
  input:checked ~ label {
    display: block;

    height: 24px;

    color: #3d8be4;

    padding-bottom: 7px;
    border-bottom: 2px solid #3d8be4;
  }
  label {
    height: 33px;

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}

.modules {
  &__header {
    margin-top: 60px;
    margin-bottom: 10px;

    opacity: 0.4;
    display: flex;
    justify-content: space-between;
  }
  .module {
    padding-bottom: 30px;

    hr {
      opacity: 0.4;
    }
    &__header {
      margin-top: 30px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      // Применить ко всем дочерним элементам
      & > * {
        @media (max-width: 700px) {
          max-width: 100px;
        }
      }

      input {
        display: none;

        &:checked + label > img {
          transform: rotate(0deg);

          transition: 0.2s;
        }
      }

      img {
        transform: rotate(-180deg);
        transition: 0.2s;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
    ul {
      list-style: none;
    }
    &__content {
      margin-top: 20px;

      display: flex;
      flex-direction: column;
      gap: 10px;

      @media (max-width: 700px) {
        max-width: 220px;
      }
      @media (max-width: 500px) {
        max-width: 150px;
      }
      @media (max-width: 350px) {
        max-width: 120px;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter-from, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
