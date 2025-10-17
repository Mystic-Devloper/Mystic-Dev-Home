/**
 * @file src/library/navigation-bar.ts
 * @description Helper function for Navigation Bar.
 *
 * @author TheDevMystic (Surya)
 */

/**
 * License :-
 * This navigation bar helper functions along with all other peices of code (HTML, TS, TSX and CSS)
 * are published under MIT. For full license see /LICENSE.
 */

/**
 * @type NavigationBar, NavigationLink, HamburgerMenu
 * @description Navigation type alias.
 */
export type NavigationBar = HTMLDivElement;
export type NavigationLink = HTMLUListElement;
export type HamburgerMenu = HTMLDivElement;

// WeakMap stores navlinks element => cached width
const navlinksWidthCache = new WeakMap<NavigationLink, number>();

/**
 * @function isValidNavigationBar
 * @description Checks whether an element is a navigation bar or not.
 *
 * @param {NavigationBar} navbar - The navigation bar element to be checked.
 *
 * @return true/false based on check.
 */
export const isValidNavigationBar = (navbar: NavigationBar) => navbar.classList.contains("navigation-bar");

/**
 * @function isValidNavigationLink
 * @description Checks whether an element is a navigation link or not.
 *
 * @param {NavigationLink} navlinks - The navigation link element to be checked.
 *
 * @return true/false based on check.
 */
export const isValidNavigationLink = (navlinks: NavigationLink) => navlinks.classList.contains("navigation-bar__navigation-link");

/**
 * @function toggleNavigationBar
 * @description Toggles navigation element based on class list.
 *
 * @param {NavigationBar} navbar - The navigation bar element.
 *
 * @returns N/A
 */
export function toggleNavigationBar(navbar: NavigationBar): void {
  if (!isValidNavigationBar(navbar)) {
    console.error("Navigation Bar Error: Not a valid navigation bar.");
    return;
  }
  
  let isOpen: boolean = navbar.classList.contains("navigation-bar--open");
  const isClosed: boolean = navbar.classList.contains("navigation-bar--closed");

  // Check if class list mismatch or not.
  if ((isOpen && isClosed) || (!isOpen && !isClosed)) {
    console.error("Navigation Bar Error: Class list mismatch.");
    navbar.classList.remove("navigation-bar--open", "navigation-bar--closed");
    navbar.classList.add("navigation-bar--closed");
    isOpen = false;
  }

  // Toggle
  navbar.classList.replace(
    isOpen ? "navigation-bar--open" : "navigation-bar--closed",
    isOpen ? "navigation-bar--closed" : "navigation-bar--open"
  );
}

/**
 * @function getRequiredNavigationLinksWidth
 * @description Function to calculate navigation link total required width.
 *
 * @param {NavigationLink} navlinks - The navigation link element.
 * @param {boolean} forceRefresh - Whether to force a refresh.
 *
 * @returns Calculated navlinks width.
 */
export function getRequiredNavigationLinksWidth(
  navlinks: NavigationLink,
  forceRefresh: boolean
): number {
  if (!isValidNavigationLink(navlinks)) {
    console.error("Navigation Bar Error: Not a valid navigation link.");
    return NaN;
  }

  if (!forceRefresh && navlinksWidthCache.has(navlinks)) {
    return navlinksWidthCache.get(navlinks)!;
  }

  const linkitems = Array.from(navlinks.querySelectorAll("li")) as HTMLLIElement[];
  let totalWidth: number = 0;

  // Apply temporary class for accurate measurement
  navlinks.classList.add("u-navigation-link-measure-layout");

  // Sum of offset width of each li element
  totalWidth = linkitems.reduce((sum, li) => sum + li.offsetWidth, 0);

  // Add any necessary padding/margins from the UL container itself
  const style = window.getComputedStyle(navlinks);
  totalWidth += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);

  // Remove class after calculation
  navlinks.classList.remove("u-navigation-link-measure-layout");

  // Save width to cache.
  navlinksWidthCache.set(navlinks, totalWidth);
  
  return totalWidth;
}

/**
 * @function checkNavigationBarOverflow
 * @description Checks whether navigation links overflow or not,
 * if it overflows then switched to hamburger menu.
 *
 * @param {NavigationBar} navbar - The navigation bar element.
 * @param {NavigationLink} navlinks - The navigation links element.
 * @param {HamburgerMenu} hamburgerMenu - The hamburger menu element.
 * @param {number} BUFFER_WIDTH - The buffer safe zone in calculation.
 * @param {boolean} forceRefresh - Whether to refresh or not.
 *
 * @returns N/A
 */
export function checkNavigationBarOverflow(
  navbar: NavigationBar,
  navlinks: NavigationLink,
  hamburgerMenu: HamburgerMenu,
  BUFFER_WIDTH: number = 10,
  forceRefresh: boolean = false
): void {
  if (!isValidNavigationBar(navbar)) {
    console.error("Navigation Bar Error: Not a valid navigation bar.");
    return;
  }

  const isMobileView: boolean = navbar.classList.contains("navigation-bar--mobile-view");
  const isDesktopView: boolean = navbar.classList.contains("navigation-bar--desktop-view");

  // Check if class list mismatch or not.
  if ((isMobileView && isDesktopView) || (!isMobileView && !isDesktopView)) {
    console.error("Navigation Bar Error: Class list mismatch.");
    navbar.classList.remove("navigation-bar--mobile-view",
                            "navigation-bar--desktop-view");
    navbar.classList.add("navigation-bar--mobile-view");
  }
  
  // Get current container width
  const containerWidth: number = navbar.offsetWidth;
  // Get required width
  const requiredWidth: number = getRequiredNavigationLinksWidth(navlinks);

  if (requiredWidth + BUFFER_WIDTH > containerWidth) {
    navbar.classList.remove("navigation-bar--desktop-view");
    navbar.classList.add("navigation-bar--mobile-view");
    hamburgerMenu.classList.add("navigation-bar__hamburger-menu--shown");
  } else {
    navbar.classList.remove("navigation-bar--mobile-view",
			    "navigation-bar--open",
			    "navigation-bar--closed",
			    "navigation-bar__hamburger-menu--shown");

    navbar.classList.add("navigation-bar--desktop-view",
			 "navigation-bar__hamburger-menu--hidden");
  }
}
