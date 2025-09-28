/***
 * Mystic Dev Website (https://thedevmystic.github.io 
 *                     && https://mystic-dev.eu.org)
 *
 * @file search.ts
 *
 * @brief Search Utility.
 *
 * This file implements regexp based fuzzy search and 
 * highlighting search utility.
 ***/

/**
 * Type aliases.
 */
export type SearchQuery = string;
export type Tag = string;

/**
 * This function escapes a regular expression (regexp).
 *
 * @param {string} sentence  - Normal string containing regexp.
 *
 * @returns Regexp escaped string.
 */
export function escapeRegexp(sentence: string): string {
  return sentence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * This function extracts tags from raw search query.
 *
 * @param {SearchQuery} rawInput - Raw search query.
 * 
 * @returns Array of tags.
 */
export function extractTags(rawInput: SearchQuery): Array<Tag> {
  const tagRegexp = /tag:((?:"[^"]+"|'[^']+'|[^\s])+)/gi; // Tags regexp, like tag:"GameDev"
  const tags: Array<Tag> = []; // Array to hold tags

  const matches: IterableIterator<RegExpMatchArray> = rawInput.matchAll(tagRegexp); // Captures tags from rawInput

  for (const match of matches) {
    let expr: Tag = (match[1] ?? "").trim();
  }
}
