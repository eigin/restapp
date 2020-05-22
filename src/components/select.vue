<template>
  <div class="v-select">
    <div class="setting">
      <p class="breeds_open" @click="showText()">Порода {{ btnText }}</p>
      <p class="sort">
        Сортировка по алфавиту
        <span class="container_but">
          <input type="checkbox" class="toggle-button" @click="SortAB()" />
        </span>
      </p>
    </div>

    <div v-if="showOptions">
      <p class="button main active" @click="allBreeds()">Все пёсели</p>
      <span v-for="option in dogy" :key="option.key">
        <p
          @click="selectOption(option)"
          :class="{
            button: option.length > 1,
            sort_letter: option.length == 1
          }"
        >
          {{ option }}
        </p>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-select",
  props: {
    selected: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showOptions: false,
      btnText: ">",
      sort: false
    };
  },
  methods: {
    ...mapActions(["GET_LIST_ALL_BREEDS"]),
    SortAB() {
      if (!this.showOptions) {
        this.showOptions = true;
      }
      this.sort = !this.sort;
      console.log("this.sort = " + this.sort);
      this.GET_LIST_ALL_BREEDS(this.sort);
    },
    allBreeds() {
      this.showOptions = !this.showOptions;
      this.GET_LIST_ALL_BREEDS(this.sort);
    },
    showText() {
      this.showOptions = !this.showOptions;
      this.btnText = this.showOptions ? "<" : ">";
    },
    selectOption(option) {
      if (option.length == 1) return;
      this.$emit("select", option);
    }
  },
  computed: {
    ...mapGetters({
      dogy: "GET_DOGS",
      sorted: "GET_SORTED"
    })
  },
  created() {
    this.GET_LIST_ALL_BREEDS();
  }
};
</script>
