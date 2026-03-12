<template>
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="grid-lines"></div>
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="container hero-content">
      <div class="hero-eyebrow">
        <span class="dot"></span>
        <span class="font-mono text-muted">Available for work</span>
      </div>

      <h1 class="hero-title">
        <span class="title-line line-1">I WANT TO BE</span>
        <span class="title-line line-2">
          <span class="outline-text">A SOC ANALYST</span>
        </span>
        <span class="title-line line-3">& SO ON</span>
      </h1>

      <p class="hero-desc">
        Passionate about cybersecurity, security operations, and threat
        detection. Based in the Philippines 🇵🇭 — building skills to monitor,
        analyze, and defend systems from evolving cyber threats.
      </p>

      <div class="hero-actions">
        <a href="#projects" class="btn-primary">
          View My Work
          <span class="btn-arrow">→</span>
        </a>
        <a href="#contact" class="btn-ghost">Get in Touch</a>
      </div>

      <div class="hero-ticker">
        <div class="ticker-track">
          <span v-for="n in 6" :key="n">
            Cybersecurity &nbsp;·&nbsp; Threat Monitoring &nbsp;·&nbsp; Log
            Analysis &nbsp;·&nbsp; Network Security &nbsp;·&nbsp; Incident
            Response &nbsp;·&nbsp; SOC Operations &nbsp;·&nbsp;
          </span>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <span class="font-mono">scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 6rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: drift 10s ease-in-out infinite alternate;
}
.blob-1 {
  width: 500px;
  height: 500px;
  background: var(--accent1);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}
.blob-2 {
  width: 350px;
  height: 350px;
  background: var(--accent2);
  bottom: 0;
  left: -80px;
  animation-delay: -3s;
}
.blob-3 {
  width: 280px;
  height: 280px;
  background: var(--accent4);
  top: 40%;
  left: 40%;
  animation-delay: -6s;
}
@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(30px, 40px) scale(1.1);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.dot {
  width: 8px;
  height: 8px;
  background: var(--accent3);
  border-radius: 50%;
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.7);
  }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 11rem);
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}
.title-line {
  display: block;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.line-1 {
  color: var(--text);
  animation-delay: 0.1s;
}
.line-2 {
  animation-delay: 0.2s;
}
.line-3 {
  color: var(--accent3);
  animation-delay: 0.3s;
}

.outline-text {
  -webkit-text-stroke: 2px var(--accent1);
  color: transparent;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-desc {
  max-width: 520px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}
.accent-text {
  color: var(--text);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--accent1);
  color: #fff;
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 2vw, 0.85rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.9rem 1.8rem;
  border-radius: 2px;
  transition: all 0.25s ease;
  font-weight: 700;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
}
.btn-primary:hover {
  background: var(--accent3);
  color: #000;
  transform: translateY(-2px);
}
.btn-arrow {
  transition: transform 0.2s;
}
.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-ghost {
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 2vw, 0.85rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  padding-bottom: 2px;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-ghost:hover {
  color: var(--text);
  border-color: var(--text);
}

/* Ticker */
.hero-ticker {
  margin-top: 4rem;
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 0;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
}
.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker 20s linear infinite;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  writing-mode: vertical-rl;
}
.scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--accent3), transparent);
  animation: scrollDown 1.5s ease-in-out infinite;
}
@keyframes scrollDown {
  0%,
  100% {
    transform: scaleY(1) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.5) translateY(10px);
    opacity: 0.5;
  }
}

.font-mono {
  font-family: var(--font-mono);
}
.text-muted {
  color: var(--muted);
}

@media (max-width: 768px) {
  .hero {
    padding-top: 5rem;
  }
  .hero-content {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
  .hero-title {
    font-size: clamp(2.8rem, 10vw, 5rem);
    margin-bottom: 1.5rem;
  }
  .outline-text {
    -webkit-text-stroke: 1.5px var(--accent1);
  }
  .hero-desc {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
  .btn-primary {
    justify-content: center;
    padding: 0.85rem 1.4rem;
    font-size: 0.8rem;
  }
  .btn-ghost {
    text-align: center;
    padding: 0.7rem 0;
    border: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    display: block;
  }
  .hero-ticker {
    margin-top: 2.5rem;
  }
  .scroll-indicator {
    display: none;
  }
  .blob-1 {
    width: 300px;
    height: 300px;
  }
  .blob-2 {
    width: 200px;
    height: 200px;
  }
  .blob-3 {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }
  .hero-eyebrow {
    margin-bottom: 1.5rem;
    font-size: 0.7rem;
  }
  .hero-desc {
    font-size: 0.88rem;
    line-height: 1.6;
  }
  .btn-primary {
    padding: 0.8rem 1rem;
    font-size: 0.75rem;
    gap: 0.4rem;
  }
  .btn-ghost {
    font-size: 0.75rem;
    padding: 0.65rem 0;
  }
}
</style>
