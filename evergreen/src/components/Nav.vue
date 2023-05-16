<template>
  <div>
    <v-dialog v-model="dialogAdd">
      <div class="fieldPklight modal">
        <v-card-title>Novo Admin</v-card-title>
        <form @submit.prevent="onSubmit">
          <div class="adminRow">
            <div style="width: 50%">
              <label class="semiTitle">Tipo</label><br />
              <select class="inputSmall" v-model="this.newAdmin.type" required>
                <option value="admin">Admin</option>
                <option value="security">Segurança</option>
              </select>
              <label for="name" class="semiTitle">Nome</label>
              <br />
              <input
                class="inputSmall"
                id="name"
                v-model="this.newAdmin.name"
                required
              />
              <br />
              <label for="email" class="semiTitle">E-mail</label>
              <br />
              <input
                class="inputSmall"
                id="email"
                v-model="this.newAdmin.email"
                type="email"
                required
              />
            </div>
            <div style="width: 50%">
              <label for="username" class="semiTitle">Nome de utilizador</label>
              <br />
              <input
                class="inputSmall"
                id="username"
                v-model="this.newAdmin.username"
                required
              />
              <br />
              <label for="pass" class="semiTitle">Palavra-passe</label>
              <br />
              <input
                class="inputSmall"
                id="pass"
                v-model="this.newAdmin.password"
                type="password"
                required
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
                required
              />
            </div>
          </div>
          <div class="btnAdm">
            <button
              class="btn-page btnPk"
              id="addBtn"
              type="submit"
              @click="onSubmit"
            >
              Criar
            </button>
            <button class="btn-page btnPklight" @click="dialogAdd = false">
              Cancelar
            </button>
          </div>
        </form>
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

      <nav class="longNav" v-if="!isLogged">
        <RouterLink class="homeLink" to="/">Início</RouterLink>
        <RouterLink class="aboutLink" to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink class="faqLink" to="/faq">F.A.Q.</RouterLink>
        <button id="login" class="navbtn btnP">
          <RouterLink v-on:click="ToHide" to="/login">Entrar</RouterLink>
        </button>
        <button id="signup" class="navbtn btnG">
          <RouterLink to="/signUp">Registar</RouterLink>
        </button>
      </nav>
      <nav class="longNav" v-if="isLogged && this.user.type == 'user'">
        <RouterLink  class="homeLink" to="/Home">Página principal</RouterLink>
        <RouterLink  class="actLink" to="/Activities">Atividades</RouterLink>
        <RouterLink  class="ocLink" to="/Occurrence">Ocorrências</RouterLink>
        <RouterLink  class="formLink" to="/Form">Questionário</RouterLink>
        <RouterLink  class="missionsLink" to="/Missions"
          >Missões<v-badge
            v-if="updateNotifs"
            dot
            floating
            offset-y="-10"
            color="success"
          ></v-badge
        ></RouterLink>
        <RouterLink  class="aboutLink" to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink class="faqLink" to="/faq">F.A.Q.</RouterLink>
        <button v-if="this.$route.name == 'Profile'" @click="logOut">
          <img
            class="logoutbtn"
            style="width: 30px; height: 25px"
            src="src/assets/icons/icones/logout.svg"
          />
        </button>
        <RouterLink v-else to="/Profile" class="navbtn">
          <img :src="this.user.photo" id="profilePhoto" />
        </RouterLink>
      </nav>
      <nav v-if="isLogged && this.user.type == 'admin'">
        <button @click="dialogAdd = true" class="addbtn">
          <img style="width: 30px" src="src/assets/icons/icones/addUser.svg" />
        </button>
        <button @click="logOut" class="navbtn logoutbtn">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
      </nav>
      <nav v-if="isLogged && this.user.type == 'security'">
        <button @click="logOut" class="navbtn logoutbtn">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
      </nav>

      <v-app-bar-nav-icon
        v-if="!isLogged || (isLogged && this.user.type == 'user')"
        id="ddmenu"
        @click.stop="drawer = !drawer"
      >
        <img style="width: 30px" src="/src/assets/icons/icones/menu.svg" />
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
    >
      <v-list v-if="!isLogged">
        <RouterLink class="drawerLink" to="/"
          ><v-list-item title="Início"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/sobre"
          ><v-list-item title="Sobre Eco-Escolas"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/faq"
          ><v-list-item title="F.A.Q."></v-list-item
        ></RouterLink>
        <br />
        <RouterLink class="drawerLink" to="/login"
          ><v-list-item title="Entrar"></v-list-item
        ></RouterLink>
        <br />
        <RouterLink class="drawerLink" to="/signUp"
          ><v-list-item title="Registar"></v-list-item
        ></RouterLink>
      </v-list>
      <v-list v-if="isLogged && this.user.type == 'user'">
        <RouterLink class="drawerLink" to="/Home"
          ><v-list-item title="Página Principal"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/Activities"
          ><v-list-item title="Atividades"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/Occurrence"
          ><v-list-item title="Ocorrências"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/Form"
          ><v-list-item title="Questionário"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/Missions"
          ><v-list-item title="Missões"></v-list-item
          ><v-badge
            v-if="updateNotifs"
            dot
            floating
            offset-y="-10"
            color="success"
          ></v-badge
        ></RouterLink>
        <RouterLink class="drawerLink" to="/sobre"
          ><v-list-item title="Sobre Eco-Escolas"></v-list-item
        ></RouterLink>
        <RouterLink class="drawerLink" to="/faq"
          ><v-list-item title="F.A.Q"></v-list-item
        ></RouterLink>
        <br />
        <button v-if="this.$route.name == 'Profile'" @click="logOut">
          <img
            class="logoutbtn"
            style="width: 30px; height: 25px"
            src="src/assets/icons/icones/logout.svg"
          />
        </button>
        <RouterLink v-else to="/Profile" class="drawerLink">
          <v-list-item title="Perfil"></v-list-item>
        </RouterLink>
      </v-list>

      <v-list v-if="isLogged && this.user.type == 'admin'">
        <button @click="dialogAdd = true" class="addbtn">
          <img style="width: 30px" src="src/assets/icons/icones/addUser.svg" />
        </button>
        <button @click="logOut" class="navbtn logoutbtn">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
      </v-list>
      <v-list v-if="isLogged && this.user.type == 'security'">
        <button @click="logOut" class="navbtn logoutbtn">
          <img style="width: 30px" src="src/assets/icons/icones/logout.svg" />
        </button>
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
    return { usersStore, Logged, missionStore };
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
    };
  },
  updated() {},
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
    updateNotifs() {
      let y = [];
      let missions = this.missionStore.getMissions;
      console.log(missions);
      missions.forEach((mission) => {
        mission.users.forEach((user) => {
          if (
            user[2] == "Concluída" &&
            !this.user.rewards.includes(mission.reward) &&
            user[0] == this.user.email
          ) {
            y.push(mission);
          }
        });
      });
      console.log(y);
      if (y.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    logOut() {
      this.usersStore.logOut();
      this.$router.push("/");
    },
    onSubmit() {
      if (this.newAdmin.password.indexOf(" ") != -1) {
        alert("Palavra-passe não pode conter espaços.");
      } else if (this.newAdmin.password.length < 8) {
        alert("Palavra-passe tem de ter no mínimo 8 caracteres.");
      } else if (this.newAdmin.username.indexOf(" ") != -1) {
        alert("Nome de utilizador não pode conter espaços.");
      } else if (this.newAdmin.username.length < 3) {
        alert("Nome de utilizador tem de ter no mínimo 3 caracteres.");
      } else {
        if (this.newAdmin.type && this.newAdmin.name && this.newAdmin.email && this.newAdmin.username && this.newAdmin.password && this.newAdmin.passConf) {
          this.dialogAdd = false;
          this.usersStore.newAdmin( this.newAdmin.type, this.newAdmin.name, this.newAdmin.email, this.newAdmin.username, this.newAdmin.password, this.newAdmin.passConf);
          this.newAdmin.type = "";
          this.newAdmin.name = "";
          this.newAdmin.email = "";
          this.newAdmin.username = "";
          this.newAdmin.password = "";
          this.newAdmin.passConf = "";
        }
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
@import "../assets/styles/nav.css";
</style>
