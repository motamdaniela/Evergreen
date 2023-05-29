import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

import API_URL from '../services/config.js'


export const useTestStore = defineStore("userTest", {
  state: () => ({
    // users: useStorage("users", []),
    testusers: [],
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
        authHeader() {
            // checks Local Storage for user item
            let user = JSON.parse(localStorage.getItem('user'));
        
            // if there is a logged in user with accessToken (JWT)
            if (user && user.accessToken) {
                // return HTTP authorization header for Node.js Express back-end
                return {
                    'Content-Type': 'application/json',
                    'x-access-token': user.accessToken
                };
            } else {
                return { 'Content-Type': 'application/json' }; //otherwise, return an empty object
            }
        },
      //! fetch users from database
      async fetchAllUsers() {
        //   return 'its going'
        //   return axios.get(API_URL + 'admin', { headers: authHeader() });
          const response = await fetch(`${API_URL}/users`, {
              method: "GET",
            //   headers: authHeader()
          });
          if (response.ok) {
              let data = await response.json();
              this.testusers = data;
              console.log("STORE - fetch ALL USERS ok", data)
              return data;
            }
            else
            {
              console.log('not ok')
              console.log("STORE - fetch ALL USERS error", response)
              // console.log(response)
              // throw Error(handleResponses(response.status));
          }     
      },

    handleResponses(code) {
        let message = "";
        switch (code) {
            case 401:
                message = "Not allowed to executed this action!";
                break;
            case 403:
                message = "Forbidden access";
                break;
            default:
                message = "Unkown message";
                break;
        }
        return message;
    },
      //!

      //! login action from database
      async loginTest(username, password) { // payload = user (username + password)
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("LOGIN SERVICE OK")
          console.log(data)
          if (data.accessToken)
          localStorage.setItem('user', JSON.stringify(data));
          return data;
        } else {
          console.log('please', response.ok);
          console.log("an error");
            // throw Error(handleResponses(response.status));
        }
    },


    // login action
    login(email, password) {
      let curUser = this.users.find(
        (user) =>
          (user.email == email && user.password == password) ||
          (user.username == email && user.password == password)
      );
      // checks if email and password exist in the users list
      if (curUser && curUser.state == "blocked") {
        // alert('user bloqued')
        return "userBlocked";
      } else if (curUser && curUser.state == "active") {
        let logged = this.users.find(
          (user) => user.email == email || user.username == email
        );
        this.logged = logged.email;
        // changes the login date
        let today = new Date();
        logged.previousLoginDate = +logged.loginDate;
        logged.loginDate = +(
          today.getFullYear() +
          "" +
          ((today.getMonth() + 1).toString().length < 2
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
          "" +
          (today.getDate().toString().length < 2
            ? "0" + today.getDate()
            : today.getDate())
        );
        let yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let yesterdayDate = +(
          yesterday.getFullYear() +
          "" +
          ((yesterday.getMonth() + 1).toString().length < 2
            ? "0" + (yesterday.getMonth() + 1)
            : yesterday.getMonth() + 1) +
          "" +
          (yesterday.getDate().toString().length < 2
            ? "0" + yesterday.getDate()
            : yesterday.getDate())
        );
        console.log(logged.previousLoginDate);
        // checks when was the last time the user logged in
        if (+logged.previousLoginDate == +yesterdayDate) {
          logged.streak += 1;
          logged.received = false;
        } else if (+logged.previousLoginDate < +logged.loginDate) {
          logged.streak = 1;
          logged.received = false;
        }
        return "active";
      } else {
        return "userWrong";
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

    // sign up action
    signUp(name, email, username, school, password, passConf) {
      // checks if email has already been used
      if (this.users.find((user) => user.email == email)) {
        return "email";
      } else if (this.users.find((user) => user.username == username)) {
        return "username";
      } else {
        let today = new Date();
        // checks if passwords match
        if (password == passConf) {
          let obj = {
            type: "user",
            email: email,
            username: username,
            name: name,
            password: password,
            school: school,
            previousLoginDate: 0,
            streak: 0,
            received: false,
            loginDate: +(
              today.getFullYear() +
              "" +
              ((today.getMonth() + 1).toString().length != 2
                ? "0" + (today.getMonth() + 1)
                : today.getMonth() + 1) +
              "" +
              (today.getDate().toString().length != 2
                ? "0" + today.getDate()
                : today.getDate())
            ),
            photo:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            points: 0,
            activities: 0,
            occurences: 0,
            rewards: [],
            state: "active",
            council: false,
          };
          this.users.push(obj);
          this.logged = obj.email;
        } else {
          return "password";
        }
      }
    },

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