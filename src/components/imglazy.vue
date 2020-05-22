<template>
  <div class="v-imglazy">
    <span class="gradient" v-for="(img, index) in blockImg" :key="img.key">
      <div
        :class="checkClass(index)"
        :style='{ backgroundImage: `url("${img.url}")` }'
      >
        <div class="like-block">
          <div
            @click="
              img.like = !img.like;
              toFavourites(img);
            "
            :class="{
              onlike: img.like == true,
              offlike: img.like == false
            }"
          >
            ❤
          </div>
        </div>
        <div class="breed">
          <div class="name">{{ img.breed }}</div>
        </div>
      </div>
    </span>
    <Observer @nextBlockLoad="nextBlockLoad" />
  </div>
</template>
<script>
export default {
  name: "v-imglazy",
  props: {
    arrImgs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Observer: () => import("@/components/observer")
  },
  data() {
    return {
      lastIndex: 0,
      blockSize: 20,
      blockLoad: []
    };
  },
  methods: {
    toFavourites(img) {
      let liked = [];
      // поставили лайк
      if (img.like) {
        liked = JSON.parse(localStorage.getItem("liked"));
        if(!liked) liked = [];
        liked.push({ breed: img.breed, url: img.url, like: true });
        localStorage.setItem("liked", JSON.stringify(liked));
        // сняли лайк
      } else {
        liked = JSON.parse(localStorage.getItem("liked"));
        liked = Object.values(liked);
        let cache = liked.filter(dogs => dogs.url != img.url);
        localStorage.setItem("liked", JSON.stringify(cache));
      }
    },
    nextBlockLoad() {
      this.blockLoad = this.blockImg;
      this.lastIndex += this.blockSize + 1;
    }
  },
  computed: {
    blockImg() {
      const start = this.lastIndex;
      const end = this.lastIndex + this.blockSize;
      const nextBlockLoad = this.arrImgs.slice(start, end);
      return [...this.blockLoad, ...nextBlockLoad];
    },
    checkClass() {
      return index => {
        return {
          mainview: index == 0 && this.$route.path == "/",
          preview: index > 0 || (index == 0 && this.$route.path != "/")
        };
      };
    }
  }
};
</script>
