<template>
  <div id="background">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <div id="group">
        <div id="col1">
          <label for="name" class="semiTitle">Nome</label>
          <br />
          <input class="input" id="name" v-model="name" />
          <br />
          <label for="email" class="semiTitle">E-mail</label>
          <br />
          <input class="input" id="email" v-model="email" type="email" />
          <br />
          <label for="username" class="semiTitle">Nome de utilizador</label>
          <br />
          <input class="input" id="username" v-model="username" />
        </div>
        <div id="col2">
          <label for="school" class="semiTitle">Escola</label>
          <br />
          <input class="input" id="school" v-model="school" />
          <br />
          <label for="pass" class="semiTitle">Palavra-passe</label>
          <br />
          <input class="input" id="pass" v-model="password" type="password" />
          <br />
          <label for="confirm" class="semiTitle">Confirmar palavra-passe</label>
          <br />
          <input
            class="input"
            id="confirm"
            v-model="passConf"
            type="password"
          />
        </div>
      </div>
      <div id="btns">
        <button class="btn-page link" id="ok" type="submit">Registar</button>
        <RouterLink class="link" to="/login" id="signUpBtn">Entrar</RouterLink>
      </div>
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
      name: "",
      email: "",
      school: "",
      username: "",
      password: "",
      passConf: "",
    };
  },
  methods: {
    onSubmit() {
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
      if (users.find((u) => u.email == user && u.type == "user")) {
        this.missionStore.addUser(this.email);
        this.$router.push("/Home");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
