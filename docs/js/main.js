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
}

/**
* JS classes
* @enum {string}
*/
const CLASSES = {
  SHOW: '-show',
}

/**
* Controller for site (main).
*/
class Main {
  constructor() {
    this.navigation = document.querySelector(SELECTORS.NAVIGATION);
    this.navigationLinks = [...document.querySelectorAll(SELECTORS.NAVIGATION_LINKS)];

    this.handleScrollDown = this.handleScrollDown.bind(this);

    this.init();
  }

  init() {
    console.log(this.navigationLinks);
  }
  
  handleScrollDown() {
    console.log('farts');
  }

}

new Main();