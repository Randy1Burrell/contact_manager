<template>
  <!-- Add class depending on props value -->
  <div :class="{right: true, show: newCon, edit: view, row: true}">

    <!-- Display this div when viewing a contact -->
    <div class="submit">

      <ul>
        <li @click="close()">
          <i class="fa fa-times" aria-hidden="true"></i>
        </li>
        <li v-show="newCon" class="action">
          New Contact &nbsp; &nbsp;
          <i class="fa fa-address-card" aria-hidden="true"></i>
        </li>
        <li v-if="view" class="action delete" @click="deleteContact()">
          Delete Contact
          <i class="fa fa-trash" aria-hidden="true"></i>
        </li>
      </ul>

    </div>

    <!-- This form shows the contact -->
    <form>
      <!-- Show name of contact -->
      <label>Name</label>

      <div class="form-group row">

        <label class="sr-only" for="firstname">Firstname</label>
        <div class="col-6">

          <input class       = "form-control"
             :disabled   = "!edit"
             id          = "firstname"
             @keyup      = "validateName()"
             placeholder = "firstname"
             type        = "text"
             v-model     = "contact.firstname"
             required>

        </div>

        <label class="sr-only" for="lastname">Lastname</label>
        <div class="col-6">

          <input class       = "form-control"
             :disabled   = "!edit"
             id          = "lastname"
             @keyup      = "validateName()"
             placeholder = "lastname"
             type        = "text"
             v-model     = "contact.lastname"
             required>

        </div>
      </div><!-- End contact name -->

      <!-- Show email addresses of contact -->
      <a href="javascript:void(0)">
        <label>Email</label>

        <i class        = "fa fa-plus-circle"
         aria-hidden    = "true"
         @click.prevent = "addEmail()"
         v-show         = "edit"></i>

      </a>

      <div class = "form-group row"
         v-for   = "(email, index) in contact.email">

        <label for="email" class="sr-only">Email</label>

        <div class="col-12">

          <input :class  = "{'form-control': true, 'small-input': several(contact.email)}"
             :disabled   = "!edit"
             id          = "email"
             v-on:keyup  = "validateEmail"
             placeholder = "Ex: diddy@diddy.com"
             type        = "email"
             v-model     = "contact.email[index]"
             required>

          <!-- Remove email address of contact-->
          <a href   = "javascript:void(0)"
             v-show = "several(contact.email)"
             @click = "remove(index, contact.email)">

            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>

        </div>
      </div><!-- End email address -->

      <!-- Show phone numbers of contact -->
      <a href="javascript:void(0)">
        <label>Telephone Number</label>

        <i class        = "fa fa-plus-circle"
         aria-hidden    = "true"
         @click.prevent = "addPhoneNumber()"
         v-show         = "edit"></i>

      </a>

      <!-- Loop through telephone and display them -->
      <div class = "form-group row"
         v-for = "(number, index) in contact.phoneNumber">

        <!-- Screen reader label for Telephone -->
        <label for="telephone" class="sr-only">Telephone</label>
        <div class="col-12">

          <input :class  = "{'form-control': true, 'small-input': several(contact.phoneNumber)}"
             :disabled   = "!edit"
             type        = "tel"
             id          = "telephone"
             @keyup      = "validatePhoneNumber"
             placeholder = "Ex: 1-(192)-304-3049"
             v-model     = "contact.phoneNumber[index]"
             required>

          <!-- Remove phone number of contact-->
          <a href   = "javascript:void(0)"
             v-show = "several(contact.phoneNumber)"
             @click = "remove(index, contact.phoneNumber)">

            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div><!-- End phone number -->

      <!-- Show addresses of contact -->
      <a href="javascript:void(0)">
        <label>Address</label>

        <i class          = "fa fa-plus-circle"
         aria-hidden    = "true"
         @click.prevent = "addAddress()"
         v-show         = "edit"></i>
      </a>

      <!-- Loop through addresses of contact and display them -->
      <div class = "form-group row"
         v-for = "(address, index) in contact.address">

        <!-- Screen reader label for address -->
        <label for="address" class="sr-only">Address</label>
        <div class="col-12">

          <input :class  = "{'form-control': true, 'small-input': several(contact.address)}"
             :disabled   = "!edit"
             id          = "address"
             placeholder = "Address: 22 North St."
             type        = "text"
             v-model     = "contact.address[index]"
             required>

          <!-- Remove address of contact -->
          <a href   = "javascript:void(0)"
             v-show = "several(contact.address)"
             @click = "remove(index, contact.address)">

            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div><!-- End addresses -->

      <!-- Show DOB of contact -->
      <label>Date Of Birth</label>

      <div class="form-group row">

        <!-- Screen reader label for DOB -->
        <label for="dob" class="sr-only">Date of Birth</label>

        <div class="col-12">

          <datepicker input-class      = "form-control"
             id               = "dob"
             placeholder      = "DD/MM/YYYY"
             v-model          = "contact.dob"
             :disabled-picker = "!edit">
          </datepicker>

        </div>
      </div>
    </form><!-- End contact form -->

    <!-- Submit section -->
    <div class="submit" v-show="view || newCon">

      <a href           = "javascript:void(0)"
                        class          = "action"
                        @click.prevent = "toggleEdit()"
                        v-show         = "!edit && view">
        Edit
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </a>

      <!-- Save edits Button -->
      <a href           = "javascript:void(0)"
                                class          = "action save"
                                @click.prevent = "save()"
                                v-show         = "edit && view && submit">
        Save
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
      </a>

      <!-- Save new contact button -->
      <a v-show         = "newCon && submit"
                                  class          = "action save"
                                  href           = "javascript:void(0)"
                                  @click.prevent = "createContact()">
        Save
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
      </a>

      <!-- Cancel the whole operation -->
      <a id             = "cancel"
                                  class          = "action"
                                  href           = "javascript:void(0)"
                                  @click.prevent = "close()">
        Cancel
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>

    </div> <!-- End submit section -->
  </div> <!-- End whole block -->
