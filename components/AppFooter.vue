<template>
  <footer class="footer wrap mono">
    <span>© {{ year }} Mark Dennis Concha</span>
    <span class="muted">session closed · <a class="link" href="#top">back to top</a></span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  padding-block: 1.2rem;
  border-top: 1px solid var(--line);
  font-size: 13px;
}
</style>
