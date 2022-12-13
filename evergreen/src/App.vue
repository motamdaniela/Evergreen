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
        <RouterLink v-if="isLogged" to="/"
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
        <RouterLink v-else to="/Home"
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
      </v-app-bar-title>

      <nav>
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

<style>
#login {
  background-color: #e6dff6;
  box-shadow: 3px 5px 0px #c2afea;
}

#signup {
  background-color: #c0e0c7;
  box-shadow: 3px 5px 0px #62b273;
}

.hide,
#hide {
  display: none;
}
</style>
