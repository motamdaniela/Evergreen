<template>
    <div class="questionario">
      <h1 >Logged user</h1>
      <h3>{{ this.logged.name }}</h3>
      <p><b>{{ this.logged.username }}</b></p>
      <p>{{ this.logged.type }}</p>
      <p>{{ this.logged.school }}</p>

      <h1>Lista de utilizadores</h1>
      <table>
        <tr>
          <th>Nome</th>
          <th>username</th>
        </tr>
        <tr v-for="user in this.users">
          <td>{{user.name}}</td>
          <td>{{user.username}}</td>
        </tr>
      </table>

      <div id="usersTable"></div>
    </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useSchoolStore } from "@/stores/School";
import { useRefHistory } from "@vueuse/core";

export default{
  setup() {
    const userStore = useUsersStore();
    const schoolStore = useSchoolStore();

    return { userStore, schoolStore };
  },
  data() {
    return {
      users: '',
      logged: ''
    };
  },
  methods: {
    async show(){
      // let token = JSON.parse(sessionStorage.getItem('loggedUser'))
      await this.userStore.fetchLogged();
      this.logged = this.userStore.getLogged
    }
  },
  computed: {
    async renderUsers() {
      await this.userStore.fetchAllUsers();
      return this.userStore.getUsers
    },
    async renderLogged() {
      if(this.logged == undefined || this.logged == ''){
        await this.userStore.fetchLogged();
        this.logged = this.userStore.getLogged
      }
    }
  },
  async created () {
    if(this.logged == undefined || this.logged == ''){
      await this.userStore.fetchLogged();
      this.logged = this.userStore.getLogged
    }
    await this.userStore.fetchAllUsers();
    this.users = this.userStore.getUsers
  },

};
</script>
  