<template>
  <section id="about" class="about wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>whoami</h2>
    </div>

    <div class="about__grid">
      <div v-tilt class="panel about__card" data-reveal style="--i: 1">
        <div class="panel__bar"><span>analyst profile</span><span class="ok">● online</span></div>
        <div class="about__body">
          <img src="/mephoto.jpg" alt="Mark Dennis Concha" width="960" height="960" loading="lazy" />
          <dl class="mono">
            <div v-for="f in facts" :key="f.k"><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>
          </dl>
        </div>
      </div>

      <div class="about__text">
        <p data-reveal style="--i: 2">
          I'm a computer science student at Taguig City University, training for the security
          operations centre: the room where analysts watch the alert queue, read logs and decide
          in minutes whether something is an attack.
        </p>
        <p data-reveal style="--i: 3">
          I've earned my first certifications from Cisco and IBM SkillsBuild, I study how attackers
          move so I can recognise their footprints, and I build things with my team, like Booklat,
          which we pitched at the AppBuildersPH Hackathon. The code lives on
          <a class="link" href="https://github.com/deeihen" target="_blank" rel="noopener">GitHub</a>
          and I post progress on
          <a class="link" href="https://linkedin.com/in/mark-dennis-concha-2ab10a316/" target="_blank" rel="noopener">LinkedIn</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const facts = [
  { k: 'name', v: 'Mark Dennis Concha' },
  { k: 'handle', v: 'deeihen' },
  { k: 'school', v: 'BS CS, Taguig City University' },
  { k: 'location', v: 'Taguig City, Metro Manila' },
  { k: 'target', v: 'SOC analyst, tier 1' },
  { k: 'focus', v: 'blue team, detection' },
]
</script>

<style scoped>
.about { padding-block: var(--section); }
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: var(--gap) calc(var(--gap) * 3);
  align-items: start;
}

.about__body { display: flex; gap: 0.9rem; padding: 0.9rem; align-items: start; }
.about__card img { width: 104px; height: 104px; flex: none; object-fit: cover; object-position: 30% 25%; filter: grayscale(0.35) contrast(1.05); }
.about__card dl { font-size: 13px; min-width: 0; }
.about__card dl div { display: grid; grid-template-columns: 5.5em 1fr; padding: 0.15rem 0; }
.about__card dt { color: var(--muted); }

.about__text { font-size: var(--step-lead); line-height: 1.35; max-width: 34em; }
.about__text p + p { margin-top: 1.2em; }

@media (max-width: 900px) {
  .about__grid { grid-template-columns: minmax(0, 1fr); }
  .about__card { max-width: 420px; }
}
</style>
