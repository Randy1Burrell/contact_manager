<template>
  <section>
    <h1>Settings Menu</h1>
    <p>Change how this site operates below</p>
    <form>
      <div class="form-group">
        <label class="mr-sm-2" for="sideBarOpt">Preference</label>
        <select class = "custom-select mb-2 mr-sm-2 mb-sm-0"
                               id    = "sideBarOpt" @click.prevent="saveSettings()">
          <option value="0" selected>Start up option</option>
          <option value="1">Sidebar</option>
          <option value="2">No Sidebar</option>
        </select>
      </div>
      <div class="form-group">
        <label class = "custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0"
           @click    = "saveSettings()">

          <input id="remember" type="checkbox" class="custom-control-input">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Remember my preference</span>

        </label>
      </div>
    </form>
  </section>
</template>

<script>
import {sideNav} from '../bus/navigation'
export default {
  name: 'SettingsMenu',
  data () {
    return {
    }
  },
  methods: {
    saveSettings: function () {
      if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var remember = document.getElementById("remember");
        var sidebar = document.getElementById("sideBarOpt");

        /**
         * Store value in local/session storage based
         * based on used selection from menu
         */
        if (sidebar !== null) {
          sidebar = sidebar.options[sidebar.selectedIndex].value;
          if (remember.checked) {
            localStorage.setItem("sidebar", sidebar);
          } else {
            sessionStorage.setItem("sidebar", sidebar);
            localStorage.removeItem("sidebar");
          }
        } else if (!remember.checked) {
          if (localStorage.sidebar) {
            localStorage.removeItem("sidebar");
          }
        }
      } else {
        // Sorry! No Web Storage support..
        sideNav.$emit("showMessage", {
          body: {
            message: "Your settings could not be stored, because your browser does not have storage"
          }
        });
      }
    }
  },
  mounted: function () {
    var remember = document.getElementById("remember");
    var sidebar = document.getElementById("sideBarOpt");
    if (localStorage.sidebar) {
      remember.checked = true;
      sidebar.value = parseInt(localStorage.sidebar);

      if (parseInt(localStorage.sidebar) === 1) {
        sideNav.$emit("toggleSideNav", true);
      }
    } else if (sessionStorage.sidebar) {
      sidebar.value = sessionStorage.sidebar;
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * Style for the help component
 */
$green : #4caf50;

h1, p, form {
  color        : #fff;
  font-variant : all-petite-caps;
}

form {
  color: $green !important;
}

</style>
