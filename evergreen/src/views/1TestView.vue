<template>
    <div class="questionario">
      <h1>Logged user</h1>


      <h1>Lista de utilizadores</h1>
      <table>
        <th>
          <td>Nome</td>
          <td>username</td>
        </th>
        <tr v-for="user in this.users">
          <td>{{user.name}}</td>
          <td>{{user.username}}</td>
        </tr>
      </table>
      <button @click="show" class="btn-page">Show me</button>

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
    };
  },
  methods: {
    async show(){
      let n = await this.userStore.fetchAllUsers()
      console.log(n);
      // this.users = n.users;
      // console.log(this.userStore.fetchAllUsers.users)
    }
  },

  updated () {
    // this.users = this.userStore.fetchAllUsers().users;
  },

};
</script>
  