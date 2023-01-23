<template>
  <div id="backgroundLogin">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <label for="email" class="semiTitle">E-mail / Nome de utilizador</label>
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
      <br />
      <v-alert id="errorAlert" type="error" color="#E9674D" v-if="error">{{
        error
      }}</v-alert>
    </v-form>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const userStore = useUsersStore();
    const missionStore = useMissionStore();

    return { userStore, missionStore };
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    onSubmit() {
      // let user = this.userStore.getLogged;
      let users = this.userStore.getUsers;
      this.userStore.login(this.email, this.password);
      if (this.userStore.login(this.email, this.password) == "userWrong") {
        this.error = "Credenciais erradas!";
      } else if (
        this.userStore.login(this.email, this.password) == "userBlocked"
      ) {
        this.error = "Este utilizador foi bloqueado!";
      } else if (
        users.find(
          (u) => u.email == this.userStore.getLogged && u.type == "user"
        )
      ) {
        this.missionStore.addUser(this.email);
        this.$router.push("/Home");
      } else if (
        users.find(
          (u) => u.email == this.userStore.getLogged && u.type == "admin"
        )
      ) {
        this.$router.push("/Admin");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
