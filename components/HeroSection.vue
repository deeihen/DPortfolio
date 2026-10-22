<template>
  <section id="top" class="hero wrap">
    <div class="hero__id">
      <h1 class="hero__name mono">
        <span data-reveal>mark dennis</span>
        <span data-reveal style="--i: 1">concha<span class="ok blink" aria-hidden="true">_</span></span>
      </h1>
      <p class="hero__role" data-reveal style="--i: 2">
        Cybersecurity enthusiast and computer science student at Taguig City University,
        training for the SOC.
      </p>
      <p class="hero__status mono" data-reveal style="--i: 3">
        <span class="ok">●</span> status: open to tier 1 SOC roles
      </p>
    </div>

    <ThreatGlobe class="hero__globe" :focus="focus" />

    <div v-tilt class="panel hero__alerts" data-reveal style="--i: 3">
      <div class="panel__bar"><span>alerts · home lab</span><span>{{ alerts.length }} open</span></div>
      <ul>
        <li
          v-for="a in alerts"
          :key="a.title"
          @mouseenter="focus = a.geo"
          @mouseleave="focus = null"
          @focusin="focus = a.geo"
          @focusout="focus = null"
        >
          <component :is="a.href ? 'a' : 'div'" :href="a.href" class="alert">
            <span class="alert__sev mono" :class="a.sev">{{ a.sev.toUpperCase() }}</span>
            <span class="alert__title">{{ a.title }}</span>
            <span class="alert__host mono muted">{{ a.host }} · {{ a.time }}</span>
            <span v-if="a.href" class="alert__go mono">investigate →</span>
          </component>
        </li>
      </ul>
    </div>

    <div v-tilt class="panel hero__tail" data-reveal style="--i: 4">
      <div class="panel__bar"><span>tail -f /var/log/auth.log</span><span class="ok">live</span></div>
      <pre aria-label="Sample authentication log"><code><span
        v-for="l in shown"
        :key="l.key"
        class="tail__line"
        :class="{ hit: l.hit }"
      >{{ l.text }}</span></code></pre>
    </div>
  </section>
</template>

<script setup>
const alerts = [
  { sev: 'high', title: 'SSH brute force, then a successful login', host: 'web01', time: '02:14', href: '#triage', geo: { lat: 52.37, lng: 4.9, label: 'src: 203.0.113.45 · Amsterdam, NL' } },
  { sev: 'med', title: 'New local administrator account created', host: 'ws-07', time: '01:52', geo: { lat: 14.52, lng: 121.05, label: 'src: internal · ws-07, Taguig' } },
  { sev: 'low', title: 'Port scan from 198.51.100.7', host: 'fw01', time: '01:30', geo: { lat: 37.77, lng: -122.42, label: 'src: 198.51.100.7 · San Francisco, US' } },
]

const focus = ref(null)

const SIZE = 8
const count = ref(SIZE)
const shown = computed(() => {
  const out = []
  for (let n = count.value - SIZE; n < count.value; n++) {
    out.push({ ...authLog[n % authLog.length], key: n })
  }
  return out
})

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  let t
  const start = () => { t = setInterval(() => count.value++, 1400) }
  const onVis = () => { clearInterval(t); if (!document.hidden) start() }
  start()
  document.addEventListener('visibilitychange', onVis)
  onBeforeUnmount(() => { clearInterval(t); document.removeEventListener('visibilitychange', onVis) })
})
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 1fr auto;
  column-gap: var(--gap);
  row-gap: clamp(24px, 4svh, 48px);
  min-height: calc(100svh - 58px);
  padding-block: clamp(32px, 6svh, 72px) var(--margin);
}

.hero__id { grid-column: 1 / 8; grid-row: 1; align-self: center; position: relative; z-index: 1; }
.hero__globe { grid-column: 7 / 13; grid-row: 1; align-self: center; justify-self: end; width: min(100%, 64svh); }
.hero__name {
  font-size: var(--step-display);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.9;
}
.hero__name > span { display: block; }
.hero__role { max-width: 46ch; margin-top: 1.5rem; font-size: var(--step-lead); line-height: 1.3; }
.hero__status { margin-top: 1rem; font-size: 14px; color: var(--muted); }

.hero__alerts { grid-column: 1 / 6; }
.hero__tail { grid-column: 6 / 13; min-width: 0; }

.alert {
  display: grid;
  grid-template-columns: 3.4em 1fr auto;
  grid-template-areas: 'sev title go' 'sev host go';
  column-gap: 0.9rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--line);
  transition: background-color 0.15s;
}
li { list-style: none; }
li:last-child .alert { border-bottom: 0; }
a.alert:hover { background: var(--panel-2); }
a.alert:active { background: var(--line); }
.alert__sev { grid-area: sev; font-size: 12px; font-weight: 700; padding-top: 0.25em; }
.alert__sev.low { color: var(--muted); }
.alert__title { grid-area: title; font-size: 15px; }
.alert__host { grid-area: host; font-size: 13px; }
.alert__go { grid-area: go; align-self: center; font-size: 13px; color: var(--ok); }

.hero__tail pre {
  height: calc(8 * 1.6em + 1.6rem);
  overflow: hidden;
  padding: 0.8rem 0.9rem;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
}
.tail__line {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--muted);
  animation: in 0.5s var(--ease);
}
.tail__line:last-child { color: var(--ink); }
.tail__line.hit { color: var(--high); }
@keyframes in { from { opacity: 0; transform: translateY(6px); } }

@media (max-width: 900px) {
  .hero { grid-template-rows: auto; min-height: 0; }
  .hero__id, .hero__alerts, .hero__tail { grid-column: 1 / -1; }
  .hero__globe { grid-column: 1 / -1; grid-row: auto; justify-self: center; width: min(92vw, 460px); margin-block: -8% -4%; }
  .hero__name { font-size: 13vw; }
  .alert { grid-template-columns: 3.4em 1fr; grid-template-areas: 'sev title' 'sev host' 'sev go'; }
  .alert__go { margin-top: 0.3rem; }
}
</style>
