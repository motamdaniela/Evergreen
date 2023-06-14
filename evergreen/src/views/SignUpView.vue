<template>
  <div id="backgroundSign">
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
      <div id="signContent">
        <img id="signImg" src="../assets/logored.svg" />
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
    <!-- </v-form> -->
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useSchoolStore } from "@/stores/School";
import { onMounted } from "vue";

export default {
  setup() {
    const userStore = useUsersStore();
    const schoolStore = useSchoolStore();

    return { userStore, schoolStore };
  },
  data() {
    return {
      name: "",
      email: "",
      school: "",
      username: "",
      password: "",
      passConf: "",
      schools: [],
      error: "",
      warning: "",
    };
  },
  async created() {
    let schoolsBD;
    if (this.schoolStore.getSchools.length == 0) {
      let bd = await this.schoolStore.getAllSchools();
      schoolsBD = bd.schools;
    } else {
      schoolsBD = this.schoolStore.getSchools;
    }
    schoolsBD.forEach((school) => {
      this.schools.push(school);
    });
  },
  methods: {
    async onSubmit() {
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
        let thisUser = await this.userStore.signUp(
          this.name,
          this.email,
          this.username,
          this.school,
          this.password,
          this.passConf
        );
        
        if(thisUser.status == 409){
          let msg = await thisUser.json();
           msg = msg.msg;
  
           if(msg == 'Email already in use!'){
            this.error = ''
             this.error = "Email já está em uso!"
           }else if(msg == 'Username already in use!'){
            this.error = ''
             this.error = "Nome de utilizador já está em uso!"
           }
        }
        
        if (thisUser.success == true) {
          await this.userStore.login(this.username, this.password);
          let logged = this.userStore.getLogged;
          if (logged.type == "user") {
            this.$router.push("/Home");
          } else if (logged.type == "admin") {
            this.$router.push("/Admin");
          } else if (logged.type == "security") {
            this.$router.push("/Occurences");
          }
        }
        
        

      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
