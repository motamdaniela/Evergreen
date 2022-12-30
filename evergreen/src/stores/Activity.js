import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useActivityStore = defineStore('activity',{
  state: () => ({
    activities:useStorage('activities',[]),
    themes:useStorage('themes',[]),
  }),

  getters: {
    getActivities(){
      return this.activities;
    },

    getThemes(){
      return this.themes;
    },
  },

  actions: {
    
    addActivity(obj){
      this.activities.push(obj)
    },

    addTheme(obj){
      this.themes.push(obj)
    },

    updateUsers(user,id){
      this.activities.forEach(activity => {
        if(activity.id == id){
          activity.users.push(user)
        }
      });
    }

  },
});
