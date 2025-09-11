/*****************************************************************************
 * Mystic Dev Website (mystic-dev.eu.org & mystic-devloper.github.io)        *
 *                                                                           *
 * A Personal Website made by Mystic Devloper (Surya).                       *
 *                                                                           *	
 * File: theme-toggle.js                                                     *
 * Info: JS File for Theme Toggle.                                           *
 *****************************************************************************/

const theme_toggle_button = document.getElementById('theme-toggle-button');
const root_html_element = document.documentElement;

/**
 * @brief Function to set theme.
 *
 * This function sets current theme and saves it in
 * storage for persistent theming.
 */
function setTheme(theme) {
    root_html_element.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/**
 * @brief Function to toggle theme.
 *
 * This function toggle theme based on current data-theme
 * attribute.
 */
function toggleTheme() {
    const current_theme = root_html_element.getAttribute('data-theme');
    const new_theme = current_theme == 'dark' ? 'light' : 'dark';
    setTheme(new_theme);
}

/**
 * @brief Add Event Listener to toggle button.
 */
if (theme_toggle_button) {
    theme_toggle_button.addEventListener('click', toggleTheme);
} else {
    console.error('Theme toggle button with id "theme-toggle-button" not found.');
}

/**
 * @brief On page load check for saved theme in local storage.
 */
document.addEventListener('DOMContentLoaded', () => {
    const saved_theme = localStorage.getItem('theme');
    
    if (saved_theme) {
    /**
     * @brief If theme is saved apply it.
     */
        setTheme(saved_theme);
    } else {
    /**
     * @brief If theme is not saved, use media query.
     */
    const prefers_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefers_dark ? 'dark' ? 'light');
    }
});
