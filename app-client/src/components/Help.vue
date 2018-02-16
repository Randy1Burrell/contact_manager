<template>
  <section>
    <h1>Help Menu</h1>
    <p>Click on:</p>
    <ul>
      <li>A contact to show its full details</li>
      <li>
        <i aria-hidden="true" class="fa fa-plus-circle"></i>
        -- to show menu to create new contact
      </li>
      <li>
        <i aria-hidden="true" class="fa fa-minus-circle"></i>
        -- to hide create new contact
      </li>
      <li>
        <i data-v-46725f86="" aria-hidden="true" class="fa fa-cog"></i>
        -- to show settings menu
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'HelpMenu',
  date () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * Style for the help component
 */
$green : #4caf50;

h1, p, ul li {
  color        : #fff;
  font-variant : all-petite-caps;
}

ul {
  padding-left   : 5px;

  li {
    list-style   : none;
  }

  li:before {
    content      : "\2713";
    color        : #4caf50;
    margin-right : 5px;
    font-size    : 25px;
  }

  li i {
    color        : $green;
  }
}
</style>
