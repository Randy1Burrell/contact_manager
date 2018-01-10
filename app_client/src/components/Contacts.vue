<template>
  <p> {{ contact.firstname }} {{ contact.lastname }}
  <a href="#" @click.prevent="view=!view">
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
  </a>
  <a href="">
    <i class="fa fa-pencil" aria-hidden="true"></i>
  </a>
  <a href="">
    <i class="fa fa-phone" aria-hidden="true"></i>
  </a>
  </p>
</template>

<script>
export default {
  name: 'Contacts',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      view: false
    }
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

