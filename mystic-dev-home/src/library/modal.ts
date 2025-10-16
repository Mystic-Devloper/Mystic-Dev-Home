/**
 * @file src/library/modal.ts
 * @description Functions to set up modal.
 *
 * @author TheDevMystic (Surya)
 */

import React from "react";

/**
 * @type ModalElement
 * @description Modal element alias.
 */
export type ModalElement = HTMLDivElement;

/**
 * @type ModalBackdrop
 * @description Modal backdrop element alias.
 */
export type ModalBackdrop = HTMLDivElement;

/**
 * @type ModalCloseButton
 * @description Modal close button element alias.
 */
export type ModalCloseButton = HTMLDivElement | HTMLButtonElement; // Using HTMLButtonElement is more semantic for a button.

/**
 * @type ModalModifier
 * @description Modal modifier element alias.
 */
export type ModalModifier = string;

/**
 * @type GlobalMainContent_ForModal
 * @description Global main content type alias exclusively for modal and avoid name conflicts.
 */
export type GlobalMainContent_ForModal = HTMLElement;

/**
 * @type ModalFocusElement
 * @description Modal focus element alias.
 */
export type ModalFocusElement = HTMLElement; /* This is broad because focus element can
                                                be div, link or button. */

/**
 * @class Modal
 * @description Class to handle modal.
 */
export class Modal {
  /**
   * @property modalElement
   * @description The modal element on which class acts.
   */
  protected modalElement: ModalElement;

  /**
   * @property modalBackdrop
   * @description The modal backdrop element.
   */
  protected modalBackdrop: ModalBackdrop;

  /**
   * @property closeButton
   * @description The modal closing button.
   */
  protected closeButton: ModalCloseButton | null; /* It should allow null in case the button isn't found */

  /**
   * @property previousActiveElement
   * @description The previously selected element.
   */
  protected previousActiveElement: ModalFocusElement; /* Corrected typo: ModalFcousElement -> ModalFocusElement */

  /**
   * @property initialFocusedElement
   * @description The element that will be initially focused.
   */
  protected initialFocusedElement: ModalFocusElement;

  /**
   * @property globalMainContent
   * @description Main content of a website.
   */
  protected globalMainContent: GlobalMainContent_ForModal;

  /**
   * @property modalOpenModifier
   * @description The class modifier that will open modal.
   */
  protected modalOpenModifier: ModalModifier;

  /**
   * @property modalBackdropOpenModifier
   * @description The class modifier that will open modal backdrop.
   */
  protected modalBackdropOpenModifier: ModalModifier;

  /**
   * @property isOpen
   * @description Whether the modal is open closed.
   */
  protected isOpen: boolean;

  /**
   * @property boundHandleKeyPress
   * @description The keypress handler bound to 'this' for proper event listener removal.
   */
  private boundHandleKeyPress: (event: Event) => void;

  /**
   * @constructor
   * @description Sets up Modal.
   *
   * @param {ModalElement | string} modal - The given modal element or its ID.
   * @param {ModalBackdrop | string} modalBackdrop - The modal backdrop element or its ID.
   * @param {ModalCloseButton | string} closeButton - The modal close button element or its ID.
   * @param {ModalFocusElement | string} previousActiveElement - The previous selected & focused element or its ID.
   * @param {ModalFocusElement | string} initialFocusedElement - The initial focused element or its ID.
   * @param {GlobalMainContent_ForModal | string} globalMainContent - The main content element or its ID.
   * @param {ModalModifier} modalOpenModifier - The modifier class that will open modal.
   * @param {ModalModifier} modalBackdropModifier - The modifier class that will open modal backdrop.
   * @param {boolean} isOpen - Whether to open or close on default.
   */
  constructor(
    // Corrected parameter types to allow string IDs or element references for flexibility
    modal: ModalElement | string = "modal",
    modalBackdrop: ModalBackdrop | string = "modal__backdrop",
    closeButton: ModalCloseButton | string = "modal__close-button",
    previousActiveElement: ModalFocusElement | string = "modal__activate-button",
    initialFocusedElement: ModalFocusElement | string = "modal__close-button",
    globalMainContent: GlobalMainContent_ForModal | string = "site__site-content",
    modalOpenModifier: string = "modal--open",
    modalBackdropModifier: string = "modal__backdrop--visible",
    isOpen: boolean = false
  ) {
    // Helper function to safely retrieve elements
    const getElement = <T extends HTMLElement>(el: T | string): T => {
      if (typeof el === "string") {
        const foundEl = document.getElementById(el);
        if (!foundEl) {
          // Throw an error if a required element is missing, as a safety measure.
          throw new Error(`Modal setup failed: Required element with ID "${el}" not found.`);
        }
        return foundEl as T;
      }
      return el;
    };

    // Set properties
    this.modalElement = getElement<ModalElement>(modal);
    this.modalBackdrop = getElement<ModalBackdrop>(modalBackdrop);
    // closeButton can be optional, so handle it separately
    this.closeButton = (typeof closeButton === "string" ? document.getElementById(closeButton) : closeButton) as ModalCloseButton | null;
    this.previousActiveElement = getElement<ModalFocusElement>(previousActiveElement);
    this.initialFocusedElement = getElement<ModalFocusElement>(initialFocusedElement);
    this.globalMainContent = getElement<GlobalMainContent_ForModal>(globalMainContent);
    this.modalOpenModifier = modalOpenModifier;
    this.modalBackdropOpenModifier = modalBackdropModifier;
    this.isOpen = isOpen;

    // Bind the handler to 'this' context once, crucial for DOM event listeners
    this.boundHandleKeyPress = this.handleKeyPress.bind(this) as (event: Event) => void;

    // Open or close based on isOpen
    if (this.isOpen) {
        this.open();
    }
  }

