<template>
  <div id="app">
    <div class="container">
      <v-header is="Header" @favourites="openFavourites()" />
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
@import "assets/scss/style";
</style>
<script>
export default {
  name: "App",
  components: {
    Header: () => import("./views/template/header")
  },
  methods: {
    openFavourites() {
      this.$router.push("/favourites");
    }
  }
};
</script>
