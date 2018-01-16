<template>
  <!-- Add class depending on props value -->
  <div :class="{right: true, show: newCon, edit: view, row: true}">

    <!-- Display this div when viewing a contact -->
    <div class="submit" v-if="view">
      <ul>
        <li class="action" @click.prevent="close()">Close <i class="fa fa-angle-double-right"></i></li>
        <li class="action" @click.prevent="toggleEdit()" v-if="!edit">Edit <i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class="action" @click.prevent="save()" v-else>Save <i class="fa fa-floppy-o" aria-hidden="true"></i></li>
        <li class="action" @click.prevent="deleteContact()">Delete <i class="fa fa-trash" aria-hidden="true"></i></li>
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
                 type="text"
                 id="firstname"
                 placeholder="firstname"
                 v-model="contact.firstname">
        </div>
        <label class="sr-only" for="lastname">Lastname</label>
        <div class="col-6">
          <input class="form-control"
                 type="text"
                 id="lastname"
                 placeholder="lastname"
                 v-model="contact.lastname">
        </div>
      </div>

      <!-- Show email addresses of contact -->
      <a hrea="javascript:void(0)">
        <label>Email</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addEmail()"></i>
      </a>
      <div class="form-group row"
           v-for="(email, index) in contact.email">
        <label for="email" class="sr-only">Email</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.email)}"
             type="email"
             id="email"
             placeholder="Ex: diddy@diddy.com"
             v-model="contact.email[index]">

          <!-- Remove email address of contact-->
          <a href="javascript:void(0)"
             v-if="several(contact.email)"
             @click="remove(index, contact.email)">
            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- Show phone numbers of contact -->
      <a hrea="javascript:void(0)">
        <label>Telephone Number</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addPhoneNumber()"></i>
      </a>

      <!-- Loop through telephone and display them -->
      <div class="form-group row"
           v-for="(number, index) in contact.phoneNumber">

        <!-- Screen reader label for Telephone -->
        <label for="telephone" class="sr-only">Telephone</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.phoneNumber)}"
             type="tel"
             id="telephone"
             placeholder="Ex: 1-(192)-304-3049"
             v-model="contact.phoneNumber[index]">

          <!-- Remove phone number of contact-->
          <a href="javascript:void(0)"
             v-if="several(contact.phoneNumber)"
             @click="remove(index, contact.phoneNumber)">
            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- Show addresses of contact -->
      <a hrea="javascript:void(0)">
        <label>Address</label>
        <i class="fa fa-plus-circle"
           aria-hidden="true"
           @click.prevent="addAddress()"></i>
      </a>

      <!-- Loop through addresses of contact and display them -->
      <div class="form-group row"
           v-for="(address, index) in contact.address">

        <!-- Screen reader label for address -->
        <label for="address" class="sr-only">Address</label>
        <div class="col-12">
          <input :class="{'form-control': true, 'small-input': several(contact.address)}"
             type="text"
             id="address"
             placeholder="Address: 22 North St."
             v-model="contact.address[index]">

          <!-- Remove address of contact -->
          <a href="javascript:void(0)"
             v-if="several(contact.address)"
             @click="remove(index, contact.address)">
            <i class="center-i fa fa-trash" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- Show DOB of contact -->
      <label>Date Of Birth</label>
      <div class="form-group row">

        <!-- Screen reader label for DOB -->
        <label for="dob" class="sr-only">Date of Birth</label>
        <div class="col-12">
          <input class="form-control"
                 type="date"
                 id="dob"
                 placeholder="Date of Birth mm/dd/yyyy"
                 v-model="contact.dob">
        </div>
      </div>
    </form>

    <!-- Buttons used to create new contact -->
    <div class="submit" v-if="newCon">

      <!-- Save contact button -->
      <a id="save"
         class="action"
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
import {sideNav} from '../bus/navigation'

export default {
  nmae: 'DoContact',
  data () {
    return {
      email: this.severalEmail
    }
  },
  computed: {
  },
  methods: {
    several: function (array) {
      return (array.length > 1);
    },
    addAddress: function () {
      this.contact.address.push("");
    },
    addEmail: function () {
      this.contact.email.push("");
      console.log(this.severalEmail);
    },
    addPhoneNumber: function () {
      this.contact.phoneNumber.push("");
    },
    close: function () {
      sideNav.$emit("close", true);
    },
    createContact: function () {
      this.$http.post('http://localhost:3000/api/contact/', this.contact)
        .then((data) => {
          console.log(data);
        }, (data) => {
          console.log(data);
        });
    },
    toggleEdit: function () {
      sideNav.$emit("edit", true);
    },
    remove: function (index, array) {
      if (index > -1) {
        array.splice(index, 1);
      }
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
    },
    toggleNew: function () {
      sideNav.$emit("toggleNew", true);
    },
    toggleEdit: function () {
      sideNav.$emit("toggleEdit", true);
    },
    deleteContact: function () {

    }
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

#save {
  background-color : #09cfc0;
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
  position         : fixed;
  color            : $green;
  top              : 0px;
  right            : 0px;
  min-width        : 0px;
  max-width        : 0px;
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
