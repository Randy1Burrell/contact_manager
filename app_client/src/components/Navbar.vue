<template>
  <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">Contact Manager</b-navbar-brand>

      <b-collapse id="nav_collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input
              size="lg"
              class="mr-sm-2"
              type="text"
              placeholder="Search"/>
          </b-nav-form>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
</template>

<script>
export default {
  name: 'navigation'
}
</script>
<style lang="scss" scoped>
.bg-info {
  background-color: #ef3f42 !important;
}
.navbar-brand {
  color: #fff;
  font-variant: small-caps;
}
</style>
