<template>
  <h1 style="font-family:gliker; margin-top:30px">Quadro de Líderes</h1>
  <div v-for="user in users">
    <div class="board">
      <img :src=user.photo id="profilePic" />
      <p>
        {{ user.username }} <br />
        {{ user.school }}
      </p>
      <p>{{ user.points }} pontos</p>
      <p>{{ user.activities }} atividades</p>
      <p>{{ user.occurences }} ocorrências</p>
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
      this.users=list;
    
    // this.users.sort((a, b) => {
    //   return b.points - a.points;
    // });

    this.users.sort((a,b)=> b.points - a.points || b.activities - a.activities || b.occurences - a.occurences);
    
  },
  methods: {},
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
