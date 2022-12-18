<template>
  <div id="background">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <div id="group">
        <div>
          <label for="name" class="semiTitle">Nome</label>
          <br />
          <input class="input" id="name" v-model="name" />
          <br />
          <label for="email" class="semiTitle">E-mail</label>
          <br />
          <input class="input" id="email" v-model="email" type="email" />
          <br />
          <label for="school" class="semiTitle">Escola</label>
          <br />
          <input class="input" id="school" v-model="school" />
        </div>
        <div>
          <label for="course" class="semiTitle">Curso</label>
          <br />
          <input class="input" id="course" v-model="course" />
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

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      name: "",
      email: "",
      school: "",
      course: "",
      password: "",
      passConf: "",
    };
  },
  methods: {
    onSubmit() {
      this.userStore.signUp(
        this.email,
        this.name,
        this.password,
        this.school,
        this.course,
        this.passConf
      );
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
