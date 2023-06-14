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
          <p class="idk">{{ complete(mission.users, mission._id) }}</p>
          <p>{{ mission.description }}</p>
          <br />
          <!-- <p
            style="font-weight: 600"
            v-if="state[missions.indexOf(mission)][0] == mission._id"
          >
            {{ state[missions.indexOf(mission)][1] }}
          </p>
          <p v-else></p> -->
        </div>
        <button
          v-if="state[missions.indexOf(mission)][1] < mission.max"
          @click="redirect(mission.redirect)"
          class="btn-page btnMission"
          :class="BtnState(mission.reward, mission)"
          :id="mission._id"
        >
          <img class="btnContent" src="/src/assets/icons/icones/goarrow.svg" />
        </button>

        <button
          v-else
          @click="
            addBadge(mission.reward, mission),
              BtnState(mission.reward, mission),
              lockState(mission.reward, mission),
              BgState(mission.reward, mission),
              BadgeState(mission.reward, mission),
              MissionsState(mission.reward, mission)
          "
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
      user: "",
      users: "",
      state: [],
      logged: "",
    };
  },

  async created() {
    // this.missionStore.$reset();
    await this.usersStore.fetchAllUsers();
    await this.usersStore.fetchLogged();

    if (this.logged == undefined || this.logged == "") {
      await this.usersStore.fetchLogged();
      this.logged = this.usersStore.getLogged;
    }
    let bd = await this.missionStore.getAllMissions();
    this.missions = bd.missions;
  },
  methods: {
    complete(users, id) {
      users.forEach((user) => {
        if (user.user == this.logged._id && id != undefined) {
          this.state.push([id, user.status]);
        }
      });
    },
    redirect(n) {
      this.$router.push(n);
    },
    MissionsState(missionReward, mission) {
      console.log(mission.users.find((user) => user.user == this.logged._id));
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
    async addBadge(missionReward, mission) {
      await this.missionStore.receiveBadge(missionReward);
      await this.missionStore.getAllMissions();
      await this.missionStore.completeMission(this.logged, 9);
      await this.usersStore.fetchAllUsers();
      await this.usersStore.fetchLogged();
      this.logged = this.usersStore.getLogged;
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
