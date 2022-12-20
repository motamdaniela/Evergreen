import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useOccurrenceStore = defineStore('occurrence',{
  state: () => ({
    occurrences:useStorage('occurrences',[]),
    types:useStorage('types',[]),
  }),

  getters: {
    getOccurrences(){
      return this.occurrences;
    },

    getTypes(){
      return this.types;
    },
  },

  actions: {
    addOccurrence(obj){
      this.occurrences.push(obj)
    },

    addType(obj){
      this.types.push(obj)
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
