<template>
  <div>
  <br />
  <h1 class="gradientPurple padding title">
    <span>Atividades Inscritas</span>
  </h1>
  <br />
  <v-dialog v-model="loginReward">
    <div class="fieldPklight modal">
        <p>ola</p>
    </div>
  </v-dialog>
  <v-dialog v-model="open">
      <div class="fieldPklight modal">
        <button class="btn-page btnPklight" @click="open = false">x</button>
        <img :src="this.activity.photo" width="200">
        <h1>{{ this.activity.title }}</h1>
        <h3>Diagnostico:</h3>
        <p>{{ this.activity.desc1 }}</p>
        <h3>Objetivos:</h3>
        <p>{{ this.activity.desc2 }}</p>
        <h3>Metas:</h3>
        <p>{{ this.activity.desc3 }}</p>
        <input
          v-if="!changeBtn(this.activity)"
          type="button"
          class="btn-page"
          id="sub"
          value="Inscrever"
          @click="subscribe(this.activity),changeBtn(this.activity)"
        />
        <input
          v-else
          type="button"
          class="btn-page"
          id="unsub"
          value="Anular Inscrição"
          @click="unsubscribe(this.activity),changeBtn(this.activity)"
        />
    </div>
      
    </v-dialog>
    <div class="list">
    <v-row>
    <div class="grid-item" v-for="activity in activitiesSub">
      <v-card
        class="mx-auto"
        max-width="400"
        id="card"
      >
        <v-img
          class="image"
          :src="activity.photo"
          height="219"
          width="380"
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
  </v-row>
  </div>
  <button class="btn-page btnP">Ver todas</button>

  <br /><br />
  <h1 class="gradientPink padding title"><span>Quadro de Líderes</span></h1>
  <div v-for="user in users">
    <div class="board">
      <img :src=user.photo id="profilePic" />
      <p>
        {{ user.name }} <br />
        {{ user.school }}
      </p>
      <p>15 atividades</p>
      <p>7 ocorrências</p>
      <p>{{ user.points }} pontos</p>
      <div class="firstPlace">{{ users.indexOf(user) + 1 }}</div>
    </div>
  </div>
  <button class="btn-page btnPk">
    <RouterLink to="/Rank">Ver todos</RouterLink>
  </button>
  <!-- ^ this mf nao vai pro meio T-T  -->

  <br /><br />
  <h1 class="gradientRed padding title"><span>Sugestões de atividades</span></h1>
  <div class="list">
    <div class="grid-item" v-for="activity in activitiesSuggest">
      <v-card
        class="mx-auto"
        max-width="400"
        id="cardR"
      >
        <v-img
          class="image"
          :src="activity.photo"
          height="219"
          width="380"
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
            <button class="btn-card btnR" @click="open = true; this.activity = activity">Ver mais</button>
          </div>
        </div>
      </v-card>
    </div>
  </div>

  <br /><br />
  <h1 class="gradientOrange padding title"><span>Preenche o questionário deste ano</span></h1>
  <div class="fieldY">
    <v-row>
      <v-col>
        <img id="imgQstn" class="image" src="https://cdn.pixabay.com/photo/2018/03/23/22/06/question-mark-3255118_960_720.jpg"/>
      </v-col>
      <v-col>
        <p>
          Este questionário servirá para compreender melhor os hábitos e as opiniões dos alunos desta escola, em aspectos relacionados com o ambiente.As tuas respostas são muito importantes!Só juntos poderemos detectar os principais problemas e contribuir para que a nossa escola se transforme num local ainda mais agradável.O Conselho Eco-Escola agradece a tua colaboração.
        </p>
        <RouterLink to="/Form">

          <button class="btn-page btnY">Preencher</button>
        </RouterLink>
      </v-col>
    </v-row>
  </div>

  <br /><br />
  <div v-if="this.user.type == 'council'">
    <h1 class="padding title"><span>Já és membro do conselho!</span></h1>
    <button class="btn-page btnP" @click="SubConselho" >Desistir</button>
  </div>
  <div v-else>
    <h1 class="padding title"><span>Inscreve-te já no conselho Eco-Escolas!</span></h1>
    <button class="btn-page btnP" @click="SubConselho" >Inscrever-me</button>
  </div>


