<template>
  <div>
    <h1>Ocorrências</h1>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      Escola:
      <input type="text" />
      Bloco:
      <input type="text" />
      Espaço:
      <input type="text" />
      Tipo:
      <input type="text" />
      Descrição:
      <input type="text" />

      <button type="submit" class="btn-page">Submeter</button>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
