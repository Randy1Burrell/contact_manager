<template>
  <div id="app">
    <app-navbar></app-navbar>
    <app-side-bar></app-side-bar>
    <div class="col-md-4" v-for="contact in  contacts">
      <app-contacts :contact="contact"></app-contacts>
    </div>
    <a class="add-contact">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import Contacts from './components/Contacts.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    'app-contacts': Contacts,
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  name: 'app',
  data () {
    return {
      msg: "Contacts List",
      contacts: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/contact/').then((data) => {
      this.contacts = data.body;
    });
  }
}
</script>

<style lang="scss">
body {
  padding-top: 60px;
}
h1 {
  max-width: 200px;
  margin: auto;
  font-size: 10px;
}
.add-contact{
  border: 1px solid #09cfc0;
  padding: 12px 23px;
  color: #fff !important;
  font-weight: bolder;
  background-color: #09cfc0;
  position: absolute;
  bottom: 40px;
  right: 40px;
  line-height: 2;
}
#app {
  padding-top: 30px;
}
</style>
