<template>
  <section class="skills" id="skills">
    <div class="container">
      <div class="section-label">
        <span class="font-mono accent">03 /</span>
        <span class="font-mono muted">Skills</span>
      </div>

      <div class="skills-header">
        <h2 class="section-title">My <span class="outline">Toolbox</span></h2>
        <p class="skills-sub">Technologies and tools I use to bring ideas to life.</p>
      </div>

      <div class="skills-grid">
        <div class="skill-group" v-for="group in skillGroups" :key="group.title">
          <div class="group-header">
            <span class="group-icon">{{ group.icon }}</span>
            <h3 class="group-title font-mono">{{ group.title }}</h3>
          </div>
          <div class="skill-tags">
            <span
              class="skill-tag"
              v-for="skill in group.skills"
              :key="skill"
              :style="{ '--tag-color': group.color }"
            >{{ skill }}</span>
          </div>
        </div>
      </div>

      <div class="proficiency">
        <h3 class="prof-title font-mono">Core Proficiency</h3>
        <div class="bars">
          <div class="bar-item" v-for="b in bars" :key="b.name">
            <div class="bar-meta">
              <span class="bar-name">{{ b.name }}</span>
              <span class="bar-pct font-mono">{{ b.pct }}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: b.pct + '%', background: b.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillGroups = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'var(--accent2)',
    skills: ['Vue.js', 'Nuxt', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'var(--accent1)',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Design',
    icon: '✏️',
    color: 'var(--accent4)',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'Accessibility'],
  },
  {
    title: 'DevOps & Tools',
    icon: '🚀',
    color: 'var(--accent3)',
    skills: ['Git & GitHub', 'Vercel', 'Docker', 'CI/CD', 'Linux', 'Vite'],
  },
]

const bars = [
  { name: 'Vue / Nuxt', pct: 92, color: 'var(--accent3)' },
  { name: 'UI/UX Design', pct: 85, color: 'var(--accent2)' },
  { name: 'Node.js / APIs', pct: 78, color: 'var(--accent1)' },
  { name: 'TypeScript', pct: 80, color: 'var(--accent4)' },
]
</script>

<style scoped>
.skills {
  padding: 8rem 0;
  background: var(--surface);
  position: relative;
}
.skills::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent3), transparent);
}
.font-mono { font-family: var(--font-mono); }
.accent { color: var(--accent3); }
.muted { color: var(--muted); }

.section-label {
  display: flex; gap: 1rem; align-items: center;
  margin-bottom: 3rem;
  font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
}

.skills-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
}
.outline { -webkit-text-stroke: 2px var(--accent3); color: transparent; }
.skills-sub { color: var(--muted); font-size: 1rem; max-width: 300px; text-align: right; }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-bottom: 5rem;
  border: 1px solid var(--border);
}
.skill-group {
  padding: 2rem;
  background: var(--bg);
  border: 1px solid var(--border);
  transition: border-color 0.2s;
}
.skill-group:hover { border-color: var(--accent3); }

.group-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}
.group-icon { font-size: 1.2rem; }
.group-title { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

.skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--tag-color, var(--border));
  color: var(--tag-color, var(--muted));
  border-radius: 2px;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}
.skill-tag:hover {
  background: var(--tag-color);
  color: #000;
}

/* Proficiency bars */
.prof-title {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 2rem;
}
.bars { display: flex; flex-direction: column; gap: 1.5rem; }
.bar-item {}
.bar-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.bar-name { font-size: 0.95rem; }
.bar-pct { font-size: 0.75rem; color: var(--muted); }
.bar-track {
  height: 4px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
  .skills-header { flex-direction: column; align-items: flex-start; }
  .skills-sub { text-align: left; }
}
</style>
