<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data: () => ({
    drawer: false,
    group: null,
    collapse: false,
    tohide: "",
  }),

  methods: {
    isLogged(){
      let acc = sessionStorage.getItem("user")
      if (acc){
        return true;
      }else{
        return false;
      }
    },
    ToHide() {
      this.tohide = "hide";
      alert(this.tohide);
    },
  },

  computed: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
      if (this.offsetTop > 0) {
        this.collapse = true;
      }
    },
  },
};
</script>

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
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
        <RouterLink v-else to="/Home"
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
      </v-app-bar-title>

      <nav v-if="isLogged">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">Faq</RouterLink>
        <button id="login">
          <RouterLink v-on:click="ToHide" to="/login">Entrar</RouterLink>
        </button>
        <button id="signup">
          <RouterLink to="/signUp">Registar</RouterLink>
        </button>
      </nav>
      <nav v-else>
        <RouterLink to="/Home">Página principal</RouterLink>
        <RouterLink to="/Activities">Atividades</RouterLink>
        <RouterLink to="/Ocorrence">Ocorrências</RouterLink>
        <RouterLink to="/Form">Questionário</RouterLink>
        <RouterLink to="/Missions">Missões</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">Faq</RouterLink>
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

  <footer>
    <div>
      <img src="./assets/logored.svg" id="logo"/>
    </div>
    <div>
      <a href="#">Beatriz Rodrigues</a>
      <a href="#">Daniela Monteiro</a>
      <a href="#">Daniela Moreira</a>
    </div>
  </footer>
</template>

<style></style>
