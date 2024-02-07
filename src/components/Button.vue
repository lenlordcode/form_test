<template>
  <div class="flex justify-center w-full max-w-72 h-10 bg-slate-900 text-center text-white cursor-default
  rounded items-center hover:opacity-80 ">
      <slot></slot>
  </div>
</template>

<style scoped>


  .el-button:active {
      @apply opacity-50
  }
</style>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Button"
})
</script>