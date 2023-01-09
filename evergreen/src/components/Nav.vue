<template>
  <v-layout>
    <v-app-bar
      color="transparent"
      flat
      :collapse="collapse"
      collapse-on-scroll="!collapse"
      inverse-scroll
      id="{{tohide}}"
    >
      <v-app-bar-title>
        <RouterLink v-if="!isLogged" to="/"
          ><img src="../assets/logored.svg" id="logo"
        /></RouterLink>
        <RouterLink v-else to="/"
          ><img src="../assets/logored.svg" id="logo"
        /></RouterLink>
      </v-app-bar-title>

      <nav v-if="!isLogged">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q.</RouterLink>
        <button id="login" class="navbtn btnP">
          <RouterLink v-on:click="ToHide" to="/login">Entrar</RouterLink>
        </button>
        <button id="signup" class="navbtn btnG">
          <RouterLink to="/signUp">Registar</RouterLink>
        </button>
      </nav>
      <nav v-else>
        <RouterLink to="/Home">Página principal</RouterLink>
        <RouterLink to="/Activities">Atividades</RouterLink>
        <RouterLink to="/Occurrence">Ocorrências</RouterLink>
        <RouterLink to="/Form">Questionário</RouterLink>
        <RouterLink to="/Missions">Missões</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q.</RouterLink>
        <button id="profile">
          <RouterLink to="/Profile">Perfil</RouterLink>
        </button>
      </nav>

      <v-app-bar-nav-icon
        id="ddmenu"
        variant="text"
        @click.stop="drawer = !drawer"
        >=</v-app-bar-nav-icon
      >
    </v-app-bar>

    <v-navigation-drawer
      class="bg-green"
      v-model="drawer"
      location="right"
      temporary
    >
      <v-list>
        <v-list-item title="About" value="about"> </v-list-item>
        <v-list-item title="login" value="login"> </v-list-item>
        <v-list-item title="About" value="about"> </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> </v-main>
  </v-layout>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { useUsersStore } from "@/stores/User";
export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  name: "App",
  data() {
    return {
      drawer: false,
      group: null,
      collapse: false,
      tohide: "",
    };
  },
  computed: {
    isLogged() {
      let acc = this.userStore.getLogged;
      console.log(acc != "");
      // let acc = sessionStorage.getItem("user");
      if (acc) {
        console.log(acc);
        return true;
      } else {
        return false;
      }
    },
    ToHide() {
      this.tohide = "hide";
      // alert(this.tohide);
    },
  },

  // computed: {
  //   onScroll(e) {
  //     this.offsetTop = e.target.scrollTop;
  //     if (this.offsetTop > 0) {
  //       this.collapse = true;
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
