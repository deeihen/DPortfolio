<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <NuxtLink to="/" class="logo">
        <span class="logo-bracket">[</span>
        <span class="logo-name">YourName</span>
        <span class="logo-bracket">]</span>
      </NuxtLink>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="nav-link">
            <span class="nav-link-num">{{ link.num }}</span>
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a href="#contact" class="nav-cta">Hire Me</a>
    </div>
  </nav>
</template>

<script setup>
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 60)

const links = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Skills', href: '#skills' },
  { num: '03', label: 'Projects', href: '#projects' },
  { num: '04', label: 'Contact', href: '#contact' },
]
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
}
.nav.scrolled {
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.logo-bracket { color: var(--accent3); }
.logo-name { color: var(--text); margin: 0 0.1em; }

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}
.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.nav-link:hover { color: var(--text); }
.nav-link-num { color: var(--accent1); font-size: 0.65rem; }

.nav-cta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.55rem 1.2rem;
  border: 1.5px solid var(--accent3);
  color: var(--accent3);
  transition: all 0.2s ease;
  border-radius: 2px;
}
.nav-cta:hover {
  background: var(--accent3);
  color: #000;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
}
</style>
