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
          <input class="input" id="name" v-model="form.name" />
          <br />
          <label for="email" class="semiTitle">E-mail</label>
          <br />
          <input class="input" id="email" v-model="form.email" type="email" />
          <br />
          <label for="school" class="semiTitle">Escola</label>
          <br />
          <input class="input" id="school" v-model="form.school" />
        </div>
        <div>
          <label for="course" class="semiTitle">Curso</label>
          <br />
          <input class="input" id="course" v-model="form.course" />
          <br />
          <label for="pass" class="semiTitle">Palavra-passe</label>
          <br />
          <input
            class="input"
            id="pass"
            v-model="form.password"
            type="password"
          />
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

// const userStore = useUsersStore;
export default {
  setup() {
    const userStore = useUsersStore();
    // userStore.signUp();
    return { userStore };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        school: "",
        course: "",
        password: "",
      },
      passConf: "",
      users: [],
    };
  },
  methods: {
    onSubmit() {
      this.userStore.signUp(
        this.form.email,
        this.form.name,
        this.form.password,
        this.form.school,
        this.form.course
      );
    },
  },
  // created() {
  //   this.users = JSON.parse(localStorage.getItem("users"));
  // },
  // methods: {
  //   onSubmit() {
  //     // let idk = this.users.find((user) => user.email == this.form.email);
  //     // if (idk) {
  //     //   alert("no");
  //     // } else if (idk == undefined) {
  //     //   if (this.form.pass == this.passConf) {
  //     //     alert("slay");
  //     // this.users.push(this.form);
  //     // localStorage.setItem("users", JSON.stringify(this.users));
  //     // localStorage.setItem("isAuthenticated", true);
  //     userStore.signUp(
  //       this.form.email,
  //       this.form.name,
  //       this.form.password,
  //       this.form.school,
  //       this.form.course
  //     );
  //     // } else {
  //     //   alert("nono");
  //     //   console.log(this.users);
  //     // }
  //     // }
  //   },
  // },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
