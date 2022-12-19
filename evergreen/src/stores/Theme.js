import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme',{
  state: () => ({
    themes:useStorage('themes',[]),
  }),

  getters: {
    getThemes(){
      return this.themes;
    }
  },

  actions: {
    
    add(obj){
      this.themes.push(obj)
    },

  },
});