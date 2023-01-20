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
                    <img :src="this.oc.photo" id="profilePic">
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
              <img class="backbtn" onclick="history.back()" src="../assets/icons/icones/back.svg">
              <span>Ocorrências</span>
            </h1>
        </div>
    
      <div class="searchbar">
          <button class="btn-page btnR">Filtrar</button>
      </div>
    
      <div v-for="oc in ocs">
        <div class="boardR board">
          <img :src="oc.photo" id="profilePic" />
          <div>
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
        const users = useUsersStore();
    
        return { ocStore, users };
      },
      data() {
        return {
          ocs: this.ocStore.getOccurrences ,
          dialog: false,
          oc: '',
          isFilter: false,
        };
      },
      methods: {
        Resolve() {
          this.oc.state = 'resolved';
          this.dialog = false;
          this.ocStore.edit(JSON.stringify(this.oc))
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
    