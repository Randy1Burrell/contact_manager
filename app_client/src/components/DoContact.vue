<template>
  <!-- Add class depending on props value -->
  <div :class="{right: true, show: newCon, edit: view, row: true}">

    <!-- Display this div when viewing a contact -->
    <div class="submit">
      <ul>
        <li @click="close()">
          <i class="fa fa-times" aria-hidden="true"></i>
        </li>
        <li v-if="newCon" class="action">New Contact</li>
        <li v-if="view" class="action delete" @click="deleteContact()">Delete Contact <i class="fa fa-trash" aria-hidden="true"></i></li>
      </ul>
    </div>

    <!-- This form shows the contact -->
    <form>
      <!-- Show name of contact -->
      <label>Name</label>
      <div class="form-group row">
        <label class="sr-only" for="firstname">Firstname</label>
        <div class="col-6">
          <input class="form-control"
                 :disabled="!edit"
                 id="firstname"
                 @keyup="validateName()"
                 placeholder="firstname"
                 type="text"
                 v-model="contact.firstname"
                 required>
        </div>
        <label class="sr-only" for="lastname">Lastname</label>
        <div class="col-6">
          <input class="form-control"
                 :disabled="!edit"
                 id="lastname"
                 @keyup="validateName()"
                 placeholder="lastname"
                 type="text"
                 v-model="contact.lastname"
                 required>
        </div>
      </div><!-- End contact name -->

      <!-- Show email addresses of contact -->
      <a hrea="javascript:void(0)">
        <label>Email</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addEmail()"
           v-if="edit"></i>
      </a>
      <div class="form-group row"
           v-for="(email, index) in contact.email">
        <label for="email" class="sr-only">Email</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.email)}"
             :disabled="!edit"
             id="email"
             v-on:keyup="validateEmail"
             placeholder="Ex: diddy@diddy.com"
             type="email"
             v-model="contact.email[index]"
             required>

          <!-- Remove email address of contact-->
          <a href="javascript:void(0)"
             v-if="several(contact.email)"
             @click="remove(index, contact.email)">
            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div><!-- End email address -->

      <!-- Show phone numbers of contact -->
      <a hrea="javascript:void(0)">
        <label>Telephone Number</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addPhoneNumber()"
           v-if="edit"></i>
      </a>

      <!-- Loop through telephone and display them -->
      <div class="form-group row"
           v-for="(number, index) in contact.phoneNumber">

        <!-- Screen reader label for Telephone -->
        <label for="telephone" class="sr-only">Telephone</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.phoneNumber)}"
             :disabled="!edit"
             type="tel"
             id="telephone"
             @keyup="validatePhoneNumber"
             placeholder="Ex: 1-(192)-304-3049"
             v-model="contact.phoneNumber[index]"
             required>

          <!-- Remove phone number of contact-->
          <a href="javascript:void(0)"
             v-if="several(contact.phoneNumber)"
             @click="remove(index, contact.phoneNumber)">
            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div><!-- End phone number -->

      <!-- Show addresses of contact -->
      <a hrea="javascript:void(0)">
        <label>Address</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addAddress()"
           v-if="edit"></i>
      </a>

      <!-- Loop through addresses of contact and display them -->
      <div class="form-group row"
           v-for="(address, index) in contact.address">

        <!-- Screen reader label for address -->
        <label for="address" class="sr-only">Address</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.address)}"
             :disabled="!edit"
             id="address"
             placeholder="Address: 22 North St."
             type="text"
             v-model="contact.address[index]"
             required>

          <!-- Remove address of contact -->
          <a href="javascript:void(0)"
             v-if="several(contact.address)"
             @click="remove(index, contact.address)">
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
          <datepicker input-class="form-control"
                      id="dob"
                      placeholder="DD/MM/YYYY"
                      v-model="contact.dob"
                      :disabled-picker="!edit">
          </datepicker>
        </div>
      </div>
    </form><!-- End contact form -->

    <!-- Submit section -->
    <div class="submit" v-if="view || newCon">
      <a href="javascript:void(0)"
         class="action"
         @click.prevent="toggleEdit()"
         v-if="!edit && view">
        Edit <i class="fa fa-pencil" aria-hidden="true"></i>
      </a>

      <!-- Save edits Button -->
      <a href="javascript:void(0)"
         class="action save"
         @click.prevent="save()"
         v-else-if="edit && view && submit">
        Save <i class="fa fa-floppy-o" aria-hidden="true"></i>
      </a>

      <!-- Save new contact button -->
      <a v-if="newCon && submit"
         class="action save"
         href="javascript:void(0)"
         @click.prevent="createContact()">
        Save
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
      </a>

      <!-- Cancel the whole operation -->
      <a id="cancel"
         class="action"
         href="javascript:void(0)"
         @click.prevent="close()">
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
      submitEmail: false,
      submitName: false,
      phoneNumber: false
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
    addAddress: function () {
      this.contact.address.push("");
    },
    addEmail: function () {
      this.contact.email.push("");
    },
    addPhoneNumber: function () {
      this.contact.phoneNumber.push("");
    },
    close: function () {
      sideNav.$emit("close", true);
      this.reset();
    },
    createContact: function () {
      this.$http.post('http://localhost:3000/api/contact/', this.contact)
        .then((data) => {
          console.log(data);
        }, (data) => {
          console.log(data);
        });
      this.submit = true;
    },
    deleteContact: function () {

    },
    remove: function (index, array) {
      if (index > -1) {
        array.splice(index, 1);
      }
    },
    reset: function () {
      this.phoneNumber = false;
      this.submitEmail = false;
      this.submitName = false;
    },
    save: function () {
      console.log(this.contact);
      this.$http.put('http://localhost:3000/api/contact/' + this.contact._id, this.contact)
        .then((data) => {
          console.log(data);
        }, (data) => {
          console.log(data);
        });
      sideNav.$emit("save", true);
      this.submit = true;
    },
    several: function (array) {
      return (array.length > 1) && this.edit;
    },
    toggleEdit: function () {
      sideNav.$emit("toggleEdit", true);
    },
    toggleNew: function () {
      sideNav.$emit("toggleNew", true);
    },
    validateEmail: function () {
      var good = true;
      this.contact.email.forEach(function(email_address) {
        if (!(/[\w.+-]+@[\w.+-]+\.[a-zA-Z0-9]{2,4}(,\s*)*/ig.test(email_address))) {
          good = false;
        }
      });
      this.submitEmail = good;
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
    validateName: function () {
      if (this.contact.firstname.length > 0 || this.contact.lastname.length > 0) {
        this.submitName = true;
      } else {
        this.submitName = false;
      }
    },
  },
  props: {
    contact: {
      type: Object,
      required: true
    },
    view: {
      type: Boolean
    },
    edit: {
      type: Boolean
    },
    newCon: {
      type: Boolean
    }
  },
  created: function () {
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
  box-shadow: -1px 0px 10px #ddd, 1px 0px 10px #ddd;
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
    width   : 93%;
    display : inline;
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
  background-color: red !important;
  float: right;
  opacity: 1;
  transition: all 0.5s linear;
  -webkit-transition: all 0.5s linear;
}

.delete:hover {
  background-color: red !important;
  opacity: 0.5;
  color: #fff;
}

.show , .edit {
  min-width : 320px;
  max-width : 100%;
  padding   : 100px 30px;
}

.submit {
  text-align      : center;
  width           : 100%;
  height          : 80px;

  ul {
    margin-bottom : 0px;
    padding       : 0px;

    li {
      display     : inline-block;
      cursor: pointer;
    }

    li:first-child {
      float: left;
      padding: 10px 15px;
      margin-left: 15px;
      border: 1px solid $green;
      border-radius: 50%;
    }
  }
}

@media screen and (max-width: 991px) {
  .right {
    padding : 100px 0px;
    left    : 8px;
  }

  .action {
    padding   : 5px 10px;
    font-size : 14px;
  }

}
</style>
