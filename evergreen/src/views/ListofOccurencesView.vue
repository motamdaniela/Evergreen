<template>

        <v-dialog v-model="dialog">
          <div class="fieldPklight modal">
          <v-card>
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
                <button class="btn-page btnG" @click="Resolve">Resolver</button>
                <button class="btn-page btnY" @click="Repeat">Repetida</button>
                <button class="btn-page btnR" @click="Invalid">Inválida</button>
            </v-card-actions>
          </v-card>
        </div>
        </v-dialog>
    


    
      <div>
            <h1 class="title">
              <img v-if="isLogged && this.user.type == 'admin'" class="backbtn" onclick="history.back()" src="../assets/icons/icones/arrowback.svg">
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
          :label="tp.name"
          :value="tp.id"
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
        <div class="boardR board" v-if="oc.state == 'pending'">
          <img :src="oc.photo" class="thumbnail" />
          <div>
            <p v-for="octype in types">
            <p v-if="oc.idType == octype.id" class="semiTitle"> {{ octype.name }}</p>
          </p>
              <p class="semiTitle">{{ oc.type }}</p>
              <p>{{ oc.school }} {{ oc.building }}, Sala {{ oc.classroom }}</p>
              <p>{{ oc.date }} &nbsp {{ oc.hour }}</p>
          </div>
          <div>
            <button class="btn-page btnR" @click="dialog = true; this.oc = oc">Ver mais</button>
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
          ocs: this.ocStore.getOccurrences ,
          dialog: false,
          // oc: '',
          isFilter: false,
          users: this.userStore.getUsers ,
          types: this.ocStore.getTypes,
          typesPicked: [],
        };
      },
      methods: {
        Resolve() {
          this.oc.state = 'solved';
          this.dialog = false;
          let user = this.users.find((user)=> user.email == this.oc.user)
          user.points += 5;
          user.occurences += 1;
          this.ocStore.edit(JSON.stringify(this.oc))
          this.userStore.edit(JSON.stringify(user))

        },
        Repeat() {
          this.oc.state = 'repeat';
          this.dialog = false;
          this.ocStore.edit(JSON.stringify(this.oc))
        },
        Invalid() {
          this.oc.state = 'invalid';
          this.dialog = false;
          this.ocStore.edit(JSON.stringify(this.oc))
        },
      },
      computed: {
        FilterTypes() {
          let filteredList = [];
          if (this.typesPicked.length <= 0) {
            this.ocs = this.ocStore.getOccurrences;
          } else {
            this.ocStore.getOccurrences.forEach((oc) => {
              this.typesPicked.forEach((tp) => {
                if (tp == oc.idType) {
                  filteredList.push(oc);
                }
              });
            });
            this.ocs = filteredList;
          }
        },
  
        filteredUsers() {
                if(this.isFilter) {
                    return this.users.filter(user => user.name.startsWith(this.search))
                }else if(this.search == ''){
                  return this.users
                }else {
                    return this.users
                }
              }
      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    