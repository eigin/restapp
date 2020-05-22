<template>
  <div class="navbar">
    <div class="title">Пёсель</div>
    <div class="favourites" @click="favourites()">Избранные пёсели ❤</div>
  </div>
</template>
<script>
export default {
  name: "v-header",
  methods: {
    favourites() {
      this.$emit("favourites", true);
    }
  }
};
</script>
