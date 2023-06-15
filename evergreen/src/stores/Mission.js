import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { useActivityStore } from "./Activity";
import { useUsersStore } from "./User";
import { useOccurrenceStore } from "./Occurrence";

import API_URL from "../services/config.js";

export const useMissionStore = defineStore("mission", {
  state: () => ({
    missions: [],
    type: [],
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

    async getAllMissions() {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/missions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.missions = data.missions;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL Missions error", response);
      }
    },

    async receiveBadge(badge) {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/missions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
        body: JSON.stringify({
          badge: badge,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        this.missions = data.missions;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL Missions error", response);
      }
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

    async update(missionsList) {
      const curUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/missions/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${curUser}`,
        },
        body: JSON.stringify({
          missions: missionsList,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        this.missions = data.missions;
        return data;
      } else {
        console.log("not ok");
        console.log("STORE - fetch ALL Missions error", response);
      }
    },
    async delete(id) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/missions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    async completeMission(logged, type) {
      // ? cada vez que quiserem chamar esta função, tem de fazer fetch das missões e tipo da cena que tão a mudar que neste caso é as atividades
      if (type == 0) {
        // *for missions type subscribe activity
        const activityStore = useActivityStore();

        let actList = [];

        let missionsList = [];

        let activities = activityStore.getActivities;
        activities.forEach((activity) => {
          activity.users.forEach((user) => {
            if (user.user == logged._id) {
              actList.push(activity);
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user.user == logged._id && user.status < mission.max) {
                user.status = actList.length;
                missionsList.push({
                  id: mission._id,
                  user: user.user,
                  status: user.status,
                });
              }
            });
          }
        });
        if (missionsList.length > 0) {
          await this.update(missionsList);
        }
      } else if (type == 1) {
        // * for missions type participate activity
        const activityStore = useActivityStore();

        let actList = [];

        let activities = activityStore.getActivities;

        let missionsList = [];
        activities.forEach((activity) => {
          activity.users.forEach((user) => {
            if (user.user == logged._id && user.status == "participated") {
              actList.push(activity);
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user.user == logged._id && user.status < mission.max) {
                user.status = actList.length;
                missionsList.push({
                  id: mission._id,
                  user: user.user,
                  status: user.status,
                });
              }
            });
          }
        });
        await this.update(missionsList);
      } else if (type == 2) {
        // * for missions type 1st occurrence
        const occurrenceStore = useOccurrenceStore();

        let missionsList = [];
        if (
          occurrenceStore.getOccurrences.find(
            (occurrence) => occurrence.userID == logged._id
          )
        ) {
          this.missions.forEach((mission) => {
            if (mission.type == type) {
              mission.users.forEach((user) => {
                if (user.user == logged._id && user.status < mission.max) {
                  user.status = mission.max;
                  missionsList.push({
                    id: mission._id,
                    user: user.user,
                    status: user.status,
                  });
                }
              });
            }
          });
        }
        await this.update(missionsList);
      } else if (type == 3) {
        // * for missions type win points
        let pts;

        let missionsList = [];
        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user._id == logged._id) {
            pts = user.points;
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u.user == logged._id && u.status < mission.max) {
                    u.status = pts;
                    missionsList.push({
                      id: mission._id,
                      user: u.user,
                      status: u.status,
                    });
                  }
                });
              }
            });
          }
        });
        await this.update(missionsList);
      } else if (type == 4) {
        // * for missions type subscribe council
        const userStore = useUsersStore();

        let missionsList = [];
        userStore.getUsers.forEach((user) => {
          if (user._id == logged._id && logged.council == true) {
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u.user == logged._id && u.status < mission.max) {
                    u.status = mission.max;
                    missionsList.push({
                      id: mission._id,
                      user: u.user,
                      status: u.status,
                    });
                  }
                });
              }
            });
          }
        });
        await this.update(missionsList);
      } else if (type == 5) {
        // for missions type fill form
      } else if (type == 6) {
        // * for missions type login every day for a week
        let num = 0;

        let missionsList = [];

        const userStore = useUsersStore();
        userStore.getUsers.forEach((user) => {
          if (user._id == logged._id) {
            num = logged.streak;
          }
        });
        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((u) => {
              if (u.user == logged._id && u.status < mission.max) {
                u.status = num;
                missionsList.push({
                  id: mission._id,
                  user: u.user,
                  status: u.status,
                });
              }
            });
          }
        });
        await this.update(missionsList);
      } else if (type == 7) {
        // * for missions type edit profile

        let missionsList = [];
        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((user) => {
              if (user.user == logged._id && user.status < mission.max) {
                user.status = mission.max;
                missionsList.push({
                  id: mission._id,
                  user: user.user,
                  status: user.status,
                });
              }
            });
          }
        });
        await this.update(missionsList);
      } else if (type == 8) {
        // * for missions type get to x rank
        const userStore = useUsersStore();
        let top3 = userStore.getTop3;
        let index;
        let missionsList = [];
        top3.forEach((top) => {
          if (top._id == logged._id) {
            index = top3.indexOf(top) + 1;
            this.missions.forEach((mission) => {
              if (mission.type == type) {
                mission.users.forEach((u) => {
                  if (u.user == logged._id) {
                    if (
                      mission.max == 3 &&
                      (index == 3 || index == 2 || index == 1)
                    ) {
                      u.status = 3;
                    } else if (mission.max == 2 && (index == 2 || index == 1)) {
                      u.status = 2;
                    } else if (mission.max == 1 && index == 1) {
                      u.status = 1;
                    }
                    missionsList.push({
                      id: mission._id,
                      user: u.user,
                      status: u.status,
                    });
                  }
                });
              }
            });
          }
        });
        // });
        await this.update(missionsList);
      } else if (type == 9) {
        // * for missions type do all missions
        let num = 0;
        let missionsList = [];
        this.missions.forEach((mission) => {
          mission.users.forEach((user) => {
            if (user.user == logged._id && user.status == mission.max) {
              num += 1;
            }
          });
        });

        this.missions.forEach((mission) => {
          if (mission.type == type) {
            mission.users.forEach((u) => {
              if (u.user == logged._id && u.status < mission.max) {
                u.status = num;
                missionsList.push({
                  id: mission._id,
                  user: u.user,
                  status: u.status,
                });
              }
            });
          }
        });
        await this.update(missionsList);
      }
    },
  },
});
