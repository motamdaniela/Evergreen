<template>
  <div id="background">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        class="input"
        v-model="email"
        variant="outlined"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        class="input"
        v-model="name"
        variant="outlined"
        :counter="10"
        :rules="nameRules"
        label="Palavra-passe"
        required
      ></v-text-field>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      <v-btn color="success" class="mr-4" @click="validate"> Validate </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
