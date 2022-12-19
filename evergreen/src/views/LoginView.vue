<template>
  <div id="background">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <label for="email" class="semiTitle">E-mail</label>
      <br />
      <input class="input" id="email" v-model="email" type="email" />
      <br />
      <label for="pass" class="semiTitle">Palavra-passe</label>
      <br />
      <input class="input" id="pass" v-model="password" type="password" />
      <br />
      <div id="btns">
        <RouterLink class="link" id="signUpBtn" to="/signUp"
          >Registar</RouterLink
        >
        <button class="btn-page link" id="ok" type="submit">Entrar</button>
      </div>
    </v-form>
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
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.userStore.login(this.email, this.password);
      let user = this.userStore.getLogged;
      let users = this.userStore.getUsers;
      if (users.find((u) => u.email == user && u.type == "user")) {
        this.$router.push("/Home");
      } else if (users.find((u) => u.email == user && u.type == "admin")) {
        this.$router.push("/Admin");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
