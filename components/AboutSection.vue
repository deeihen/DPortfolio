<template>
  <section class="about" id="about">
    <div class="container">
      <div class="section-label">
        <span class="font-mono accent">02 /</span>
        <span class="font-mono muted">About Me</span>
      </div>

      <div class="about-grid">
        <div class="about-text">
          <h2 class="section-title">I Turn Ideas<br><span class="outline">Into Reality</span></h2>
          <p class="about-bio">
            Hey! I'm <strong>Mark Dennis Concha</strong>, a creative developer who loves crafting beautiful, fast, and accessible web experiences. I obsess over the details — from pixel-perfect layouts to buttery-smooth animations.
          </p>
          <p class="about-bio">
            When I'm not coding, you'll find me sketching UI ideas, exploring design trends, or enjoying a good cup of coffee ☕. I believe great software is equal parts art and engineering.
          </p>
          <div class="about-meta">
            <div class="meta-item" v-for="m in meta" :key="m.label">
              <span class="meta-label font-mono">{{ m.label }}</span>
              <span class="meta-val">{{ m.value }}</span>
            </div>
          </div>
          <a href="/resume.pdf" target="_blank" class="download-cv">
            <span>Download CV</span>
            <span class="dl-icon">↓</span>
          </a>
        </div>

        <div class="about-visual">
          <div class="photo-frame">
            <div class="photo-placeholder">
              <img src="/mephoto.jpg" alt="Mark Dennis Concha" />
            </div>
            <div class="frame-accent frame-tl"></div>
            <div class="frame-accent frame-br"></div>
          </div>
          <div class="stats-grid">
            <div class="stat-card" v-for="s in stats" :key="s.label">
              <div class="stat-num">{{ s.num }}</div>
              <div class="stat-label font-mono">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const meta = [
  { label: 'Based in', value: 'Philippines 🇵🇭' },
  { label: 'Role', value: 'Future SOC ANALYST' },
  { label: 'Focus', value: 'Vue, Nuxt' },
]
const stats = [
  { num: '3+', label: 'Years Exp.' },
  { num: '20+', label: 'Projects' },
  { num: '10+', label: 'Happy Clients' },
]
</script>

<style scoped>
.about {
  padding: 8rem 0;
  position: relative;
}
.section-label {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 4rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.font-mono { font-family: var(--font-mono); }
.accent { color: var(--accent3); }
.muted { color: var(--muted); }
.outline { -webkit-text-stroke: 2px var(--accent2); color: transparent; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1;
  margin-bottom: 2rem;
}

.about-bio {
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 1.2rem;
  font-size: 1rem;
}
.about-bio strong { color: var(--text); }

.about-meta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent1);
  background: var(--surface);
}
.meta-item { display: flex; gap: 1rem; align-items: center; }
.meta-label { color: var(--muted); font-size: 0.75rem; letter-spacing: 0.08em; min-width: 80px; }
.meta-val { color: var(--text); font-size: 0.95rem; }

.download-cv {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent3);
  border: 1.5px solid var(--accent3);
  padding: 0.7rem 1.4rem;
  border-radius: 2px;
  transition: all 0.2s;
}
.download-cv:hover { background: var(--accent3); color: #000; }
.dl-icon { font-size: 1rem; transition: transform 0.2s; }
.download-cv:hover .dl-icon { transform: translateY(3px); }

/* Visual side */
.photo-frame {
  position: relative;
  margin-bottom: 2rem;
}
.photo-placeholder {
  width: 100%;
  aspect-ratio: 4/5;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.photo-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}
.frame-accent {
  position: absolute;
  width: 30px; height: 30px;
}
.frame-tl {
  top: -8px; left: -8px;
  border-top: 3px solid var(--accent3);
  border-left: 3px solid var(--accent3);
}
.frame-br {
  bottom: -8px; right: -8px;
  border-bottom: 3px solid var(--accent1);
  border-right: 3px solid var(--accent1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1.2rem 1rem;
  text-align: center;
  transition: border-color 0.2s;
}
.stat-card:hover { border-color: var(--accent3); }
.stat-num {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--accent3);
  line-height: 1;
}
.stat-label { color: var(--muted); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.3rem; }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
