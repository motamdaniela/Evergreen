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
        <p class="idk">{{ complete(mission.users, mission.id) }}</p>
        <p>{{ mission.description }}</p><br>
        <p style="font-weight:600" v-if="state[mission.id][0] == mission.id">
          {{ state[mission.id][1] }}
        </p>
        <p v-else></p>
      </div>
      <button
        v-if="state[mission.id][1] != 'Concluída'"
        @click="redirect(mission.redirect)"
        class="btn-page btnMission"
        :class="BtnState(mission.reward, mission)"
        :id="mission.id"
      >
        <img class="btnContent" src="/src/assets/icons/icones/goarrow.svg" />
      </button>

      <button
        v-else
        @click="addBadge(mission.reward)"
        class="btn-page btnMission"
        :class="BtnState(mission.reward, mission)"
        type="button"
        :id="mission.id"
        value="receber"
      >
        <img class="btnContent" src="/src/assets/icons/icones/checkmark.svg" />
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
      missions: this.missionStore.getMissions,
      user: '',
      users: "",
      state: [],
      logged: '',
    };
  },
  methods: {
    complete(users, id) {
      users.forEach((user) => {
        if (user[0] == this.logged && id != undefined) {
          this.state.push([id, user[2]]);
        }
      });
    },
    redirect(n) {
      this.$router.push(n);
    },
    MissionsState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "fieldG";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Em progresso" && user[0] == this.logged
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) =>
              user[2] == "Concluída" && user[0] == this.logged
          ))
      ) {
        return "fieldY";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Não começou" && user[0] == this.logged
        )
      ) {
        return "fieldR";
      }
    },
    BadgeState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "badgeG";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Em progresso" && user[0] == this.logged
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) =>
              user[2] == "Concluída" && user[0] == this.logged
          ))
      ) {
        return "badgeY";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Não começou" && user[0] == this.logged
        )
      ) {
        return "badgeR";
      }
    },
    BgState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "bgG";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Em progresso" && user[0] == this.logged
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) =>
              user[2] == "Concluída" && user[0] == this.logged
          ))
      ) {
        return "bgY";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Não começou" && user[0] == this.logged
        )
      ) {
        return "bgR";
      }
    },
    lockState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "lockG";
      } else if (
        !this.user.rewards.find((reward) => reward == missionReward) &&
        mission.users.find(
          (user) =>
            user[2] == "Concluída" && user[0] == this.logged
        )
      ) {
        return "lockY";
      } else {
        return "lockR";
      }
    },
    BtnState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "btnMissionG";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Em progresso" && user[0] == this.logged
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) =>
              user[2] == "Concluída" && user[0] == this.logged
          ))
      ) {
        return "btnMissionY";
      } else if (
        mission.users.find(
          (user) =>
            user[2] == "Não começou" && user[0] == this.logged
        )
      ) {
        return "btnMissionR";
      }
    },
    addBadge(missionReward) {
      if (!this.user.rewards.find((reward) => reward == missionReward)) {
        this.user.rewards.push(missionReward);
        this.missionStore.completeMission(this.logged, 9);
      }
    },
  },
  async created () {
    if(this.logged == undefined || this.logged == ''){
        await this.usersStore.fetchLogged();
        this.logged = this.usersStore.getLogged
      };
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
