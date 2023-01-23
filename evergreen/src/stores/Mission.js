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
      if (type == 0) {
        // for missions type subscribe activity
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
        // for missions type participate activity
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
        // for missions type 1st occurrence
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
        // for missions type win points
        let pts;
        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user.email == logged) {
            pts = user.points;
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u[0] == logged && u[1] < mission.max) {
                    if (u[1] < mission.max) {
                      u[1] = pts;
                    }
                    if (u[1] == 0) {
                      u[2] = "Não começou";
                    } else if (u[1] == mission.max) {
                      u[2] = "Concluída";
                    } else {
                      u[2] = "Em progresso";
                    }
                  }
                });
              }
            });
          }
        });
      } else if (type == 4) {
        // for missions type subscribe council
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
        // for missions type fill form
      } else if (type == 6) {
        // for missions type login every day for a week
        let num = 0;
        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user.email == logged) {
            num = user.streak;
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u[0] == logged && u[1] < mission.max) {
                    if (u[1] < mission.max) {
                      u[1] = num;
                    }
                    if (u[1] == 0) {
                      u[2] = "Não começou";
                    } else if (u[1] == mission.max) {
                      u[2] = "Concluída";
                    } else {
                      u[2] = "Em progresso";
                    }
                  }
                });
              }
            });
          }
        });
      } else if (type == 7) {
        // for missions type edit profile
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
        // for missions type get to x rank
        const userStore = useUsersStore();
        let top3 = userStore.getTop3;
        let index;
        userStore.getUsers.forEach((user) => {
          top3.forEach((top) => {
            if (top.email == user.email && user.email == logged) {
              index = top3.indexOf(top) + 1;
              this.missions.forEach((mission) => {
                if (mission.type == type) {
                  mission.users.forEach((u) => {
                    if (u[0] == logged) {
                      u[1] = index;
                      if (index > mission.max) {
                        u[2] = "Em progresso";
                      } else if (index == mission.max) {
                        u[2] = "Concluída";
                      }
                    }
                  });
                }
              });
            }
          });
        });
      } else if (type == 9) {
        // for missions type do all missions
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
              } else if (user[0] == logged && user[1] == mission.max) {
                user[2] = "Concluída";
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
