<template>
  <section class="contact" id="contact">
    <div class="container">
      <div class="section-label">
        <span class="font-mono accent">05 /</span>
        <span class="font-mono muted">Contact</span>
      </div>

      <div class="contact-grid">
        <div class="contact-left">
          <h2 class="section-title">Let's Build<br><span class="outline">Something</span><br>Together.</h2>
          <p class="contact-sub">
            Have a project in mind? I'd love to hear about it. 
            Drop me a message and let's make something great.
          </p>

          <div class="contact-links">
            <a v-for="link in socialLinks" :key="link.label" :href="link.href" target="_blank" class="social-link">
              <span class="social-icon">{{ link.icon }}</span>
              <span class="social-label font-mono">{{ link.label }}</span>
              <span class="social-arrow">↗</span>
            </a>
          </div>
        </div>

        <div class="contact-right">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label font-mono">Name</label>
                <input v-model="form.name" type="text" class="form-input" placeholder="Your Name" required />
              </div>
              <div class="form-field">
                <label class="form-label font-mono">Email</label>
                <input v-model="form.email" type="email" class="form-input" placeholder="you@email.com" required />
              </div>
            </div>
            <div class="form-field">
              <label class="form-label font-mono">Subject</label>
              <input v-model="form.subject" type="text" class="form-input" placeholder="What's it about?" required />
            </div>
            <div class="form-field">
              <label class="form-label font-mono">Message</label>
              <textarea v-model="form.message" class="form-input form-textarea" placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn" :class="{ sent: isSent }">
              <span v-if="!isSent">Send Message →</span>
              <span v-else>Message Sent ✓</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="container footer-inner">
        <span class="font-mono muted footer-copy">© {{ new Date().getFullYear() }} YourName — Built with Nuxt & ❤️</span>
        <span class="font-mono muted footer-copy">Deployed on Vercel</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({ name: '', email: '', subject: '', message: '' })
const isSent = ref(false)

const socialLinks = [
  { label: 'GitHub', icon: '◈', href: 'https://github.com/deeihen' },
  { label: 'LinkedIn', icon: '◉', href: 'https://linkedin.com/in/mark-dennis-concha-2ab10a316/' },
  { label: 'Facebook', icon: '◎', href: 'https://facebook.com/deeihen' },
  { label: 'Email', icon: '◇', href: 'mailto:markdennisconcha14@email.com' },
]

function handleSubmit() {
  // Wire up to your form handler (e.g. Formspree, EmailJS, etc.)
  isSent.value = true
  setTimeout(() => {
    isSent.value = false
    Object.keys(form).forEach(k => form[k] = '')
  }, 3000)
}
</script>

<style scoped>
.contact {
  padding: 8rem 0 0;
  background: var(--surface);
  position: relative;
}
.contact::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent4), transparent);
}
.font-mono { font-family: var(--font-mono); }
.accent { color: var(--accent3); }
.muted { color: var(--muted); }

.section-label {
  display: flex; gap: 1rem; align-items: center;
  margin-bottom: 3rem;
  font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 6rem;
  align-items: start;
  padding-bottom: 8rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 0.95;
  margin-bottom: 1.5rem;
}
.outline { -webkit-text-stroke: 2px var(--accent4); color: transparent; }

.contact-sub {
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 360px;
}

.contact-links { display: flex; flex-direction: column; gap: 0.2rem; }
.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  transition: all 0.2s;
}
.social-link:hover { color: var(--text); padding-left: 0.5rem; }
.social-link:hover .social-icon { color: var(--accent4); }
.social-icon { font-size: 1rem; color: var(--border); transition: color 0.2s; }
.social-label { font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; flex: 1; }
.social-arrow { font-size: 0.8rem; opacity: 0; transition: opacity 0.2s; }
.social-link:hover .social-arrow { opacity: 1; }

/* Form */
.contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.form-field { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.form-input {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  border-radius: 2px;
  outline: none;
  transition: border-color 0.2s;
}
.form-input::placeholder { color: var(--border); }
.form-input:focus { border-color: var(--accent4); }
.form-textarea { resize: vertical; min-height: 140px; }

.submit-btn {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  background: var(--accent1);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.25s;
  align-self: flex-start;
}
.submit-btn:hover { background: var(--accent3); color: #000; transform: translateY(-2px); }
.submit-btn.sent { background: var(--accent3); color: #000; }

/* Footer */
.footer-bar {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-copy { font-size: 0.72rem; letter-spacing: 0.05em; }

@media (max-width: 768px) {
  .contact {
    padding: 5rem 0 0;
  }
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 5rem;
  }
  .section-title {
    font-size: clamp(2rem, 6vw, 3rem);
  }
  .outline {
    -webkit-text-stroke: 1.5px var(--accent4);
  }
  .form-row { grid-template-columns: 1fr; }
  .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
  .submit-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .contact {
    padding: 3.5rem 0 0;
  }
  .contact-grid {
    padding-bottom: 3rem;
  }
  .contact-sub {
    font-size: 0.92rem;
    margin-bottom: 2rem;
  }
  .social-label {
    font-size: 0.75rem;
  }
  .form-input {
    font-size: 0.9rem;
    padding: 0.75rem 0.85rem;
  }
}
</style>
