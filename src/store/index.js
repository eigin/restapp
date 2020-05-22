import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dogs: [],
    photos: []
  },
  mutations: {
    SET_DOGS: (state, dogs) => {
      state.dogs = dogs;
    },
    SET_PHOTOS: (state, photos) => {
      state.photos = photos;
    }
  },
  actions: {
    // список всех пород, с сортировкой/без в зависимости от флага
    GET_LIST_ALL_BREEDS({ commit }, payload) {
      Axios.get("https://dog.ceo/api/breeds/list/all").then(response => {
        var res = [];
        console.log("payload.store = " + payload);
        if (payload) {
          let dogy = JSON.stringify(Object.keys(response.data.message));
          let dogySort = JSON.parse(dogy).sort();
          // пробежимся, выделим первые буквы для последующего форматирования
          dogySort.reduce((letter, breed) => {
            if (letter != breed[0]) {
              letter = breed[0];
              res.push(letter);
            }
            res.push(breed);
            return letter;
          }, "");
        } else {
          res = Object.keys(response.data.message);
        }
        commit("SET_DOGS", res);
      });
    },
    // все фото указанной породы
    GET_BY_BREEDS({ commit }, payload) {
      let str = "https://dog.ceo/api/breed/" + payload + "/images";
      let res = [];
      Axios.get(str)
        .then(response => {
          var imgUrls = response.data.message;
          return imgUrls;
        })
        .then(imgUrls => {
          // создадим массив фотографий и добавим породу
          for (let url of imgUrls) {
            res.push({ breed: payload, url: url, like: false });
            commit("SET_PHOTOS", res);
          }
        });
    },
    // список суб-пород
    GET_BY_SUB_BREEDS({ commit }, payload) {
      Axios.get("https://dog.ceo/api/breed/" + payload + "/list").then(
        response => {
          commit("SET_DOGS", response.data.message);
        }
      );
    },
    // рандомное фото
    GET_RANDOM_IMAGE({ commit }) {
      Axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
        commit("SET_DOGS", response.data);
      });
    },
    // рандомные фото всех пород
    ALL_BREEDS_RANDOM_PHOTOS({ commit }) {
      let res = [];
      // получим список всех пород
      Axios.get("https://dog.ceo/api/breeds/list/all")
        .then(response => {
          var breeds = Object.keys(response.data.message);
          return breeds;
        })
        .then(breeds => {
          // создадим массив фотографий всех пород
          for (let breed of breeds) {
            Axios.get(
              "https://dog.ceo/api/breed/" + breed + "/images/random"
            ).then(response => {
              res.push({
                breed: breed,
                url: response.data.message,
                like: false
              });
              commit("SET_PHOTOS", res);
            });
          }
        });
    },
    // массив фотографий из кэша браузера
    GET_LOCAL_STORAGE({ commit }) {
      commit("SET_PHOTOS", JSON.parse(localStorage.getItem("liked")));
    }
  },
  getters: {
    GET_DOGS(state) {
      return state.dogs;
    },
    GET_PHOTOS(state) {
      return state.photos;
    }
  }
});
