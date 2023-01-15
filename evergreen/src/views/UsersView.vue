<template>
  <h2>Users</h2>
  <button class="btn-page">Adicionar Admin</button>
  <button class="btn-page">Adicionar Utilizador</button>
  <div v-for="user in users">
    <div v-if="user.type != 'admin'" class="board">
      <img src="../assets/images/joana.jpg" id="profilePic" />
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <button class="btn-page" v-on:click="OpenAlert(user)">Editar</button>
      <button class="btn-page">Bloquear</button>
      <button class="btn-page">Eliminar</button>
    </div>
    <div v-if="user.type == 'admin'" class="board">
      <img src="../assets/images/joana.jpg" id="profilePic" />
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <button class="btn-page">Editar</button>
      <button class="btn-page">Bloquear</button>
      <button class="btn-page">Eliminar</button>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import Alert from "../components/UserAlert.vue";

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      users: this.userStore.getUsers,
    };
  },
  methods: {
    OpenAlert(user) {
      `
      <v-alert
      color="info"
      title="Tonal"
      variant="tonal"
    >
      <div>
        Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur turpis.
      </div>

      <v-divider class="my-4 bg-light-blue-lighten-4"></v-divider>

      <div class="d-flex flex-row align-center justify-space-between">
        <div>
          Proin magna. Vivamus in erat ut urna cursus vestibulum. Etiam imperdiet imperdiet orci.
        </div>

        <v-btn
          color="info"
          variant="outlined"
        >
          Okay
        </v-btn>
      </div>
    </v-alert>
    `
    }
  },
};
</script>

<style lang="scss" scoped></style>
