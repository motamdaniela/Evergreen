<template>
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
              <img src="../assets/images/icone_local.svg" class="img" /><br />
              <label class="tabO" id="lblY">Local</label>
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
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <div class="formContent">
            <div>
              <label class="semiTitle">Campus:</label><br />
              <select
                v-model="form.campus"
                class="input"
                @change="changeCamp"
                required
              >
                <option v-for="camp in campus">
                  {{ camp.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Escola:</label><br />
              <select
                v-model="form.school"
                class="input"
                @change="changeSchool"
                required
              >
                <option v-for="school in schools">{{ school.name }}</option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Bloco:</label><br />
              <select
                v-model="form.building"
                class="input"
                @change="changeBuilding"
                required
              >
                <option v-for="building in buildings">
                  {{ building.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Piso:</label><br />
              <select
                v-model="form.floor"
                class="input"
                @change="changeFloor"
                required
              >
                <option v-for="floor in floors">
                  {{ floor.id }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Sala:</label><br />
              <select v-model="form.classroom" class="input" required>
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
                v-model="form.idType"
                class="rb"
                name="type"
                :value="tp.id"
                @:change="
                  {
                    {
                      id(tp.id);
                    }
                  }
                "
                required
              />
              <label class="typeLbl">{{ tp.name }}</label>
            </div>
            <input
              class="input"
              id="outro"
              placeholder="Outro"
              type="text"
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
          <input
            @change="previewFiles"
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            ref="myFiles"
            required
          />

          <br /><br />
          <button type="submit" class="btn-page btnY">Submeter</button
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
      schools: [],
      buildings: [],
      floors: [],
      classrooms: [],
      types: this.occurrenceStore.getTypes,
    };
  },
  updated() {
    console.log(1);
  },
  methods: {
    onSubmit() {
      this.form.id = this.occurrenceStore.getOccurrences.length;
      this.form.idType = document.querySelector(
        'input[name="type"]:checked'
      ).value;

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
      const text = document.querySelector("#outro");
      if (select.id == 6) {
        text.removeAttribute("disabled", "");
      } else {
        text.setAttribute("disabled", "");
      }
    },
    // idk if this works
    previewFiles(e) {
      const files = e.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.form.photo = reader.result);
    },
    changeCamp() {
      let camp = this.campus.find((camp) => camp.name == this.form.campus);
      this.form.building = "";
      this.form.floor = "";
      this.form.classroom = "";
      console.log(camp);
      let schools = [];
      this.schoolStore.getSchools.forEach((school) => {
        if (school.idCampus == camp.id) {
          console.log(0);
          schools.push(school);
        }
      });
      this.schools = schools;
    },
    changeSchool() {
      let school = this.schoolStore.getSchools.find(
        (school) => school.name == this.form.school
      );
      this.form.floor = "";
      this.form.classroom = "";
      let buildings = [];
      this.schoolStore.getBuildings.forEach((building) => {
        building.idSchools.forEach((s) => {
          if (s == school.id) {
            buildings.push(building);
          }
        });
        this.buildings = buildings;
      });
    },
    changeBuilding() {
      let building = this.schoolStore.getBuildings.find(
        (building) => building.name == this.form.building
      );
      let school = this.schoolStore.getSchools.find(
        (school) => school.name == this.form.school
      );
      this.form.classroom = "";
      let floors = [];
      this.schoolStore.getFloors.forEach((floor) => {
        floor.idBuildings.forEach((b) => {
          floor.idSchools.forEach((s) => {
            if (b == building.id && s == school.id) {
              floors.push(floor);
            }
          });
        });
        this.floors = floors;
      });
    },

    changeFloor() {
      let floor = +this.form.floor;
      let building = this.schoolStore.getBuildings.find(
        (building) => building.name == this.form.building
      );
      let school = this.schoolStore.getSchools.find(
        (school) => school.name == this.form.school
      );
      let classrooms = [];
      this.schoolStore.getClassrooms.forEach((classroom) => {
        classroom.idBuildings.forEach((b) => {
          classroom.idSchools.forEach((s) => {
            if (
              classroom.idFloor == floor &&
              b == building.id &&
              s == school.id
            ) {
              classrooms.push(classroom);
            }
          });
        });
        // if (classroom.idFloor == floor) {
        //   classrooms.push(classroom);
        // }
      });
      this.classrooms = classrooms;
    },
  },
};
</script>

<style>
@import "../assets/styles/occurrence.css";
</style>
