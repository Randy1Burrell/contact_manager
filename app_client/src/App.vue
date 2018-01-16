<template>
  <div id="app">
    <!-- Navbar element -->
    <app-navbar v-bind="toggle"></app-navbar>

    <!-- Displays sidebar -->
    <app-sidebar v-bind="toggle"></app-sidebar>

    <!-- Displays contacts -->
    <div :class="{'container-fluid': true, shiftSearch: toggle.search}">
      <app-contacts v-bind="toggle"
                    v-for="contact in searchContact"
                    :key="contact._id"
                    v-bind:contact="contact">
      </app-contacts>
    </div>
    <!-- -->
    <do-contact v-bind="toggle" v-bind:contact="contact">
    </do-contact>
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
import DoContact from './components/DoContact.vue'

/**
 * Controller component for app clientcomponents
 */
export default {
  components: {
    'app-contacts' : Contacts,
    'do-contact'   : DoContact,
    'app-sidebar'  : Sidebar,
    'app-navbar'   : Navbar
  },
  name: 'app',
  data () {
    return {
      contacts   : [],
      toggle     : {
        help     : false,
        openNav  : false,
        newCon   : false,
        settings : false,
        search   : false,
        view     : false,
        edit     : false,
        query    : ''
      },
      contact    : {}
    }
  },
  computed: {
    searchContact: {
      get: function () {
        /**
         * This function will be used to filter
         * address, email and phone number.
         * obj should be an array and
         * searchType = 'email' | 'phone' | 'address'
         */
        var searchBy = (obj, searchType, regx) => {
          /**
           * return flase if an array was not passed in
           * as obj param
           */
          if (!Array.isArray(obj))
            return false;
          /**
           * Case statement selects what will be searched
           */
          switch (searchType.toLowerCase()) {
            case 'email':
              var addresses = obj.filter(function (mailAddress) {
                return (mailAddress.match(regx)) ? mailAddress : null;
              });
              return (addresses.length > 0);
              break;
            case 'phone':
              var number = obj.filter(function (phone) {
                return (phone.match(regx)) ? phone : null;
              });
              return (number.length > 0);
              break;
            case 'address':
              var addresses = obj.filter(function (address) {
                return (address.match(regx)) ? address : null;
              });
              return (addresses.length > 0);
              break;
          }
        };
        // Define query regular expression
        var regx = new RegExp(this.toggle.query, 'gi');
        // Name variable to hold firsname and last name of each contact
        var name = '';
        return this.contacts.filter(function (contact) {
          // Concatenate firstnam and last name for matching
          name = contact.firstname + ' ' + contact.lastname;
          /**
           * Search names,
           * then email,
           * then phone numbers,
           * then addresses
           */
          if (name.match(regx)) {
            return true;
          } else if (searchBy(contact.email, 'email', regx)) {
            return true;
          } else if (searchBy(contact.phoneNumber, 'phone', regx)) {
            return true;
          } else if (searchBy(contact.address, 'address', regx)) {
            return true;
          }
        });
      }
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
      this.toggle.view = false;
      this.contact = {
        firstname: '',
        lastname: '',
        dob: '',
        phoneNumber: [''],
        email: [''],
        address: ['']
      }
    });

    // Toggle removes sidenav if it is showing
    sideNav.$on("toggleSearch", (event) => {
      this.toggle.search = !this.toggle.search;
      if (this.toggle.openNav) {
        this.toggle.openNav = this.toggle.openNav;
      }
    });

    // view contact
    sideNav.$on("viewContact", (contact) => {
      this.toggle.newCon = false;
      this.toggle.view = true;
      this.contact = contact;
    });

    // edit contact
    sideNav.$on("toggleEdit", (event) => {
      this.toggle.edit = true;
    });

    // Save contact
    sideNav.$on("save", (event) => {
      this.toggle.edit = false;
    });

    // Save contact
    sideNav.$on("close", (event) => {
      this.toggle.view = false;
      this.toggle.newCon = false;
      this.toggle.edit = false;
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

.container-fluid {
  padding-top: 70px;
  transition         : all 0.5s linear !important;
  -webkit-transition : all 0.5s linear !important;
}

@media screen and (max-width: 991px) {
  .shiftSearch {
    padding-top: 110px !important;
  }
}
</style>
