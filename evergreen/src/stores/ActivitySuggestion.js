import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

import API_URL from "../services/config.js";

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

    async submit(theme, description, objectives, goals, resources){
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/activities/suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
        body: JSON.stringify({
          theme: theme,
          description: description,
          objectives: objectives,
          goals: goals,
          resources: resources
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // this.occurrences = data;
        console.log(data);
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - create suggestion error", response);
      }
    }

  },
});
