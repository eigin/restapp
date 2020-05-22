import Vue from "vue";
import VueRouter from "vue-router";
import AllBreeds from "../views/allbreeds.vue";
import Breed from "../views/breed.vue";
import Favourites from "../views/favourites.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dogs",
    component: AllBreeds
  },
  {
    path: "/favourites",
    name: "favourites",
    component: Favourites
  },
  {
    path: "/:selected",
    component: Breed,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
