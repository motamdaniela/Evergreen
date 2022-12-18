import {defineStore} from 'pinia'
// import {useLocalStorage } from '@vueuse/core'
// import { ref, computed } from "vue";
// import axios from 'axios'

export const useUsersStore = defineStore('user',{
  state: () => ({
    users:[],
    logged:"",
  }),

  getters: {
    getLogged(){
      return this.logged;
    },
    
    getUsers(){
      return this.users;
    }

  },

  actions: {
    login(email,password){
      if(this.users.find((user=>user.email==email && user.password==password))){
        this.logged=this.users.find((user=>user.email==email && user.password==password))
      }else{
        alert('nop')
      }
    },

    logOf(){
      this.logged=""
    },

    signUp(email,name,password,school,course){
      let obj={
        type: 'user',
        email: email,
        name: name,
        password: password,
        school: school,
        course: course,
        data: 'data',
        photo: '',
        points: 0,
        badges: [],
      }
      this.users.push(obj)
    }
  },

  
});

// const Users = ref(
//   useLocalStorage("users", [
//     {
//       type: "user",
//       email: "ex@gmail.com",
//       name: "Ana",
//       password: "123",
//       school: "ESMAD",
//       date: "",
//       photo: "",
//       points: 0,
//       badges: [],
//     },
//     {
//       type: "user",
//       email: "ex2@gmail.com",
//       name: "Marta",
//       password: "123",
//       school: "ESMAD",
//       date: "",
//       photo: "",
//       points: 0,
//       badges: [],
//     },
//   ])
// )

// const LoggedUser = ref(useLocalStorage("LoggedUser", {}));

// function CheckIfLoggedUserIsLogged() {
//   //Verifica se o LoggedUser consta na base de dados
//   if (
//     Users.value.find(
//       (user) =>
//         user.password == LoggedUser.value.password &&
//         user.id == LoggedUser.value.id && 
//         user.admin == LoggedUser.value.admin
//     )
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function LogIn(email, password) {
//   if (
//     Users.value.find(
//       (user) => user.email == email && user.password == password
//     )
//   ) {
//     LoggedUser.value = Users.value.find(
//       (user) => user.email == email && user.password == password
//     );
//   } else {
//     throw new Error("Email or password invalido");
//   }
// }


// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     type: "",
//     email: "",
//     name: "",
//     password: "",
//     school: "",
//     date: "",
//     photo: "",
//     points: "",
//     badges: [],
//   },
// });