<template>
  <h1>{{ activity.title }}</h1>
  <h3>Diagnostico:</h3>
  <p>{{ activity.desc1 }}</p>
  <h3>Objetivos:</h3>
  <p>{{ activity.desc2 }}</p>
  <h3>Metas:</h3>
  <p>{{ activity.desc3 }}</p>
  <input
    v-if="!changeBtn"
    type="button"
    class="btn-page"
    id="sub"
    value="Inscrever"
    @click="subscribe"
  />
  <input
    v-else
    type="button"
    class="btn-page"
    id="unsub"
    value="Anular Inscrição"
    @click="unsubscribe"
  />
</template>

<script>
import { RouterLink } from "vue-router";
import { useActivityStore } from "@/stores/Activity";
import { useUsersStore } from "@/stores/User";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const activityStore = useActivityStore();
    const userStore = useUsersStore();
    const missionStore = useMissionStore();

    return { activityStore, userStore, missionStore };
  },
  name: "Activity",
  data() {
    return {
      activityId: this.$route.params.id,
      activities: [],
      activity: {},
      user: this.userStore.getLogged,
    };
  },
  created() {
    this.activities = this.activityStore.getActivities;
    this.activity = this.activities.find(
      (activity) => activity.id == this.activityId
    );
  },
  methods: {
    subscribe() {
      this.activityStore.updateUsers(this.user, this.activity.id);
      this.missionStore.completeMission(this.user, 0);
    },
    unsubscribe() {
      this.activity.users = this.activity.users.filter((e) => e != this.user);
    },
  },
  computed: {
    changeBtn() {
      let u = this.activity.users.find((user) => user == this.user);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
