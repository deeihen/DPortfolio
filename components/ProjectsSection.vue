<template>
  <section id="work" class="work wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>cases</h2>
    </div>

    <div class="work__grid">
      <div v-tilt class="panel" data-reveal style="--i: 1">
        <div class="panel__bar"><span>case files</span><span>{{ cases.length }} closed</span></div>
        <ul>
          <li v-for="c in cases" :key="c.id">
            <a class="case" :href="c.href" target="_blank" rel="noopener">
              <span class="case__id mono muted">{{ c.id }}</span>
              <span class="case__title">{{ c.title }}</span>
              <span class="case__sum">{{ c.summary }}</span>
              <span class="case__tags mono">{{ c.tools }}</span>
              <span class="case__open mono">{{ c.cta }} ↗</span>
            </a>
          </li>
        </ul>
      </div>

      <div v-tilt class="panel" data-reveal style="--i: 2">
        <div class="panel__bar"><span>certifications</span><span>{{ certs.length }} verified</span></div>
        <ul>
          <li v-for="c in certs" :key="c.name" class="cert">
            <span class="cert__name">{{ c.name }}</span>
            <span class="cert__meta mono muted">{{ c.issuer }} · {{ c.date }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const activity = 'https://www.linkedin.com/in/mark-dennis-concha-2ab10a316/recent-activity/all/'

const cases = [
  {
    id: 'CASE-2026-010',
    title: 'Booklat',
    summary: 'Offline oral-reading assessment for Filipino teachers, built at the AppBuildersPH Hackathon 2026: Local AI. On-device speech recognition suggests word-level reading marks in English and Filipino, and learner audio never leaves the device. Picked as a wildcard to pitch: one of 15 projects out of 281 submissions.',
    tools: 'local AI · on-device speech recognition · team of 3',
    href: activity,
    cta: 'see the demo',
  },
]

const certs = [
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Aug 2026' },
  { name: 'Cybersecurity Fundamentals', issuer: 'IBM SkillsBuild', date: 'Aug 2026' },
  { name: 'Working in a Digital World: Professional Skills', issuer: 'IBM SkillsBuild', date: 'Aug 2026' },
]
</script>

<style scoped>
.work { padding-block: var(--section); }
.work__grid {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: var(--gap);
  align-items: start;
}
li { list-style: none; }

.case {
  display: grid;
  grid-template-columns: 9.5em minmax(0, 1fr) auto;
  grid-template-areas: 'id title open' 'id sum sum' 'id tags tags';
  column-gap: var(--gap);
  row-gap: 0.6rem;
  padding: 1.2rem 0.9rem;
  border-bottom: 1px solid var(--line);
  transition: background-color 0.15s;
}
li:last-child .case { border-bottom: 0; }
.case:hover { background: var(--panel-2); }
.case:active { background: var(--line); }
.case__id { grid-area: id; font-size: 13px; padding-top: 0.4em; }
.case__title { grid-area: title; font-size: var(--step-lead); line-height: 1.2; }
.case__sum { grid-area: sum; max-width: 62ch; }
.case__tags { grid-area: tags; font-size: 13px; color: var(--muted); }
.case__open { grid-area: open; align-self: center; font-size: 13px; color: var(--ok); }

.cert { display: grid; gap: 0.25rem; padding: 0.9rem; border-bottom: 1px solid var(--line); }
.cert:last-child { border-bottom: 0; }
.cert__meta { font-size: 13px; }

@media (max-width: 900px) {
  .work__grid { grid-template-columns: minmax(0, 1fr); }
  .case {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'id' 'title' 'sum' 'tags' 'open';
  }
}
</style>
