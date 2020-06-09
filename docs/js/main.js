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
  HIDE: '-hide',
  SCROLL_OFF: '-scroll-off',
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

    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleSubnavigationHighlight = this.handleSubnavigationHighlight.bind(this);
    this.setActiveNavigation = this.setActiveNavigation.bind(this);
    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.mobileNavigationLink.addEventListener("click", this.openNavigation);
      this.closeButton.addEventListener("click", this.closeNavigation);
      window.addEventListener("scroll", _.throttle(this.handleScrollDown, 100));
      window.addEventListener("scroll", _.throttle(this.handleSubnavigationHighlight, 100));
      this.mobileNavigationListItems.forEach((item) => {
        item.addEventListener("click", this.closeNavigation);
      });
      this.mobileNavigationHeader.forEach(node => {
        node.addEventListener('click', this.setActiveNavigation);
      })
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
  }

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
    let fromTop = window.scrollY;
    let shouldHide = true;
    this.navigationLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        shouldHide = false;
        this.displayNavigation();
        link.classList.add(CLASSES.ACTIVE);
        section.classList.add(CLASSES.ANIMATE_UP);
      } else {
        link.classList.remove(CLASSES.ACTIVE);
        section.classList.remove(CLASSES.ANIMATE_UP);
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