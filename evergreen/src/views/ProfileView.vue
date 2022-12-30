<template>
  <div>
    <h1>Perfil</h1>
    <button @click="logOut">sair</button>
    <p>{{ user.name }}</p>
    <p>{{ user.school }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      user: "",
    };
  },
  created() {
    let user = this.userStore.getLogged;
    let users = this.userStore.getUsers;
    users.forEach((u) => {
      if (u.email == user) this.user = u;
    });
  },
  methods: {
    logOut() {
      this.userStore.logOut();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
