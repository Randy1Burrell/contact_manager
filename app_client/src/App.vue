<template>
  <div id="app">
    <app-navbar v-bind="toggle"></app-navbar>

    <app-sidebar v-bind="toggle"></app-sidebar>

    <app-contacts v-bind="toggle"
                  v-bind:contacts="search(toggle.query)">
    </app-contacts>
  </div>
</template>

<script>

/**
 * Event bus
 */
import {sideNav} from './bus/navigation'

/**
 * Components
 */
import Contacts from './components/Contacts.vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

/**
 * Controller component for app clientcomponents
 */
export default {
  components: {
    'app-contacts' : Contacts,
    'app-sidebar'  : Sidebar,
    'app-navbar'   : Navbar
  },
  name: 'app',
  data () {
    return {
      contacts:  [],
      toggle: {
        help: false,
        openNav: false,
        newCon: false,
        settings: false,
        search: false,
        query: '',
      }
    }
  },
  methods: {
    search: function (query) {
      // Define query regular expression
      var regx = new RegExp(query, 'gi');
      // Name variable to hold firsname and last name of each contact
      var name = '';
      return this.contacts.filter(function (contact) {
        // Concatenate firstnam and last name
        name = contact.firstname + ' ' + contact.lastname;
        if (name.match(regx)) {
          return contact;
        }/* else if (this.searchEmail(contact.email, regx)) {
          return contact;
        }*/
      });
    },
    searchEmail: function (email, regx) {
      return email.filter(function (mailAddress) {
        if (mailAddress.match(regx)) {
          return mailAddress;
        }
      });
    },
  },
  created: function () {
    // Changes query
    sideNav.$on("queryChanged", (event) => {
      this.toggle.query = event;
    });

    // Toggle sidebar when event is received
    sideNav.$on("toggleSideNav", (event) => {
      this.toggle.openNav = !this.toggle.openNav;
    });

    // Toggle settings when event is received
    sideNav.$on("toggleSettings", (event) => {
      this.toggle.settings = !this.toggle.settings;
      if (!this.toggle.openNav) {
        this.toggle.openNav = !this.toggle.openNav;
      }
    });

    // Toggle help when event is received
    sideNav.$on("toggleHelp", (event) => {
      this.toggle.help = !this.toggle.help;
      if (!this.toggle.openNav) {
        this.toggle.openNav = !this.toggle.openNav;
      }
    });

    // Toggle new when event is received
    sideNav.$on("toggleNew", (event) => {
      this.toggle.newCon = !this.toggle.newCon;
    });

    // Toggle removes sidenav if it is showing
    sideNav.$on("toggleSearch", (event) => {
      this.toggle.search = !this.toggle.search;
      if (this.toggle.openNav) {
        this.toggle.openNav = this.toggle.openNav;
      }
    });

    // Get contacts from server
    this.$http.get('http://localhost:3000/api/contact/').then((data) => {
      this.contacts = data.body;
    });
  },
}
</script>

<style lang="scss">
/**
 * Make document and body 100%
 */
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
/**
 * Calculate padding, border and outline
 * in box-size
 */
* {
  box-sizing: border-box !important;
}
</style>
