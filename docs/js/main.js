/**
 * @fileoverview Handles all interactions on the navigation drawer.
 */


/**
* JS selectors
* @enum {string}
*/
const SELECTORS = {
  NAVIGATION: '.js-nav-links-wrapper',
  NAVIGATION_LINKS: '.js-nav-link',
  SUBNAVIGATION_LINKS: '.js-subnav-link',
  PAGE_SECTION: '.js-section',
  MOBILE_NAVIGATION_LINK: '.js-mobile-nav-link',
  MOBILE_NAVIGATION: '.js-mobile-navigation',
  CLOSE_BTN: '.js-close-btn',
  MOBILE_NAVIGATION_LIST_ITEM: '.js-mobile-list-item',
  MOBILE_NAVIGATION_HEADER: '.js-mobile-nav-header',
  BODY: '.js-body',
  THOUGHT_STARTERS: '.js-thought-starters',
  THOUGHT_STARTER_LINK: '.js-thought-starter-link',
  READ_MORE_LINK: '.js-read-more-link',
  WHAT_WE_DO_CONTENT: '.js-wwd-content',
  CARET: '.js-caret',
}

/**
* JS classes
* @enum {string}
*/
const CLASSES = {
  ANIMATE_UP: "-animateup",
  ACTIVE: "-active",
  ACTIVE_NAVIGATION: "-active-nav",
  SHOW: '-show',
  DISPLAY: '-display',
  DISPLAY_MOBILE_NAV: '-display-sm',
  HIDE: '-hide',
  SCROLL_OFF: '-scroll-off',
  ROTATE: '-rotate',
}

