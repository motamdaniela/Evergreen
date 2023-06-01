import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

import { AuthService } from '@/services/auth.service';

import API_URL from '../services/config.js'

export const useUsersStore = defineStore("user", {
  state: () => ({
    users: useStorage("users", []),
    logged: useSessionStorage("logged", ""),
  }),

  getters: {
    getLogged() {
      return this.logged;
    },

    getLoggedObj() {
      let user = this.users.find((user) => user.email == this.getLogged);
      return JSON.stringify(user);
    },

    getUsers() {
      return this.users;
    },

    getUsersUser() {
      let u = [];
      this.users.forEach((user) => {
        if (user.type == "user") {
          u.push(user);
        }
      });
      return u;
    },

    getTop3() {
      let usersU = [];
      this.users.forEach((user) => {
        if (user.type == "user") {
          usersU.push(user);
        }
      });
      usersU.sort(
        (a, b) =>
          b.points - a.points ||
          b.activities - a.activities ||
          b.occurences - a.occurences
      );

      let top = [];
      if (usersU.length < 3) {
        for (let i = 0; i < usersU.length; i++) {
          top.push(usersU[i]);
        }
      } else if (usersU.length >= 3) {
        for (let i = 0; i < 3; i++) {
          top.push(usersU[i]);
        }
      }
      return top;
    },
  },

  actions: {
    // login action
    authHeader() {
      // checks Local Storage for user item
      let accessToken = JSON.parse(sessionStorage.getItem('loggedUser'));
  
      // if there is a logged in user with accessToken (JWT)
      if (accessToken) {
          // return HTTP authorization header for Node.js Express back-end
          return {
              'Content-Type': 'application/json',
              'x-access-token': accessToken
          };
      } else {
          return { 'Content-Type': 'application/json' }; //otherwise, return an empty object
      }
  },

  //? PLEASE DEIXEM ESTE EM COMENTARIO
    // login(email, password) {
    //   let curUser = this.users.find(
    //     (user) =>
    //       (user.email == email && user.password == password) ||
    //       (user.username == email && user.password == password)
    //   );
    //   // checks if email and password exist in the users list
    //   if (curUser && curUser.state == "blocked") {
    //     // alert('user bloqued')
    //     return "userBlocked";
    //   } else if (curUser && curUser.state == "active") {
    //     let logged = this.users.find(
    //       (user) => user.email == email || user.username == email
    //     );
    //     this.logged = logged.email;
    //     // changes the login date
    //     let today = new Date();
    //     logged.previousLoginDate = +logged.loginDate;
    //     logged.loginDate = +(
    //       today.getFullYear() +
    //       "" +
    //       ((today.getMonth() + 1).toString().length < 2
    //         ? "0" + (today.getMonth() + 1)
    //         : today.getMonth() + 1) +
    //       "" +
    //       (today.getDate().toString().length < 2
    //         ? "0" + today.getDate()
    //         : today.getDate())
    //     );
    //     let yesterday = new Date(today);
    //     yesterday.setDate(yesterday.getDate() - 1);
    //     let yesterdayDate = +(
    //       yesterday.getFullYear() +
    //       "" +
    //       ((yesterday.getMonth() + 1).toString().length < 2
    //         ? "0" + (yesterday.getMonth() + 1)
    //         : yesterday.getMonth() + 1) +
    //       "" +
    //       (yesterday.getDate().toString().length < 2
    //         ? "0" + yesterday.getDate()
    //         : yesterday.getDate())
    //     );
    //     console.log(logged.previousLoginDate);
    //     // checks when was the last time the user logged in
    //     if (+logged.previousLoginDate == +yesterdayDate) {
    //       logged.streak += 1;
    //       logged.received = false;
    //     } else if (+logged.previousLoginDate < +logged.loginDate) {
    //       logged.streak = 1;
    //       logged.received = false;
    //     }
    //     return "active";
    //   } else {
    //     return "userWrong";
    //   }
    // },

    //? pedido de login
    async login(username, password) {
      console.log('its logging in')
      //* fetch da resposta ao pedido q queres  vpoe a rota q queres 
      const response = await fetch(`${API_URL}/users/login`, {
        //* v o metodo, headers e body
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        //* se for um post ou put e aqui q se metes os dados no body
        body: JSON.stringify({
          username: username,
          password:password
        })
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('loggedUser', JSON.stringify(data));
        this.logged = data.user.email;
        console.log('logged inn:', this.logged);
        return data;
    } else {
      console.log(response.status)
        // throw Error(AuthService.handleResponses(response.status));
    }
    },

    //? get users
    async fetchAllUsers(){
      const curUser = JSON.parse(sessionStorage.getItem('loggedUser'))
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": curUser.accessToken
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.users = data.users;
        console.log('users na store:', this.users);
        // console.log(data)
        return data;
      } else {
      // console.log(this.authHeader());
      console.log(response.status)
        // throw Error(AuthService.handleResponses(response.status));
    }
    },

    //? get users
    async fetchLoggedUser(){
      const curUser = JSON.parse(sessionStorage.getItem('loggedUser'))
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": curUser.accessToken
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.users = data.users;
        console.log('users na store:', this.users);
        // console.log(data)
        return data;
      } else {
      // console.log(this.authHeader());
      console.log(response.status)
        // throw Error(AuthService.handleResponses(response.status));
    }
    },

    // adds users
    add(obj) {
      obj.rank = this.getUsersUser.length + 1;
      this.users.push(obj);
    },

    logOut() {
      this.logged = "";
    },

    edit(obj) {
      obj = JSON.parse(obj);
      if (this.users.find((user) => user.email == obj.email)) {
        this.user = obj;
      }
    },

    delete(obj) {
      obj = JSON.parse(obj);
      if (this.users.find((user) => user.email == obj.email)) {
        this.users.pop(this.user);
      }
    },

    //? pedido de signup
    async signUp(name, email, username, school, password, passConf) {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          school:school,
          password:password,
          passConf:passConf
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(response.status);
        return data;
    } else {
      // console.log(response.status)
        throw Error(AuthService.handleResponses(response.status));
    }
    },

    // sign up action
    // signUp(name, email, username, school, password, passConf) {
    //   // checks if email has already been used
    //   if (this.users.find((user) => user.email == email)) {
    //     return "email";
    //   } else if (this.users.find((user) => user.username == username)) {
    //     return "username";
    //   } else {
    //     let today = new Date();
    //     // checks if passwords match
    //     if (password == passConf) {
    //       let obj = {
    //         type: "user",
    //         email: email,
    //         username: username,
    //         name: name,
    //         password: password,
    //         school: school,
    //         previousLoginDate: 0,
    //         streak: 0,
    //         received: false,
    //         loginDate: +(
    //           today.getFullYear() +
    //           "" +
    //           ((today.getMonth() + 1).toString().length != 2
    //             ? "0" + (today.getMonth() + 1)
    //             : today.getMonth() + 1) +
    //           "" +
    //           (today.getDate().toString().length != 2
    //             ? "0" + today.getDate()
    //             : today.getDate())
    //         ),
    //         photo:
    //           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    //         points: 0,
    //         activities: 0,
    //         occurences: 0,
    //         rewards: [],
    //         state: "active",
    //         council: false,
    //       };
    //       this.users.push(obj);
    //       this.logged = obj.email;
    //     } else {
    //       return "password";
    //     }
    //   }
    // },

    newAdmin(type, name, email, username, password, passConf) {
      // checks if email has already been used
      if (this.users.find((user) => user.email == email)) {
        alert("Email já existe");
      } else if (this.users.find((user) => user.username == username)) {
        alert("Nome de utilizador já existe");
      } else {
        // checks if passwords match
        if (password == passConf) {
          let obj = {
            type: type,
            email: email,
            username: username,
            name: name,
            password: password,
            data: "data",
            photo:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          };
          this.users.push(obj);
          alert("henlo");
        } else {
          alert("Password errada");
        }
      }
    },
  },
});
