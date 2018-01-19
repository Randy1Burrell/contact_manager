<template>
  <div id="app">
    <!-- Navbar element -->
    <app-navbar v-bind="toggle"></app-navbar>

    <!-- Displays sidebar -->
    <app-sidebar v-bind="toggle" v-bind:count="contacts.length"></app-sidebar>

    <!-- Displays contacts -->
    <div :class="{'container-fluid': true, shiftSearch: toggle.search}">
      <app-contacts v-bind      = "toggle"
                 v-for          = "(contact, contact_index) in searchContact"
                 :key           = "contact._id"
                 v-bind:contact = "contact"
                 v-bind:index   = "parseInt(contact_index)">
      </app-contacts>
    </div>

    <!-- Displays a single contact and all its details -->
    <do-contact v-bind="toggle" v-bind:contact="contact" v-bind:index="parseInt(index)">
    </do-contact>

    <!-- The actual snackbar -->
    <div id="snackbar">{{ message }}</div>
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
      contact    : {},
      index      : '',
      message    : ''
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
    countContacts: {
      get: function () {
        return this.contacts.length;
      }
    }
  },
  methods: {
    showMessage: function(timeOut) {
      // Get the snackbar DIV
      var snackbar = document.getElementById("snackbar")

      // Add the "show" class to DIV
      snackbar.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
      }, parseInt(timeOut));
    },
    getContacts: function () {
      this.$http.get('http://localhost:3000/api/contact/').then((data) => {
        this.contacts = data.body;
      },(data) => {
        this.message = data.body.message;
        this.showMessage(5000);
      })
    }
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
      this.toggle.view   = false;
      this.toggle.edit   = true;
      this.contact       = {
        firstname   : '',
        lastname    : '',
        dob         : '',
        phoneNumber : [''],
        email       : [''],
        address     : ['']
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
    sideNav.$on("viewContact", (event) => {
      this.toggle.newCon = false;
      this.toggle.view   = true;
      this.toggle.edit   = false;
      this.contact       = event.contact;
      this.index         = event.index;
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
      this.toggle.view   = false;
      this.toggle.newCon = false;
      this.toggle.edit   = false;
    });

    // Remove contact
    sideNav.$on("removeContact", (event) => {
      var contact    = event.contact;
      this.message   = contact.firstname + ' ' + contact.lastname;
      this.message  += ' has been deleted from contact list';
      this.contacts.splice(event.index, 1);
      this.showMessage(3000);
      sideNav.$emit("close", true);
    });

    sideNav.$on("showMessage", (event) => {
      this.message = event.body.message;
      this.showMessage(5000);
    });
    // Get contacts from server
    this.getContacts();

    // Update page every 15 seconds
    setInterval(this.getContacts(), 15000);
  },
}
</script>

<style lang="scss">
/**
 * Make document and body 100%
 */
.body, html {
  height : 100%;
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
  box-sizing : border-box !important;
}

.container-fluid {
  padding-top        : 70px;
  transition         : all 0.5s linear !important;
  -webkit-transition : all 0.5s linear !important;
}

@media screen and (max-width: 991px) {
  .shiftSearch {
    padding-top : 110px !important;
  }
}

/**
 * The snackbar - position it at
 * the bottom and in the middle
 * of the screen
 */
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
}

/**
 * Show the snackbar when clicking
 * on a button (class added with JavaScript)
 */
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/**
 * Animations to fade the snackbar
 * in and out
 */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>
