<template>
  <section id="practice" class="practice wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>coverage</h2>
    </div>

    <div class="practice__grid">
      <ul class="practice__list" role="tablist" aria-label="Skills">
        <li v-for="(s, i) in skills" :key="s.name" data-reveal :style="{ '--i': i }">
          <button
            class="row"
            role="tab"
            :aria-selected="i === active"
            aria-controls="practice-artifact"
            :class="{ on: i === active }"
            @mouseenter="active = i"
            @focus="active = i"
            @click="active = i"
          >
            <span class="row__name">{{ s.name }}</span>
            <span class="row__tool mono">{{ s.tools }}</span>
          </button>
        </li>
      </ul>

      <div id="practice-artifact" class="panel practice__artifact" role="tabpanel" data-reveal style="--i: 2">
        <div class="panel__bar"><span>{{ skills[active].file }}</span><span>{{ skills[active].tools }}</span></div>
        <p class="artifact__desc">{{ skills[active].desc }}</p>
        <Transition name="swap" mode="out-in">
          <pre :key="active"><code>{{ skills[active].code }}</code></pre>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  {
    name: 'Log analysis',
    tools: 'Splunk',
    file: 'search.spl',
    desc: 'Reading what systems say about themselves: who logged in, from where, what failed. This search finds addresses that failed many times and then got in.',
    code: `index=linux sourcetype=linux_secure
  ("Failed password" OR "Accepted password")
| rex "from (?<src_ip>\\d+\\.\\d+\\.\\d+\\.\\d+)"
| stats count(eval(searchmatch("Failed"))) AS failures
        count(eval(searchmatch("Accepted"))) AS successes
        BY src_ip, host
| where failures >= 5 AND successes > 0
| sort - failures`,
  },
  {
    name: 'Threat detection',
    tools: 'Sigma, ATT&CK',
    file: 'new_local_admin.yml',
    desc: 'Turning an attacker technique into a rule that fires on it. This one catches a user being added to the local Administrators group (T1136).',
    code: `title: User Added to Local Administrators
status: experimental
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4732
    TargetUserName: 'Administrators'
  condition: selection
level: medium
tags:
  - attack.persistence
  - attack.t1136.001`,
  },
  {
    name: 'Incident response',
    tools: 'NIST SP 800-61',
    file: 'playbook_ssh_bruteforce.md',
    desc: 'Knowing what to do in the first minutes, in order. My checklist for a confirmed SSH brute-force login.',
    code: `[ ] 1. Confirm: failed burst + accepted login, same source
[ ] 2. Contain: kill session, lock account, block source IP
[ ] 3. Scope: what did the session run? (sudo, auth, bash_history)
[ ] 4. Eradicate: remove dropped files, rotate credentials
[ ] 5. Recover: key-only SSH, fail2ban, MFA on bastion
[ ] 6. Report: timeline, IOCs, ATT&CK mapping, lessons`,
  },
  {
    name: 'Network traffic',
    tools: 'Wireshark, tshark',
    file: 'capture.pcap',
    desc: 'Following a conversation packet by packet to see what left the network and where it went.',
    code: `$ tshark -r capture.pcap -Y "http.request" \\
    -T fields -e ip.src -e ip.dst -e http.host -e http.request.uri
10.0.0.23    198.51.100.7   update-check.example   /x.sh
10.0.0.23    198.51.100.7   update-check.example   /beacon?id=7f3a
10.0.0.23    198.51.100.7   update-check.example   /beacon?id=7f3a`,
  },
  {
    name: 'Endpoint monitoring',
    tools: 'Sysmon, Wazuh',
    file: 'sysmon_event_1.xml',
    desc: 'Watching processes on the machine itself, where the attack actually runs. Office spawning PowerShell is a classic red flag.',
    code: `<EventID>1</EventID>  <!-- process creation -->
<Image>C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe</Image>
<CommandLine>powershell -nop -w hidden -enc SQBFAFgA...</CommandLine>
<ParentImage>C:\\Program Files\\Microsoft Office\\WINWORD.EXE</ParentImage>
<User>LAB\\jdoe</User>`,
  },
  {
    name: 'Vulnerability scanning',
    tools: 'Nmap, OpenVAS',
    file: 'nmap_fw01.txt',
    desc: 'Finding the open doors before someone else does, then ranking which to close first.',
    code: `$ nmap -sV -T4 10.0.0.0/24
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 8.2p1
80/tcp   open  http     nginx 1.18.0
3389/tcp open  ms-wbt-server
# 3389 exposed on a workstation: first thing to close`,
  },
]

const active = ref(0)
</script>

<style scoped>
.practice { padding-block: var(--section); }
.practice__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: var(--gap) calc(var(--gap) * 2);
  align-items: start;
}

.practice__list { list-style: none; }
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  width: 100%;
  min-height: 56px;
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  color: var(--muted);
  transition: color 0.2s, background-color 0.2s;
}
.row:hover { color: var(--ink); }
.row.on { color: var(--ink); background: var(--panel); box-shadow: inset 2px 0 var(--ok); }
.row__name { font-size: var(--step-lead); }
.row__tool { font-size: 13px; color: var(--muted); text-align: right; }

.practice__artifact { position: sticky; top: 76px; }
.artifact__desc { padding: 0.9rem; font-size: var(--step-body); border-bottom: 1px solid var(--line); }
pre {
  padding: 0.9rem;
  min-height: 15em;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ok);
}
pre code { font-family: inherit; }

.practice__artifact { perspective: 900px; }
.swap-enter-active { transition: opacity 0.22s var(--ease), transform 0.22s var(--ease); }
.swap-leave-active { transition: opacity 0.12s ease-out, transform 0.12s ease-out; }
.swap-enter-from { opacity: 0; transform: rotateX(-14deg) translateY(10px); transform-origin: 50% 0; }
.swap-leave-to { opacity: 0; transform: rotateX(6deg); transform-origin: 50% 100%; }
@media (prefers-reduced-motion: reduce) {
  .swap-enter-from, .swap-leave-to { transform: none; }
}

@media (max-width: 900px) {
  .practice__grid { grid-template-columns: minmax(0, 1fr); }
  .practice__artifact { position: static; }
}
</style>