</div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();
    const missionStore = useMissionStore();

    return { userStore, activityStore, missionStore };
  },
  data() {
    return {
      activities: this.activityStore.getActivities,
      themes: this.activityStore.getThemes,
      users: this.userStore.getTop3,
      logged: this.userStore.getLogged,
      activitiesSub: [],
      user: this.userStore.getUsers.find((user)=> user.email == this.logged),
      userObj: this.userStore.getLoggedObj,
      open: false,
      loginReward: false, 
      loginPoints:0,
    };
  },
  created () {
    this.user = this.userStore.getUsers.find((user)=> user.email == this.logged)
    this.themes = this.activityStore.getThemes;
    let today = new Date();
    let yesterday= new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    let yesterdayDate =yesterday.getFullYear()+""+((yesterday.getMonth()+1).toString().length < 2 ? "0" + (yesterday.getMonth() + 1) : (yesterday.getMonth()+1))+""+(yesterday.getDate().toString().length < 2 ? "0" + yesterday.getDate() : yesterday.getDate())
    if(this.userObj.previousLoginDate==yesterdayDate && this.userObj.streak==7){
      this.loginPoints=7
      this.loginReward=true
      this.userObj.streak=0
    }else if(this.userObj.previousLoginDate==yesterdayDate){
      this.loginPoints=this.userObj.streak
      this.loginReward=true
      this.userObj.streak+=1
      // logged.streak+=1
      // logged.points+=logged.streak
      // if(logged.streak==7){
      //   logged.streak=0
      // }

    }else if(this.userObj.previousLoginDate<this.userObj.loginDate){
      this.loginPoints=1
      this.loginReward=true
      this.userObj.streak=1
      // logged.points+=1
    };
  },
  updated () {
    console.log('updated')
    console.log(this.activitiesSub)
    let activities = this.activityStore.getActivities;
    activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          if(!this.activitiesSub.find(act=>act.id==activity.id)){
            this.activitiesSub.push(activity);
          }
        }
      });
    });

    this.activitiesSub.forEach((act) => {
      if(!act.users.find(user=>user==this.logged)){
        let index = this.activitiesSub.indexOf(act);
        this.activitiesSub.splice(index, 1);
      }
    })
  },
  methods: {
    subscribe(activity) {
      console.log(activity.id)
      this.activityStore.updateUsers(this.user, activity.id);
      this.missionStore.completeMission(this.user, 0);
    },
    unsubscribe(activity) {
      activity.users = activity.users.filter((e) => e != this.user);
      // this.activitiesSub
    },
    changeBtn(activity) {
      let u = activity.users.find((user) => user == this.logged);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
    SubConselho(){
      this.user = this.userStore.getUsers.find((user)=> user.email == this.logged)
      if(this.user.type != 'council'){
        this.user.type = 'council'
      }else{
        this.user.type = 'user'
      }
      this.userStore.edit(JSON.stringify(this.user))
    }
  },
  computed: {
    activitiesSuggest() {
      let ListSuggest = [];
      let newList = this.activities;
      let newSuggest = '';
      if(this.activitiesSub.length <= 0){
        while(ListSuggest.length < 3){
          newSuggest = this.activities[Math.floor(Math.random()*this.activities.length)]
          ListSuggest.push(newSuggest);
          if(newSuggest.length > 0){
            newList.splice(newList.indexOf.find(newSuggest), 1)
          }
        }
        return ListSuggest
      }else{
        while(ListSuggest.length < 3){
          let themesList = [];
          this.activitiesSub.forEach(activity =>{
            themesList.push(activity.idTheme)
          })
          newList = this.activities.filter(activity => activity.idTheme in themesList);

          newSuggest = newList[Math.floor(Math.random()*newList.length)];
          if(!(newSuggest.users.find((user)=> user == this.logged))){
            if(ListSuggest.length > 0 && newList.length == 0){
            newSuggest = this.activities[Math.floor(Math.random()*this.activities.length)]
            }
            ListSuggest.push(newSuggest);
            let item = newList.find((item) => item == newSuggest)
            newList.splice(newList.indexOf(item), 1)
          }
        }
        return ListSuggest

      }
    }
  },
};
</script>

<style>
@import "../assets/styles/home.css";
</style>
