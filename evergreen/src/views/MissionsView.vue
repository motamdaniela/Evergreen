<template>
  <h1>Missões</h1>
  <div v-for="mission in missions">
    <h3>{{ mission.title }}</h3>
    <p>{{ mission.description }}</p>
    <!-- <button>{{ state(mission.users) }}</button>
    <button>{{ mission.users[0][2] }}</button> -->
    <input
      v-if="!state"
      @click="redirect(mission.redirect)"
      class="btn-page"
      value="go"
      type="button"
      {
      state(
      mission.users
      )
      }
    />
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
      state: "",
      user: this.usersStore.getLogged,
      users: "",
    };
  },
  created() {},
  methods: {
    redirect(n) {
      this.$router.push(n);
    },
    state() {},
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
      console.log(u);
    },
  },
};
</script>

<style lang="scss" scoped></style>
