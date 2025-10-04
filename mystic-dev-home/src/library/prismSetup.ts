/**
 * @file prismSetup.ts
 * @description Configures PrismJS.
 * 
 * @remarks
 *   This file is purely Typescript, all styles are handled in app/globals.css
 *   and, main styles is in styles/main.css.
 *
 * @author TheDevMystic (Surya)
 */

// --------------------------
// Imports.
// --------------------------

// PrismJS Core
import * as Prism from "prismjs";

// PrismJS Plugins (JavaScript)
import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/match-braces/prism-match-braces";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/show-language/prism-show-language";

// --------------------------
// Configuration.
// --------------------------

/**
 * Current PrismJS version.
 * @type {string}
 * @constant
 * @default
 */
const PRISM_VERSION: string = "1.30.0" 

/**
 * @description Configure autoloader.
 */
// Ensure Autoloader exists (should be after import).
if (Prism.plugins.autoloader) {
  // Set path to components, where autoloader searches languages.
  Prism.plugins.autoloader.language_path = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_VERSION}/components/`;
  // Usually already set to true, but explicitly set it.
  Prism.plugins.autoloader.use_minified = true;
}

/**
 * @description Configure normalize whitespace.
 */
// Ensure NormalizeWhitespace exists (should be after import).
if (Prism.plugins.NormalizeWhitespace) {
  // Set defaults
  Prism.plugins.NormalizeWhitespace.setDefaults({
    // Remove leading/trailing line feeds.
    "remove-initial-line-feed": true,
    // Remove trailing whitespaces on all lines.
    "remove-trailing": true,
    // Remove minimum common indentation from code block.
    "remove-indent": true,
    // Remove whitespaces from the top of the code block.
    "left-trim": true,
    // Remove whitespaces from the bottom of the code block.
    "right-trim": true,
    // Convert tabs to spaces.
    "tabs-to-spaces": 4,
  });
}

/**
 * @function registerPrismCopyButton
 * @description Register custom copy button.
 *
 * @returns Registered button.
 */
export function registerPrismCopyButton() {
  // If toolbar plugin is missing.
  if (!Prism.plugins.toolbar) return;
    
  // Register copy-to-clipboard button.
  Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(env.code).then(() => {
        // When copy is successful add copied class in button for 1.5 sec.
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 1500);
      });
    });
    return button;
  });
}
