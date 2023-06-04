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
          v-if="state[missions.indexOf(mission)][1] != mission.max"
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
      user: "",
      users: "",
      state: [],
      logged: "",
    };
  },

  async created() {
    await this.usersStore.fetchAllUsers();
    await this.usersStore.fetchLogged();
    this.user = this.usersStore.getLoggedObj;

    if (this.logged == undefined || this.logged == "") {
      await this.usersStore.fetchLogged();
      this.logged = this.usersStore.getLogged;
    }
    let missionsBD;
    if (this.missionStore.getMissions.length == 0) {
      let bd = await this.missionStore.getAllMissions();
      missionsBD = bd.missions;
    } else {
      missionsBD = this.missionStore.getMissions;
    }
    missionsBD.forEach((mission) => {
      this.missions.push(mission);
    });
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
      console.log(this.logged);
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        console.log("1");
        return "fieldG";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status == mission.max && user.user == this.logged._id
          ))
      ) {
        console.log("2");
        return "fieldY";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        console.log("3");
        return "fieldR";
      }
    },
    BadgeState(missionReward, mission) {
      if (this.user.rewards.find((reward) => reward == missionReward)) {
        return "badgeG";
      } else if (
        mission.users.find(
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status == mission.max && user.user == this.logged._id
          ))
      ) {
        return "badgeY";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
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
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status == mission.max && user.user == this.logged._id
          ))
      ) {
        return "bgY";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
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
          (user) => user.status == mission.max && user.user == this.logged._id
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
          (user) => user.status < mission.max && user.user == this.logged._id
        ) ||
        (!this.user.rewards.find((reward) => reward == missionReward) &&
          mission.users.find(
            (user) => user.status == mission.max && user.user == this.logged._id
          ))
      ) {
        return "btnMissionY";
      } else if (
        mission.users.find(
          (user) => user.status == 0 && user.user == this.logged._id
        )
      ) {
        return "btnMissionR";
      }
    },
    addBadge(missionReward) {
      if (!this.user.rewards.find((reward) => reward == missionReward)) {
        this.user.rewards.push(missionReward);
        this.missionStore.completeMission(this.logged._id, 9);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/missions.css";
</style>
