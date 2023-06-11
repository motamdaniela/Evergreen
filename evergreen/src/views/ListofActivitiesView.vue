<template>

<v-dialog v-model="open">
      <div class="fieldP modal">
        <div>
          <button class="btnRound btnP" @click="open = false,  this.listUsers = []">
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
          <p>{{ this.activity.description[0] }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.description[1] }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.description[2] }}</p>
          <button class="btn-page btnP btnModal" style="margin-top:20px" @click="listDialog = true">Inscrições</button>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="listDialog" height="80%" width="60%" content-class="fieldP modal" scrollable>
        <div>
          <button class="btnRound btnP" @click="listDialog = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
          </button><br><br>
        </div>
        <v-card elevation="0" color="#F9F9F9">
          <p v-if="activityUsers.length == 0"> Não exitem inscrições!</p>
          <div v-for="user in activityUsers" >
            <v-row class="boardP subList">
              <img :src="user.photo" id="profilePic" />
              <p class="semiTitle">{{ user.username }}</p>
              <div>
                <button v-if="datePassed"
                   class="btn-page btnP" @click="Participation" v-bind="this.user = user">Verificar</button>
              </div>
            </v-row>
          </div>
        </v-card>
    </v-dialog>





<div>
  <h1 class="title">
    <img class="backbtn" onclick="history.back()" src="../assets/icons/icones/arrowback.svg">
    <span>Atividades</span>
  </h1>
</div>

<div class="listAct" style="padding:30px;">
      <div class="grid-item" v-for="activity in activities">
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
      data() {
        return {
          activities: [],
          users: this.userStore.getUsersUser,
          userObj: "",
          open: false,
          listDialog: false,
          isFilter: false,
          listUsers: []
        };
      },
      async created () {
        this.activities = await this.activityStore.fetchCoordinatorActivities();
        this.userObj = this.userStore.getUsers.find(
          (user) => user.email == this.user
        )

        if (this.users == undefined || this.users == "") {
          await this.userStore.fetchAllUsers();
          this.users = this.userStore.getUsersUser;
        }

      },

      methods: {

        Participation(){
          this.user.activities += 1;
          this.user.points += 5;
          // this.activityStore.updateParticipated(this.user.email, this.activity._id)

        }, 


      },

      computed: {
        datePassed(){
          let date = new Date();
          if(this.activity.end < date.getDate()){ 
            return true
          }else{
            return false;
          }
        },
        activityUsers() {
          this.users.forEach((user) => {
              console.log(user._id)
              this.activity.users.forEach((userSub) => {
                if(user._id == userSub.user){
                  this.listUsers.push(user)
                }
              })
            }) 
          console.log(this.activity.users, this.activity.title)
          console.log(this.listUsers, this.activity.title)
          return this.listUsers
        }
      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    