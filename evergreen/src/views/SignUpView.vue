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
        data() {
            return {
                key: 'value'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>