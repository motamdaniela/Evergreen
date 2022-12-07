import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    id: 0,
    date: "",
    hour: "",
    campus: [],
    building: "",
    floor: "",
    classroom: "",
    type: "",
    description: "",
    photo: "",
    user: "",
    state: "",
  },
});
