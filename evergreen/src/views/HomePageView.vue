<template>
  <div>
    <br />
    <h1 class="gradientPurple padding title">
      <span>Atividades Inscritas</span>
    </h1>
    <br />
    <v-dialog v-model="loginReward">
      <div class="fieldPklight modal">
        <div :class="loginClass">
          <label class="tab">Dia 1</label>
          <img src="../assets/images/day1_5.svg" id="day1" />
          <label class="tab">Dia 2</label>
          <img src="../assets/images/day2_6.svg" id="day2" />
          <label class="tab">Dia 3</label>
          <img src="../assets/images/day3_7.svg" id="day3" />
          <label class="tab">Dia 4</label>
          <img src="../assets/images/day4.svg" id="day4" />
          <label class="tab">Dia 5</label>
          <img src="../assets/images/day1_5.svg" id="day5" />
          <label class="tab">Dia 6</label>
          <img src="../assets/images/day2_6.svg" id="day6" />
          <label class="tab">Dia 7</label>
          <img src="../assets/images/day3_7.svg" id="day7" />
        </div>
        <button class="btn-page btnPk" @click="receive">Receber</button>
      </div>
    </v-dialog>

    <v-dialog v-model="open">
      <div class="fieldPklight modal">
        <button class="btn-page btnPklight" @click="open = false">x</button>
        <img :src="this.activity.photo" width="200" />
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
          @click="subscribe(this.activity), changeBtn(this.activity)"
        />
        <input
          v-else
          type="button"
          class="btn-page"
          id="unsub"
          value="Anular Inscrição"
          @click="unsubscribe(this.activity), changeBtn(this.activity)"
        />
      </div>
    </v-dialog>

    <div v-if="activitiesSub.length > 0">
      <div class="list">
        <v-row>
          <div class="grid-item" v-for="activity in activitiesSub">
            <v-card class="mx-auto" max-width="400" id="card">
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
                  <button
                    class="btn-card btnP"
                    @click="
                      open = true;
                      this.activity = activity;
                    "
                  >
                    Ver mais
                  </button>
                </div>
              </div>
            </v-card>
          </div>
        </v-row>
      </div>
      <button class="btn-page btnP">Ver todas</button>
    </div>
    <div v-else id="noActivities">
      <p>Não estás inscrito em nenhuma atividade!</p>
      <p>Vê o que o eco-escolas tem para te oferecer no</p>
      <RouterLink to="/Activities">Plano de Atividades</RouterLink>
    </div>

    <br /><br />
    <h1 class="gradientPink padding title"><span>Quadro de Líderes</span></h1>
    <div v-for="user in users">
      <div class="board">
        <img :src="user.photo" id="profilePic" />
        <p>
          {{ user.name }} <br />
          {{ user.school }}
        </p>
        <p>{{ user.activities }} atividades</p>
        <p>{{ user.occurences }} ocorrências</p>
        <p>{{ user.points }} pontos</p>
        <div class="firstPlace">{{ users.indexOf(user) + 1 }}</div>
      </div>
    </div>
    <button class="btn-page btnPk">
      <RouterLink to="/Rank">Ver todos</RouterLink>
    </button>
    <!-- ^ this mf nao vai pro meio T-T  -->

    <br /><br />
    <h1 class="gradientRed padding title">
      <span>Sugestões de atividades</span>
    </h1>
    <div class="list">
      <div class="grid-item" v-for="activity in activitiesSug">
        <v-card class="mx-auto" max-width="400" id="cardR">
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
              <button
                class="btn-card btnR"
                @click="
                  open = true;
                  this.activity = activity;
                "
              >
                Ver mais
              </button>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <br /><br />
    <h1 class="gradientOrange padding title">
      <span>Preenche o questionário deste ano</span>
    </h1>
    <div class="fieldY" id="qstnField">
      <v-row>
        <v-col>
          <img
            id="imgQstn"
            class="image"
            src="https://cdn.pixabay.com/photo/2018/03/23/22/06/question-mark-3255118_960_720.jpg"
          />
        </v-col>
        <v-col>
          <p id="qstnText">
            Este questionário servirá para compreender melhor os hábitos e as
            opiniões dos alunos desta escola, em aspectos relacionados com o
            ambiente.As tuas respostas são muito importantes!Só juntos poderemos
            detectar os principais problemas e contribuir para que a nossa
            escola se transforme num local ainda mais agradável.O Conselho
            Eco-Escola agradece a tua colaboração.
          </p>
          <RouterLink to="/Form">
            <button class="btn-page btnY" id="qstnBtn">Preencher</button>
          </RouterLink>
        </v-col>
      </v-row>
    </div>

    <br /><br />
    <div v-if="this.user.council">
      <h1 class="padding title"><span>Já és membro do conselho!</span></h1>
      <button class="btn-page btnP" @click="SubConselho">Desistir</button>
    </div>
    <div v-else>
      <h1 class="padding title">
        <span>Inscreve-te já no conselho Eco-Escolas!</span>
      </h1>
      <button class="btn-page btnP" @click="SubConselho">Inscrever-me</button>
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
      activitiesSug: [],
      user: this.userStore.getUsers.find((user) => user.email == this.logged),
      userObj: this.userStore.getLoggedObj,
      open: false,
      loginReward: false,
      loginPoints: 0,
      loginClass: "",
    };
  },
  created() {
    this.user = this.userStore.getUsers.find(
      (user) => user.email == this.logged
    );
    this.themes = this.activityStore.getThemes;
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterdayDate = +(
      yesterday.getFullYear() +
      "" +
      ((yesterday.getMonth() + 1).toString().length < 2
        ? "0" + (yesterday.getMonth() + 1)
        : yesterday.getMonth() + 1) +
      "" +
      (yesterday.getDate().toString().length < 2
        ? "0" + yesterday.getDate()
        : yesterday.getDate())
    );
    if (this.user.received == false) {
      if (this.user.previousLoginDate == yesterdayDate) {
        if (this.user.streak == 1) {
          this.loginPoints = 1;
        } else if (this.user.streak == 2) {
          this.loginPoints = 3;
        } else if (this.user.streak == 3) {
          this.loginPoints = 5;
        } else if (this.user.streak == 4) {
          this.loginPoints = 8;
        } else if (this.user.streak == 5) {
          this.loginPoints = 10;
        } else if (this.user.streak == 6) {
          this.loginPoints = 15;
        } else if (this.user.streak == 7) {
          this.loginPoints = 20;
        }
        this.loginClass = "login" + this.user.streak;
        this.loginReward = true;
        // this.user.streak+=1
      } else if (this.user.previousLoginDate < this.user.loginDate) {
        this.loginPoints = 1;
        this.user.streak = 1;
        this.loginClass = "login" + this.user.streak;
        this.loginReward = true;
        // this.user.streak=1
        // logged.points+=1
      }
    }
  },
  updated() {
    let activities = this.activityStore.getActivities;
    activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          if (!this.activitiesSub.find((act) => act.id == activity.id)) {
            this.activitiesSub.push(activity);
          }
        }
      });
    });
    this.activitiesSub.forEach((act) => {
      if (!act.users.find((user) => user == this.logged)) {
        let index = this.activitiesSub.indexOf(act);
        this.activitiesSub.splice(index, 1);
      }
    });
    this.missionStore.completeMission(this.logged, 1);
    this.missionStore.completeMission(this.logged, 3);
    this.missionStore.completeMission(this.logged, 8);
  },
  methods: {
    receive() {
      this.user.points += this.loginPoints;
      this.loginReward = false;
      this.user.received = true;
      this.missionStore.completeMission(this.logged, 6);
      if (this.user.streak == 7) {
        this.user.streak = 0;
      }
    },
    subscribe(activity) {
      console.log(activity.id);
      this.activityStore.updateUsers(this.user, activity.id);
      this.missionStore.completeMission(this.user, 0);
    },
    unsubscribe(activity) {
      activity.users = activity.users.filter((e) => e != this.logged);
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
    SubConselho() {
      this.user = this.userStore.getUsers.find(
        (user) => user.email == this.logged
      );
      if (this.user.council) {
        this.user.council = false;
      } else {
        this.user.council = true;
        this.missionStore.completeMission(this.logged, 4);
      }
      this.userStore.edit(JSON.stringify(this.user));
    },
  },
  // computed: {
  //   activitiesSuggest() {
  //     let ListSuggest = [];
  //     let newList = this.activities;
  //     let newSuggest = '';
  //     if(this.activitiesSub.length <= 0){
  //       while(ListSuggest.length < 3){
  //         newSuggest = this.activities[Math.floor(Math.random()*this.activities.length)]
  //         ListSuggest.push(newSuggest);
  //         if(newSuggest.length > 0){
  //           newList.splice(newList.indexOf.find(newSuggest), 1)
  //         }
  //       }
  //       return ListSuggest
  //     }else{
  //       let themesList = [];
  //       this.activitiesSub.forEach(activity =>{
  //         themesList.push(activity.idTheme)
  //       })
  //       let newListThemes = this.activities.filter(activity => activity.idTheme in themesList);
  //       newListThemes.forEach(activity =>{
  //         if(!(this.activitiesSub.find((item) => item == activity))){
  //           newList.push(activity);
  //         }
  //       })
  //       while(ListSuggest.length < 3){
  //         newSuggest = newList[Math.floor(Math.random()*newList.length)];
  //         newList.splice(newList.indexOf(newList.find((item) => item == newSuggest)), 1)
  //         while(ListSuggest.find(sug => sug == newSuggest)){
  //           newSuggest = newList[Math.floor(Math.random()*newList.length)];
  //         }
  //         ListSuggest.push(newSuggest)
  //         // if(newList.length == 0){
  //         //   this.activitiesSug = ListSuggest
  //         // }
  //       }
  //       this.activitiesSug = ListSuggest
  //     }
  //   }
  //   },
};
</script>

<style>
@import "../assets/styles/home.css";
</style>