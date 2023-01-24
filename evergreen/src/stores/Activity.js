import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { useUsersStore } from "./user";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    activities: useStorage("activities", []),
    themes: useStorage("themes", []),
  }),

  getters: {
    getActivities() {
      return this.activities;
    },

    getThemes() {
      return this.themes;
    },
    getActivitySuggestions() {
      const userStore = useUsersStore();
      let logged = userStore.getLogged;
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
      console.log(activitiesSub);
      let themes = [];
      let acts = [];

      activitiesSub.forEach((activity) => {
        activity.users.forEach((u) => {
          if (u == user.email) {
            if (themes.length > 0) {
              themes.forEach((theme) => {
                if (!theme == activity.idTheme) {
                  console.log(4);
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
          if (activity.idTheme == theme && activity.begin > user.loginDate) {
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

      console.log(acts);

      if (acts.length < 3) {
        activities.forEach((activity) => {
          // acts.forEach((a) => {
          if (
            !acts.find((act) => act.id == activity.id) &&
            !activitiesSub.find((act) => act.id == activity.id) &&
            activity.begin > user.loginDate
          ) {
            if (acts.length < 3) {
              console.log(activity);
              acts.push(activity);
            }
          }
          // });
          console.log(acts);
        });
      }

      if (activitiesSub.length == 0) {
        activities.forEach((activity) => {
          if (acts.length < 3 && activity.begin < user.loginDate) {
            acts.push(activity);
          }
        });
      }
      console.log(activitiesSub);
      console.log(acts);
      return acts;
    },
  },

  actions: {
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
