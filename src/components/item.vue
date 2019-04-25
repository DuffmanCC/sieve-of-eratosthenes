<template>
  <div :class="{ 'border-blue': isPrime }" class="w-12 h-12 bg-white mr-4 mb-4 border-4 flex items-center justify-center border-transparent relative">
    <span v-if="item > 1">{{ item }}</span>
    <div v-if="isMultiple" class="cross"></div>
  </div>
</template>

<script>
  export default {
    props: ['item'],

    data() {
      return {
        isMultiple: false,
        isPrime: false
      }
    },
  }
</script>

<style>
  .cross:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "\274c"; /* use the hex value here... */
    font-size: 20px;
    line-height: 40px;
    text-align: center;
  }
</style>