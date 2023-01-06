<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      
      <v-tabs v-model="tab">
        <v-tab value="place">Local</v-tab>
        <v-tab value="type">Tipo</v-tab>
        <v-tab value="description">Descrição</v-tab>
        <v-tab value="photo">Foto</v-tab>
      </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="place">
            Campus:
            <input type="text" v-model="form.campus" />
            
            Escola:
            <input type="text" v-model="form.school" />

            Bloco:
            <input type="text" v-model="form.building" />

          </v-window-item>

          <v-window-item value="type">
            Tipo:
            <input type="text" v-model="form.type" />
          </v-window-item>

          <v-window-item value="description">
            Descrição:
            <input type="text" v-model="form.description" />
          </v-window-item>

          <v-window-item value="photo">
            <button type="submit" class="btn-page">Submeter</button>
          </v-window-item>
        </v-window>
     

  </v-form>  
  
  <!-- <v-form
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
  </v-form> -->


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
      tab: null,
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
