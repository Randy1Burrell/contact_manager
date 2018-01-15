<template>
  <div @click="viewContact" :class="{'container-fluid': true, shift: openNav, shiftSearch: search}">
    <div class="chip">
      <img src="https://www.randyburrell.info/wp-content/uploads/2017/05/Randy_Burrell_Graduation_Picture.jpg" alt="Person" width="96" height="96">
      <ul>
        <li> {{ contact.firstname }} {{ contact.lastname }} </li>
        <li> {{ contact.email[0] }} </li>
        <li> {{ contact.phoneNumber[0] }} </li>
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
  methods: {
    viewContact: function() {
      sideNav.$emit("viewContact", this.contact);
    }
  },
  props: {
    openNav: {
      type: Boolean
    },
    contact: {
      type: Object
    },
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
    margin           : 5px 15px;
    padding          : 0px 25px;
    height           : 50px;
    font-size        : 14px;
    line-height      : 50px;
    border-radius    : 5px;
    background-color : #fff;
    min-width        : 60%;
    max-width        : 100%;
  }

  .chip img {
    float            : left;
    margin           : 0 10px 0 -25px;
    height           : 50px;
    width            : 50px;
    border-radius    : 50px;
    background-color : red;
  }

  .chip:hover {
    background-color : #ddd;
    cursor           : pointer;
  }

  .chip ul {
    overflow-x : hidden;
  }
  .chip ul li {
    display    : inline-block;
    overflow-x : hidden;
    width      : 300px;
  }
}

.container-fluid {
  margin-left : 0px;
  font-size   : 14px;
  transition         : all 0.5s linear !important;
  -webkit-transition : all 0.5s linear !important;
}
.container-fluid:first-child {
  padding-top : 70px !important;
}

.shift {
  margin-left: 200px !important;
}

@media screen and (max-width: 991px) {
  .shift {
    margin-left : 0px !important;
  }
  .shiftSearch {
    padding-top: 100px !important;
  }
}
</style>

