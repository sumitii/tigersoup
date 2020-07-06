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
  SUBNAVIGATION_LINKS: '.js-subnavigation',
  PAGE_SECTION: '.js-section',
  MOBILE_NAVIGATION_LINK: '.js-mobile-nav-link',
  MOBILE_NAVIGATION: '.js-mobile-navigation',
  CLOSE_BTN: '.js-close-btn',
  MOBILE_NAVIGATION_LIST_ITEM: '.js-mobile-list-item',
  MOBILE_NAVIGATION_CONTENT: '.js-mobile-nav-content',
  MOBILE_NAVIGATION_HEADER: '.js-mobile-nav-header',
  BODY: '.js-body',
  THOUGHT_STARTERS: '.js-thought-starters',
  THOUGHT_STARTER_LINK: '.js-thought-starter-link',
  READ_MORE_LINK: '.js-read-more-link',
  WHAT_WE_DO_CONTENT: '.js-wwd-content',
  CARET: '.js-caret',
  DATE: '.js-date',
}

/**
* JS classes
* @enum {string}
*/
const CLASSES = {
  ANIMATE_UP: "-animateup",
  ACTIVE: "-active",
  SHOW: '-show',
  SHOW_NAV: '-show-nav',
  DISPLAY: '-display',
  SCROLL_OFF: '-scroll-off',
  ROTATE: '-rotate',
  OPEN: '-open',
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
    this.mobileNavigationContent = document.querySelector(SELECTORS.MOBILE_NAVIGATION_CONTENT);
    this.closeButton = document.querySelector(SELECTORS.CLOSE_BTN);
    this.mobileNavigationHeader = [...document.querySelectorAll(SELECTORS.MOBILE_NAVIGATION_HEADER)];
    this.mobileNavigationListItems = [...document.querySelectorAll(SELECTORS.MOBILE_NAVIGATION_LIST_ITEM)];
    this.thoughtStarterLink = document.querySelector(SELECTORS.THOUGHT_STARTER_LINK);
    this.readMoreLink = document.querySelector(SELECTORS.READ_MORE_LINK);
    this.thoughtStarters = document.querySelector(SELECTORS.THOUGHT_STARTERS);
    this.wwdContent = document.querySelector(SELECTORS.WHAT_WE_DO_CONTENT);
    this.caret = [...document.querySelectorAll(SELECTORS.CARET)];
    this.date = document.querySelector(SELECTORS.DATE);

    this.setActiveNavigation = this.setActiveNavigation.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);
    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
    this.toggleReadMoreSection = this.toggleReadMoreSection.bind(this);
    this.toggleCaret = this.toggleCaret.bind(this);
    this.fadeInSection = this.fadeInSection.bind(this);
    this.toggleSubnavigation = this.toggleSubnavigation.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.getDayOfWeek();
      this.fadeInSection();
      if (document.querySelector('.glide')) {
        new Glide('.glide', {
          animationDuration: 0,
          autoplay: 2000,
          type: 'carousel',
        }).mount();
      }
      if (window.location.pathname === '/tigersoup/') {
        this.subnavigationLinks[0].classList.add(CLASSES.DISPLAY);
      }
      this.navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
          this.toggleSubnavigation(link);
        });
        if (window.location.href.indexOf(link.dataset.parent) > -1) {
          let subNav = link.nextElementSibling;
          subNav.classList.add(CLASSES.DISPLAY);
        }
      });
      this.mobileNavigationLink.addEventListener("click", this.openNavigation);
      this.closeButton.addEventListener("click", this.closeNavigation);
      if (this.readMoreLink) {
        this.readMoreLink.addEventListener("click", () => {
          this.toggleReadMoreSection(this.wwdContent);
          this.toggleCaret(this.readMoreLink);
        })
      }
      this.mobileNavigationListItems.forEach((item) => {
        item.addEventListener("click", this.closeNavigation);
      });
      this.mobileNavigationHeader.forEach(node => {
        node.addEventListener("click", this.setActiveNavigation);
      });
    });
  }

  /**
   * Display the day of the week
   */
  getDayOfWeek() {
    var d = new Date();
    var dayOfWeek = d.getDay();

    this.date.innerHTML = dayOfWeek;
  }

  /**
   * Open the mobile navigation menu
   */
  openNavigation() {
    this.mobileNavigation.style.width = "100%";
    this.body.classList.add(CLASSES.SCROLL_OFF);
    setTimeout(() => {
      this.mobileNavigationContent.classList.add(CLASSES.SHOW);
    }, 350); 
  }

  /**
   * Close the mobile navigation
   */
  closeNavigation() {
    this.mobileNavigation.style.width = "0%";
    this.body.classList.remove(CLASSES.SCROLL_OFF);
    this.mobileNavigationContent.classList.remove(CLASSES.SHOW);
  }

  /**
   * Set the selected mobile navigation item to be active
   */
  setActiveNavigation(e) {
    this.mobileNavigationHeader.forEach(node => {
      node.classList.remove(CLASSES.ACTIVE);
    });
    e.target.classList.add(CLASSES.ACTIVE);
    // If contact or fable link go directly to page
    if (e.target.dataset.header === 'contact') {
      window.location = '/contact/';
    }
    if (e.target.dataset.header === 'a fable') {
      window.location = '/story/';
    } 
    this.mobileNavigationListItems.forEach(item => {
      if (e.target.dataset.header === item.dataset.listHeader) {
        item.classList.add(CLASSES.SHOW_NAV);
      }
      else {
        item.classList.remove(CLASSES.SHOW_NAV);
      }
    });
  }

  toggleSubnavigation(e) {
    this.subnavigationLinks.forEach(subNavEl => {
      if (subNavEl === e.nextElementSibling && !subNavEl.classList.contains(CLASSES.DISPLAY)) {
        subNavEl.classList.toggle(CLASSES.DISPLAY);
      } else {
        subNavEl.classList.remove(CLASSES.DISPLAY);
      }
    });
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
   * Toggle a section visibility.
   */
  toggleReadMoreSection(el) {
    if (!el.classList.contains(CLASSES.OPEN)) {
      el.classList.toggle(CLASSES.OPEN);
      el.style.height = 'auto';

      let height = el.clientHeight + "px";
      el.style.height = '0px';
      setTimeout(() => {
        el.style.height = height;
      }, 0);
    } else {
      el.style.height = '0px';
      el.addEventListener('transitionend', () => {
        el.classList.remove(CLASSES.OPEN);
      }, {
        once: true
      });
    } 
  };

  /**
   * Adds "show" class to navigation
   */
  displayNavigation() {
    this.navigation.classList.add(CLASSES.SHOW);
  }

  /**
   * Removes "show" class from navigation
   */

  hideNavigation() {
    this.navigation.classList.remove(CLASSES.SHOW);
  }

  /**
   * fade in content once the page has loaded
   */
  fadeInSection() {
    this.section.forEach((item) => {
      setTimeout(() => {
        item.classList.add(CLASSES.ANIMATE_UP);
      }, 500)
    });
  }

}

new Main();