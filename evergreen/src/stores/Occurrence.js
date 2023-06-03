import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

// import { AuthService } from "@/services/auth.service";

import API_URL from "../services/config.js";

export const useOccurrenceStore = defineStore("occurrence", {
  state: () => ({
    occurrences: useStorage("occurrences", []),
    types: useStorage("types", []),
  }),
  getters: {
    getOccurrences() {
      return this.occurrences;
    },
    getTypes() {
      return this.types;
    },
  },
  actions: {
    addOccurrence(e) {
      this.occurrences.push(e);
    },
    addType(e) {
      this.types.push(e);
    },

    async submit(school, building, classroom, type, description, photo, other) {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/occurrences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
        body: JSON.stringify({
          school: school,
          building: building,
          classroom: classroom,
          type: type,
          description: description,
          photo: photo,
          other: other,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // this.occurrences = data;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - create occurrence error", response);
      }
    },

    async getAllOccurrences() {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/occurrences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.occurrences = data;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL Occurrences error", response);
      }
    },

    async getAllTypes() {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/occurrences/types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.types = data;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL types error", response);
      }
    },
  },
});
