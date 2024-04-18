<template>
  <v-dialog v-model="openOccur">
    <div class="fieldG occModal">
      <v-card elevation="0" color="#F9F9F9">
        <v-card-actions>
          <button class="btnRound btnG" @click="refresh()">
            <img style="width: 15px" src="../assets/icons/icones/close.svg" />
          </button>
        </v-card-actions>
        <div id="occCont">
          <img class="occModalImg" src="../assets/images/correct.png" />
          <br /><br />
          <h2>A ocorrência foi registada com sucesso!</h2>
        </div>
      </v-card>
    </div>
  </v-dialog>

  <div class="form">
    <form ref="form" @submit.prevent="onSubmit">
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
              <img
                src="../assets/images/icone_local.svg"
                class="img"
                alt=""
              /><br />
              <label class="tabO" id="lblY">Local</label>
            </div>
            <div>
              <img
                src="../assets/images/tipo_bw.svg"
                class="img"
                alt=""
              /><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img
                src="../assets/images/descricao_bw.svg"
                class="img"
                alt=""
              /><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img
                src="../assets/images/foto_bw.svg"
                class="img"
                alt=""
              /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <div class="formContent">
            <div>
              <label class="semiTitle">Escola:</label><br />
              <select
                v-model="form.school"
                class="input"
                name=""
                @change="changeSchool"
                required
              >
                <!--  -->
                <option v-for="school in schools">{{ school.name }}</option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Bloco:</label><br />
              <select
                v-model="form.building"
                class="input"
                name=""
                @change="changeBuilding"
                required
              >
                <option v-for="building in buildings">
                  {{ building.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="semiTitle">Sala:</label><br />
              <select v-model="form.classroom" class="input" name="" required>
                <option v-for="classroom in classrooms">
                  {{ classroom }}
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
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/icone_tipo.svg" class="img" /><br />
              <label class="tabO" id="lblR">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <div id="allRb">
            <div class="typeRow" v-for="tp in types">
              <input
                type="radio"
                v-model="form.type"
                class="rb"
                name="type"
                :value="tp"
                @:change="
                  {
                    {
                      id(tp);
                    }
                  }
                "
                required
              />
              <label class="typeLbl">{{ tp }}</label>
            </div>
            <input
              class="input"
              id="outro"
              placeholder="Outro"
              type="text"
              name=""
              v-model="form.other"
              required
              disabled
            />
          </div>
        </v-window-item>
        <v-window-item :key="`card-${3}`">
          <!-- descricao -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img
                src="../assets/images/icone_descricao.svg"
                class="img"
              /><br />
              <label class="tabO" id="lblG">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <label class="semiTitle">Adiciona uma descrição:</label><br /><br />
          <textarea
            id="descriptionBox"
            rows="10"
            placeholder="O problema encontra-se... "
            type="text"
            v-model="form.description"
            required
          ></textarea>
        </v-window-item>
        <v-window-item :key="`card-${4}`">
          <!-- foto -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/icone_foto.svg" class="img" /><br />
              <label class="tabO" id="lblP">Foto</label>
            </div>
          </div>

          <label for="avatar" class="semiTitle">Adiciona uma foto:</label>
          <br /><br />
          <div style="display: flex; justify-content: center;">
            <div class="pickPhoto">
              <div style="display: flex; flex-direction: row; justify-content: center;">
                <p><b>Escolhe um ficheiro: </b> </p><br>
                <button class="btnPhoto" @click="openUploadWidget()" required>+</button>  
              </div>
              <img :src="this.form.photo" id="picked">
            </div>
          </div>

          <br /><br />
          <button @click="submitForm(), openOccur=true " class="btn-page btnY ">Submeter</button
          ><br /><br />
        </v-window-item>
      </v-window>
    </form>
  </div>
</template>

<script>
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useUsersStore } from "@/stores/User";
import { useSchoolStore } from "@/stores/School";
import { useMissionStore } from "@/stores/Mission";
export default {
  setup: () => ({
    occurrenceStore: useOccurrenceStore(),
    userStore: useUsersStore(),
    schoolStore: useSchoolStore(),
    missionStore: useMissionStore(),

  }),
  data() {
    return {
      form: {
        school: "",
        building: "",
        classroom: "",
        type: "",
        description: "",
        photo: "",
        photo: "",
        other: "",
      },
      tab: null,
      first: null,
      second: null,
      schools: [],
      buildings: [],
      classrooms: [],
      types: [],
      openOccur: false,
      logged: "",
    };
  },
  async created() {
    if (this.logged == undefined || this.logged == "") {
      await this.userStore.fetchLogged();
      this.logged = this.userStore.getLogged;
    }
    let schoolsBD, typesBD;
    if (this.schoolStore.getSchools.length == 0) {
      let bd = await this.schoolStore.getAllSchools();
      schoolsBD = bd.schools;
    } else {
      schoolsBD = this.schoolStore.getSchools;
    }
    schoolsBD.forEach((school) => {
      this.schools.push(school);
    });

    if (this.occurrenceStore.getTypes.length == 0) {
      let bd = await this.occurrenceStore.getAllTypes();
      typesBD = bd.types;
    } else {
      typesBD = this.occurrenceStore.getTypes;
    }
    typesBD.forEach((type) => {
      this.types.push(type);
    });

  },
  methods: {
    async submitForm() {
      await this.occurrenceStore.getAllOccurrences();
      await this.occurrenceStore.submit(
        this.form.school,
        this.form.building,
        this.form.classroom,
        this.form.type,
        this.form.description,
        this.form.photo,
        this.form.other
      );
      await this.occurrenceStore.getAllOccurrences();
      await this.missionStore.completeMission(this.logged, 2);
      await this.missionStore.completeMission(this.logged, 9);
      
    },
    id(type) {
      let e = type;
      const s = document.querySelector("#outro");
      "Outro" == e
        ? s.removeAttribute("disabled", "")
        : s.setAttribute("disabled", "");
    },
    changeSchool() {
      this.buildings = [];
      this.form.building = "";
      let s = this.schools.find((school) => school.name == this.form.school);
      s.buildings.forEach((building) => {
        this.buildings.push(building);
      });
    },
    changeBuilding() {
      this.classrooms = [];
      this.form.classroom = "";
      let s = this.schools.find((school) => school.name == this.form.school);
      let b = s.buildings.find(
        (building) => building.name == this.form.building
      );
      b.classrooms.forEach((classroom) => {
        this.classrooms.push(classroom);
      });
    },
    
    openUploadWidget() {
      const widget = window.cloudinary.createUploadWidget(
      {cloud_name: 'dklw8zd18', upload_preset: 'evergreen'},
      (error, result) => {
        console.log(error);
        console.log(result.info.url);
        if (result.info.url != undefined) {
          this.form.photo = result.info.url
          console.log(this.form.photo, 'my photoo');
          console.log(result);
        }
      }
      )
      widget.open()
    },

    async refresh() {
      await this.$router.push('/Home')
    },
  },
};
</script>

<style>
@import "../assets/styles/occurrence.css";
</style>
