import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

import API_URL from "../services/config.js";

export const useSchoolStore = defineStore("school", {
  state: () => ({
    campus: useStorage("campus", []),
    schools: useStorage("schools", []),
    buildings: useStorage("buildings", []),
    floors: useStorage("floors", []),
    classrooms: useStorage("classrooms", []),
  }),

  getters: {
    getSchools() {
      return this.schools;
    },

    getBuildings() {
      return this.buildings;
    },

    getClassrooms() {
      return this.classrooms;
    },
  },

  actions: {
    addCampus(obj) {
      this.campus.push(obj);
    },

    addSchool(obj) {
      this.schools.push(obj);
    },

    addBuilding(obj) {
      this.buildings.push(obj);
    },

    addFloor(obj) {
      this.floors.push(obj);
    },

    addClassroom(obj) {
      this.classrooms.push(obj);
    },

    async getAllSchools() {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      console.log(curUser);
      const response = await fetch(`${API_URL}/occurrences/schools`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
      });
      console.log(response);
      if (response.ok) {
        let data = await response.json();
        this.schools = data.schools;
        console.log(data);
        return data;
      } else {
        console.log("vou me matar");
        console.log(response.status);
      }
    },
  },
});
