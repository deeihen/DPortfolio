<template>
  <header class="nav mono">
    <a href="#top" class="nav__mark"><span class="ok">mark@soc</span>:<span class="muted">~</span>$</a>
    <button
      class="nav__menu"
      :aria-expanded="open"
      aria-controls="nav-links"
      @click="open = !open"
    >{{ open ? 'close' : 'menu' }}</button>
    <ul id="nav-links" class="nav__links" :class="{ open }">
      <li v-for="l in links" :key="l.href">
        <a :href="l.href" class="nav__link" @click="open = false">{{ l.label }}</a>
      </li>
    </ul>
    <span class="nav__clock muted">PHT {{ clock }}</span>
    <a :href="linkedin" class="button" target="_blank" rel="noopener">connect with me</a>
  </header>
</template>

<script setup>
const open = ref(false)
const linkedin = 'https://linkedin.com/in/mark-dennis-concha-2ab10a316/'
const links = [
  { label: 'investigate', href: '#triage' },
  { label: 'profile', href: '#about' },
  { label: 'coverage', href: '#practice' },
  { label: 'cases', href: '#work' },
]

const clock = ref('--:--:--')
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
onMounted(() => {
  const tick = () => { clock.value = fmt.format(new Date()) }
  tick()
  const t = setInterval(tick, 1000)
  onBeforeUnmount(() => clearInterval(t))
})
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.6rem var(--margin);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
  font-size: 14px;
}
.nav__mark { font-weight: 700; }
.nav__links { display: flex; gap: 1.4rem; list-style: none; margin-right: auto; }
.nav__link { color: var(--muted); transition: color 0.2s; }
.nav__link:hover { color: var(--ok); }
.nav__link::before { content: '/'; color: var(--line); margin-right: 0.15em; }
.nav__clock { font-variant-numeric: tabular-nums; }
.nav__menu { display: none; min-height: 40px; color: var(--muted); margin-right: auto; }

@media (max-width: 760px) {
  .nav { flex-wrap: wrap; gap: 0 1rem; }
  .nav__menu { display: block; }
  .nav__clock { display: none; }
  .nav__links {
    display: none;
    order: 5;
    flex-basis: 100%;
    flex-direction: column;
    gap: 0;
    padding-bottom: 0.5rem;
  }
  .nav__links.open { display: flex; }
  .nav__link { display: block; padding: 0.6rem 0; color: var(--ink); }
}
</style>
