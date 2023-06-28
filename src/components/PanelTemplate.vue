<script>
</script>

<template>
  <div class="text-lg text-center flex flex-col h-fit space-y-4 border-b-2 border-slate-600 pb-4">
    <slot name="intro"></slot>
  </div>
  <div>
    <slot name="main"></slot>
  </div>
  <div>
    <slot name="buttons"></slot>
  </div>
</template>