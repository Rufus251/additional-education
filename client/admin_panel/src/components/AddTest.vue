<template>
  <section class="addTest">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
  </section>
</template>

<script>
export default {
  props: {
    select: Number
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
