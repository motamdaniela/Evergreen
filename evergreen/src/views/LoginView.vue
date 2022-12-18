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
      <input class="input" id="email" v-model="form.email" type="email" />
      <br />
      <label for="pass" class="semiTitle">Palavra-passe</label>
      <br />
      <input class="input" id="pass" v-model="form.password" type="password" />
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
// import { onMounted } from "vue";
// import { RouterLink } from "vue-router";
import { useUsersStore } from "../stores/User";

const userStore = useUsersStore;

// onMounted(async () => {
//   await user.getUser();
// });
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      users: [],
    };
  },
  // created() {
  //   this.users = JSON.parse(localStorage.getItem("users"));
  // },
  methods: {
    onSubmit() {
      let idk = this.users.find(
        (user) =>
          user.email == this.form.email && user.password == this.form.password
      );
      if (idk) {
        alert("slay");
        // localStorage.setItem("isAuthenticated", true);
        userStore.login(this.form.email, this.form.password);
      } else {
        alert("ui");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
