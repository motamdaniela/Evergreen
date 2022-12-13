<template>
  <div id="background">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div id="group">
        <div>
          <label for="name" class="semiTitle">Nome</label>
          <br />
          <input class="input" id="name" />
          <br />
          <label for="email" class="semiTitle">E-mail</label>
          <br />
          <input class="input" id="email" />
          <br />
          <label for="school" class="semiTitle">Escola</label>
          <br />
          <input class="input" id="school" />
        </div>
        <div>
          <label for="bday" class="semiTitle">Data de nascimento</label>
          <br />
          <input class="input" id="bday" type="date" />
          <br />
          <label for="pass" class="semiTitle">Palavra-passe</label>
          <br />
          <input class="input" id="pass" />
          <br />
          <label for="confirm" class="semiTitle">Confirmar palavra-passe</label>
          <br />
          <input class="input" id="confirm" />
        </div>
      </div>
      <div id="btns">
        <button class="btn-page" id="ok">
          <RouterLink class="link" to="/signUp">Registar</RouterLink>
        </button>
        <RouterLink class="link" to="/login" id="signUpBtn">Entrar</RouterLink>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "value",
    };
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
