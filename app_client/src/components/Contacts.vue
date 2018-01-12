<template>
  <div>
  <div class="chip" v-for="i in 3000">
    <img src="https://www.randyburrell.info/wp-content/uploads/2017/05/Randy_Burrell_Graduation_Picture.jpg" alt="Person" width="96" height="96">
    John Doe
    <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
  </div>
  </div>
</template>

<script>
import {sideNav} from '../bus/navigation'

export default {
  name: 'Contacts',
  props: {
    contact: {
      type: Object,
      //required: true
    }
  },
  data () {
    return {
      view: false
    }
  },
  created () {
    sideNav.$on("openNav", (event) => {
      this.small = event;
    });
  }
}
</script>

<style lang="scss" scoped>
a {
  float: right;
  font-size: 13px;
  padding: 3px 11px;
  color: #09cfc0;
  margin-left:4px
}
.container{
  font-size: 14px;
}
</style>