  /**
   * @function open
   * @description Opens a modal box.
   */
  public open(): void {
    if (this.isOpen) return; // Prevent unnecessary re-open calls

    // Store the currently active element BEFORE opening the modal for proper focus restoration
    const activeEl = document.activeElement;
    if (activeEl instanceof HTMLElement) {
        this.previousActiveElement = activeEl;
    }

    // Open modal
    this.modalElement.classList.add(this.modalOpenModifier);
    // Set crucial ARIA attributes for screen readers
    this.modalElement.setAttribute("aria-modal", "true");
    this.modalElement.setAttribute("role", "dialog");

    // Focus initial element
    this.initialFocusedElement.focus();
    // Setup backdrop
    this.modalBackdrop.classList.add(this.modalBackdropOpenModifier);
    // Set A11y attribute on main content to hide it from screen readers
    this.globalMainContent.setAttribute("aria-hidden", "true");
    // Set isOpen to true
    this.isOpen = true;

    // Handle keypresses, using the bound function for correct 'this' context and removal
    this.modalElement.addEventListener("keydown", this.boundHandleKeyPress);
  }

  /**
   * @function close
   * @description Closes a modal box.
   */
  public close(): void {
    if (!this.isOpen) return; // Prevent unnecessary re-close calls

    // Close modal
    this.modalElement.classList.remove(this.modalOpenModifier);
    // Remove ARIA attributes
    this.modalElement.removeAttribute("aria-modal");
    this.modalElement.removeAttribute("role");

    // Focus previous active element
    this.previousActiveElement.focus();
    // Remove backdrop
    this.modalBackdrop.classList.remove(this.modalBackdropOpenModifier);
    // Set A11y attribute on main content back to visible
    this.globalMainContent.setAttribute("aria-hidden", "false");
    // Set isOpen to false
    this.isOpen = false;

    // Don't Handle keypresses, remove listener using the same bound function
    this.modalElement.removeEventListener("keydown", this.boundHandleKeyPress);
  }

  /**
   * @function toggle
   * @description Toggles modal box.
   */
  public toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * @function isOpened
   * @description Checks if a modal is opened.
   */
  public isOpened(): boolean {
    return this.isOpen;
  }

  /**
   * @function handleKeyPress
   * @description Keyboard Handler for modal. This is the main dispatcher for keyboard events.
   *
   * @param {Event} event - Key event related to modal (Standard DOM Event).
   */
  protected handleKeyPress(
    event: Event
  ): void {
    // We cast to KeyboardEvent to access key/keyCode properties reliably
    const keyEvent = event as KeyboardEvent;

    // Handle escape key, i.e., close
    this.handleEscapeKey(keyEvent);
    // Handle tab key i.e., focus trapping
    this.handleTabKey(keyEvent);
    // Handle enter/spacebar for close button
    this.handleEnterAndSpaceKey(keyEvent);
  }

  /**
   * @function handleEscapeKey
   * @description Keyboard Handler for escape key.
   *
   * @param {KeyboardEvent} keyEvent - Key event related to modal.
   */
  protected handleEscapeKey(
    keyEvent: KeyboardEvent
  ): void {
    if (keyEvent.key === "Escape" || keyEvent.keyCode === 27) {
      this.close();
      keyEvent.preventDefault(); // Stop default behavior
    }
  }

  /**
   * @function handleTabKey
   * @description Keyboard Handler for tab key.
   *
   * @param {KeyboardEvent} keyEvent - Key event related to modal.
   */
  protected handleTabKey(
    keyEvent: KeyboardEvent
  ): void {
    // Check if the key is actually Tab
    if (keyEvent.key !== "Tab" && keyEvent.keyCode !== 9) return;

    // Selector refined to target all standard interactive elements and elements with tabindex
    const FOCUSABLE_ELEMENTS_SELECTOR = 'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    // Convert NodeList to an Array of HTMLElements and filter out hidden elements
    const focusableElements = Array.from(
        this.modalElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)
    ).filter(el => (el as HTMLElement).offsetParent !== null) as HTMLElement[];

    // if there is no focusable element return
    if (focusableElements.length === 0) return;

    const firstFocusableElement: HTMLElement = focusableElements[0];
    const lastFocusableElement: HTMLElement = focusableElements[focusableElements.length - 1];

    // Tab focus trap
    const isShiftPressed = keyEvent.shiftKey;
    const currentFocus = document.activeElement;

    // Shift + Tab (Backward Trapping)
    if (isShiftPressed) {
      // Focus is on first element, on shift + tab, change it to last one.
      if (currentFocus === firstFocusableElement) {
        lastFocusableElement.focus();
        keyEvent.preventDefault(); // Stop default behavior
      }
    }
    // Tab (Forward Trapping)
    else {
      // Focus is on last element, on tab, change it to first one.
      if (currentFocus === lastFocusableElement) {
        firstFocusableElement.focus();
        keyEvent.preventDefault(); // Stop default behavior
      }
    }
  }

  /**
   * @function handleEnterAndSpaceKey
   * @description Keyboard Handler for Enter and Space keys on the close button.
   *
   * @param {KeyboardEvent} keyEvent - Key event related to modal.
   */
  protected handleEnterAndSpaceKey(
    keyEvent: KeyboardEvent
  ): void {
    // If close button is null or not the focused element, return
    if (!this.closeButton || document.activeElement !== this.closeButton) return;

    const isEnter = keyEvent.key === "Enter" || keyEvent.keyCode === 13;
    const isSpace = keyEvent.key === " " || keyEvent.keyCode === 32;

    // Handle enter & spacebar press
    if (isEnter || isSpace) {
      this.close();
      keyEvent.preventDefault(); // Stop default behavior
    }
  }
}
