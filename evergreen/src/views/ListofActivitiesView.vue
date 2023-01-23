<template>

<v-dialog v-model="open">
      <div class="fieldP modal">
        <div>
          <button class="btn-page btnP" @click="open = false">x</button>
        </div>
        <img :src="this.activity.photo" width="200" />
        <h1>{{ this.activity.title }}</h1>
        <h3>Diagnostico:</h3>
        <p>{{ this.activity.desc1 }}</p>
        <h3>Objetivos:</h3>
        <p>{{ this.activity.desc2 }}</p>
        <h3>Metas:</h3>
        <p>{{ this.activity.desc3 }}</p>
        <button class="btn-page btnP" @click="listDialog = true">Inscições</button>
      </div>
    </v-dialog>

    <v-dialog v-model="listDialog">
      <div class="fieldP modal">
        <div>
          <button class="btn-page btnP" @click="listDialog = false">x</button>
        </div>
        <p v-if="activityUsers.length <= 0"> Não exitem inscrições!</p>
        <div v-for="user in activityUsers" >
          <v-row class="boardP">
            <img :src="user.photo" id="profilePic" />
            <p class="semiTitle">{{ user.name }}</p>
            <div>
              <button class="btn-page btnP" @click="Participation" v-bind="this.user = user">Verificar</button>
            </div>
          </v-row>
        </div>
      </div>
    </v-dialog>





<div>
            <h1 class="title">
              <img class="backbtn" onclick="history.back()" src="../assets/icons/icones/arrowback.svg">
              <span>Atividades</span>
            </h1>
        </div>

<div class="listAct">
      <div class="grid-item" v-for="activity in FilteredActivities">
        <v-card
          class="cardP">
          <v-img
            class="image cardImg"
            :src="activity.photo"
            cover
          >
          </v-img>

          <div class="cardText">
            <v-card-title>
              <b>{{ activity.title }}</b>
            </v-card-title>

            <div class="alignCard">
              <v-card-subtitle>
                <div>
                  <b
                    >{{ activity.date }} <br />
                    {{ activity.place }}</b
                  >
                </div>
              </v-card-subtitle>
              <button class="btn-card btnP" @click="open = true; this.activity = activity">Ver mais</button>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    
    </template>
    
    <script>
    import { useUsersStore } from "@/stores/User";
    import { useActivityStore } from "@/stores/Activity";
    
    export default {
      setup() {
        const userStore = useUsersStore();
        const activityStore = useActivityStore();
    
        return { userStore, activityStore };
      },
      data() {
        return {
          activities: this.activityStore.getActivities,
          activity: '',
          users: this.userStore.getUsers,
          user: '',
          open: false,
          listDialog: false,
          isFilter: false,
        };
      },
      methods: {
        Edit() {
          this.user.password = this.newPassword;
          this.dialog = false;
          this.userStore.edit(JSON.stringify(this.user))
        },
        Participation(){
          alert(this.user.email, this.activity.id)
          this.activityStore.updateParticipated(this.user.email, this.activity.id)
        }
      },
      computed: {
        FilteredActivities() {
                  return this.activities.filter((activity) => activity.coordinator == this.userStore.getLogged)
              },
        activityUsers(){
          let listUsers = [];
            this.users.forEach(user => {
              if(this.activity.users.find((sign) => sign == user.email)){
                listUsers.push(user)
              }
            });
          return listUsers
        }
      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    