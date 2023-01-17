<template>
  <h1 class="title"><img src="../assets/images/flowerO.svg" />Missões</h1>
  <div v-for="mission in missions">
    <fieldset :class="MissionsState(mission.idReward,mission)">
      <div class="badge" :class="BadgeState(mission.idReward,mission)">
        <img
          class="badgebg"
          :class="BgState(mission.idReward,mission)"
          :src="imgBdg(mission.idReward)"
        />
      </div>
      <h3>{{ mission.title }}</h3>
      <p class="idk">{{ complete(mission.users, mission.id,mission) }}</p>
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
        @click="addBadge(mission.idReward)"
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
      badges: this.missionStore.getRewards,
    };
  },
  methods: {
    imgBdg(id){
      this.badges.forEach(badge=>{
        if(badge.id == id){
          console.log(badge.path)
          return badge.path
        }
      })
    },
    complete(users, id,mission) {
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
        if (this.user.idRewards.find((reward) => reward == missionReward)) {
          return "fieldG";
        } else if (
          mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
          mission.users.find((user) => user[2] == "Em progresso"))
         {
          return "fieldY";
        } else if(mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
          mission.users.find((user) => user[2] == "Não começou")) {
          return "fieldR";
        }else{
          return "fieldY";
        }
    },
    BadgeState(missionReward,mission) {
      if (this.user.idRewards.find((reward) => reward == missionReward)) {
        return "badgeG";
      } else if (
        mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
        mission.users.find((user) => user[2] == "Em progresso"))
       {
        return "badgeY";
      } else if(mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
          mission.users.find((user) => user[2] == "Não começou")) {
          return "badgeR";
        }else{
          return "badgeY";
        }
    },
    BgState(missionReward,mission) {
      if (this.user.idRewards.find((reward) => reward == missionReward)) {
        return "bgG";
      } else if (
        mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
        mission.users.find((user) => user[2] == "Em progresso"))
       {
        return "bgY";
      } else if(mission.users.find((user) => user[0] == this.usersStore.getLogged) &&
          mission.users.find((user) => user[2] == "Não começou")) {
          return "bgR";
        }else{
          return "bgY";
        }
    },
    addBadge(missionReward) {
      console.log(missionReward)
      console.log(this.user.idRewards)
      if(!this.user.idRewards.find(id=>id==missionReward)){
        console.log('aaaa')
        this.user.idRewards.push(missionReward);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
