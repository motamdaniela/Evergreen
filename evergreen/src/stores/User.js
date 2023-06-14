import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";

//* fzr import destas duas v
import { AuthService } from "@/services/auth.service";
import API_URL from "../services/config.js";

export const useUsersStore = defineStore("user", {
  state: () => ({
    users: [],
    logged: {},
  }),

  getters: {
    getLogged() {
      return this.logged;
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
      let accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));

      // if there is a logged in user with accessToken (JWT)
      if (accessToken) {
        // return HTTP authorization header for Node.js Express back-end
        return {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        };
      } else {
        return { "Content-Type": "application/json" }; //otherwise, return an empty object
      }
    },

    //? pedido de login
    async login(username, password) {
      console.log("STORE its logging in");
      //* fetch da resposta ao pedido q queres  vpoe a rota q queres
      const response = await fetch(`${API_URL}/users/login`, {
        //* v o metodo, headers e body
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        //* se for um post ou put e aqui q se metes os dados no body
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("loggedUser", JSON.stringify(data.accessToken));
        this.logged = data.user;
        return data.user;
      } else {
        console.log(response.status);
        return response.status;
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    //? fecth logged user
    async fetchLogged() {
      let accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/getLogged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.logged = data.user;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    //? get users
    async fetchAllUsers() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.users = data.users;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    //? subscribe council
    async subscribeCouncil() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/council`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // this.users = data.users;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    //? edit profile
    async editProfile(photo, username, password, confPassword) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const id = this.logged._id;
      const response = await fetch(`${API_URL}/users/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          photo: photo,
          username: username,
          password: password,
          confPassword: confPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // this.users = data.users;
        return data.users;
      } else {
        console.log(response.status);
        return response.status;
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    // ? admin edit
    async editUser(id, password, confPassword) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/adminEdit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          password: password,
          confPassword: confPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    async blockUser(id, state) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          state: state,
        }),
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        console.log(response.status);

        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    async deleteUser(id) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    async receiveReward() {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/dailyReward`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
    },

    async createAdmin(type, name, email, username, password, confPassword) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/createAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          type: type,
          password: password,
          confPassword: confPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(response.status);
        return response;
      } else {
        return response;
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
      sessionStorage.removeItem("loggedUser");
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
    async signUp(name, email, username, school, password, confPassword) {
      console.log("start sign up fetch");
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          school: school,
          password: password,
          confPassword: confPassword,
        }),
      });
      console.log(response.headers, response.body);
      if (response.ok) {
        const data = await response.json();
        console.log(response.status);
        return data;
      } else {
        console.log(response.status);
        // throw Error(AuthService.handleResponses(response.status));
      }
      console.log("end sign up fetch");
    },

    // ? add points & activities done
    async pointsAct(user) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      console.log(user, "store");
      const id = user._id;
      const response = await fetch(`${API_URL}/users/pointsAct/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log(response);
        console.log(response.status);
      }
    },

    // ? add points & occurrences done
    async pointsOc(selUser) {
      const accessToken = JSON.parse(sessionStorage.getItem("loggedUser"));
      const response = await fetch(`${API_URL}/users/pointsOc/${selUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-access-token": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("added");
        return data;
      } else {
        console.log(response.status);
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
