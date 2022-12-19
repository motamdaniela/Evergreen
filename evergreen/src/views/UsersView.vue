<template>
  <h2>Users</h2>
  <button class="btn-page">Adicionar Admin</button>
  <button class="btn-page">Adicionar Utilizador</button>
  <div v-for="user in users">
    <div class="board">
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
};
</script>

<style lang="scss" scoped></style>
