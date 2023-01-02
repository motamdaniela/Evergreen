<template>
  <h1>Missões</h1>
  <div v-for="mission in missions">
    <h3>{{ mission.title }}</h3>
    <p>{{ mission.description }}</p>
    <button @click="redirect(mission.redirect)" class="btn-page">go</button>
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
    };
  },
  methods: {
    redirect(n) {
      this.$router.push(n);
    },
  },
};
</script>

<style lang="scss" scoped></style>
