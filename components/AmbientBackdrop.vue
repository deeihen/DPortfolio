<template>
  <div class="backdrop" aria-hidden="true">
    <!-- flight routes out of Manila, jets looping along them -->
    <svg class="layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <path id="jet" d="M12 0 L14 8 L24 12 L24 14 L14 12.5 L13.4 19 L16 21 L16 22.5 L12 21.4 L8 22.5 L8 21 L10.6 19 L10 12.5 L0 14 L0 12 L10 8 Z" transform="rotate(90) translate(-12 -11)" />
      </defs>
      <g class="routes">
        <g v-for="r in routes" :key="r.code">
          <path class="route" :d="r.d" />
          <text class="code" :x="r.x" :y="r.y">{{ r.code }}</text>
          <g v-if="r.t" class="jet" :style="{ offsetPath: `path('${r.d}')`, animationDuration: r.t + 's', animationDelay: r.delay + 's' }">
            <use href="#jet" />
          </g>
        </g>
      </g>
      <g class="hub">
        <circle class="hub__ring" cx="1180" cy="560" r="22" />
        <circle class="hub__dot" cx="1180" cy="560" r="4" />
        <text class="code hub__code" x="1210" y="590">RPLL / MNL</text>
      </g>
    </svg>

    <!-- a circuit in the corner, one car lapping it -->
    <svg class="track" viewBox="40 530 500 280">
      <path class="track__line" :d="circuit" />
      <path class="track__kerb" :d="circuit" />
      <!-- start/finish: a 2 x 4 chequer across the track -->
      <rect v-for="n in 8" :key="n" class="track__flag" :x="197 + ((n - 1) % 2) * 4" :y="772 + Math.floor((n - 1) / 2) * 4" width="4" height="4" :class="{ alt: ((n - 1) % 2 + Math.floor((n - 1) / 2)) % 2 }" />
      <g ref="car" class="car" :style="{ offsetPath: `path('${circuit}')` }" @animationiteration="lap++">
        <rect x="-9" y="-3.5" width="18" height="7" rx="2" />
      </g>
      <text class="code tower" x="90" y="560">LAP {{ String(lap).padStart(2, '0') }}/57 · S{{ sector }}</text>
    </svg>

    <!-- scroll-driven: a jet flies down the page and leaves a contrail -->
    <svg class="layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <path ref="trail" class="contrail" :d="descent" />
      <g ref="plane" class="jet jet--scroll" :style="{ offsetPath: `path('${descent}')` }">
        <use href="#jet" transform="scale(1.2)" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

// Stylised map, not to scale: Manila sits low-right, destinations by rough bearing.
const HUB = 'M1180 560'
const routes = [
// t: seconds per flight; only three jets fly, slowly, so the page stays calm
  { code: 'NRT', d: `${HUB} Q1260 260 1340 110`, x: 1352, y: 104, t: 70, delay: -10 },
  { code: 'LAX', d: `${HUB} Q1420 360 1560 320`, x: 1500, y: 300 },
  { code: 'SYD', d: `${HUB} Q1330 720 1310 880`, x: 1322, y: 870 },
  { code: 'SIN', d: `${HUB} Q1000 720 880 860`, x: 836, y: 856, t: 60, delay: -40 },
  { code: 'DXB', d: `${HUB} Q700 360 190 420`, x: 140, y: 412 },
  { code: 'LHR', d: `${HUB} Q600 120 110 120`, x: 64, y: 112, t: 90, delay: -55 },
]

const circuit = 'M120 780 L420 780 Q470 780 480 740 L500 660 Q510 620 470 610 L330 590 Q290 585 300 620 L320 690 Q325 720 290 720 L190 720 Q150 720 150 680 L160 620 Q165 590 135 600 L100 615 Q75 625 78 660 L85 740 Q90 780 120 780 Z'
const descent = 'M1520 -40 C1380 160 1560 300 1440 450 S1380 700 1500 940'

const lap = ref(1)
const sector = ref(1)
const car = ref(null)
const plane = ref(null)
const trail = ref(null)

useMotion((motion) => {
  if (!motion) return
  // sector readout follows the car round the lap (one lap = 16s, see .car)
  const s = setInterval(() => { sector.value = sector.value % 3 + 1 }, 16000 / 3)

  const len = trail.value.getTotalLength()
  gsap.set(trail.value, { strokeDasharray: len, strokeDashoffset: len })
  const st = { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.6 }
  gsap.to(trail.value, { strokeDashoffset: 0, ease: 'none', scrollTrigger: st })
  gsap.fromTo(plane.value, { offsetDistance: '0%' }, { offsetDistance: '100%', ease: 'none', scrollTrigger: st })

  return () => clearInterval(s)
})
</script>

<style scoped>
/* kept dim on purpose: texture, not content */
.backdrop { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; opacity: 0.55; }
.layer { position: absolute; inset: 0; width: 100%; height: 100%; }

.route { fill: none; stroke: var(--line); stroke-width: 1.2; stroke-dasharray: 2 7; stroke-linecap: round; }
.code { fill: var(--muted); font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.08em; opacity: 0.55; }

.jet {
  fill: var(--muted);
  opacity: 0.55;
  offset-rotate: auto;
  animation: fly linear infinite;
}
@keyframes fly {
  from { offset-distance: 0%; opacity: 0; }
  8% { opacity: 0.55; }
  90% { opacity: 0.55; }
  to { offset-distance: 100%; opacity: 0; }
}

.hub__ring { fill: none; stroke: var(--ok); stroke-width: 1; opacity: 0.4; }
.hub__dot { fill: var(--ok); }
.hub__code { fill: var(--ok); opacity: 0.8; }

/* small, parked in the bottom-left corner */
.track { position: absolute; left: clamp(12px, 2vw, 32px); bottom: clamp(12px, 3vh, 32px); width: min(22vw, 300px); height: auto; opacity: 0.7; }
.track__line { fill: none; stroke: var(--line); stroke-width: 14; stroke-linejoin: round; opacity: 0.7; }
.track__kerb { fill: none; stroke: var(--muted); stroke-width: 1; stroke-dasharray: 10 14; opacity: 0.35; }
.track__flag { fill: var(--ink); opacity: 0.4; }
.track__flag.alt { fill: var(--bg); }
.car {
  fill: var(--high);
  offset-rotate: auto;
  opacity: 0.8;
  animation: lap 16s linear infinite;
}
@keyframes lap { to { offset-distance: 100%; } }
.tower { font-size: 14px; opacity: 0.7; }

.contrail { fill: none; stroke: var(--muted); stroke-width: 1.5; stroke-linecap: round; opacity: 0.35; }
.jet--scroll { animation: none; opacity: 0.6; fill: var(--muted); }

@media (max-width: 760px) {
  .track { display: none; }
  .code { font-size: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .contrail, .jet--scroll { display: none; }
  /* parked mid-route instead of stacked on the hub */
  .jet { offset-distance: 55%; }
}
</style>
