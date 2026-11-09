export const themeInitScript = `(function() {
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
