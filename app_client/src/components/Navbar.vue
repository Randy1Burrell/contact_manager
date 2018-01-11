<template>
  <div class="topnav" id="myTopnav">
    <a href="#home" class="active">&#9776;</a>
    <a>Contact Manager</a>
    <a class="">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </span>
        <input type="text" class="form-control" placeholder="Search Contacts">
      </div>
    </a>
    <a href="javascript:void(0);" class="active icon" @click="openSearch()">
      <i class="fa fa-search" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
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
    openSearch : () => {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * Style for search bar
 */
$green : #4caf50;

button {
  color: $green;
  background-color: #fff;
  border: 0px;
}

a .input-group input {
  padding-bottom: 3px;
  color: #4caf50;
  padding-top: 3px;
  border: 0px;
}

*:focus {
  outline: none !important;
  -webkit-appearance:none;
  box-shadow: 0px 0px;
}

/**
 * Add a black background color to the top navigation
 */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/**
 * Style the links inside tbhe navigation bar
 */
.topnav a, input[type="text"] {
  font-variant    : all-petite-caps;
}
.topnav a {
  color           : #f2f2f2;
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
  color            : $green;
}

.topnav a:nth-child(3) {
  max-width      : 600px;
  min-width      : 500px;
  padding-bottom : 7px;
  padding-top    : 10px;
}

.topnav p {
  width : 20%;
}

/**
 * Add an active class to highlight the
 * the hamburger menu
 */
.active {
  background-color : #4CAF50;
  color            : white;
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
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display : none;
  }
  .topnav a:nth-child(2) {
    display    : inline-block;
    min-width  : 220px;
    max-width  : 350px;
    text-align : center;
  }
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
  float      : none;
  display    : block;
  text-align : left;
}
}
</style>
