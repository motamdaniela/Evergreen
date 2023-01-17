<template>
  <h1 class="title"><img src="../assets/images/flowerO.svg" />Missões</h1>
  <div v-for="mission in missions">
    <fieldset :class="MissionsState(mission.reward,mission)">
      <div class="badge" :class="BadgeState(mission.reward,mission)">
        <img
          class="badgebg"
          :class="BgState(mission.reward,mission)"
          :src="mission.reward"
        />
      </div>
      <h3>{{ mission.title }}</h3>
      <p class="idk">{{ complete(mission.users, mission.id) }}</p>
      <p>{{ mission.description }}</p>
      <p v-if="state[mission.id][0] == mission.id">
        {{ state[mission.id][1] }}
      </p>
      <p v-else></p>
      <input
        v-if="state[mission.id][1] != 'Concluída'"
        @click="redirect(mission.redirect)"
        class="btn-page"
        type="button"
        :id="mission.id"
        value="go"
      />
      <input
        v-else
        @click="addBadge(mission.reward)"
        class="btn-page"
        type="button"
        :id="mission.id"
        value="receber"
      />
    </fieldset>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useMissionStore } from "@/stores/Mission";
import { useUsersStore } from "@/stores/User"
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
      user: this.usersStore.getUsers.find(
        (usersStor) => usersStor.email == this.usersStore.getLogged
      ),
      users: "",
      state: [],
    };
  },
  methods: {
    complete(users, id) {
      users.forEach((user) => {
        if (user[0] == this.usersStore.getLogged && id != undefined) {
          this.state.push([id, user[2]]);
        }
      })
    },
    redirect(n) {
      this.$router.push(n);
    },
    MissionsState(missionReward,mission) {
        if (this.user.rewards.find((reward) => reward == missionReward)) {
          return "fieldG";
        } else if (
          mission.users.find((user) => user[2] == "Em progresso") || 
          !this.user.rewards.find((reward) => reward == missionReward) && 
          mission.users.find((user) => user[2] == "Concluída") )
         {
          return "fieldY";
        } else if(
          mission.users.find((user) => user[2] == "Não começou")) {
          return "fieldR";
        }
    },
    BadgeState(missionReward,mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "badgeG";
      } else if (
        mission.users.find((user) => user[2] == "Em progresso")|| 
          !this.user.rewards.find((reward) => reward == missionReward) && 
          mission.users.find((user) => user[2] == "Concluída"))
       {
        return "badgeY";
      } else if(
          mission.users.find((user) => user[2] == "Não começou")) {
          return "badgeR";
        }
    },
    BgState(missionReward,mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "bgG";
      } else if (
        mission.users.find((user) => user[2] == "Em progresso")|| 
          !this.user.rewards.find((reward) => reward == missionReward) && 
          mission.users.find((user) => user[2] == "Concluída"))
       {
        return "bgY";
      } else if(
          mission.users.find((user) => user[2] == "Não começou")) {
          return "bgR";
        }
    },
    addBadge(missionReward) {
      if(!this.user.rewards.find(reward=>reward==missionReward)){
        this.user.rewards.push(missionReward);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
