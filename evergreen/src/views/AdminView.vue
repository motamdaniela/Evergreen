<template>
  <h2>Admin</h2>
  <div class="d-flex justify-center flex-row">
    <v-card width="300" title="Utilizadores"
      ><RouterLink to="/Users">Utilizadores</RouterLink></v-card
    >
    <v-card width="300" title="Atividades"
      ><RouterLink to="/Activities">Atividades</RouterLink></v-card
    >
    <v-card width="300" title="Ocorrências"
      ><RouterLink to="/Ocorrence">Ocorrências</RouterLink></v-card
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
