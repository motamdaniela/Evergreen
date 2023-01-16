<template>
  <h1 class="title"><img src="../assets/images/flowerO.svg" />Missões</h1>
  <div v-for="mission in missions">
    <fieldset :class="MissionsState(mission.reward, mission.id)">
      <div class="badge" :class="BadgeState(mission.reward, mission.id)">
        <img
          class="badgebg"
          :class="BgState(mission.reward, mission.id)"
          :src="mission.reward"
        />
      </div>
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
      user: this.usersStore.getUsers.find(
        (usersStor) => usersStor.email == this.usersStore.getLogged
      ),
      // this.usersStore.getLogged,
      users: "",
      fdefault: "fieldY",
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
    MissionsState(missionBadge) {
      if (this.user.badges.find((badge) => badge == missionBadge)) {
        // console.log('none');
        return "fieldG";
      } else if (
        this.user.missions.find((mission) => mission == missionId) &&
        !this.user.badges.find((badge) => badge == missionBadge)
      ) {
        // console.log('slay');
        return "fieldY";
      } else {
        // console.log('else');
        return "fieldR";
      }
    },
    BadgeState(missionBadge, missionId) {
      if (this.user.badges.find((badge) => badge == missionBadge)) {
        // console.log('none');
        return "badgeG";
      } else if (
        this.user.missions.find((mission) => mission == missionId) &&
        !this.user.badges.find((badge) => badge == missionBadge)
      ) {
        // console.log('slay');
        return "badgeY";
      } else {
        // console.log('else');
        return "badgeR";
      }
    },
    BgState(missionBadge, missionId) {
      if (this.user.badges.find((badge) => badge == missionBadge)) {
        // console.log('none');
        return "bgG";
      } else if (
        this.user.missions.find((mission) => mission == missionId) &&
        !this.user.badges.find((badge) => badge == missionBadge)
      ) {
        // console.log('slay');
        return "bgY";
      } else {
        // console.log('else');
        return "bgR";
      }
    },
    addBadge(missionReward) {
      this.user.badges.push(missionReward);
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
