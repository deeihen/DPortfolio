<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <NuxtLink to="/" class="logo">
        <span class="logo-bracket">[</span>
        <span class="logo-name">Deeihen</span>
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

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle navigation menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-overlay" @click.self="menuOpen = false">
        <div class="mobile-menu">
          <ul class="mobile-links">
            <li v-for="link in links" :key="link.href">
              <a :href="link.href" class="mobile-link" @click="menuOpen = false">
                <span class="nav-link-num">{{ link.num }}</span>
                {{ link.label }}
              </a>
            </li>
          </ul>
          <a href="#contact" class="mobile-cta" @click="menuOpen = false">Hire Me</a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 60)
const menuOpen = ref(false)

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

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

/* Hamburger button */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 110;
}
.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  transition: all 0.3s ease;
  transform-origin: center;
}
.hamburger.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open .hamburger-line:nth-child(2) {
  opacity: 0;
}
.hamburger.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile overlay & menu */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}
.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}
.mobile-link {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.mobile-link:hover { color: var(--text); }
.mobile-cta {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.7rem 1.6rem;
  border: 1.5px solid var(--accent3);
  color: var(--accent3);
  border-radius: 2px;
  transition: all 0.2s;
}
.mobile-cta:hover { background: var(--accent3); color: #000; }

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .hamburger { display: flex; }
}
</style>
