<template>
  <h1 style="font-family:gliker; margin-top:30px">Quadro de Líderes</h1>
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
      users: [],
    };
  },
  created() {
    let users2 = this.userStore.getUsers;
    let list = [];
    users2.forEach((user) => {
      if (user.type == "user") {
        list.push(user);
      }
    });
    if (list.length > 1) {
      this.users = list;
    } else {
      this.users.push(list);
    }
    this.users.sort((a, b) => {
      return b.points - a.points;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
