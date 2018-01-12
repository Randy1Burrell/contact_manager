<template>
  <div id="app">
    <app-navbar v-on:open="open"></app-navbar>

    <app-sidebar v-bind:open="open"
      v-bind:help="help"
      v-bind:settings="settings">
    </app-sidebar>

    <app-contacts></app-contacts>
  </div>
</template>

<script>

import {sideNav} from './bus/navigation'
import Contacts from './components/Contacts.vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    'app-contacts' : Contacts,
    'app-sidebar'  : Sidebar,
    'app-navbar'   : Navbar
  },
  name: 'app',
  data () {
    return {
      msg:       "Contacts List",
      contacts:  [],
      help: false,
      open: false,
      newCon: false,
      settings: false
    }
  },
  methods: {
  },
  created() {
    this.$http.get('http://localhost:3000/api/contact/').then((data) => {
      this.contacts = data.body;
    });
    // Toggle sidebar when event is received
    sideNav.$on("toggleSideNav", (event) => {
      this.open = !this.open;
    });
    // Toggle settings when event is received
    sideNav.$on("toggleSettings", (event) => {
      this.settings = !this.settings;
    });
    // Toggle help when event is received
    sideNav.$on("toggleHelp", (event) => {
      this.help = !this.help;
    });
    // Toggle new when event is received
    sideNav.$on("toggleNew", (event) => {
      this.newCon = !this.newCon;
    });
  }
}
</script>

<style lang="scss">
.body, html {
  height: 100%;
}

/**
 * Remove outline and box-shadow
 * from all elements on focus.
 */
*:focus {
  outline            : none !important;
  -webkit-appearance : none !important;
  box-shadow         : 0px 0px !important;
}

* {
  box-sizing: border-box !important;
}
</style>
