// Renders resume.html and cv.html to PDFs in public/ with headless Chrome or Edge.
// Run locally after editing (npm run docs) and commit the PDFs: Vercel has no browser to do it.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(p => p && existsSync(p))
if (!chrome) throw new Error('No Chrome or Edge found; set CHROME=/path/to/browser')

for (const name of ['resume', 'cv']) {
  const out = resolve('public', `mark-dennis-concha-${name}.pdf`)
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000', // let the web fonts load before printing
    `--print-to-pdf=${out}`,
    pathToFileURL(resolve('resume', `${name}.html`)).href,
  ], { stdio: 'inherit' })
  console.log('wrote', out)
}
