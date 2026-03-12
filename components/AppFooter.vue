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
  border-top: 1px solid var(--border);
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
  color: var(--muted);
}

.footer__link {
  color: var(--accent3);
  transition: color 0.2s;
}

.footer__link:hover { color: var(--accent2); }

.footer__badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.footer__dot {
  width: 8px; height: 8px;
  background: var(--accent3);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(185,255,0, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(185,255,0, 0); }
}

@media (max-width: 768px) {
  .footer__inner {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
}
</style>
