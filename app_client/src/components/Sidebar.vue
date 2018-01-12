<template>
  <div id="mySidenav" :class="{sidenav: true, 'open-nav': !open, 'close-nav': open}">
    <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </a>
    <a href="#">
      <i class="fa fa-address-book" aria-hidden="true"></i> Contacts <span class="badge badge-success">30</span>
    </a>
    <a href="#"><i aria-hidden="true" class="fa fa-plus-circle"></i> New</a>
    <a href="#"><i data-v-46725f86="" aria-hidden="true" class="fa fa-cog"></i> Settings</a>
    <a href="#"><i data-v-46725f86="" aria-hidden="true" class="fa fa-question-circle"></i> Help</a>
  </div>
</template>

<script>
import {sideNav} from '../bus/navigation'

export default {
  name: 'Sidebar',
  data () {
    return {
      close: open,
    }
  },
  methods: {
    closeNav : () => {
      sideNav.$emit("toggleSideNav", !open);
    },
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  created() {
    sideNav.$on("openNav", (event) => {
    });
    sideNav.$on("closeNav", (event) => {
      this.close = event;
    });
  }
}

</script>

<style lang="scss" scoped>
/**
 * The side navigation menu
 */
$green            : #4caf50;

.badge {
  border-radius: 50%;
}

.sidenav {
  height           : 100%;
  position         : fixed;
  margin-top       : 52px;
  z-index          : auto;
  width            : 0; /* 0 width - change this with JavaScript */
  z-index          : 0; /* Stay on top */
  top              : 0; /* Stay at the top */
  left             : 0;
  background-color : #333;/* Black*/
  overflow-x       : hidden; /* Disable horizontal scroll */
  transition       : 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding         : 8px 8px 8px 32px;
  text-decoration : none;
  font-size       : 20px;
  color           : $green;
  font-variant    : all-petite-caps;
  display         : block;
  transition      : 0.3s;
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
 * Hides the navebar
 */
.close-nav {
  left: -300px;
}

/**
 * Show the navbar
 */
.open-nav {
  width : 211px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition : margin-left .5s;
  padding    : 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top : 15px;}
  .sidenav a {font-size : 18px;}
}
</style>
