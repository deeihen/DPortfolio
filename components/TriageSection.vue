<template>
  <section id="triage" class="triage wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>investigate</h2>
    </div>

    <div class="triage__grid">
      <div class="triage__intro">
        <p class="triage__lead" data-reveal style="--i: 1">
          Alert: SSH brute force on web01. Twelve lines from the server's auth log at two in
          the morning. One of them is the moment the attacker got in. Click the line you
          would escalate.
        </p>
        <dl class="triage__meta mono" data-reveal style="--i: 2" aria-live="polite">
          <div><dt>checked</dt><dd>{{ tries }} / {{ authLog.length }}</dd></div>
          <div><dt>verdict</dt><dd :class="found ? 'ok' : 'muted'">{{ found ? `found in ${tries}` : 'open' }}</dd></div>
        </dl>
      </div>

      <div class="panel triage__log" data-reveal style="--i: 2">
        <div class="panel__bar"><span>web01 · /var/log/auth.log</span><span>{{ authLog.length }} lines</span></div>
        <pre><code><button
          v-for="(l, i) in authLog"
          :key="i"
          class="line"
          :class="{ seen: seen.has(i), hit: found && l.hit, picked: picked === i }"
          :aria-pressed="picked === i"
          @click="pick(i)"
        ><span class="line__n" aria-hidden="true">{{ i + 1 }}</span>{{ l.text }}</button></code></pre>
        <p class="triage__note" aria-live="polite">
          <span class="ok mono">#</span>
          {{ picked !== null ? authLog[picked].note : 'Every line has a verdict. Click one to read it.' }}
        </p>
      </div>
    </div>

    <details class="triage__answer">
      <summary>Show the answer</summary>
      <p>{{ authLog.find(l => l.hit).note }}</p>
    </details>
  </section>
</template>

<script setup>
const picked = ref(null)
const seen = reactive(new Set())
const found = ref(false)
const tries = ref(0)

function pick(i) {
  picked.value = i
  if (!seen.has(i) && !found.value) tries.value++
  seen.add(i)
  if (authLog[i].hit) found.value = true
}
</script>

<style scoped>
.triage { padding-block: var(--section); }

.triage__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: var(--gap);
  align-items: start;
}
.triage__lead { max-width: 40ch; font-size: var(--step-lead); line-height: 1.3; }

.triage__meta { display: flex; gap: 2.5rem; margin-top: 2rem; font-size: 14px; }
.triage__meta dt { color: var(--muted); }
.triage__meta dd { font-size: var(--step-lead); font-weight: 700; }

pre { padding: 0.5rem 0; font-family: var(--font-mono); font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
pre code { display: block; font-family: inherit; }

.line {
  display: grid;
  grid-template-columns: 2.4em 1fr;
  width: 100%;
  text-align: left;
  padding: 0.35em 0.9rem;
  font-family: inherit;
  font-size: inherit;
  color: var(--ink);
  transition: background-color 0.15s, color 0.15s;
}
.line__n { color: var(--muted); user-select: none; }
.line:hover { background: var(--panel-2); }
.line:active { background: var(--line); }
.line.seen { color: var(--muted); }
.line.picked { background: var(--panel-2); color: var(--ink); box-shadow: inset 2px 0 var(--ok); }
.line.hit { background: rgb(255 107 107 / 0.14); color: var(--high); box-shadow: inset 2px 0 var(--high); }

.triage__note {
  min-height: 5.2em;
  padding: 0.9rem;
  border-top: 1px solid var(--line);
  font-size: var(--step-body);
}

.triage__answer { margin-top: 1rem; color: var(--muted); font-size: 14px; }
.triage__answer summary { cursor: pointer; min-height: 40px; display: inline-flex; align-items: center; }
.js .triage__answer { display: none; }

@media (max-width: 900px) {
  .triage__grid { grid-template-columns: minmax(0, 1fr); }
  pre { font-size: 13px; }
}
</style>
