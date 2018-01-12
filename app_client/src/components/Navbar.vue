<template>
  <div :class="{topnav: true, responsive: search}" id="myTopnav">
    <a href="javascript:void(0);" @click.prevent="toggleNav()" class="active">&#9776;</a>
    <a>Contact Manager</a>
    <a href="javascript:void(0);">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </span>
        <input type="text" class="form-control" placeholder="Search Contacts">
      </div>
    </a>
    <a href="javascript:void(0);" @click.prevent="toggleNew()">
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </a>
    <a href="javascript:void(0);" @click.prevent="toggleSettings()" class="helpers">
      <i class="fa fa-cog" aria-hidden="true"></i>
    </a>
    <a href="javascript:void(0);" @click.prevent="toggleHelp()" class="helpers">
      <i class="fa fa-question-circle" aria-hidden="true"></i>
    </a>
    <a href="javascript:void(0);" class="active icon" @click.prevent="search = !search">
      <i class="fa fa-search" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import {sideNav} from '../bus/navigation'

export default {
  name: 'navigation',
  data() {
    return {
      search: false
    };
  },
  methods: {
    /**
     * Toggle between adding and
     * removing the "responsive"
     * class to topnav when the user
     * clicks on the icon
     */
    toggleSearch : () => {
      this.search = !this.search;
    },
    /**
     * Emits event to sideNav bus to
     * toggle side navigation bar on
     * and off the screen
     */
    toggleNav : () => {
      sideNav.$emit("toggleSideNav", !open);
    },
    /**
     * Emits event to create new contact
     */
    toggleNew : () => {
      sideNav.$emit("toggleNew", !New);
      if (!open) {
        toggleNav();
      }
    },
    /**
     * Emits event to toggle settings on sidnav
     */
    toggleSettings : () => {
      sideNav.$emit("toggleSettings", !settings);
      if (!open) {
        toggleNav();
      }
    },
    /**
     * Emits event to toggle help on sidenav
     */
    toggleHelp : () => {
      sideNav.$emit("toggleHelp", !help);
      if (!open) {
        toggleNav();
      }
    },
  },
  props : {
    open : {
      type: Boolean
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
/**
 * Colors for search bar
 */
$green            : #4caf50;
$hover-background : #ddd;
$bg-color         : #333;

button {
  color            : $green;
  background-color : #fff;
  border           : 0px;
}

a .input-group input {
  padding-bottom : 3px;
  color          : $green;
  padding-top    : 3px;
  border         : 0px;
}

/**
 * Put help buttons on the right
 */
.helpers {
  float : right !important;
}

/**
 * Add a black background color to the top navigation
 */
.topnav {
  background-color : $bg-color;
  overflow         : hidden;
  position         : fixed !important;
  width            : 100%;
  z-index          : 1;
}

/**
 * Style the inputs inside tbhe navigation bar
 */
.topnav a, input[type="text"] {
  font-variant    : all-petite-caps;
}

/**
 * Style the links inside tbhe navigation bar
 */
.topnav a {
  color           : $green;
  display         : block;
  float           : left;
  font-size       : 17px;
  padding         : 14px 16px;
  text-align      : center;
  text-decoration : none;
}

/**
 * Change the color of links on hover
 */
.topnav a:hover {
  background-color : #ddd;
  color            : $green !important;
}

.topnav a:nth-child(3) {
  max-width      : 600px;
  min-width      : 500px;
  padding-bottom : 7px;
  padding-top    : 10px;
}

/**
 * Add an active class to highlight the
 * the hamburger menu
 */
.active {
  background-color : $green;
  color            : white !important;
}

/**
 * Hide the link that should open and close
 * the topnav on small screens
 */
.topnav .icon {
  display : none;
}

/**
 * When the screen is less than 600 pixels
 * wide, hide all links, except for the
 * first one ("Home"). Show the link that
 * contains should open and close the topnav
 * (.icon)
 */
@media screen and (max-width: 991px) {
  /**
   * Default setting for text box
   */
input[type="text"] {
  max-width : 991px !important;
  min-width : 250px !important;
}

/**
 * Remove input button on small scrrens
 */
.input-group-btn, .helpers{
  display : none !important;
}

/**
 * Remove all anchor tags except the first one
 */
.topnav a:not(:first-child) {
  display : none;
}

/**
 * Now show the second anchor tag
 */
.topnav a:nth-child(2) {
  display    : inline-block;
  min-width  : 229px;
  max-width  : 450px;
  text-align : center;
}

/**
 * Keep current background-color
 */
.topnav a:nth-child(2):hover{
  background-color : $bg-color;
}
/**
 * Give search bar hover background
 * and remove the padding-left;
 */
.topnav a:nth-child(3) {
  background-color : $hover-background;
  padding-left     : 2px;
  padding-right    : 2px;
  width            : 100%;
  min-width        : 320px;
  max-width        : 991px;
}
/**
 * Remove the fourth anchor
 */
.topnav a:nth-child(4) {
  display : none !important;
}
/**
 * Keep search icon to the right
 */
.topnav a.icon {
  float   : right;
  display : block;
}

/**
 * The "responsive" class is added
 * to the topnav with JavaScript when
 * the user clicks on the icon. This
 * class makes the topnav look good on
 * small screens (display the links
 * vertically instead of horizontally)
 */
.topnav.responsive {position: relative;}
.topnav.responsive a.icon {
  position : absolute;
  right    : 0;
  top      : 0;
}
.topnav.responsive a {
  display    : inline-block;
}
}
</style>
