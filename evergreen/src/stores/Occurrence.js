import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useOccurrenceStore = defineStore('occurrence',{
  state: () => ({
    occurrences:useStorage('occurrences',[]),
  }),

  getters: {
    getOccurrences(){
      return this.occurrences;
    }
  },

  actions: {
    add(obj){
      this.occurrences.push(obj)
    },

  },
});

// export const store = new Vuex.Store({
//   state: {
//     id: 0,
//     date: "",
//     hour: "",
//     campus: [],
//     building: "",
//     floor: "",
//     classroom: "",
//     type: "",
//     description: "",
//     photo: "",
//     user: "",
//     state: "",
//   },
// });
