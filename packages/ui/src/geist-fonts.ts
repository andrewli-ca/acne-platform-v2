// Import Geist font files as URLs
import geistSansItalicFont from './assets/Geist-Italic[wght].ttf?url';
import geistSansFont from './assets/Geist[wght].ttf?url';
import geistMonoItalicFont from './assets/GeistMono-Italic[wght].ttf?url';
import geistMonoFont from './assets/GeistMono[wght].ttf?url';

// Inject @font-face rules (only once)
if (typeof document !== 'undefined' && !document.getElementById('geist-fonts')) {
  const style = document.createElement('style');
  style.id = 'geist-fonts';
  style.textContent = `
    @font-face {
      font-family: 'Geist Sans';
      src: url('${geistSansFont}') format('truetype');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Geist Sans';
      src: url('${geistSansItalicFont}') format('truetype');
      font-weight: 100 900;
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'Geist Mono';
      src: url('${geistMonoFont}') format('truetype');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Geist Mono';
      src: url('${geistMonoItalicFont}') format('truetype');
      font-weight: 100 900;
      font-style: italic;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}
