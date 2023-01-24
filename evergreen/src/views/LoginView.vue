<template>
  <div id="backgroundLogin">
    <v-form ref="form" @submit.prevent="onSubmit">
      <div id="loginContent">
        <img id="loginImg" src="../assets/logored.svg" />
        <!-- <form> -->
        <label for="email" class="semiTitle">E-mail / Nome de utilizador</label>
        <br />
        <input class="input" id="email" v-model="email" required />
        <br />
        <label for="pass" class="semiTitle" required>Palavra-passe</label>
        <br />
        <input
          class="input"
          id="pass"
          v-model="password"
          type="password"
          required
        />
        <br />
        <div id="btns">
          <RouterLink
            style="margin: 10px 10px 0px 40px"
            class="link"
            id="signUpBtn"
            to="/signUp"
            >Registar</RouterLink
          >

          <button class="btn-page link" id="ok" type="submit" @click="onSubmit">
            Entrar
          </button>
        </div>
        <!-- </form> -->
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
    onSubmit(e) {
      console.log(this.email);
      let users = this.userStore.getUsers;
      let login = this.userStore.login(this.email, this.password);
      if (this.email && this.password) {
        if (login == "userWrong") {
          this.error = "Credenciais erradas!";
        } else if (login == "userBlocked") {
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
        } else if (
          users.find(
            (u) => u.email == this.userStore.getLogged && u.type == "security"
          )
        ) {
          this.$router.push("/Occurences");
        }
      }
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
