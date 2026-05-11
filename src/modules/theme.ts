// Components
import { BitCell } from "../components/bit-cell";

/* Defines the Theme type and functions for managing light/dark themes in the application. */
type Theme = 'light' | 'dark';

/* Sets the theme by updating the data-theme attribute on the body element and saving the preference to localStorage. */
export function setTheme(theme: Theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/** Retrieves the saved theme from localStorage or falls back to the system preference if no saved theme exists. */
export function getSavedTheme(): Theme {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Toggles between light and dark themes based on the current theme. */
export function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') as Theme | null;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// On initial load, apply the saved theme or the system preference if no saved theme exists.
const initialTheme = getSavedTheme();
setTheme(initialTheme);

// Register the toggle-theme button click event listener to switch themes when clicked.
document.querySelectorAll<BitCell>('.theme-toggle')?.forEach(cell => {
    cell.value = document.body.getAttribute('data-theme') === 'light' ? 0 : 1;
    cell.addEventListener('click', () => {
        toggleTheme()
        cell.value = document.body.getAttribute('data-theme') === 'light' ? 0 : 1;
    });
});
