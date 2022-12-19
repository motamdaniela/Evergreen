<script>
import { RouterLink, RouterView } from "vue-router";
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();

    return { userStore, activityStore };
  },
  name: "App",
  data() {
    return {
      drawer: false,
      group: null,
      collapse: false,
      tohide: "",
    };
  },
  created() {
    let predefinedUsers = [
      {
        type: "user",
        email: "user@gmail.com",
        username: "user",
        name: "name",
        password: "Esmad_2233",
        school: "school",
        course: "course",
        data: "data",
        photo:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        points: 0,
        badges: [],
        state: "active",
      },
      {
        type: "admin",
        email: "admin@gmail.com",
        username: "admin",
        name: "admin",
        password: "Esmad_2233",
        data: "data",
        state: "active",
      },
    ];
    let activities = [
      {
        id: 0,
        photo: "https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
        theme: "Água",
        date: "Maio",
        desc1: "Excesso de água dispendida em tarefas domésticas",
        desc2:
          "Sensibilizar a comunidade escolar para a necessidade de poupar água",
        desc3:
          "Divulgação, nas redes sociais, de informação de sensibilização para a poupança de água",
        title: "Sensibilização para poupança de água",
        coordinator: "admin@gmail.com",
        place: "Redes Sociais",
        users: [],
        participated: [],
      },
      {
        id: 1,
        photo: "https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
        theme: "Água",
        date: "Maio",
        desc1: "necessidade de regar árvores",
        desc2: "criar sistema de rega para as árvores",
        desc3: "Cada árvore dispor de um dispensador de água",
        title: "Dispensadores de água para árvores",
        coordinator: "admin@gmail.com",
        place: "Campus 2",
        users: [],
        participated: [],
      },
      {
        id: 2,
        photo: "https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
        theme: "Resíduos",
        date: "Maio",
        desc1: "Falta de local para colocação de pilhas para reciclagem",
        desc2:
          "Contribuir para a reciclagem de resíduos particularmente agressivos para o ambiente; Estimular estudantes e docentes a colocar as suas pilhas e baterias no recipiente próprio.",
        desc3: "Colocação de pilhão na escola",
        title: "Pilhão",
        coordinator: "admin@gmail.com",
        place: "Campus 2",
        users: [],
        participated: [],
      },
    ];
    let users = this.userStore.getUsers;
    predefinedUsers.forEach((user) => {
      if (users.find((u) => u.email == user.email)) {
        console.log("users have already been added");
      } else {
        this.userStore.add(user);
      }
    });

    let act = this.activityStore.getActivities;
    activities.forEach((activity) => {
      if (act.find((a) => a.id == activity.id)) {
        console.log("activities have already been added");
      } else {
        this.activityStore.add(activity);
      }
    });
  },

  methods: {
    isLogged() {
      let acc = this.userStore.getLogged();
      console.log(acc != "");
      // let acc = sessionStorage.getItem("user");
      if (acc) {
        console.log(acc);
        return true;
      } else {
        return false;
      }
    },
    ToHide() {
      this.tohide = "hide";
      alert(this.tohide);
    },
  },

  computed: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
      if (this.offsetTop > 0) {
        this.collapse = true;
      }
    },
  },
};
</script>

<template>
  <v-layout>
    <v-app-bar
      color="transparent"
      flat
      :collapse="collapse"
      collapse-on-scroll="!collapse"
      inverse-scroll
      id="{{tohide}}"
    >
      <v-app-bar-title>
        <RouterLink v-if="!isLogged" to="/"
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
        <RouterLink v-else to="/"
          ><img src="./assets/logored.svg" id="logo"
        /></RouterLink>
      </v-app-bar-title>

      <nav v-if="isLogged">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q</RouterLink>
        <button id="login" class="navbtn btnP">
          <RouterLink v-on:click="ToHide" to="/login">Entrar</RouterLink>
        </button>
        <button id="signup" class="navbtn btnG">
          <RouterLink to="/signUp">Registar</RouterLink>
        </button>
      </nav>
      <nav v-else>
        <RouterLink to="/Home">Página principal</RouterLink>
        <RouterLink to="/Activities">Atividades</RouterLink>
        <RouterLink to="/Ocorrence">Ocorrências</RouterLink>
        <RouterLink to="/Form">Questionário</RouterLink>
        <RouterLink to="/Missions">Missões</RouterLink>
        <RouterLink to="/sobre">Sobre Eco-Escolas</RouterLink>
        <RouterLink to="/faq">F.A.Q</RouterLink>
        <button id="profile">
          <RouterLink to="/Profile">Perfil</RouterLink>
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

  <footer>
    <div>
      <img src="./assets/logored.svg" style="width: 10rem" />
    </div>
    <br />
    <div>
      <a class="footerA" href="#">Beatriz Rodrigues</a>
      <a class="footerA" href="#">Daniela Monteiro</a>
      <a class="footerA" href="#">Daniela Moreira</a>
    </div>
  </footer>
</template>

<style></style>
