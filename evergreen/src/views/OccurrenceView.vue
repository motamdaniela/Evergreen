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
          <!-- local -->
          <div class="tabs">
            <div>
              <img src="../assets/images/icone_local.svg" class="img" /><br />
              <label class="tab" id="lblY">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tab">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tab">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tab">Foto</label>
            </div>
          </div>

          <div class="formContent">
            <div>
              <label class="semiTitle">Campus:</label><br />
              <select v-model="form.campus" class="input">
                <option v-for="camp in campus">{{ camp.name }}</option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Escola:</label><br />
              <select v-model="form.school" class="input">
                <option v-for="school in schools">{{ school.name }}</option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Bloco:</label><br />
              <select v-model="form.building" class="input">
                <option v-for="building in buildings">
                  {{ building.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Piso:</label><br />
              <select v-model="form.floor" class="input">
                <option v-for="floor in floors">
                  {{ floor.id }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Sala:</label><br />
              <select v-model="form.classroom" class="input">
                <option v-for="classroom in classrooms">
                  {{ classroom.id }}
                </option>
              </select>
            </div>
          </div>
        </v-window-item>
        <v-window-item :key="`card-${2}`">
          <!-- tipo -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tab">Local</label>
            </div>
            <div>
              <img src="../assets/images/icone_tipo.svg" class="img" /><br />
              <label class="tab" id="lblR">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tab">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tab">Foto</label>
            </div>
          </div>

          <div id="allRb">
            <div class="typeRow" v-for="tp in types">
              <input
                type="radio"
                v-model="form.idType"
                class="rb"
                name="type"
                @:click="
                  {
                    {
                      id(tp.id);
                    }
                  }
                "
              />
              <label class="typeLbl">{{ tp.name }}</label>
            </div>
            <input
              class="input"
              id="outro"
              placeholder="Outro"
              type="text"
              v-model="form.other"
              required disabled
            />
          </div>
        </v-window-item>
        <v-window-item :key="`card-${3}`">
          <!-- descricao -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tab">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tab">Tipo</label>
            </div>
            <div>
              <img
                src="../assets/images/icone_descricao.svg"
                class="img"
              /><br />
              <label class="tab" id="lblG">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tab">Foto</label>
            </div>
          </div>

          <label class="semiTitle">Adiciona uma descrição:</label><br /><br />
          <textarea
            id="descriptionBox"
            rows="10"
            placeholder="O problema encontra-se... "
            type="text"
            v-model="form.description"
          ></textarea>
        </v-window-item>
        <v-window-item :key="`card-${4}`">
          <!-- foto -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tab">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tab">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tab">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/icone_foto.svg" class="img" /><br />
              <label class="tab" id="lblP">Foto</label>
            </div>
          </div>

          <label for="avatar" class="semiTitle">Adiciona uma foto:</label>
          <br /><br />
          <input
            @change="previewFiles"
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            ref="myFiles"
          />

          <br /><br />
          <button type="submit" class="btn-page btnY">Submeter</button
          ><br /><br />
        </v-window-item>
      </v-window>
    </v-form>
  </div>
</template>

<script>
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useUsersStore } from "@/stores/User";
import { useSchoolStore } from "@/stores/School";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const occurrenceStore = useOccurrenceStore();

    const userStore = useUsersStore();

    const schoolStore = useSchoolStore();
    const missionStore = useMissionStore();

    return { occurrenceStore, userStore, schoolStore, missionStore };
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
        idType: 0,
        description: "",
        photo: "",
        user: "",
        state: "",
        photo: "",
        other: "",
      },
      tab: null,
      first: null,
      second: null,
      campus: this.schoolStore.getCampus,
      schools: this.schoolStore.getSchools,
      buildings: this.schoolStore.getBuildings,
      floors: this.schoolStore.getFloors,
      classrooms: this.schoolStore.getClassrooms,
      types: this.occurrenceStore.getTypes,
    };
  },
  methods: {
    onSubmit() {
      this.form.id = this.occurrenceStore.getOccurrences.length;
      this.form.idType = document.querySelector(
        'input[name="type"]:checked'
      ).id;
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
      this.missionStore.completeMission(this.form.user, 2);
      location.reload();
    },
    id(id) {
      let select = document.querySelector('input[name="type"]:checked');
      select.id = id;
      
      const text = document.querySelector('#outro')
      if(select.id == 6){
        text.removeAttribute('disabled', '');
      } else {
        text.setAttribute('disabled','');
      }
    },
    // idk if this works
    previewFiles(e) {
      const files = e.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.form.photo = reader.result);
      console.log(this.form.photo);
    },
  },
};
</script>

<style>
@import "../assets/styles/occurrence.css";
</style>
