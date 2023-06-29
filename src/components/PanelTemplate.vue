<script>
</script>

<template>
  <div
    class="text-lg text-center flex flex-col h-fit space-y-4 border-b-2 border-slate-600 pb-4"
  >
    <slot name="intro"></slot>
  </div>
  <div class="text-lg text-center flex flex-col h-fit py-4 items-center space-y-4">
    <slot name="main"></slot>
  </div>
  <div class="flex justify-center space-x-4">
    <slot name="buttons"></slot>
  </div>
</template>
