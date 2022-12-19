<template>
  <div v-for="user in users">
    <div class="board">
      <img src="../assets/images/joana.jpg" id="profilePic" />
      <p>
        {{ user.name }} <br />
        {{ user.school }}
      </p>
      <p>15 atividades</p>
      <p>7 ocorrências</p>
      <p>{{ user.points }} pontos</p>
      <div class="firstPlace">{{ users.indexOf(user) + 1 }}</div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      users: this.userStore.getUsers,
    };
  },
  created() {
    // orders by points
    this.users.sort((a, b) => {
      return b.points - a.points;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
