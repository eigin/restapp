<template>
  <div class="content">
    <div is="vSelect" @select="optionSelect"></div>
    <div is="vImgLazy" :arrImgs="photos"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "dogs",
  data() {
    return {
      option: "",
      selected: ""
    };
  },
  components: {
    vImgLazy: () => import("@/components/imglazy"),
    vSelect: () => import("@/components/select")
  },
  methods: {
    ...mapActions(["ALL_BREEDS_RANDOM_PHOTOS", "GET_LIST_ALL_BREEDS"]),
    optionSelect(option) {
      this.selected = option;
      this.$router.push({ path: `/${option}` });
    }
  },
  computed: {
    ...mapGetters({
      dogy: "GET_DOGS",
      photos: "GET_PHOTOS"
    })
  },
  created() {
    this.ALL_BREEDS_RANDOM_PHOTOS();
  }
};
</script>
