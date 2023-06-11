import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { useUsersStore } from "./User";
import { useMissionStore } from "./Mission";

// import { AuthService } from '@/services/auth.service';

import API_URL from "../services/config.js";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    activities: useStorage("activities", []),
  }),

  getters: {
    getActivities() {
      return this.activities;
    },

    getActivitySuggestions() {
      const userStore = useUsersStore();

      let logged = userStore.getLogged;
      let activities = this.getActivities;
      let activitiesSub = [];
      activities.forEach((activity) => {
        activity.users.forEach((user) => {
          console.log(user.user == logged._id);
          if (user.user == logged._id) {
            if (!activitiesSub.find((act) => act._id == activity._id)) {
              activitiesSub.push(activity);
            }
          }
        });
      });
      activitiesSub.forEach((act) => {
        if (!act.users.find((user) => user.user == logged._id)) {
          let index = activitiesSub.indexOf(act);
          activitiesSub.splice(index, 1);
        }
      });

      let themes = [];
      let acts = [];

      activitiesSub.forEach((activity) => {
        activity.users.forEach((u) => {
          if (u.user == logged._id) {
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
      // console.log(user.loginDate)
      themes.forEach((theme) => {
        activities.forEach((activity) => {
          if (
            activity.idTheme == theme &&
            !activitiesSub.find((act) => act._id == activity._id) &&
            activity.begin > logged.loginDate
          ) {
            if (acts.length < 3) {
              acts.push(activity);
            }
          }
        });
      });

      acts.forEach((aTheme) => {
        activitiesSub.forEach((activity) => {
          if (aTheme._id == activity._id) {
            acts.splice(acts.indexOf(activity), 1);
          }
        });
      });

      if (acts.length < 3) {
        activities.forEach((activity) => {
          // acts.forEach((a) => {
          if (
            !acts.find((act) => act._id == activity._id) &&
            !activitiesSub.find((act) => act._id == activity._id) &&
            activity.begin > logged.loginDate
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
          if (acts.length < 3 && activity.begin < logged.loginDate) {
            acts.push(activity);
          }
        });
      }

      console.log(acts);

      return acts;
    },
  },

  actions: {
    // * get all activities
    async fetchAllActivities() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/activities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.activities = data.activities;
        console.log('activities store:', this.activities)
        return data;
      } else {
        console.log(response.status);
      }
    },

    // * subscribe to activity
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
        console.log(data);
        // missionStore.completeMission(userStore.getLogged, 0);
        return data.activity;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    // * verify participation
    async verifyParticipation(activity, user) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const actId = activity._id;
      const userId = user.id
      const response = await fetch(`${API_URL}/activities/${actId}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // missionStore.completeMission(userStore.getLogged, 0);
        return data.activity;
      } else {
        console.log(response.status)
      }
    },

    // * get subscribed activities
    async fetchSubActivities() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/activities/subscribed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.activities;
      } else {
        console.log(response.status);
      }
    },

    // * get all activities from coordinator
    async fetchCoordinatorActivities() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/activities/coordinator`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.myActivities = data.activities
        console.log(data)
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
