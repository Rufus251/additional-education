<template>
  <section class="sortTypes" v-for="(sType, i) in types" :key="i">
    <input
      type="checkbox"
      :id="`sType-animation` + sType.name"
      class="sType-animation"
    />
    <label :for="`sType-animation` + sType.name">
      <div class="name" @click="sType.isOpen = !sType.isOpen">
        <header class="text1">{{ sType.name }}</header>
        <img src="./images/arrow.png" alt="arrow icon" />
      </div>

      <ul class="checkboxes" v-if="sType.isOpen">
        <li v-for="content in sType.array" :key="content.id">
          <v-checkbox
            class="text1 mt-5"
            :label="content.name"
            :value="content.id"
            v-model="checkedCheckbox[i]"
            hide-details
          >
          </v-checkbox>
        </li>
      </ul>
    </label>
  </section>
</template>

<script>
export default {
  name: "AsideCheckboxSort",
  props: {
    types: Array,
    checkbox: Array,
  },
  data() {
    return {
      checkedCheckbox: [[],[],[],[]],
    };
  },
  watch: {
    checkedCheckbox: {
      handler(value) {
        this.$emit("update:modelValue", value || []);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sType-animation {
  display: none;

  &:checked {
    & + label > .name > img {
      transform: rotate(-180deg);

      transition: 0.2s;
    }
  }

  & + label {
    & > .name {
      margin-top: 40px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }

      & > img {
        transition: 0.2s;
        transform-origin: 50% 50%;
      }
    }

    & > ul {
      list-style: none;
    }
  }
}
</style>
