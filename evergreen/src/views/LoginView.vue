<template>
  <div id="backgroundLogin">
    <!-- <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    > -->
    <div class="backBtnDiv">
      <RouterLink to="/">
        <img class="backbtn" src="../assets/icons/icones/arrowback.svg" />
      </RouterLink>
    </div>
    <form @submit.prevent="onSubmit">
      <div id="loginContent">
        <img id="loginImg" src="../assets/logored.svg" />
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

          <button class="btn-page link" id="ok" type="submit">Entrar</button>
        </div>
      </div>
      <br />
      <v-alert class="errorAlert" type="error" color="#E9674D" v-if="error">{{
        error
      }}</v-alert>
    </form>
    <!-- </v-form> -->
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
    async onSubmit() {
      let login = await this.userStore.login(this.email, this.password);
      let logged = this.userStore.getLogged;

      if (login == 401) {
        this.error = "Credenciais erradas!";
      } else if (logged.state == "blocked") {
        this.error = "Este utilizador foi bloqueado!";
      } else {
        if(logged.type == 'admin'){
          this.$router.push('/Admin');
        }else if(logged.type == 'security'){
          this.$router.push('/Occurences');
        }else if(logged.type == 'user'){
          this.$router.push('/Home');
        }


        // switch (logged.type) {
        //   case 'admin':
        //     this.$router.push("/Admin");
        //   case 'security':
        //     this.$router.push("/Occurences");
        //   case 'user':
        //     this.$router.push("/Home");
        // }
        
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
