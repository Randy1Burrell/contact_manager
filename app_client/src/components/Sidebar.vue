<template>
  <div id="mySidenav" :class="{sidenav: true, 'open-nav': openNav, 'close-nav': !openNav}">
    <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </a>
    <a href="#">
      <i class="fa fa-address-book" aria-hidden="true"></i> Contacts <span class="badge badge-success">30</span>
    </a>
    <a href="javascript:void(0)" @click="toggleNew()">
      <i aria-hidden="true" v-if="!newCon" class="fa fa-plus-circle"></i>
      <i aria-hidden="true" v-else class="fa fa-minus-circle"></i>
      New
    </a>
    <a href="javascript:void(0)" @click="toggleSettings()">
      <i data-v-46725f86="" aria-hidden="true" class="fa fa-cog"></i>
      Settings
    </a>
    <div v-if="settings" class="show">
      <h1>Settings</h1>
    </div>
    <a href="javascript:void(0)" @click="toggleHelp">
      <i data-v-46725f86="" aria-hidden="true" class="fa fa-question-circle"></i>
      Help
    </a>
    <div v-if="help" :class="{show: help}">
      <h1>Help</h1>
    </div>
  </div>
</template>

<script>
import {sideNav} from '../bus/navigation'

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  methods: {
    closeNav: () => {
      sideNav.$emit("toggleSideNav", true);
    },
    toggleHelp: () => {
      sideNav.$emit("toggleHelp", true);
    },
    toggleSettings: () => {
      sideNav.$emit("toggleSettings", true);
    },
    /**
     * Emits event to create new contact
     */
    toggleNew: function () {
      sideNav.$emit("toggleNew", true);
    },
  },
  props: {
    help: {
      type : Boolean
    },
    openNav: {
      type     : Boolean,
      required : true
    },
    newCon : {
      type : Boolean
    },
    settings : {
      type   : Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * The side navigation menu
 */
$green            : #4caf50;

.badge {
  border-radius : 50%;
}

/**
 * Class to show div
 */
.show {
  width : 100%;
}

.sidenav {
  height                     : 100%;
  position                   : fixed;
  margin-top                 : 52px;
  z-index                    : auto;
  width                      : 0; /* 0 width - change this with JavaScript */
  z-index                    : 0; /* Stay on top */
  top                        : 0; /* Stay at the top */
  left                       : 0;
  background-color           : #333;/* Black*/
  overflow-x                 : hidden; /* Disable horizontal scroll */
  transition                 : 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  -webkit-transition         : 0.5s;
  transition-timing-function : linear;
}

/* The navigation menu links */
.sidenav a {
  padding         : 8px 8px 8px 32px;
  text-decoration : none;
  font-size       : 20px;
  color           : $green;
  font-variant    : all-petite-caps;
  display         : block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  background-color : #ddd;
  color            : $green !important;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  font-size    : 36px;
  padding-left : 10px;
  color        : $green;
  font-weight  : bold;
  font-size    : 20px;
  cursor       : pointer;
  margin-left  : 50px;
  text-align   : right;
}

.sidenav .closebtn:hover {
  background-color : #333;
  color            : #fff !important;
}

/**
 * Show the navbar
 */
.open-nav {
  width : 211px;
}

/**
 * On smaller screens, where
 * height is less than
 * 450px, change the style
 * of the sidenav (less
 * padding and a smaller
 * font size)
 */
@media screen and (max-height: 450px) {
  .sidenav {padding-top : 15px;}
  .sidenav a {font-size : 18px;}
}
</style>
