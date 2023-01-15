<template>
  <div>
    <img id="ProfilePic" :src="user.photo"/>
    <p class="Name"><b>{{ user.name }}</b></p>
    <p><b>{{ user.school }}</b></p>
    <p>{{ user.email }}</p>
  </div>
  <div>
    <button v-on:click="givemetheanswer">Atividades Inscritas</button>
    <button>Atividades Participadas</button>
    <button>Ocorrências Feitas</button>
    <button>Ocorrências Pendentes</button>
    <button>Verificar presenças(alunos resp.)</button>
  </div>
  <div>
    <h2>Crachás</h2>
    <div class="badgesDiv">
      <img class="badge" v-for="badge in this.badges" :src="badge" />
    </div>
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
      badges: "",
    };
  },
  created() {
    let user = this.userStore.getLogged;
    let users = this.userStore.getUsers;
    users.forEach((u) => {
      if (u.email == user){
        this.user = u;
        this.badges = this.user.badges;
      }
    });

  },
  methods: {
    givemetheanswer(){
      console.log(this.user.badges);
    }
  },
};
</script>

<style scoped>
@import "../assets/styles/profile.css";
</style>
