<template>
  <div @click="viewContact" :class="{'cont-container': true, shift: openNav}">
    <div class="chip">
      <h1 v-bubbles>
        {{ contact.firstname | getLetter }}{{ contact.lastname | getLetter }}
      </h1>
      <ul>
        <li> {{ contact.firstname }} {{ contact.lastname }} </li>
        <li class="d-none d-sm-block"> {{ contact.email[0] }} </li>
        <li class="d-none d-lg-block"> {{ contact.phoneNumber[0] }} </li>
        <li class="d-none d-xl-block"> {{ contact.address[0] }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {sideNav} from '../bus/navigation'

export default {
  name: 'Contacts',
  data () {
    return {
    }
  },
  directives: {
    /**
     * This directive is used to give h1 elements
     * a bubble like effect.
     */
    bubbles: {
      bind (el, binding, vnode) {
        /**
         * Changing style of element
         */
        el.style.color = "#fff"
        el.style.borderRadius = "50%";
        el.style.float = "left";
        el.style.display = "inline-block";
        el.style.backgroundColor = "#" + Math.random().toString().slice(2,8);
        el.style.borderRadius = "50%";
        el.style.margin = "0px 10px 0px -25px";
        el.style.width = "50px";
        el.style.height = "50px";
        el.style.padding = "0px 4px 4px";
      }
    }
  },
  filters: {
    /**
     * Get the first letter of a string
     */
    getLetter(value) {
      return value.slice(0, 1).toUpperCase();
    }
  },
  methods: {
    /**
     * Emit signal to view contact.
     * This method has been used in other files,
     * and will be put in a mixing file.
     */
    viewContact: function() {
      sideNav.$emit("viewContact", this.contact);
    }
  },
  props: {
    /**
     * Used to tell when sidebar navigation has been
     * opened.
     */
    openNav: {
      type: Boolean
    },
    /**
     * Contact to be displayed
     */
    contact: {
      type: Object
    },
    /**
     * Add class to element if seach is true
     */
    search: {
      type: Boolean
    }
  },
  created: function () {
  }
}
</script>

<style lang="scss" scoped>
div {
  .chip {
    display          : block;
    margin           : 0px 15px;
    padding          : 0px 25px;
    height           : 50px;
    font-size        : 16px;
    line-height      : 50px;
    border-radius    : 30px 5px 5px 30px;
    background-color : #fff;
    min-width        : 60%;
    max-width        : 100%;
  }

  .chip:hover {
    background-color : #ddd;
    cursor           : pointer;
  }

  .chip ul {
    overflow-x       : hidden;
    padding-left: 0px;
    margin: 0px;
  }

  @media screen and (min-width: 592px) {
    .chip ul li {
      display          : inline-block !important;
      overflow-x       : hidden;
      min-width        : 180px;
      max-width        : 300px;
    }
  }
}

.cont-container {
  color: #777;
  margin : 0px 0px 3px 0px;
  font-size   : 14px;
  font-variant: all-petite-caps;
  transition         : all 0.5s linear !important;
  -webkit-transition : all 0.5s linear !important;
}

.shift {
  margin-left: 200px !important;
}

@media screen and (max-width: 991px) {
  .shift {
    margin-left : 0px !important;
  }
}
</style>

