<template>
  <h1 class="title"><img src="../assets/images/flowerO.svg" />Missões</h1>
  <div v-for="mission in missions">
    <fieldset :class="MissionsState(mission.reward, mission)">
      <div class="missionCard">
        <div class="badge" :class="BadgeState(mission.reward, mission)">
          <img
            class="badgebg"
            :class="BgState(mission.reward, mission)"
            :src="mission.reward"
          />
          <img
            :class="lockState(mission.reward, mission)"
            id="lock"
            src="/src/assets/icons/icones/lock.svg"
          />
        </div>
        <div class="missionTxt">
          <h3>{{ mission.title }}</h3>
          <p>{{ mission.description }}</p>
          <br />
        </div>
        <button
          v-if="
            mission.users.find(
              (user) =>
                user.user == this.logged._id && user.status < mission.max
            )
          "
          @click="redirect(mission.redirect)"
          class="btn-page btnMission"
          :class="BtnState(mission.reward, mission)"
          :id="mission._id"
        >
          <img class="btnContent" src="/src/assets/icons/icones/goarrow.svg" />
        </button>

        <button
          v-else
          @click="addBadge(mission.reward)"
          class="btn-page btnMission"
          :class="BtnState(mission.reward, mission)"
          type="button"
          :id="mission._id"
          value="receber"
        >
          <img
            class="btnContent"
            src="/src/assets/icons/icones/checkmark.svg"
          />
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useMissionStore } from "@/stores/Mission";
import { useUsersStore } from "@/stores/User";
export default {
  setup() {
    const missionStore = useMissionStore();
    const usersStore = useUsersStore();

    return { missionStore, usersStore };
  },
  name: "Missions",
  data() {
    return {
      missions: [],
      users: "",
      state: [],
      logged: "",
    };
  },

  async created() {
    this.users = this.usersStore.getUsers;
    if (this.users == undefined || this.users == "") {
      await this.usersStore.fetchAllUsers();
      this.users = this.usersStore.getUsers;
    }

    this.logged = this.usersStore.getLogged;
    if (this.logged == undefined || this.logged == "") {
      await this.usersStore.fetchLogged();
      this.logged = this.usersStore.getLogged;
    }

    this.missions = this.missionStore.getMissions;
    if (this.missions == undefined || this.missions == "") {
      await this.missionStore.getAllMissions();
      this.mission = this.missionStore.getMissions;
    }
  },
  methods: {
    redirect(n) {
      this.$router.push(n);
    },
    MissionsState(missionReward, mission) {
      if (this.logged.rewards.find((reward) => reward == missionReward)) {
        return "fieldG";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        return "fieldR";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.logged.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status >= mission.max && user.user == this.logged._id
          ))
      ) {
        return "fieldY";
      }
    },
    BadgeState(missionReward, mission) {
      if (this.logged.rewards.find((reward) => reward == missionReward)) {
        return "badgeG";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        return "badgeR";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.logged.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status >= mission.max && user.user == this.logged._id
          ))
      ) {
        return "badgeY";
      }
    },
    BgState(missionReward, mission) {
      if (this.logged.rewards.find((reward) => reward == missionReward)) {
        return "bgG";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        return "bgR";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.logged.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status >= mission.max && user.user == this.logged._id
          ))
      ) {
        return "bgY";
      }
    },
    lockState(missionReward, mission) {
      if (this.logged.rewards.find((reward) => reward == missionReward)) {
        return "lockG";
      } else if (
        !this.logged.rewards.find((reward) => reward == missionReward) &&
        mission.users.find(
          (user) => user.status >= mission.max && user.user == this.logged._id
        )
      ) {
        return "lockY";
      } else {
        return "lockR";
      }
    },
    BtnState(missionReward, mission) {
      if (this.logged.rewards.find((reward) => reward == missionReward)) {
        return "btnMissionG";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        return "btnMissionR";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.logged.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status >= mission.max && user.user == this.logged._id
          ))
      ) {
        return "btnMissionY";
      }
    },
    async addBadge(missionReward) {
      await this.missionStore.receiveBadge(missionReward);

      await this.missionStore.getAllMissions();
      this.mission = this.missionStore.getMissions;

      await this.missionStore.completeMission(this.logged, 9);

      await this.usersStore.fetchAllUsers();
      this.users = this.usersStore.getUsers;

      await this.usersStore.fetchLogged();
      this.logged = this.usersStore.getLogged;
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
