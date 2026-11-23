export type Theme = 'light' | 'dark';

export const getStoredTheme = (): Theme => {
  const saved = localStorage.getItem('ecosense_theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'; // Dark default for IoT platform
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem('ecosense_theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
