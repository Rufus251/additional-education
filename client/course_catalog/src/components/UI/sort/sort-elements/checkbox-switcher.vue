<template>
  <label class="text1">
    <slot name="first"></slot>
    <input type="checkbox" v-model="checkbox" @change="emitCheckboxes"/>
    <span class="search-checkbox"></span>
    <slot name="second"></slot>
  </label>
</template>
<script>
export default {
  name: "checkbox-switcher",
  data(){
    return{
      checkbox: false
    }
  },
  methods:{
    emitCheckboxes() {
      this.$emit("update:modelValue", this.checkbox);
    },
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/main.scss";
label {
  @media(max-width:420px){
  }
  input {
    display: none;
  }
  input:checked ~ .search-checkbox::after {
    left: 19px;

    transition: 0.5s;
  }
}
.search-checkbox {
  margin-right: 42px;
  margin-left: 4px;
  position: relative;

  &::before {
    content: "";
    width: 37px;
    height: 20px;
    border-radius: 9px;
    background-color: #3d8be4;
    margin-top: 2px;
    position: absolute;
  }

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #ffffff;

    margin-top: 4px;
    left: 2px;

    position: absolute;

    transition: 0.5s;
  }
}
</style>
