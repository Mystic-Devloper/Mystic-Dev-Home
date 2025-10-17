/**
 * @file src/library/debounce.ts
 * @description Helper function for debouncing.
 *
 * @author TheDevMystic (Surya)
 */

/**
 * @type AnyFunction
 * @description A generic function type alias.
 */
type AnyFunction = (...args: any[]) => any;

/**
 * @function debounce
 * @description Function to debounce another function.
 *
 * @param {AnyFunction} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds before the function is called.
 *
 * @returns A new debounced function.
 */
export const debounce = (func: AnyFunction, delay: number = 100): AnyFunction => {
  // 1. Initialize 'timer' in the closure scope of 'debounce'.
  let timer: ReturnType<typeof setTimeout> | undefined;

  // 2. Return the debounced functiony.
  return function (this: unknown, ...args: any[]) {
    // 3. Clear any existing timer. If 'timer' is undefined, clearTimeout does nothing.
    clearTimeout(timer);

    // 4. Set a new timer.
    // The original function 'func' will be called after 'delay' milliseconds.
    timer = setTimeout(() => {
      // 5. Use 'apply' to call the original function with the correct 'this' context
      // and arguments from the *last* call to the debounced function.
      func.apply(this, args);
    }, delay);
  };
};
