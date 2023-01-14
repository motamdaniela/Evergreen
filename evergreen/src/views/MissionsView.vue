<template>
  <h1 class="title"><img src="../assets/images/flowerO.svg" />Missões</h1>
  <div v-for="mission in missions">
    <fieldset 
    :class="MissionsState(mission.reward)"
    >
      <img class="badge cover" 
      :class="BadgeState(mission.reward)"
      :src="mission.reward">
      <h3>{{ mission.title }}</h3>
      <p>{{ mission.description }}</p>
      <!-- <button>{{ state(mission.users) }}</button>
      <button>{{ mission.users[0][2] }}</button> -->
      <input
        @click="addBadge(mission.reward)"
        class="btn-page"
        value="go"
        type="button"
      />
    </fieldset>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useMissionStore } from "@/stores/Mission";
import { useUsersStore } from "@/stores/User";
import { isProxy, toRaw } from "vue";
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
      thestate: "",
      user:
      (this.usersStore.getUsers.find(usersStor => usersStor.email == this.usersStore.getLogged)),
      // this.usersStore.getLogged,
      users: "",
      fdefault: 'fieldY',
    };
  },
  created() {},
  methods: {
    redirect(n) {
      this.$router.push(n);
    },
  },
  computed: {
    state(users) {
      let u = "";
      let i = 0;
      u = users.find((element) => element.find((e) => e == this.user));
      // users.forEach((user) => {
      //   if (user[i][0] == this.user) {
      //     u = user[i];
      //   } else {
      //     i++;
      //   }
      // });
    },
  },
  methods: {
    MissionsState(missionBadge){
        if(this.user.badges == undefined){
          // console.log('none');
          return 'fieldR'
        }else if( this.user.badges.find((badge) => badge == missionBadge)){
          // console.log('slay');
          return 'fieldG'
        }else{
          // console.log('else');
          return 'fieldY'
        }
    },
    BadgeState(missionBadge){
        if(this.user.badges == undefined){
          // console.log('none');
          return 'badgeR'
        }else if( this.user.badges.find((badge) => badge == missionBadge)){
          // console.log('slay');
          return 'badgeG'
        }else{
          // console.log('else');
          return 'badgeY'
        }
    },
    addBadge(missionReward){
      this.user.badges.push(missionReward)
    }
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
