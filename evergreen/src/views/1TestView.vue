<template>
    <div class="questionario">
      <h1>Lista de utilizadores</h1>

      <button @click="getAllUsers" class="btn-page">Show me</button>

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
      isFilter: false,
      msg: '',
    };
  },
  methods: {
    getAllUsers() {
        console.log("VIEW - fetchallUsers");
        console.log("END VIEW - fetchallUsers", this.msg)
    }
  },
    created() {
        this.msg = this.testStore.fetchAllUsers();
        // this.users = this.testStore.fetchAllUsers;
    }

};
// onMounted(() => {
//     this.users = testStore.fetchAllUsers();
// })
</script>
  