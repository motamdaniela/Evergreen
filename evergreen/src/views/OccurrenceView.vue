<template>
  <div class="form">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      
      <v-tabs v-model="tab" align-tabs="center" height="100px" hide-slider="true" stacked="true" fixed-tabs="true">
        <v-tab value="place" color="#E9A13B"><img src="../assets/images/icone_local.svg" class="img"><br><b>Local</b></v-tab>
        <v-tab value="type" color="#E9674D"><img src="../assets/images/icone_tipo.svg" class="img"><br><b>Tipo</b></v-tab>
        <v-tab value="description" color="#62B273"><img src="../assets/images/icone_descricao.svg" class="img"><br><b>Descrição</b></v-tab>
        <v-tab value="photo" color="#C2AFEA"><img src="../assets/images/icone_foto.svg" class="img"><br><b>Foto</b></v-tab>
      </v-tabs>

        <v-card-text class="text">
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
        </v-card-text>
    </v-form>
    <!-- <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      Campus:
      <select v-model="form.campus">
        <option value="" disabled selected>Escolhe uma opção</option>
        <option v-for="camp in campus">{{ camp.name }}</option>
      </select>
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
import { useSchoolStore } from "@/stores/School";

export default {
  setup() {
    const occurrenceStore = useOccurrenceStore();

    const userStore = useUsersStore();

    const schoolStore = useSchoolStore();

    return { occurrenceStore, userStore, schoolStore };
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
      campus: this.schoolStore.getCampus,
      schools: this.schoolStore.getSchools,
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

<style scoped>
@import "../assets/styles/occurrence.css"</style>
