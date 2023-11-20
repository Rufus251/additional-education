<template>
  <section class="sortTypes" v-for="sType in types" :key="sType.name">
    <input
      type="checkbox"
      :id="`sType-animation` + sType.name"
      class="sType-animation"
    />

    <label :for="`sType-animation` + sType.name">
      <div class="name" @click="sType.isOpen = !sType.isOpen">
        <header class="text1">{{ sType.name }}</header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          transform="rotate(180)"
        >
          <path d="M21 11L11 1L1 11" stroke="black" />
        </svg>
      </div>

      <ul class="checkboxes" v-if="sType.isOpen">
        <li v-for="content in sType.array" :key="content.id">
          <v-checkbox
            class="text1 mt-5"
            :label="content.name"
            :value="content.name"
            v-model="checkedCheckbox"
            hide-details
            @change="emitCheckboxes"
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
      checkedCheckbox: [],
    };
  },
  methods: {
    emitCheckboxes() {
      this.$emit("update:modelValue", this.checkedCheckbox);
    },
  },
};
</script>

<style scoped lang="scss">
.sType-animation {
  display: none;

  &:checked {
    & + label > .name > svg {
      transform: rotate(360deg);

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

      & > svg {
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