/**
* Controller for site (main).
*/
class Main {
  constructor() {
    this.body = document.querySelector(SELECTORS.BODY);
    this.navigation = document.querySelector(SELECTORS.NAVIGATION);
    this.navigationLinks = [...document.querySelectorAll(SELECTORS.NAVIGATION_LINKS)];
    this.subnavigationLinks = [...document.querySelectorAll(SELECTORS.SUBNAVIGATION_LINKS)];
    this.section = [...document.querySelectorAll(SELECTORS.PAGE_SECTION)];
    this.mobileNavigationLink = document.querySelector(SELECTORS.MOBILE_NAVIGATION_LINK);
    this.mobileNavigation = document.querySelector(SELECTORS.MOBILE_NAVIGATION);
    this.closeButton = document.querySelector(SELECTORS.CLOSE_BTN);
    this.mobileNavigationHeader = [...document.querySelectorAll(SELECTORS.MOBILE_NAVIGATION_HEADER)];
    this.mobileNavigationListItems = [...document.querySelectorAll(SELECTORS.MOBILE_NAVIGATION_LIST_ITEM)];
    this.thoughtStarterLink = document.querySelector(SELECTORS.THOUGHT_STARTER_LINK);
    this.readMoreLink = document.querySelector(SELECTORS.READ_MORE_LINK);
    this.thoughtStarters = document.querySelector(SELECTORS.THOUGHT_STARTERS);
    this.wwdContent = document.querySelector(SELECTORS.WHAT_WE_DO_CONTENT);
    this.caret = [...document.querySelectorAll(SELECTORS.CARET)];

    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleSubnavigationHighlight = this.handleSubnavigationHighlight.bind(this);
    this.setActiveNavigation = this.setActiveNavigation.bind(this);
    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
    this.displayMobileSubnavigation = this.displayMobileSubnavigation.bind(this);
    this.toggleReadMoreSection = this.toggleReadMoreSection.bind(this);
    this.toggleCaret = this.toggleCaret.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      new Glide('.glide').mount();
      this.mobileNavigationLink.addEventListener("click", this.openNavigation);
      this.closeButton.addEventListener("click", this.closeNavigation);
      window.addEventListener("scroll", _.throttle(this.handleScrollDown, 100));
      window.addEventListener("scroll", _.throttle(this.handleSubnavigationHighlight, 100));
      this.readMoreLink.addEventListener("click", () => {
        this.toggleReadMoreSection(this.wwdContent);
        this.toggleCaret(this.readMoreLink);
      })
      this.thoughtStarterLink.addEventListener("click", () => {
        this.toggleReadMoreSection(this.thoughtStarters);
        this.toggleCaret(this.thoughtStarterLink);
      });
      this.mobileNavigationListItems.forEach((item) => {
        item.addEventListener("click", this.closeNavigation);
      });
      this.mobileNavigationHeader.forEach(node => {
        node.addEventListener('click', this.setActiveNavigation);
      });
    });
  }

  /**
   * Open the mobile navigation menu
   */
  openNavigation() {
    this.mobileNavigation.style.width = "100%";
    this.body.classList.add(CLASSES.SCROLL_OFF);
  }

  /**
   * Close the mobile navigation
   */
  closeNavigation() {
    this.mobileNavigation.style.width = "0%";
    this.body.classList.remove(CLASSES.SCROLL_OFF);
  }

  /**
   * Set the selected mobile navigation item to be active
   */
  setActiveNavigation(e) {
    this.mobileNavigationHeader.forEach(node => {
      node.classList.remove(CLASSES.ACTIVE_NAVIGATION);
    });
    e.target.classList.add(CLASSES.ACTIVE_NAVIGATION);
    this.displayMobileSubnavigation(e.target);
  }

  displayMobileSubnavigation(e) {
    this.mobileNavigationListItems.forEach(item => {
      item.classList.remove(CLASSES.DISPLAY);
      if (e.dataset.header === item.dataset.header) {
        this.toggleReadMoreSection(item);
      }
    })
  }

  /**
   * Toggle caret 
  */
 toggleCaret(linkEl) {
  this.caret.forEach((item) => {
    if (!item.classList.contains(CLASSES.ROTATE) && item.parentNode == linkEl) {
      item.classList.add(CLASSES.ROTATE);
    } else {
      item.classList.remove(CLASSES.ROTATE);
    }
  });
 }

  /**
   * Display a given section (pass in the element).
   */
  toggleReadMoreSection(el) {
    if (!el.classList.contains(CLASSES.DISPLAY)) {
      el.classList.toggle(CLASSES.DISPLAY);
      el.style.height = 'auto';

      let height = el.clientHeight + "px";
      el.style.height = '0px';
      setTimeout(() => {
        el.style.height = height;
      }, 0);
    } else {
      el.style.height = '0px';
      el.addEventListener('transitionend', () => {
        el.classList.remove(CLASSES.DISPLAY);
      }, {
        once: true
      });
    } 
  };

  /**
   * Adds "show" class to navigation
   */
  displayNavigation() {
    if (!this.navigation.classList.contains(CLASSES.SHOW)) {
      this.navigation.classList.add(CLASSES.SHOW);
    }
  }

  /**
   * Removes "show" class from navigation
   */

  hideNavigation() {
    this.navigation.classList.remove(CLASSES.SHOW);
  }
  
  /**
   * Handle active scrolling and displaying navigation
   */
  handleScrollDown() {
    let shouldHide = true;
    let fromTop = window.scrollY;
    this.navigationLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if (
        section.getBoundingClientRect().y <= fromTop &&
        section.offsetTop + section.getBoundingClientRect().height > fromTop
      ) {
        shouldHide = false;
        link.classList.add(CLASSES.ACTIVE);
        this.displayNavigation();
      } else {
        link.classList.remove(CLASSES.ACTIVE);
      }
    });
    if (shouldHide) {
      this.hideNavigation();
    }
  }

  /**
   * Handle subnavigation highlighting
   */

   handleSubnavigationHighlight() {
     let fromTop = window.scrollY;
     this.subnavigationLinks.forEach(link => {
       let sectionHash = document.querySelector(link.hash);
       if (sectionHash != null) {
         if (sectionHash.offsetTop <= fromTop && sectionHash.offsetTop + sectionHash.offsetHeight > fromTop) {
           link.classList.add(CLASSES.ACTIVE);
         } else {
           link.classList.remove(CLASSES.ACTIVE);
         }
       }
     })
}
}

new Main();