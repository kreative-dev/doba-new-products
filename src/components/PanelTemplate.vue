<script></script>

<template>
  <!-- Base design for the different panels, includes slots for the intro of the page, the main section, and navigational buttons -->
  <div
    class="flex h-fit flex-col space-y-4 border-b-2 border-slate-600 pb-4 text-center text-lg"
  >
    <slot name="intro"></slot>
  </div>
  <div
    class="flex h-fit flex-col items-center space-y-4 py-4 text-center text-lg"
  >
    <slot name="main"></slot>
  </div>
  <div class="flex justify-center space-x-4">
    <slot name="buttons"></slot>
  </div>
</template>
