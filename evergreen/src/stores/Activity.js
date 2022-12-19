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
    
    add(obj){
      this.activities.push(obj)
    },

  },
});
