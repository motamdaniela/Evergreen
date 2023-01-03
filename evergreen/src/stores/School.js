import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useSchoolStore = defineStore('school',{
  state: () => ({
    campus:useStorage('campus',[]),
    schools:useStorage('schools',[]),
    buildings:useStorage('buildings',[]),
    floors:useStorage('floors',[]),
    classrooms:useStorage('classrooms',[]),
  }),

  getters: {
    getCampus(){
      return this.campus;
    },

    getSchools(){
      return this.schools;
    },

    getBuildings(){
      return this.buildings;
    },

    getFloors(){
      return this.floors;
    },

    getClassrooms(){
      return this.classrooms;
    },
  },

  actions: {
    addCampus(obj){
      this.campus.push(obj)
    },

    addSchool(obj){
      this.schools.push(obj)
    },

    addBuilding(obj){
      this.buildings.push(obj)
    },

    addFloor(obj){
      this.floors.push(obj)
    },

    addClassroom(obj){
      this.classrooms.push(obj)
    },

  },
});


