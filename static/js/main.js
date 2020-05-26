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
}

/**
* JS classes
* @enum {string}
*/
const CLASSES = {
  ACTIVE: "-active",
  SHOW: '-show',
  HIDE: '-hide',
}

/**
* Controller for site (main).
*/
class Main {
  constructor() {
    this.navigation = document.querySelector(SELECTORS.NAVIGATION);
    this.navigationLinks = [...document.querySelectorAll(SELECTORS.NAVIGATION_LINKS)];
    this.subnavigationLinks = [...document.querySelectorAll(SELECTORS.SUBNAVIGATION_LINKS)];
    this.section = document.querySelector(SELECTORS.PAGE_SECTION);

    this.handleScrollDown = this.handleScrollDown.bind(this);
    // this.handleSubnavigationHighlight = this.handleSubnavigationHighlight.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener("scroll", () => {
        this.handleScrollDown(this.navigationLinks);
      });
    });
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
  handleScrollDown(navLinks) {
    let fromTop = window.scrollY;
    let shouldHide = true;
    navLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        shouldHide = false;
        this.displayNavigation();
        link.classList.add(CLASSES.ACTIVE);
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
   * TODO: ABSTRACT THIS FUNCTION TO WORK FOR BOTH
   */

  //  handleSubnavigationHighlight() {
  //    let fromTop = window.scrollY;
  //    this.subnavigationLinks.forEach(link => {
  //      let sectionHash = document.querySelector(link.hash);
  //      if (sectionHash != null) {
  //        if (sectionHash.offsetTop <= fromTop && sectionHash.offsetTop + sectionHash.offsetHeight > fromTop) {
  //          link.classList.add(CLASSES.ACTIVE);
  //        } else {
  //          link.classList.remove(CLASSES.ACTIVE);
  //        }
  //      }
  //    })
// }
}

new Main();