</template> <!-- End template -->


<script>
/**
 * Import vuejs-datepicker to use in form
 */
import Datepicker from 'vuejs-datepicker'
/**
 * Get event bus here
 */
import {sideNav} from '../bus/navigation'

export default {
  nmae: 'DoContact',
  components: {
    Datepicker
  },
  data () {
    return {
      submitEmail : false,
      submitName  : false,
      phoneNumber : false
    }
  },
  computed: {
    /**
     * This computed property will manage
     * when save button will be displayed
     */
    submit: {
      /**
       * Getter returns true if all required fields
       * have been filled out
       */
      get: function () {
        /**
         * Call functions that will parse values
         * from emails fields, name fields and
         * phone number fields and set booleans
         * accordingly.
         */
        this.validateName();
        this.validateEmail();
        this.validatePhoneNumber();
        /**
         * Returning the combined bool of values
         * that has been set above
         */
        return this.submitEmail && this.submitName && this.phoneNumber;
      }
    }
  },
  methods: {
    /**
     * This method adds a contact address
     * to the address array and renders
     * a new address field on the form
     */
    addAddress: function () {
      this.contact.address.push("");
    },
    /**
     * This method adds a contact email
     * to the email array and renders
     * a new email address field on the form
     */
    addEmail: function () {
      this.contact.email.push("");
    },
    /**
     * This method adds a contact phone number
     * to the phone number array and renders
     * a new phone number field on the form
     */
    addPhoneNumber: function () {
      this.contact.phoneNumber.push("");
    },
    /**
     * This method emits signal to close
     * view contact component
     */
    close: function () {
      sideNav.$emit("close", true);
      this.reset();
    },
    /**
     * This method submits post request to api to
     * create a new contact
     */
    createContact: function () {
      this.$http.post('http://localhost:3000/api/contact/', this.contact)
        .then((data) => {
          sideNav.$emit("showMessage", {
            body: {
              message: "Contact " + this.contact.firstname + " "
              + this.contact.lastname +
              " has been created!!."
            }
          });
        }, (data) => {
          sideNav.$emit("showMessage", data);
        });
    },
    /**
     * This method is used to delete a contact
     */
    deleteContact: function () {
      this.$http.delete('http://localhost:3000/api/contact/' + this.contact._id)
        .then((data) => {
          sideNav.$emit('removeContact', {
            contact: this.contact,
            index: this.index
          });
        }, (data) => {
          sideNav.$emit('showMessage', data);
        });
    },
    /**
     * This method remove an element form an array
     * It is used to remove alements from contacts
     * {phoneNumber, email and address}, then vue
     * re-renders the form to show the what the
     * contact currently looks like
     */
    remove: function (index, array) {
      if (index > -1) {
        array.splice(index, 1);
      }
    },
    /**
     * Used to reset the daa variable to default
     */
    reset: function () {
      this.phoneNumber = false;
      this.submitEmail = false;
      this.submitName = false;
    },
    /**
     * Used to save an already existing contact
     * to the api
     */
    save: function () {
      this.$http.put('http://localhost:3000/api/contact/' + this.contact._id, this.contact)
        .then((data) => {
          var contact = this.contact;
          sideNav.$emit("showMessage", {
            body: {
              message: "Contact " + contact.firstname + " " + contact.lastname + " has been updated"
            }
          });
        }, (data) => {
          sideNav.$emit('showMessage', data);
        });
      sideNav.$emit("save", true);
    },
    /**
     * Used to check if the length of an array is
     * greater than zero and edit property that was
     * to this component is also set to true.
     * I used this method to determine is I should
     * allow the delete button beside contacts email,
     * phone number and address fields. If only one
     * email, address or phone number field remain
     * then the button disappears.
     */
    several: function (array) {
      return (array.length > 1) && this.edit;
    },
    /**
     * Emits signal to change edit property
     */
    toggleEdit: function () {
      sideNav.$emit("toggleEdit", true);
    },
    /**
     * Emits signal to change newCon property
     */
    toggleNew: function () {
      sideNav.$emit("toggleNew", true);
    },
    /**
     * Checking if all inputs are valid
     */
    validateEmail: function () {
      var good = true;
      this.contact.email.forEach(function(email_address) {
        if (!(/[\w.+-]+@[\w.+-]+\.[a-zA-Z0-9]{2,4}(,\s*)*/ig.test(email_address))) {
          good = false;
        }
      });
      this.submitEmail = good;
    },
    validateName: function () {
      if (this.contact.firstname.length > 0 || this.contact.lastname.length > 0) {
        this.submitName = true;
      } else {
        this.submitName = false;
      }
    },
    validatePhoneNumber: function () {
      var good = true;
      this.contact.phoneNumber.forEach(function(number) {
        number = number.replace(/[^\d]/g, '');
        if ((number.length < 6 || number.length > 12)) {
          good = false;
        }
      });
      this.phoneNumber = good;
    },
  },
  props: {
    /**
     * Contact object that is used to display contacts
     */
    contact: {
      type: Object,
      required: true
    },
    /**
     * view is a boolean used to determine when to show
     * contact details
     */
    view: {
      type: Boolean
    },
    /**
     * Edit boolean tells this component to disable or enable
     * fields
     */
    edit: {
      type: Boolean
    },
    /**
     * newCon boolean tells the component which save button to display
     */
    newCon: {
      type: Boolean
    },
    /**
     * Stores the position oft the contact in the array
     */
    index: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * Theme colors
 */
$green : #4caf50;

form {
  width     : 90%;;
  margin    : auto;

  a {
    width   : 90%;

    i {
      float : right;
    }

    label {
      color: $green;
    }
  }
}

.save {
  background-color : #09cfc0 !important;
}

#cancel {
  background-color : red;
}

.action {
  margin           : 10px;
  padding          : 10px 50px;
  border-radius    : 8px;
  color            : #fff;
  background-color : $green;
  text-align       : center;
}

.action:hover {
  text-decoration  : none;
  background-color : #ddd !important;
  border           : 1px solid $green;
  color            : $green;
  cursor           : pointer;
}

.right {
  box-shadow       : -1px 0px 10px #ddd, 1px 0px 10px #ddd;
  position         : fixed;
  color            : $green;
  top              : 0px;
  right            : 0px;
  min-width        : 0px;
  max-width        : 0%;
  transition       : all 0.5s linear;
  background-color : #fff;
  height           : 100%;
  font-variant     : all-petite-caps;
  color            : $green;
  overflow-y       : scroll;

  .small-input {
    width          : 93%;
    display        : inline;
  }


  input {
    font-variant   : all-petite-caps;
    color          : $green;
  }
}

.center-i {
  padding-top : 10px !important;
}

.delete {
  background-color   : red !important;
  float              : right;
  opacity            : 1;
  transition         : all 0.5s linear;
  -webkit-transition : all 0.5s linear;
}

.delete:hover {
  background-color : red !important;
  opacity          : 0.5;
  color            : #fff;
}

.show , .edit {
  min-width : 320px;
  max-width : 100%;
  padding   : 100px 30px;
}

.submit {
  text-align        : center;
  width             : 100%;
  height            : 80px;

  ul {
    margin-bottom   : 0px;
    padding         : 0px;

    li {
      display       : inline-block;
      cursor        : pointer;
    }

    li:first-child {
      float         : left;
      padding       : 10px 15px;
      margin-left   : 15px;
      border        : 1px solid $green;
      border-radius : 50%;
    }
  }
}

@media screen and (max-width: 991px) {
  .right {
    padding   : 100px 0px;
    left      : 8px;
  }

  .action {
    padding   : 5px 10px;
    font-size : 14px;
  }

}
</style>
