<template>

<v-dialog v-model="open">
      <div class="fieldP modal">
        <div>
          <button class="btnRound btnP" @click="open = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
          </button>
          <div class="contentModal">
            <div class="row1">
              <img class="imgModal" :src="this.activity.photo" width="200" />
              <div class="rowText">
              <h2>{{ this.activity.title }}</h2>
              <br>
              <h3>Data:</h3>
              <p>{{ this.activity.date }}</p>
              <br>
              <h3>Local:</h3>
              <p>{{ this.activity.place }}</p>
            </div>
            </div>
          </div>
          <h3>Diagnostico:</h3>
          <p>{{ this.activity.desc1 }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.desc2 }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.desc3 }}</p>
          <button class="btn-page btnP btnModal" style="margin-top:20px" @click="listDialog = true">Inscrições</button>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="listDialog">
      <div class="fieldP modal">
        <div>
          <button class="btnRound btnP" @click="listDialog = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
          </button><br><br>
        </div>
        <p v-if="activityUsers.length == 0"> Não exitem inscrições!</p>
        <div v-for="user in activityUsers" >
          <v-row class="boardP">
            <img :src="user.photo" id="profilePic" />
            <p class="semiTitle">{{ user.name }}</p>
            <div>
              <button v-if="datePassed"
                 class="btn-page btnP" @click="Participation" v-bind="this.user = user">Verificar</button>
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

<div class="listAct" style="padding:30px;">
      <div class="grid-item" v-for="activity in FilteredActivities">
        <v-card
          class="max-auto cardPc"
          max-width="400"
          >
          <v-img
            class="image cardImg"
            :src="activity.photo"
            height="219"
            width="380"
            margin-bottom="20"
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
      created () {
        this.activities = this.activityStore.getActivities;
        this.userObj = this.userStore.getUsers.find(
          (user) => user.email == this.user
        );;
      },
      data() {
        return {
          activities: this.activityStore.getActivities,
          users: this.userStore.getUsers,
          userObj: "",
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
          this.user.activities += 1;
          this.user.points += 5;
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
        },
        datePassed(){
          let date = new Date();
          if(this.activity.end < date.getDate()){ 
            return true
          }else{
            return false;
          }
        }
      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    