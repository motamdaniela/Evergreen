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
              @click="createAdmin()"
            >
              Criar
            </button>
            <button class="btn-page btnPklight" @click="dialogAdd = false">
              Cancelar
            </button>
          </div>
          <v-alert
            class="errorAlert"
            type="warning"
            color="#E9A13B"
            v-if="warning"
            >{{ warning }}</v-alert
          >
        </form>
      </div>
    </v-dialog>
  </div>

  <v-layout>
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
        <RouterLink v-if="!isLogged()" to="/"
          ><img
            style="margin-right: 500px; margin-top: 30px"
            width="25"
            height="25"
            src="/src/assets/logored.svg"
            id="logo"
            alt=""
        /></RouterLink>
        <RouterLink
          v-else-if="isLogged() && this.user.type == 'user'"
          to="/Home"
          name="homelink"
          ><img
            style="margin-right: 250px; margin-top: 30px"
            width="25"
            height="25"
            src="/src/assets/logored.svg"
            id="logo"
            alt=""
        /></RouterLink>
        <RouterLink v-else to="/Admin"
          ><img
            style="margin-right: 250px; margin-top: 30px"
            width="25"
            height="25"
            src="/src/assets/logored.svg"
            id="logo"
            alt=""
        /></RouterLink>
      </v-app-bar-title>
      <nav class="longNav" v-if="!isLogged()">
        <RouterLink class="homeLink" to="/" name="">Início</RouterLink>
        <RouterLink class="aboutLink" to="/sobre" name=""
          >Sobre Eco-Escolas</RouterLink
        >
        <RouterLink class="faqLink" to="/faq" name="">F.A.Q.</RouterLink>
        <button id="login" class="navbtn btnP">
          <RouterLink v-on:click="ToHide" to="/login" name=""
            >Entrar</RouterLink
          >
        </button>
        <button id="signup" class="navbtn btnG">
          <RouterLink to="/signUp" name="">Registar</RouterLink>
        </button>
      </nav>

      <nav
        class="longNav"
        :id="watchMe()"
        v-if="isLogged() && this.user.type == 'user'"
      >
        <RouterLink class="homeLink" to="/Home" name=""
          >Página principal</RouterLink
        >
        <RouterLink class="actLink" to="/Activities" name=""
          >Atividades</RouterLink
        >
        <RouterLink class="ocLink" to="/Occurrence" name=""
          >Ocorrências</RouterLink
        >
        <RouterLink class="formLink" to="/Form" name=""
          >Questionário</RouterLink
        >
        <RouterLink class="missionsLink" to="/Missions" name=""
          >Missões<v-badge
            v-if="this.notification"
            dot
            floating
            offset-y="-10"
            color="success"
          ></v-badge
        ></RouterLink>
        <RouterLink class="aboutLink" to="/sobre" name=""
          >Sobre Eco-Escolas</RouterLink
        >
        <RouterLink class="faqLink" to="/faq" name="">F.A.Q.</RouterLink>
        <button v-if="this.$route.name == 'Profile'" @click="logOut" alt="">
          <img
            class="logoutbtn navbtn"
            style="width: 20px; height: 25px"
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
        </button>
        <RouterLink v-else to="/Profile" class="navbtn" name="profilelink">
          <img :src="this.user.photo" id="profilePhoto" alt="" />
        </RouterLink>
      </nav>

      <nav v-if="isLogged() && this.user.type == 'admin'">
        <button @click="dialogAdd = true" class="addbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/addUser.svg"
            alt=""
          />
        </button>
        <button @click="logOut" class="navbtn logoutbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
        </button>
      </nav>
      <nav v-if="isLogged() && this.user.type == 'security'">
        <button @click="logOut" class="navbtn logoutbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
        </button>
      </nav>

      <v-app-bar-nav-icon
        v-if="!isLogged() || (isLogged() && this.user.type == 'user')"
        class="ddmenu"
        :id="watchMe()"
        @click.stop="drawer = !drawer"
      >
        <img
          style="width: 30px"
          src="/src/assets/icons/icones/menu.svg"
          alt=""
        />
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-list v-if="!isLogged()" role="">
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

      <v-list v-if="isLogged() && this.user.type == 'user'" role="">
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
            v-if="this.notification"
            dot
            floating
            offset-y="-10"
            color="success"
          ></v-badge>
        </RouterLink>
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
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
        </button>
        <RouterLink v-else to="/Profile" class="drawerLink" name="">
          <v-list-item title="Perfil"></v-list-item>
        </RouterLink>
      </v-list>

      <v-list
        v-if="
          isLogged() &&
          (this.user.type == 'admin' || this.user.type == 'security')
        "
        role=""
      >
        <button @click="dialogAdd = true" class="addbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/addUser.svg"
            alt=""
          />
        </button>
        <button @click="logOut" class="navbtn logoutbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
        </button>
      </v-list>
      <v-list v-if="isLogged() && this.user.type == 'security'" role="">
        <button @click="logOut" class="navbtn logoutbtn">
          <img
            style="width: 30px"
            src="/src/assets/icons/icones/logout.svg"
            alt=""
          />
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
    const userStore = useUsersStore();
    const missionStore = useMissionStore();

    return { userStore, missionStore };
  },
  data() {
    return {
      previousLogged: undefined,
      user: "",
      drawer: !1,
      group: null,
      collapse: !1,
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
      dialogAdd: !1,
      notification: false,
      missions: "",
      warning: "",
    };
  },
  async created() {
    this.missions = this.missionStore.getMissions;
    if (this.missions == undefined || this.missions == "") {
      await this.missionStore.getAllMissions();
      this.mission = this.missionStore.getMissions;
    }
    if (sessionStorage.getItem("loggedUser")) {
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
    }
  },
  async updated() {
    this.missions = this.missionStore.getMissions;
    if (this.missions == undefined || this.missions == "") {
      await this.missionStore.getAllMissions();
      this.mission = this.missionStore.getMissions;
    }

    this.user = this.userStore.getLogged;
    if (this.user == undefined || this.user == "") {
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
    }
  },

  computed: {
    ToHide() {
      this.$forceUpdate();
      return "login" != this.$route.name && "signUp" != this.$route.name;
    },
    async getUser() {
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
    },
  },
  methods: {
    async logOut() {
      await this.userStore.logOut();
      await this.$router.push("/");
    },
    async createAdmin() {
      let add = await this.userStore.createAdmin(
        this.newAdmin.type,
        this.newAdmin.name,
        this.newAdmin.email,
        this.newAdmin.username,
        this.newAdmin.password,
        this.newAdmin.passConf
      );
      console.log(add);

      if (add.status != 201) {
        let msg = await add.json();
        this.warning = msg.msg;
      } else {
        this.dialogAdd = false;
        this.newAdmin.type = "";
        this.newAdmin.name = "";
        this.newAdmin.email = "";
        this.newAdmin.username = "";
        this.newAdmin.password = "";
        this.newAdmin.passConf = "";
        this.warning = "";
      }
    },
    isLogged() {
      if (sessionStorage.getItem("loggedUser")) {
        return true;
      } else {
        return false;
      }
    },
    async watchMe() {
      this.missions = this.missionStore.getMissions;
      if (this.missions == undefined || this.missions == "") {
        await this.missionStore.getAllMissions();
        this.mission = this.missionStore.getMissions;
      }

      this.user = this.userStore.getLogged;
      if (this.user == undefined || this.user == "") {
        await this.userStore.fetchLogged();
        this.user = this.userStore.getLogged;
      }
      let arr = [];

      this.missions.forEach((mission) => {
        if (
          mission.users.find(
            (user) =>
              user.user == this.user._id &&
              user.status >= mission.max &&
              !this.user.rewards.find((reward) => reward == mission.reward)
          )
        ) {
          arr.push(mission);
        }
      });
      if (arr.length > 0) {
        this.notification = true;
      } else {
        this.notification = false;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
@import "../assets/styles/nav.css";
</style>
