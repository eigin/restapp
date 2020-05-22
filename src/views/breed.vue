<template>
  <div class="content">
    <span>
      <p class="button main active" @click="back()">{{ breed }} х</p>
      <div is="vImgLazy" :arrImgs="photos"></div>
    </span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-bybreed",
  props: {
    selected: {
      type: String,
      default() {
        return "";
      }
    }
  },
  components: {
    vImgLazy: () => import("@/components/imglazy")
  },
  data() {
    return {
      breed: this.selected
    };
  },
  methods: {
    ...mapActions(["GET_BY_BREEDS", "GET_LOCAL_STORAGE"]),
    back() {
      this.$router.replace("/");
    }
  },
  computed: {
    ...mapGetters({
      photos: "GET_PHOTOS"
    })
  },
  created() {
    this.GET_BY_BREEDS(this.selected);
  }
};
</script>
