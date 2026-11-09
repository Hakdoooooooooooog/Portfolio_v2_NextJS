export const themeInitScript = `(function() {
  try {
    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var seenSplash = sessionStorage.getItem('portfolio-splash-seen');
    if (seenSplash === '1' || motionQuery.matches) {
      document.documentElement.setAttribute('data-splash', 'skip');
    }
  } catch (e) {}

  try {
    const stored = localStorage.getItem('theme-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.state && parsed.state.theme) {
        document.documentElement.setAttribute('data-theme', parsed.state.theme);
        return;
      }
    }
  } catch (e) {}
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
})();`;

export default function ThemeScript() {
  return (
    <script
      id="theme-script"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
