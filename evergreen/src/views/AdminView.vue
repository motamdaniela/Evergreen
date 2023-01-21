<template>
  <h2>Admin</h2>
  <div class="d-flex justify-center flex-row">
    <v-card  title="Utilizadores"
      ><RouterLink to="/Users">Utilizadores</RouterLink></v-card
    >
    <v-card  title="Atividades"
      ><RouterLink to="/ActivitiesList">Atividades</RouterLink></v-card
    >
    <v-card  title="Ocorrências"
      ><RouterLink to="/Occurences">Ocorrências</RouterLink></v-card
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
