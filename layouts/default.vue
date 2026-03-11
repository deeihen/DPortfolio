<template>
  <div class="layout">
    <CustomCursor />
    <AppNav />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout { position: relative; }
main { position: relative; }
</style>
