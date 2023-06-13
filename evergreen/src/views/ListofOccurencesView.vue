<template>

        <v-dialog v-model="dialog">
          <div class="fieldPklight modal">
          <v-card elevation="0" color="#F9F9F9">
            <v-card-actions>
                <button class="btnRound btnPk" @click="dialog = false">
                    <img style=" width: 15px " src="../assets/icons/icones/close.svg"/>
                </button>
            </v-card-actions>
            <v-card-text>
                <v-row>
                    <img :src="this.oc.photo" class="thumbnail" style="height: 100px;">
                    <div>
                        <p class="semiTitle">{{ oc.type }}</p>
                        <p>{{ oc.school }} {{ oc.building }}, Sala {{ oc.classroom }}</p>
                        <p>{{ oc.date }} &nbsp {{ oc.hour }}</p>
                        <b>Descrição:</b>
                        <p>{{ oc.description }}</p>
                    </div>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <button class="btn-page btnG" @click="this.resolved = true, ocValidation(), openVal = true" v-bind="this.oc = oc">Resolvida</button>
                <button class="btn-page btnY" @click="this.repeated = true, ocValidation(), openVal = true" v-bind="this.oc = oc">Repetida</button>
                <button class="btn-page btnR" @click="this.invalid = true, ocValidation(), openVal = true" v-bind="this.oc = oc">Inválida</button>
            </v-card-actions>
          </v-card>
        </div>
        </v-dialog>

        <v-dialog v-model="openVal">
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
                <h2>Estado foi alterado com sucesso!</h2>
              </div>
            </v-card>
          </div>
        </v-dialog>
    


    
      <div>
            <h1 class="title">
              <img v-if="this.curUser.type == 'admin'" class="backbtn" onclick="history.back()" src="../assets/icons/icones/arrowback.svg">
              <span>Ocorrências</span>
            </h1>
        </div>
    
      <div class="searchbar">
          <!-- <button class="btn-page btnR">Filtrar</button> -->
          <v-menu>
      <template v-slot:activator="{ props }">
        <button class="btn-page btnR" id="btnFiltrar" v-bind="props">Filtrar</button>
      </template>

      <v-list id="menu">
        <!-- <v-list-item v-for="(theme, index) in themes" :key="index"> -->
        <v-checkbox
          v-for="tp in types"
          v-model="typesPicked"
          :label="tp"
          :value="tp"
          density="compact"
          hide-details
          >{{ FilterTypes }}
        </v-checkbox>
        <!-- </v-list-item> -->
      </v-list>
    </v-menu>
      </div>
      <p v-if="this.ocs.length <= 0">Não existe nenhuma ocorrência por resolver!</p>
    
      <div v-for="oc in ocs">
        <div class="boardR board" >
          <!-- v-if="oc.state == 'pending'" -->
          <img :src="oc.photo" class="thumbnail" />
          <div>
            <!-- <p v-for="octype in types">
            <p v-if="oc.type == octype" class="semiTitle"> {{ octype.name }}</p>
          </p> -->
              <p class="semiTitle">{{ oc.type }}</p>
              <p>{{ oc.school }} {{ oc.building }}, Sala {{ oc.classroom }}</p>
              <p>{{ oc.date }} &nbsp {{ oc.hour }}</p>
          </div>
          <div>
            <button class="btn-page btnR" @click="dialog = true; this.oc = oc; this.user = oc.userID">Ver mais</button>
          </div>
    
        </div>
      </div>
    </template>
    
    <script>
    import { useUsersStore } from "@/stores/User";
    import { useOccurrenceStore } from "@/stores/Occurrence";
    
    export default {
      setup() {
        const ocStore = useOccurrenceStore();
        const userStore = useUsersStore();
    
        return { ocStore, userStore };
      },
      data() {
        return {
          ocs: this.ocStore.getPending ,
          dialog: false,
          openVal: false,
          isFilter: false,
          users: this.userStore.getUsers ,
          types: this.ocStore.getTypes,
          typesPicked: [],
          curUser: "",
          resolved: false,
          repeated: false,
          invalid: false,
          state: '',
          user: '',
          selUser: ''
        };
      },

      async created() {
        if (this.ocs == undefined || this.ocs == "") {
          await this.ocStore.fetchPending();
          this.ocs = this.ocStore.getPending;
        }
        if (this.types == undefined || this.types == "") {
          await this.ocStore.getAllTypes();
          this.types = this.ocStore.getTypes;
        }
        if (this.curUser == undefined || this.curUser == "") {
          await this.userStore.fetchLogged();
          this.curUser = this.userStore.getLogged;
        }

        console.log(this.curUser, 'logged');
        console.log(this.ocs.length);
      },

      methods: {

        async ocValidation() {       
          if (this.resolved) {
            this.state = 'solved'
            this.resolved = false
            this.selUser = this.user
          } else if (this.repeated) {
            this.state = 'repeat'
            this.repeated = false
          } else if (this.invalid) {
            this.state = 'invalid'
            this.invalid = false
          }
          console.log(this.state, this.oc, this.selUser, 'view');
          this.oc = await this.ocStore.validation(this.oc, this.state)
          this.selUser = await this.userStore.pointsOc(this.selUser)

        },

        refresh() {
          location.reload()
        }

      },
      computed: {
        
        FilterTypes() {
          let filteredList = [];
          if (this.typesPicked.length <= 0) {
            this.ocs = this.ocStore.getPending;
          } else {
            this.ocStore.getPending.forEach((oc) => {
              this.typesPicked.forEach((tp) => {
                if (tp == oc.type) {
                  filteredList.push(oc);
                }
              });
            });
            this.ocs = filteredList;
          }
        },

      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    