import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.mount("#app");

import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";
import { useThemeStore } from "@/stores/Theme";


 
const userStore = useUsersStore();
const activityStore = useActivityStore();
const themeStore = useThemeStore();


// mandatory users
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

// all of the activities
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

// themes for the activities
let themes=[
  {
    id:0,
    name:"Água",
    color:"#C2AFEA",
  },
  {
    id:1,
    name:"Resíduos",
    color:"#E9674D",
  },
  {
    id:2,
    name:"Energia",
    color:"#62B273",
  },
  {
    id:3,
    name:"Espaços exteriores",
    color:"#3F824F",
  },
  {
    id:4,
    name:"Mar",
    color:"#774ED0",
  },
  {
    id:5,
    name:"Mobilidade",
    color:"#EFC6CD",
  },
  {
    id:6,
    name:"Outros",
    color:"#E9A13B",
  },
]


let users = userStore.getUsers;
predefinedUsers.forEach((user) => {
  if (users.find((u) => u.email == user.email)) {
    console.log("users have already been added");
  } else {
    userStore.add(user);
  }
});

let act = activityStore.getActivities;
activities.forEach((activity) => {
  if (act.find((a) => a.id == activity.id)) {
    console.log("activities have already been added");
  } else {
    activityStore.add(activity);
  }
});

let tms = themeStore.getThemes;
themes.forEach((theme) => {
  if (tms.find((t) => t.id == theme.id)) {
    console.log("themes have already been added");
  } else {
    themeStore.add(theme);
  }
});

