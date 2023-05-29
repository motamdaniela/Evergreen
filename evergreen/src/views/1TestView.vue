<template>
    <div class="questionario">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <label for="email" class="semiTitle">E-mail / Nome de utilizador</label>
        <br />
        <input class="input" id="email" v-model="email" required />
        <br />
        <label for="pass" class="semiTitle" required>Palavra-passe</label>
        <br />
        <input
          class="input"
          id="pass"
          v-model="password"
          type="password"
          required
        />
        <br />
        <button class="btn-page link" type="submit">Entrar</button>

      </form>

      <!-- <h1>Lista de utilizadores</h1>
      <button @click="getAllUsers" class="btn-page">Show me</button> -->

      <div id="usersTable"></div>
    </div>
</template>

<script>
import { useTestStore } from "@/stores/1TestUser";
import {onMounted} from "vue"

export default{
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  data() {
    return {
      users: [],
      email: '',
      password: '',
      isFilter: false,
      msg: '',
    };
  },
  methods: {
    getAllUsers() {
        console.log("VIEW - fetchallUsers");
        console.log("END VIEW - fetchallUsers", this.msg)
    },
    onSubmit(){
      this.testStore.loginTest(this.email, this.password)
    }
  },
    created() {
        // this.msg = this.testStore.fetchAllUsers();
        // this.users = this.testStore.fetchAllUsers;
    }

};
// onMounted(() => {
//     this.users = testStore.fetchAllUsers();
// })
</script>
  