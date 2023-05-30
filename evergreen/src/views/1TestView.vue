<template>
    <div class="questionario">
      <h1>Sign up</h1>
      <form @submit.prevent="onSubmit">
      <div id="signContent">
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
          <button class="btn-page link" id="ok" type="submit">Registar</button>
          <RouterLink
            style="margin: 10px 10px 0px 40px"
            class="link"
            to="/login"
            id="signUpBtn"
            >Entrar</RouterLink
          >
        </div>
      </div>
      <br />
      <v-alert class="errorAlert" type="error" color="#E9674D" v-if="error">{{
        error
      }}</v-alert>
      <v-alert
        class="errorAlert"
        type="warning"
        color="#E9A13B"
        v-if="warning"
        >{{ warning }}</v-alert
      >
    </form>

      <!-- <h1>Lista de utilizadores</h1>
      <button @click="getAllUsers" class="btn-page">Show me</button> -->

      <div id="usersTable"></div>
    </div>
</template>

<script>
import { useTestStore } from "@/stores/1TestUser";
import { useSchoolStore } from "@/stores/School";
import {onMounted} from "vue"

export default{
  setup() {
    const testStore = useTestStore();
    const schoolStore = useSchoolStore();

    return { testStore, schoolStore };
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
      warning: "",
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.password.indexOf(" "));
      if (this.password.indexOf(" ") != -1) {
        this.warning = "Palavra-passe não pode conter espaços.";
        this.error = "";
      } else if (this.password.length < 8) {
        this.warning = "Palavra-passe tem de ter no mínimo 8 caracteres.";
        this.error = "";
      } else if (this.username.indexOf(" ") != -1) {
        this.warning = "Nome de utilizador não pode conter espaços.";
        this.error = "";
      } else if (this.username.length < 3) {
        this.warning = "Nome de utilizador tem de ter no mínimo 3 caracteres.";
        this.error = "";
      } else {
        this.testStore.signUpTest(
          this.name,
          this.email,
          this.username,
          this.school,
          this.password,
          this.passConf
        );
        // let user = this.testStore.getLogged;
        // let users = this.testStore.getUsers;
        // let signup = this.testStore.signUp(
        //   this.name,
        //   this.email,
        //   this.username,
        //   this.school,
        //   this.password,
        //   this.passConf
        // );
        // if (users.find((u) => u.email == user && u.type == "user")) {
        //   // this.missionStore.addUser(this.email);
        //   this.$router.push("/Home");
        // } else if (signup == "email") {
        //   this.error = "Este email já existe!";
        //   this.warning = "";
        // } else if (signup == "username") {
        //   this.error = "Este username já existe!";
        //   this.warning = "";
        // } else if (signup == "password") {
        //   this.error = "Confirme que a palavra-passe coincide.";
        //   this.warning = "";
        // }
      }
    },
  },

};
</script>
  