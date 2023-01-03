import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useSuggestionStore = defineStore('suggestion',{
  state: () => ({
    suggestions:useStorage('suggestions',[]),
  }),

  getters: {
    getSuggestions(){
      return this.suggestions;
    },

  },

  actions: {
    
    addSuggestions(obj){
      this.suggestions.push(obj)
    },

  },
});
