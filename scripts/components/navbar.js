/*****************************************************************************
 * Mystic Dev Website (mystic-dev.eu.org & mystic-devloper.github.io)        *
 *                                                                           *
 * A Personal Website made by Mystic Devloper (Surya).                       *
 *                                                                           *	
 * File: navbar.js                                                           *
 * Info: JS File for Navigation bar.                                         *
 *****************************************************************************/

/**
 * @brief Navigation bar.
 *
 * This class creates a navivation bar inspired by
 * ReponsiveNav plugin.
 */
class NavBar {
    /**
     * @brief Constructor of the class.
     *
     * @param {string} el - Nav bar element.
     * @param {list} options - Options for Nav bar.
     */
    constructor(el, options = {}) {
        /**
	 * @brief Default options.
	 */
	this.options = {
            animate: true,
	    transition: 300, // ms
	    label: 'Menu',
	    insert: 'before',
	    custom_toggle: '',
	    close_on_nav_click: false,
	    open_position: 'relative',
	    nav_class: 'nav',
	    nav_active_class: 'js-nav-active',
	    js_class: 'js',
	    init: () => {},
	    open: () => {},
	    close: () => {},
	    ...options
	};

	document.documentElement.classList.add(this.options.js_class);

	this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	
	if (!this.wrapper) {
            throw new Error('The nav element you are trying to select does not exists.');
	}

	this.nav_open = false;

	this._createToggle();
	this._bindEvents();
	this._init();

	this.options.init();
    }
    
    /**
     * @brief Destructor of the class.
     */
    destroy() {
        this.toggle_btn?.removeEventListener('click', this._toggleHandler);
	this.wrapper.classList.remove('opened', 'collapse', this.options.nav_class);
	document.documentElement.classList.remove(this.options.nav_active_class);
	this.wrapper.style.position = '';
	this.wrapper.removeAttribute('aria-hidden');
	this.toggle_btn?.remove();
    }
    
    /**
     * @brief Toggle Function.
     *
     * This function toggle nav bar state.
     */
    toggle() {
        this.nav_open ? this.close() : this.open();
    }
    
    /**
     * @brief Open Function.
     *
     * This Function opens/expands the nav bar.
     */
    open() {
        if (!this.nav_open) {
            this.wrapper.classList.remove('collapse');
            this.wrapper.classList.add('opened');
            this.toggle_btn.classList.add('active');
            document.documentElement.classList.add(this.options.nav_active_class);
            this.wrapper.style.position = this.options.open_position;
            this.wrapper.setAttribute('aria-hidden', 'false');
            this.toggle_btn.setAttribute('aria-expanded', 'true');

            this.nav_open = true;
            this.options.open();
	}
    }

    /**
     * @brief Close Function.
     *
     * This Function closes/contracts the nav bar.
     */
    close() {
        if (this.nav_open) {
            this.wrapper.classList.remove('opened');
            this.wrapper.classList.add('collapse');
            this.toggle_btn.classList.remove('active');
            document.documentElement.classList.remove(this.options.nav_active_class);
            this.wrapper.setAttribute('aria-hidden', 'true');
            this.toggle_btn.setAttribute('aria-expanded', 'false');
            this.wrapper.style.position = 'absolute';

            this.nav_open = false;
            this.options.close();
	}
    }
    
    /**
     * @brief Helper Init Function.
     */
    _init() {
        this.wrapper.classList.add(this.options.nav_class, 'collapse');
	this._resize();
	window.addEventListener('resize', () => this._resize());
    }

    /**
     * @brief Function to create toggle button.
     *
     * If custom toggle exists then, use that. Otherwise,
     * Create a dummy toggle.
     */
    _createToggle() {
        if (this.options.custom_toggle) {
            this.toggle_btn = document.querySelector(this.options.custom_toggle);
	    if (!toggle_btn) {
                throw new Error('Custom toggle element not found.');
	    }
	} else {
            this.toggle_btn = document.createElement('button');
	    this.toggle_btn.text_content = this.options.label;
	    this.toggle_btn.class_name = 'nav-toggle');
            this.toggle_btn.setAttribute('aria-expanded', 'false');
            
            if (this.options.insert === 'after') {
                this.wrapper.insertAdjacentElement('afterend', this.toggle_btn);
	    } else {
                this.wrapper.insertAdjacentElement('beforebegin', this.toggle_btn);
	    }
	}
    }
}
