<template>
  <div class="form">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >

    <v-window show-arrows>
    <template v-slot:prev="{ props }">
      <btn class="btn-page btnG" id="prevBtn" @click="props.onClick">
        Anterior
      </btn>
    </template>
    <template v-slot:next="{ props }">
      <btn class="btn-page btnP" id="nextBtn" @click="props.onClick">
        Próximo
      </btn>
    </template>
    
    <v-window-item :key="`card-${1}`">
    
      <div class="tabs">
        <div>
          <img src="../assets/images/icone_local.svg" class="img"><br>
          <label class="tab" id="lblY">Local</label>
        </div>
        <div>
          <img src="../assets/images/tipo_bw.svg" class="img"><br>
          <label class="tab">Tipo</label>
        </div>
        <div>
          <img src="../assets/images/descricao_bw.svg" class="img"><br>
          <label class="tab">Descrição</label>
        </div>
        <div>
          <img src="../assets/images/foto_bw.svg" class="img"><br>
          <label class="tab">Foto</label>
        </div>
      </div>

      <div class="formContent">
        <div>
          <label class="semiTitle">Campus:</label><br>
          <input class="input" type="text" v-model="form.campus" required/>
        </div>
        
        <div>
          <label class="semiTitle">Escola:</label><br>
          <input class="input" type="text" v-model="form.school" required/>
        </div>
        
        <div>
          <label class="semiTitle">Bloco:</label><br>
          <input class="input" type="text" v-model="form.building" required/>
        </div>
      </div>

    </v-window-item>
    <v-window-item :key="`card-${2}`">
      
      <div class="tabs">
        <div>
          <img src="../assets/images/local_bw.svg" class="img"><br>
          <label class="tab">Local</label>
        </div>
        <div>
          <img src="../assets/images/icone_tipo.svg" class="img"><br>
          <label class="tab" id="lblR">Tipo</label>
        </div>
        <div>
          <img src="../assets/images/descricao_bw.svg" class="img"><br>
          <label class="tab">Descrição</label>
        </div>
        <div>
          <img src="../assets/images/foto_bw.svg" class="img"><br>
          <label class="tab">Foto</label>
        </div>
      </div>

      <div id="allRb">
        <div class="typeRow">
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Lâmpada fundida</label>
  
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Torneira a pingar</label>
  
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Luz ligada</label>
        </div>
        
        <div class="typeRow">
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Objeto quebrado</label>
  
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Malfuncionamento</label>
  
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Lixo no chão</label>
        </div>
        
        <div class="typeRow">
          <input type="radio" v-model="form.type" class="rb"/>
          <label class="typeLbl">Outro:</label>
          <input class="input" placeholder="Outro" type="text" v-model="form.type" required/>
        </div>
      </div>


    </v-window-item>
    <v-window-item :key="`card-${3}`">
        
      <div class="tabs">
        <div>
          <img src="../assets/images/local_bw.svg" class="img"><br>
          <label class="tab">Local</label>
        </div>
        <div>
          <img src="../assets/images/tipo_bw.svg" class="img"><br>
          <label class="tab">Tipo</label>
        </div>
        <div>
          <img src="../assets/images/icone_descricao.svg" class="img"><br>
          <label class="tab" id="lblG">Descrição</label>
        </div>
        <div>
          <img src="../assets/images/foto_bw.svg" class="img"><br>
          <label class="tab">Foto</label>
        </div>

      </div>
      
      <label class="semiTitle">Adiciona uma descrição:</label><br><br>
      <textarea id="descriptionBox" rows="10" placeholder="O problema encontra-se... " type="text" v-model="form.description"></textarea>


    </v-window-item>
    <v-window-item :key="`card-${4}`">
        
      <div class="tabs">
        <div>
          <img src="../assets/images/local_bw.svg" class="img"><br>
          <label class="tab">Local</label>
        </div>
        <div>
          <img src="../assets/images/tipo_bw.svg" class="img"><br>
          <label class="tab">Tipo</label>
        </div>
        <div>
          <img src="../assets/images/descricao_bw.svg" class="img"><br>
          <label class="tab">Descrição</label>
        </div>
        <div>
          <img src="../assets/images/icone_foto.svg" class="img"><br>
          <label class="tab" id="lblP">Foto</label>
        </div>
      </div>

      <v-file-input label="File input"></v-file-input>
      <button type="submit" class="btn-page btnY">Submeter</button><br><br>
      
    </v-window-item>
    </v-window>

    
    </v-form>

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

<style>
@import "../assets/styles/occurrence.css" </style>
