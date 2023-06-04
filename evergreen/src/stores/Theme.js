import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

import API_URL from "../services/config.js";

export const useThemesStore = defineStore("theme", {
  state: () => ({
    themes: useStorage("themes", [])
  }),

  getters: {
    getThemes() {
      return this.themes;
    }
  },

  actions: {
    async fetchAllThemes() {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/activities/themes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.themes = data.themes;
        // console.log('theme store', this.themes);
        return data;
      } else {
        console.log(response.status);
      }
    }
  }

});