export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const stored = localStorage.getItem('theme-storage');
              if (stored) {
                const { state } = JSON.parse(stored);
                if (state && state.theme) {
                  document.documentElement.setAttribute('data-theme', state.theme);
                  return;
                }
              }
            } catch (e) {
              // Continue to fallback
            }
            
            // Fallback to system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
          })();
        `,
      }}
    />
  );
}
