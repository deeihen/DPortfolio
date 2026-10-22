// Dark/light theme. The pre-paint script in nuxt.config.ts sets html[data-theme] before
// hydration (saved choice, else the OS preference); this keeps Vue in sync with it.
export function useTheme() {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark')
  onMounted(() => {
    theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })
  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme.value
    try { localStorage.setItem('theme', theme.value) } catch {}
  }
  return { theme, toggle }
}
