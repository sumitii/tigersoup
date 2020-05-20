// NOTE: TO use Jquery, just call the modules you want
// var $ = require('jquery/src/core');
// require('jquery/src/core/init');
// require('jquery/src/manipulation');

// OR, use all of them
// var $ = require('jquery/src/jquery');

// And write your code
// $('body').append('<p>Jquery is working</p>');
//
// You can also "require" any script from its location in the node modules folder. Webpack often knows what to look for, but you can add a script directly like this:
// var javascriptthingy = require('name/folder/file.js');

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