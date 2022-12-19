<script setup>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>
<!-- <script>
// import { RouterLink, RouterView } from "vue-router";
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();

    return { userStore, activityStore };
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
};
</script> -->

<template>
  <Nav />
  <Footer />
</template>

<style></style>
