/**
 * @file src/library/utility.ts
 * @description General utility functions.
 *
 * @author TheDevMystic (Surya)
 */

/* ========================================================
    Time Related Functions
   --------------------------------------------------------

/**
 * @type MilliSeconds
 * @description MilliSecond type alias.
 */
export type MilliSeconds = number;

/**
 * @type AnyFunction
 * @description A generic function type.
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * @function debounce
 * @description Debounces a function for specified
 * ammount of time in ms. Handles both leading and trailing cases.
 *
 * @param {AnyFunction} func - The function to be debounced.
 * @param {MilliSeconds} delay - Time in milliseconds.
 * @param {boolean} immediate - Whether to call immediately.
 *
 * @returns Debounced function.
 */
export const debounce = (
  func: AnyFunction,
  delay: MilliSeconds,
  immediate: boolean = false
) => {
  // Initialize timer in closure scope of `debounce`.
  let timer: ReturnType<typeof setTimeout> | undefined;

  // Return debounced function
  return function(...args: any[]) {
    // `this` context of the orignal call
    const context = this;

    // Clear the previous timer, if it exists.
    clearTimeout(timer);

    // Set a new timer
    timer = setTimeout(() => {
      // Execute the orignal function
      func.apply(context, args)
    }, delay);
  };
};

/**
 * @function delay
 * @description Delays the execution of a function.
 * It delays a function execution in ms.
 *
 * @param {MilliSeconds} ms - Time in milliseconds.
 *
 * @returns A promise after specified delay.
 */
export function delay(ms: Milliseconds): Promise {
  return new Promise(resolve => setTimeout(resolve, ms));
}
