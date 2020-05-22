<template>
  <div class="content">
    <div class="v-favourites">
      <span>
        <p class="button main active" @click="back()">favourites х</p>
        <div is="vImgLazy" :arrImgs="photos"></div>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-favourites",
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
    this.GET_LOCAL_STORAGE();
  }
};
</script>
