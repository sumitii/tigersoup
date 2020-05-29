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
    this.mobileNavigationLink = document.querySelector(SELECTORS.MOBILE_NAVIGATION_LINK);
    this.mobileNavigation = document.querySelector(SELECTORS.MOBILE_NAVIGATION);
    this.closeButton = document.querySelector(SELECTORS.CLOSE_BTN);
    this.mobileNavigationListItems = [...document.querySelectorAll(SELECTORS.MOBILE_NAVIGATION_LIST_ITEM)];

    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleSubnavigationHighlight = this.handleSubnavigationHighlight.bind(this);
    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.mobileNavigationLink.addEventListener("click", this.openNavigation);
      this.closeButton.addEventListener("click", this.closeNavigation);
      window.addEventListener("scroll", () => {
        this.handleScrollDown(this.navigationLinks);
        this.handleSubnavigationHighlight();
      });
      this.mobileNavigationListItems.forEach((item) => {
        item.addEventListener("click", this.closeNavigation);
      })
    });
  }

  /**
   * Open the mobile navigation menu
   */
  openNavigation() {
    this.mobileNavigation.style.width = "100%";
  }

  /**
   * Close the mobile navigation
   */
  closeNavigation() {
    this.mobileNavigation.style.width = "0%";
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