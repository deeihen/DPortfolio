<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span class="footer__copy">
        © {{ new Date().getFullYear() }} YourName. Built with
        <a href="https://nuxt.com" target="_blank" class="footer__link">Nuxt</a>
        &amp; deployed on
        <a href="https://vercel.com" target="_blank" class="footer__link">Vercel</a>.
      </span>

      <div class="footer__badge">
        <span class="footer__dot" /> Open to opportunities
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--c-border);
  padding: 2rem 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copy {
  font-size: 0.82rem;
  color: var(--c-muted);
}

.footer__link {
  color: var(--c-lime);
  transition: color var(--transition);
}

.footer__link:hover { color: var(--c-cyan); }

.footer__badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--c-muted);
}

.footer__dot {
  width: 8px; height: 8px;
  background: var(--c-lime);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200,241,53, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(200,241,53, 0); }
}
</style>
