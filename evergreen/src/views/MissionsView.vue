<template>
  <h1><img src="../assets/images/flowerO.svg">Missões</h1>
  <div v-for="mission in missions">
    <h3>{{ mission.title }}</h3>
    <p>{{ mission.description }}</p>
    <input
      @click="redirect(mission.redirect)"
      class="btn-page"
      value="go"
      type="button"
    />
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
      state: "",
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
