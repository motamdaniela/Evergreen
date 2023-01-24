<template>
  <div>
    <v-dialog v-model="dialogAdd">
      <div class="fieldPklight modal">
        <v-card>
          <v-card-title>Novo Admin</v-card-title>
          <v-form ref="form" lazy-validation @submit.prevent="onSubmit">
            <v-row>
              <v-col style="width: 50%">
                <label class="semiTitle">Tipo</label><br />
                <select class="inputSmall" v-model="this.newAdmin.type">
                  <option value="admin">Admin</option>
                  <option value="security">Segurança</option>
                </select>
                <label for="name" class="semiTitle">Nome</label>
                <br />
                <input
                  class="inputSmall"
                  id="name"
                  v-model="this.newAdmin.name"
                />
                <br />
                <label for="email" class="semiTitle">E-mail</label>
                <br />
                <input
                  class="inputSmall"
                  id="email"
                  v-model="this.newAdmin.email"
                  type="email"
                />
              </v-col>
              <v-col>
                <label for="username" class="semiTitle"
                  >Nome de utilizador</label
                >
                <br />
                <input
                  class="inputSmall"
                  id="username"
                  v-model="this.newAdmin.username"
                />
                <br />
                <label for="pass" class="semiTitle">Palavra-passe</label>
                <br />
                <input
                  class="inputSmall"
                  id="pass"
                  v-model="this.newAdmin.password"
                  type="password"
                />
                <br />
                <label for="confirm" class="semiTitle"
                  >Confirmar palavra-passe</label
                >
                <br />
                <input
                  class="inputSmall"
                  id="confirm"
                  v-model="this.newAdmin.passConf"
                  type="password"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions>
            <button class="btn-page btnPk" @click="onSubmit">Criar</button>
            <button class="btn-page btnPklight" @click="dialogAdd = false">
              Cancelar
            </button>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>

  <v-layout>
    {{ getUser }}
    <v-app-bar
      class="appBar"
      color="transparent"
      flat
      :collapse="collapse"
      collapse-on-scroll="!collapse"
      inverse-scroll
      v-if="ToHide"
    >
      <v-app-bar-title>
        <RouterLink v-if="!isLogged" to="/"
          ><img
            style="margin-right: 500px; margin-top: 30px"
            src="src/assets/logored.svg"
            id="logo"
        /></RouterLink>
        <RouterLink v-else to="/Home"
          ><img
            style="margin-right: 250px; margin-top: 30px"
            src="src/assets/logored.svg"
            id="logo"
        /></RouterLink>
      </v-app-bar-title>

      <nav v-if="!isLogged">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q.</RouterLink>
        <button id="login" class="navbtn btnP">
          <RouterLink v-on:click="ToHide" to="/login">Entrar</RouterLink>
        </button>
        <button id="signup" class="navbtn btnG">
          <RouterLink to="/signUp">Registar</RouterLink>
        </button>
      </nav>
      <nav v-if="isLogged && this.user.type == 'user'">
        <RouterLink to="/Home">Página principal</RouterLink>
        <RouterLink to="/Activities">Atividades</RouterLink>
        <RouterLink to="/Occurrence">Ocorrências</RouterLink>
        <RouterLink to="/Form">Questionário</RouterLink>
        <RouterLink to="/Missions"><v-badge :value="notifs" @change="updateNotifs" dot floating color="success">Missões</v-badge></RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q.</RouterLink>
        <button v-if="this.$route.name == 'Profile'" @click="logOut">
          <img
            style="width: 30px; height: 25px"
            src="src/assets/icons/icones/logout.svg"
          />
        </button>
        <RouterLink v-else to="/Profile">
          <img :src="this.user.photo" id="profilePhoto" />
        </RouterLink>
      </nav>
      <nav v-if="isLogged && this.user.type == 'admin'">
        <button @click="dialogAdd = true">
          <img style="width: 30px" src="src/assets/icons/icones/addUser.svg" />
        </button>
        <button @click="logOut">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
      </nav>
      <nav v-if="isLogged && this.user.type == 'security'">
        <button @click="logOut">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
      </nav>

      <v-app-bar-nav-icon
        id="ddmenu"
        variant="text"
        @click.stop="drawer = !drawer"
        >=</v-app-bar-nav-icon
      >
    </v-app-bar>

    <v-navigation-drawer
      class="bg-green"
      v-model="drawer"
      location="right"
      temporary
    >
      <v-list>
        <v-list-item title="About" value="about"> </v-list-item>
        <v-list-item title="login" value="login"> </v-list-item>
        <v-list-item title="About" value="about"> </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> </v-main>
  </v-layout>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { useUsersStore } from "@/stores/User";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const usersStore = useUsersStore();
    const Logged = usersStore.getLoggedObj;
    const missionStore = useMissionStore();
    return { usersStore, Logged , missionStore};
  },
  created() {
    this.users = this.usersStore.getUsers;
    // this.user = this.users.find((user)=> user.email == this.usersStore.getLogged)
  },
  name: "App",
  data() {
    return {
      users: this.usersStore.getUsers,
      user: this.usersStore.getUsers.find(
        (user) => user.email == this.usersStore.getLogged
      ),
      drawer: false,
      group: null,
      collapse: false,
      tohide: "",

      newAdmin: {
        type: "",
        name: "",
        email: "",
        school: "",
        username: "",
        password: "",
        passConf: "",
      },
      dialogAdd: false,
      notifs: false,
    };
  },
  computed: {
    isLogged() {
      if (this.usersStore.getLogged) {
        return true;
      } else {
        return false;
      }
    },
    ToHide() {
      if (!(this.$route.name == "login" || this.$route.name == "signUp")) {
        return true;
      } else {
        return false;
      }
    },
    getUser() {
      (this.users = this.usersStore.getUsers),
        (this.user = this.usersStore.getUsers.find(
          (user) => user.email == this.usersStore.getLogged
        ));
    },
  },
  methods: {
    logOut() {
      this.usersStore.logOut();
      this.$router.push("/");
    },
    onSubmit() {
      this.dialogAdd = false;
      this.usersStore.newAdmin(
        this.newAdmin.type,
        this.newAdmin.name,
        this.newAdmin.email,
        this.newAdmin.username,
        this.newAdmin.password,
        this.newAdmin.passConf
      );
      this.newAdmin.type = "";
      this.newAdmin.name = "";
      this.newAdmin.email = "";
      this.newAdmin.username = "";
      this.newAdmin.password = "";
      this.newAdmin.passConf = "";
    },
    updateNotifs() {
      missionsStore.missions.users.forEach((user) => {
        if(user[2] = "Concluída" || !(user.rewards.includes(mission.reward))){
          notifs = true;
        } else {
          notifs = false;
        }
      })
      
      
    }
  },

  // computed: {
  //   onScroll(e) {
  //     this.offsetTop = e.target.scrollTop;
  //     if (this.offsetTop > 0) {
  //       this.collapse = true;
  //     }
  //   },
  // },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
