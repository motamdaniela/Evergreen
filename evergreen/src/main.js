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

let activities=[
  {
    id: 0,
    photo:"https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
    theme: "Água",
    date: "Maio",
    desc1: "Excesso de água dispendida em tarefas domésticas",
    desc2: "Sensibilizar a comunidade escolar para a necessidade de poupar água",
    desc3: "Divulgação, nas redes sociais, de informação de sensibilização para a poupança de água",
    title: "Sensibilização para poupança de água",
    coordinator: "admin@gmail.com",
    place: "Redes Sociais",
    users: [],
    participated: [],
  },
  {
    id: 1,
    photo:"https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
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
    photo:"https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg",
    theme: "Resíduos",
    date: "Maio",
    desc1: "Falta de local para colocação de pilhas para reciclagem",
    desc2: "Contribuir para a reciclagem de resíduos particularmente agressivos para o ambiente; Estimular estudantes e docentes a colocar as suas pilhas e baterias no recipiente próprio.",
    desc3: "Colocação de pilhão na escola",
    title: "Pilhão",
    coordinator: "admin@gmail.com",
    place: "Campus 2",
    users: [],
    participated: [],
  },

]
let list=localStorage.getItem("activities")
if(list=="[]"){
  localStorage.setItem("activities",JSON.stringify(activities))
}

// let predefinedUsers=[
//   {
//     type: 'user',
//     email: 'user@gmail.com',
//     name: 'name',
//     password: 'Esmad_2233',
//     school: 'school',
//     course: 'course',
//     data: 'data',
//     photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//     points: 0,
//     badges: [],
//   },
//   {
//     type: 'admin',
//     email: 'admin@gmail.com',
//     name: 'name',
//     password: 'Esmad_2233',
//     school: 'school',
//     course: 'course',
//     data: 'data',
//     photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//     points: 0,
//     badges: [],
//   }
// ]
// let list=localStorage.getItem("users")
// if(list=="[]"){
//   localStorage.setItem("users",JSON.stringify(predefinedUsers))
// }