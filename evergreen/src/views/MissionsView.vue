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
      <p class="idk">{{ complete(mission.users, mission.id) }}</p>
      <p>{{ mission.description }}</p>
      <p v-if="state[mission.id][0] == mission.id">
        {{ state[mission.id][1] }}
      </p>
      <!-- <p>{{ slay(mission) }}</p> -->
      <!-- <button>{{ state(mission.users) }}</button>
      <button>{{ mission.users[0][2] }}</button> -->
      <!-- <input
        @click="addBadge(mission.reward)"
        class="btn-page"
        value="go"
        type="button"
      /> -->
      <input
        @click="redirect(mission.redirect)"
        class="btn-page"
        type="button"
        :id="mission.id"
        :class="complete(mission.users)"
        value="go"
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
      state: [],
    };
  },
  computed: {},
  methods: {
    complete(users, id) {
      users.forEach((user) => {
        if (user[0] == this.usersStore.getLogged && id != undefined) {
          console.log(id);
          this.state.push([id, user[2]]);
        }
      });
    },
    redirect(n) {
      this.$router.push(n);
    },
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
