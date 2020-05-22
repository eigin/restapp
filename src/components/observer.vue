<template>
  <div class="observer" />
</template>
<script>
export default {
  data: () => ({
    observer: null
  }),
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.$emit("nextBlockLoad");
      }
    });
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  }
};
</script>
