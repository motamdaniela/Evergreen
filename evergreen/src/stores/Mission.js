import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { useActivityStore } from "./activity";
import { useUsersStore } from "./user";
import { useOccurrenceStore } from "./occurrence";

export const useMissionStore = defineStore("mission", {
  state: () => ({
    missions: useStorage("missions", []),
    type: useStorage("type", []),
  }),

  getters: {
    getMissions() {
      return this.missions;
    },

    getTypes() {
      return this.type;
    },
  },

  actions: {
    addMission(obj) {
      this.missions.push(obj);
    },

    addType(obj) {
      this.type.push(obj);
    },

    addUser(email) {
      const userStore = useUsersStore();
      let user = userStore.getLogged;
      this.missions.forEach((mission) => {
        if (!mission.users.find((m) => m[0] == user)) {
          mission.users.push([user, 0, "Não começou"]);
        }
      });
    },

    completeMission(logged, type) {
      // for missions type subscribe activity
      if (type == 0) {
        const activityStore = useActivityStore();

        let actList = [];

        let activities = activityStore.getActivities;
        activities.forEach((activity) => {
          activity.users.forEach((user) => {
            if (user == logged) {
              actList.push(activity);
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user[0] == logged && user[1] < mission.max) {
                if (user[1] < mission.max) {
                  user[1] = actList.length;
                }
                if (user[1] == 0) {
                  user[2] = "Não começou";
                } else if (user[1] == mission.max) {
                  user[2] = "Concluída";
                } else {
                  user[2] = "Em progresso";
                }
              }
            });
          }
        });
      } else if (type == 1) {
        const activityStore = useActivityStore();

        let actList = [];

        let activities = activityStore.getActivities;
        activities.forEach((activity) => {
          activity.participated.forEach((user) => {
            if (user == logged) {
              actList.push(activity);
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user[0] == logged && user[1] < mission.max) {
                if (user[1] < mission.max) {
                  user[1] = actList.length;
                }
                if (user[1] == 0) {
                  user[2] = "Não começou";
                } else if (user[1] == mission.max) {
                  user[2] = "Concluída";
                } else {
                  user[2] = "Em progresso";
                }
              }
            });
          }
        });
      } else if (type == 2) {
        const occurrenceStore = useOccurrenceStore();
        if (
          occurrenceStore.getOccurrences.find(
            (occurrence) => occurrence.user == logged
          )
        ) {
          this.missions.forEach((mission) => {
            if (mission.type == type) {
              mission.users.forEach((user) => {
                if (user[0] == logged && user[1] < mission.max) {
                  user[1] = mission.max;
                  user[2] = "Concluída";
                }
              });
            }
          });
        }
      } else if (type == 3) {
      } else if (type == 4) {
        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user.email == logged && user.council == true) {
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u[0] == logged && u[1] < mission.max) {
                    u[1] = mission.max;
                    u[2] = "Concluída";
                  }
                });
              }
            });
          }
        });
      } else if (type == 5) {
      } else if (type == 6) {
        let num = 0;
        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user.email == logged) {
            num = user.streak;
            console.log(num);
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u[0] == logged && u[1] < mission.max) {
                    if (u[1] < mission.max) {
                      u[1] = num;
                      console.log(num);
                    }
                    console.log(num);
                    if (u[1] == 0) {
                      u[2] = "Não começou";
                      console.log(num);
                    } else if (u[1] == mission.max) {
                      u[2] = "Concluída";
                      console.log("");
                    } else {
                      u[2] = "Em progresso";
                      console.log(num);
                    }
                  }
                });
              }
            });
          }
        });
      } else if (type == 7) {
        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user[0] == logged && user[1] < mission.max) {
                user[1] = mission.max;
                user[2] = "Concluída";
              }
            });
          }
        });
      } else if (type == 8) {
      } else if (type == 9) {
        let num = 0;
        this.missions.forEach((mission) => {
          mission.users.forEach((user) => {
            if (user[0] == logged && user[1] == mission.max) {
              num += 1;
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user[0] == logged && user[1] < mission.max) {
                if (user[1] < mission.max) {
                  user[1] = num;
                }
                if (user[1] == 0) {
                  user[2] = "Não começou";
                } else if (user[1] == mission.max) {
                  user[2] = "Concluída";
                } else {
                  user[2] = "Em progresso";
                }
              }
            });
          }
        });
      }
    },
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
