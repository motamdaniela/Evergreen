import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    type: "",
    email: "",
    name: "",
    password: "",
    school: "",
    date: "",
    photo: "",
    points: "",
    badges: [],
  },
});
