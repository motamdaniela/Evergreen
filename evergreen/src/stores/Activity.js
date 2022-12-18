import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useActivityStore = defineStore('activity',{
  state: () => ({
    activities:useStorage('activities',[]),
  }),

  getters: {
    getActivities(){
      return this.activities;
    }
  },

  actions: {
    


  },
});




// export const store = new Vuex.Store({
//   state: {
//     id: 0,
//     date: "",
//     title: "",
//     description: "",
//     coordenator: "",
//     place: "",
//     users: [],
//     participated: [],
//   },
// });
