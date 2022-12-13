<template>
  <div id="background">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <!-- <v-text-field
        class="input"
        variant="plain"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field> -->
      <label for="email" class="semiTitle">E-mail</label>
      <br />
      <input class="input" id="email" v-model="form.email" type="email" />
      <br />
      <label for="pass" class="semiTitle">Palavra-passe</label>
      <br />
      <input class="input" id="pass" v-model="form.password" type="password" />
      <br />
      <div id="btns">
        <RouterLink class="link" id="signUpBtn" to="/signUp"
          >Registar</RouterLink
        >
        <button class="btn-page link" id="ok" type="submit">
          Entrar
          <!-- <RouterLink class="link" to="/login">Entrar</RouterLink> -->
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.email == "admin@gmail.com" && this.form.password == "123") {
        localStorage.setItem("isAuthenticated", true);
        alert("slay");
      } else {
        alert("Wrong credentials!");
      }
    },
  },
  // data: () => ({
  //   valid: true,
  //   name: "",
  //   nameRules: [
  //     (v) => !!v || "Name is required",
  //     (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
  //   ],
  //   email: "",
  //   emailRules: [
  //     (v) => !!v || "E-mail is required",
  //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  //   ],
  //   select: null,
  //   items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  //   checkbox: false,
  // }),

  // methods: {
  //   async validate() {
  //     const { valid } = await this.$refs.form.validate();

  //     if (valid) alert("Form is valid");
  //   },
  //   reset() {
  //     this.$refs.form.reset();
  //   },
  //   resetValidation() {
  //     this.$refs.form.resetValidation();
  //   },
  // },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
