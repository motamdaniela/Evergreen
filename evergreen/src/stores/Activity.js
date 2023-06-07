import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { useUsersStore } from "./User";

// import { AuthService } from '@/services/auth.service';

import API_URL from '../services/config.js'

export const useActivityStore = defineStore("activity", {
  state: () => ({
    activities: useStorage("activities", []),
  }),

  getters: {
    getActivities() {
      return this.activities;
    },

    async getActivitySuggestions() {
      const userStore = useUsersStore(); 
      let logged = userStore.getLogged;
      if(this.logged == undefined || this.logged == ''){
        await this.userStore.fetchLogged();
        this.logged = this.userStore.getLogged
      }
      let user = userStore.getUsers.find((user) => user.email == logged);
      let activities = this.getActivities;
      let activitiesSub = [];
      activities.forEach((activity) => {
        activity.users.forEach((user) => {
          if (user == logged) {
            if (!activitiesSub.find((act) => act.id == activity.id)) {
              activitiesSub.push(activity);
            }
          }
        });
      });
      activitiesSub.forEach((act) => {
        if (!act.users.find((user) => user == logged)) {
          let index = activitiesSub.indexOf(act);
          activitiesSub.splice(index, 1);
        }
      });
      let themes = [];
      let acts = [];

      activitiesSub.forEach((activity) => {
        activity.users.forEach((u) => {
          if (u == user.email) {
            if (themes.length > 0) {
              themes.forEach((theme) => {
                if (!theme == activity.idTheme) {
                  themes.push(activity.idTheme);
                }
              });
            } else {
              themes.push(activity.idTheme);
            }
          }
        });
      });

      themes.forEach((theme) => {
        activities.forEach((activity) => {
          if (
            activity.idTheme == theme &&
            !activitiesSub.find((act) => act.id == activity.id) &&
            activity.begin > user.loginDate
          ) {
            if (acts.length < 3) {
              acts.push(activity);
            }
          }
        });
      });

      acts.forEach((aTheme) => {
        activitiesSub.forEach((activity) => {
          if (aTheme.id == activity.id) {
            acts.splice(acts.indexOf(activity), 1);
          }
        });
      });

      if (acts.length < 3) {
        activities.forEach((activity) => {
          // acts.forEach((a) => {
          if (
            !acts.find((act) => act.id == activity.id) &&
            !activitiesSub.find((act) => act.id == activity.id) &&
            activity.begin > user.loginDate
          ) {
            if (acts.length < 3) {
              acts.push(activity);
            }
          }
          // });
        });
      }

      if (activitiesSub.length == 0) {
        activities.forEach((activity) => {
          if (acts.length < 3 && activity.begin < user.loginDate) {
            acts.push(activity);
          }
        });
      }

      return acts;
    },
  },

  actions: {

    // * get activities
    async fetchAllActivities() {
      const accessToken = JSON.parse(sessionStorage.getItem('loggedUser'))
      const response = await fetch(`${API_URL}/activities`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.activities = data.activities
        // console.log('activities store:', this.getActivities)
        return data;
      } else {
      console.log(response.status); 
      }
    },

    async subscribeActivity(activity) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const id = activity._id;
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    // * get activities
    async fetchSubActivities() {
      const accessToken = JSON.parse(sessionStorage.getItem('loggedUser'))
      const response = await fetch(`${API_URL}/activities/subscribed`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data.activities;
      } else {
      console.log(response.status); 
      }
    },

    addActivity(obj) {
      this.activities.push(obj);
    },

    addTheme(obj) {
      this.themes.push(obj);
    },

    updateUsers(user, id) {
      this.activities.forEach((activity) => {
        if (activity.id == id) {
          activity.users.push(user);
          console.log(activity);
        }
      });
    },

    updateParticipated(user, id) {
      this.activities.forEach((activity) => {
        if (activity.id == id) {
          activity.participated.push(user);
          activity.users.splice(activity.users.indexOf(user), 1);
        }
      });
    },

  },
});
