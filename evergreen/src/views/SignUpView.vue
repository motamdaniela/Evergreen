<template>
  <div id="backgroundSign">
    <v-form ref="form" @submit.prevent="onSubmit">
      <div id="signContent">
        <img id="signImg" src="../assets/logored.svg" />
        <!-- <form> -->
        <div id="group">
          <div id="col1">
            <label for="name" class="semiTitle">Nome</label>
            <br />
            <input class="input" id="name" v-model="name" required />
            <br />
            <label for="email" class="semiTitle">E-mail</label>
            <br />
            <input
              class="input"
              id="email"
              v-model="email"
              type="email"
              required
            />
            <br />
            <label for="username" class="semiTitle">Nome de utilizador</label>
            <br />
            <input class="input" id="username" v-model="username" required />
          </div>
          <div id="col2">
            <label for="school" class="semiTitle">Escola</label>
            <br />
            <select v-model="school" id="school" class="input" required>
              <option v-for="school in schools">{{ school.name }}</option>
            </select>
            <br />
            <label for="pass" class="semiTitle">Palavra-passe</label>
            <br />
            <input
              class="input"
              id="pass"
              v-model="password"
              type="password"
              required
            />
            <br />
            <label for="confirm" class="semiTitle"
              >Confirmar palavra-passe</label
            >
            <br />
            <input
              class="input"
              id="confirm"
              v-model="passConf"
              type="password"
              required
            />
          </div>
        </div>
        <div>
          <button class="btn-page link" id="ok" type="submit" @click="onSubmit">
            Registar
          </button>
          <RouterLink
            style="margin: 10px 10px 0px 40px"
            class="link"
            to="/login"
            id="signUpBtn"
            >Entrar</RouterLink
          >
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
import { useSchoolStore } from "@/stores/School";

export default {
  setup() {
    const userStore = useUsersStore();

    const missionStore = useMissionStore();

    const schoolStore = useSchoolStore();

    return { userStore, missionStore, schoolStore };
  },
  data() {
    return {
      name: "",
      email: "",
      school: "",
      username: "",
      password: "",
      passConf: "",
      schools: this.schoolStore.getSchools,
      error: "",
    };
  },
  methods: {
    onSubmit(e) {
      if (
        this.name &&
        this.email &&
        this.username &&
        this.school &&
        this.password &&
        this.passConf
      ) {
        this.userStore.signUp(
          this.name,
          this.email,
          this.username,
          this.school,
          this.password,
          this.passConf
        );
        let user = this.userStore.getLogged;
        let users = this.userStore.getUsers;

        let signup = this.userStore.signUp(
          this.name,
          this.email,
          this.username,
          this.school,
          this.password,
          this.passConf
        );
        console.log(1);
        if (users.find((u) => u.email == user && u.type == "user")) {
          this.missionStore.addUser(this.email);
          this.$router.push("/Home");
        } else if (signup == "email") {
          this.error = "Este email já existe!";
        } else if (signup == "username") {
          this.error = "Este username já existe!";
        } else if (signup == "password") {
          this.error = "Confirme que a palavra-passe coincide.";
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
