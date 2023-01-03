import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useMissionStore = defineStore('mission',{
  state: () => ({
    missions:useStorage('missions',[]),
  }),

  getters: {
    getMissions(){
      return this.missions;
    },

  },

  actions: {
    addMission(obj){
      this.missions.push(obj)
    },

    addUser(email){
      this.missions.forEach(mission => {
        if(!mission.users.find((m) => m[0] == email)){
          mission.users.push([email,0,'notStarted'])
        }
      })
    }

  },
});



// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     id: 0,
//     title: "",
//     description: "",
//     reward: "",
//     users: [['email',0,'state'],['email',0,'state']],
//     max:1,
//     redirect:'',
//   },
// });
