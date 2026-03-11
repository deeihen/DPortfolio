<template>
  <section class="projects" id="projects">
    <div class="container">
      <div class="section-label">
        <span class="font-mono accent">04 /</span>
        <span class="font-mono muted">Projects</span>
      </div>

      <div class="projects-header">
        <h2 class="section-title">Selected<br><span class="outline">Work</span></h2>
        <div class="filter-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="filter-tab font-mono"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >{{ tab }}</button>
        </div>
      </div>

      <div class="projects-list">
        <div
          class="project-card"
          v-for="(project, i) in filteredProjects"
          :key="project.title"
        >
          <div class="project-num font-mono">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="project-image">
            <div class="project-placeholder">
              <span class="font-mono proj-placeholder-txt">{{ project.title.toUpperCase() }}</span>
            </div>
            <div class="project-overlay">
              <a :href="project.demo" target="_blank" class="proj-link">Live Demo ↗</a>
              <a :href="project.github" target="_blank" class="proj-link">GitHub →</a>
            </div>
          </div>
          <div class="project-info">
            <div class="project-meta">
              <span class="font-mono tag" :style="{ color: project.color, borderColor: project.color }">{{ project.type }}</span>
              <span class="project-year font-mono">{{ project.year }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.desc }}</p>
            <div class="project-stack">
              <span class="stack-item font-mono" v-for="s in project.stack" :key="s">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ['All', 'Web App', 'Design', 'API']
const activeTab = ref('All')

const projects = [
  {
    title: 'Project Alpha',
    desc: 'A full-stack web application with real-time features, built with Nuxt 3 and PostgreSQL.',
    type: 'Web App',
    year: '2024',
    stack: ['Nuxt', 'Vue', 'Tailwind', 'PostgreSQL'],
    demo: '#',
    github: '#',
    color: 'var(--accent2)',
  },
  {
    title: 'Design System',
    desc: 'A comprehensive design system and component library for fast, consistent UI development.',
    type: 'Design',
    year: '2024',
    stack: ['Figma', 'Storybook', 'Vue', 'TypeScript'],
    demo: '#',
    github: '#',
    color: 'var(--accent4)',
  },
  {
    title: 'API Dashboard',
    desc: 'Developer dashboard for monitoring and testing REST APIs with real-time analytics.',
    type: 'API',
    year: '2023',
    stack: ['Node.js', 'Express', 'Vue', 'Chart.js'],
    demo: '#',
    github: '#',
    color: 'var(--accent1)',
  },
  {
    title: 'Portfolio v1',
    desc: 'First iteration of my personal portfolio — minimal, fast, and focused on storytelling.',
    type: 'Web App',
    year: '2023',
    stack: ['Nuxt', 'GSAP', 'CSS'],
    demo: '#',
    github: '#',
    color: 'var(--accent3)',
  },
]

const filteredProjects = computed(() =>
  activeTab.value === 'All' ? projects : projects.filter(p => p.type === activeTab.value)
)
</script>

<style scoped>
.projects { padding: 8rem 0; }
.font-mono { font-family: var(--font-mono); }
.accent { color: var(--accent3); }
.muted { color: var(--muted); }

.section-label {
  display: flex; gap: 1rem; align-items: center;
  margin-bottom: 3rem;
  font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
}
.outline { -webkit-text-stroke: 2px var(--accent1); color: transparent; }

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.filter-tab {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border);
  background: none;
  color: var(--muted);
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;
}
.filter-tab:hover, .filter-tab.active {
  border-color: var(--accent3);
  color: var(--accent3);
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 4rem;
}

.project-card {
  position: relative;
  group: true;
}
.project-num {
  font-size: 0.65rem;
  color: var(--border);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  transition: color 0.2s;
}
.project-card:hover .project-num { color: var(--accent3); }

.project-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  transition: border-color 0.3s;
}
.project-card:hover .project-image { border-color: var(--accent3); }

.project-placeholder {
  width: 100%;
  height: 100%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 30px,
    rgba(255,255,255,0.015) 30px,
    rgba(255,255,255,0.015) 31px
  );
}
.proj-placeholder-txt {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--border);
  font-family: var(--font-mono);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.project-image:hover .project-overlay { opacity: 1; }

.proj-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
  border-bottom: 1px solid var(--accent3);
  padding-bottom: 2px;
  transition: color 0.2s;
}
.proj-link:hover { color: var(--accent3); }

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.tag {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid;
  border-radius: 2px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.project-year { font-size: 0.7rem; color: var(--muted); }

.project-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 1;
  margin-bottom: 0.7rem;
  letter-spacing: 0.02em;
}
.project-desc { color: var(--muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1rem; }
.project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.stack-item {
  font-size: 0.65rem;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.stack-item::after { content: '·'; margin-left: 0.4rem; }
.stack-item:last-child::after { content: ''; }

@media (max-width: 768px) {
  .projects-list { grid-template-columns: 1fr; }
}
</style>
