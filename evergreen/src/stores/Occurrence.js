import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

// import { AuthService } from "@/services/auth.service";

import API_URL from "../services/config.js";

export const useOccurrenceStore = defineStore("occurrence", {
  state: () => ({
    occurrences: [],
    types: [],
    pending: []
  }),
  getters: {
    getOccurrences() {
      return this.occurrences;
    },
    getTypes() {
      return this.types;
    },
    getPending(){
      // this.occurrences.forEach((oc) => {
      //   if(oc.state == 'pending') {
      //     this.pending.push(oc)
      //   }
      // })
      return this.pending
    }
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
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/occurrences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.occurrences = data.occurrences;
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
        this.types = data.types;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL types error", response);
      }
    },

    async validation(oc, state) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const id = oc._id;
      const response = await fetch(`${API_URL}/occurrences/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          state: state
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('hi there');
        console.log(data);
        return data
      } else {
        console.log(response.status)
      }
    },

    async fetchPending() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/occurrences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.occurrences = data.occurrences;
        this.occurrences.forEach((oc) => {
          if(oc.state == 'pending') {
            this.pending.push(oc)
          }
        })
        return this.pending
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL Occurrences error", response);
      }
    }
  },
});
