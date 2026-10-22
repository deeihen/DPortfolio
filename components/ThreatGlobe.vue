<template>
  <div ref="wrap" class="globe">
    <canvas
      ref="canvas"
      :class="{ ready }"
      aria-label="Rotating globe marking the sources of sample alerts"
      role="img"
      @pointerdown="onDown"
    />
    <p class="globe__caption mono">
      <span class="ok">◆</span> {{ focus ? focus.label : 'home: Taguig City, PH' }}
    </p>
  </div>
</template>

<script setup>
import createGlobe from 'cobe'

const { theme } = useTheme()

// focus: { lat, lng, label } or null; the globe turns to it, then resumes drifting
const props = defineProps({ focus: { type: Object, default: null } })

const HOME = { lat: 14.52, lng: 121.05 }
const markers = [
  { location: [52.37, 4.9], size: 0.08 },    // high: brute force source
  { location: [37.77, -122.42], size: 0.05 }, // low: port scan
  { location: [55.75, 37.62], size: 0.04 },
  { location: [-23.55, -46.63], size: 0.04 },
  { location: [1.35, 103.82], size: 0.04 },
  { location: [50.11, 8.68], size: 0.04 },
  { location: [HOME.lat, HOME.lng], size: 0.06 },
]

// cobe angles that put a lat/lng in the centre of the globe
const toAngles = (lat, lng) => [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]

const wrap = ref(null)
const canvas = ref(null)
const ready = ref(false)

let drag = null // { x, phi }
let dragPhi = 0
function onDown(e) {
  drag = { x: e.clientX, start: dragPhi }
  canvas.value.setPointerCapture(e.pointerId)
  canvas.value.addEventListener('pointermove', onMove)
  canvas.value.addEventListener('pointerup', onUp, { once: true })
  canvas.value.addEventListener('pointercancel', onUp, { once: true })
}
function onMove(e) { if (drag) dragPhi = drag.start + (e.clientX - drag.x) / 160 }
function onUp() { drag = null; canvas.value.removeEventListener('pointermove', onMove) }

onMounted(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  let [phi, theta] = toAngles(HOME.lat, HOME.lng)
  theta = 0.25
  let size = wrap.value.offsetWidth
  const onResize = () => { size = wrap.value.offsetWidth }
  window.addEventListener('resize', onResize)

  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const globe = createGlobe(canvas.value, {
    devicePixelRatio: dpr,
    width: size * dpr,
    height: size * dpr,
    phi,
    theta,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.36, 0.42, 0.5],
    markerColor: [1, 0.42, 0.42],
    glowColor: [0.07, 0.09, 0.12],
    markers,
    onRender(state) {
      const f = props.focus
      if (f) {
        const [tp, tt] = toAngles(f.lat, f.lng)
        // shortest way round, eased toward the target
        let d = (tp - phi) % (Math.PI * 2)
        if (d > Math.PI) d -= Math.PI * 2
        if (d < -Math.PI) d += Math.PI * 2
        phi += still ? d : d * 0.08
        theta += still ? tt - theta : (tt - theta) * 0.08
      } else if (!drag && !still) {
        phi += 0.0025
        theta += (0.25 - theta) * 0.04
      }
      // light theme: pale land dots on a pale sphere
      const light = theme.value === 'light'
      state.dark = light ? 0 : 1
      state.mapBrightness = light ? 3 : 6
      state.baseColor = light ? [0.82, 0.86, 0.92] : [0.36, 0.42, 0.5]
      state.glowColor = light ? [0.93, 0.95, 0.97] : [0.07, 0.09, 0.12]
      state.phi = phi + dragPhi
      state.theta = theta
      state.width = size * dpr
      state.height = size * dpr
    },
  })
  requestAnimationFrame(() => { ready.value = true })

  // stop drawing while the globe is off screen
  const io = new IntersectionObserver(([e]) => globe.toggle(e.isIntersecting))
  io.observe(wrap.value)

  onBeforeUnmount(() => {
    io.disconnect()
    window.removeEventListener('resize', onResize)
    globe.destroy()
  })
})
</script>

<style scoped>
.globe { position: relative; width: 100%; aspect-ratio: 1; }
canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: pan-y;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 1.2s var(--ease), transform 1.2s var(--ease);
}
canvas:active { cursor: grabbing; }
canvas.ready { opacity: 1; transform: none; }
.globe__caption {
  position: absolute;
  inset: auto 0 2%;
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}

@media (prefers-reduced-motion: reduce) {
  canvas { transform: none; transition: opacity 0.3s linear; }
}
</style>
