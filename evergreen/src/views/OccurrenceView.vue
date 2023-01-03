<template>
  <div>
    <h1>Ocorrências</h1>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      Campus:
      <input type="text" v-model="form.campus" />
      Escola:
      <input type="text" v-model="form.school" />
      Bloco:
      <input type="text" v-model="form.building" />
      Piso:
      <input type="text" v-model="form.floor" />
      Sala:
      <input type="text" v-model="form.classroom" />
      Tipo:
      <input type="text" v-model="form.type" />
      Descrição:
      <input type="text" v-model="form.description" />

      <button type="submit" class="btn-page">Submeter</button>
    </v-form>
  </div>
</template>

<script>
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const occurrenceStore = useOccurrenceStore();

    const userStore = useUsersStore();

    return { occurrenceStore, userStore };
  },
  data() {
    return {
      form: {
        id: 0,
        date: "",
        hour: "",
        campus: "",
        school: "",
        building: "",
        floor: "",
        classroom: "",
        type: "",
        description: "",
        photo: "",
        user: "",
        state: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.form.id = this.occurrenceStore.getOccurrences.length;
      let today = new Date();
      this.form.date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.form.hour =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.form.user = this.userStore.getLogged;
      this.form.state = "pending";
      this.occurrenceStore.addOccurrence(this.form);
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
