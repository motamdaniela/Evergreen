<template>
  <div>
    <br />
    <div id="divTop">
      <img
        id="imgTop"
        src="https://images.unsplash.com/photo-1624347537322-cbcd453c2032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1624347537322-cbcd453c2032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      />
      <div>
        <h2 class="gradientGreen padding title">
          <span>Atividades Próximas</span>
        </h2>
        <div style="padding: 15px" class="boardTop">
          <div
            v-if="closeActivities.length > 0"
            v-for="activity in closeActivities"
          >
            <span class="cardText">{{ activity.title }}: </span>
            <span>{{ activity.date }}</span>
            <br />
            <br />
          </div>
          <div v-else>Não tem atividades próximas</div>
        </div>
      </div>
      <div>
        <h2 class="gradientGreen padding title">
          <span>Atividades a Decorrer</span>
        </h2>
        <div style="padding: 15px" class="boardTop">
          <div
            v-if="activitiesNow.length > 0"
            v-for="activity in activitiesNow"
          >
            <span class="cardText">{{ activity.title }}: </span>
            <span>{{ activity.date }}</span>
            <br />
            <br />
          </div>
          <div v-else>
            Nenhuma atividade em que está inscrito, está de momento a decorrer.
          </div>
        </div>
      </div>
    </div>
    <br />
    <h1 style="margin-top: 5%" class="gradientPurple padding title">
      <span>Atividades Inscritas</span>
    </h1>
    <br />
    <v-dialog v-model="loginReward" persistent>
      <div class="fieldPklight modal bonusModal">
        <div :class="loginClass">
          <label class="tab">Dia 1</label>
          <img src="../assets/images/day1_5.svg" id="day1" />
          <label class="tab">Dia 2</label>
          <img src="../assets/images/day2_6.svg" id="day2" />
          <label class="tab">Dia 3</label>
          <img src="../assets/images/day3_7.svg" id="day3" />
          <label class="tab">Dia 4</label>
          <img src="../assets/images/day4.svg" id="day4" /><br /><br />
          <label class="tab" id="tab5">Dia 5</label>
          <img src="../assets/images/day1_5.svg" id="day5" />
          <label class="tab">Dia 6</label>
          <img src="../assets/images/day2_6.svg" id="day6" />
          <label class="tab">Dia 7</label>
          <img src="../assets/images/day3_7.svg" id="day7" />
        </div>
        <br />
        <button
          style="margin-left: 40%"
          class="btn-page btnPk"
          @click="receive"
        >
          Receber
        </button>
      </div>
    </v-dialog>

    <v-dialog v-model="open">
      <div class="fieldPklight modal actModal">
        <button class="btnRound btnPklight" @click="open = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg" />
        </button>
        <div class="contentModal">
          <div class="row1">
            <img :src="this.activity.photo" class="imgModal" />
            <div class="rowText">
              <h2>{{ this.activity.title }}</h2>
              <br />
              <h3>Data:</h3>
              <p>{{ this.activity.date }}</p>
              <br />
              <h3>Local:</h3>
              <p>{{ this.activity.place }}</p>
            </div>
          </div>

          <h3>Diagnóstico:</h3>
          <p>{{ this.activity.desc1 }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.desc2 }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.desc3 }}</p>
        </div>
        <div v-if="+this.activity.begin > +this.user.loginDate">
          <input
            v-if="!changeBtn(this.activity)"
            type="button"
            class="btn-page btnG btnModal"
            id="sub"
            value="Inscrever"
            @click="subscribe(this.activity)"
          />
          <input
            v-else
            type="button"
            class="btn-page btnR btnModal"
            id="unsub"
            value="Anular Inscrição"
            @click="subscribe(this.activity)"
          />
        </div>
        <div
          v-else-if="
            +this.activity.begin <= +this.user.loginDate &&
            +this.activity.end >= +this.user.loginDate
          "
        >
          <span>
            Esta atividade está a ser realizada e, por isso, não aceita mais
            inscrições/anulações de inscrição.</span
          >
        </div>
        <div v-else>
          <span> Esta atividade já acabou.</span>
        </div>
      </div>
    </v-dialog>

    <div v-if="this.activitiesSub.length > 0">
      <!-- <v-sheet class="mx-auto" max-width="1500" > -->
      <v-slide-group class="group" show-arrows>
        <slide-group-item v-for="activity in this.activitiesSub" class="items">
          <card class="card" max-width="400" id="card">
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
          </card>
        </slide-group-item>
      </v-slide-group>
      <button class="btn-page btnP" id="btnActSub">
        <RouterLink to="/Activities">Ver todas</RouterLink>
      </button>
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
          {{ user.username }} <br />
          {{ user.school }}
        </p>
        <p>{{ user.points }} pontos</p>
        <p>{{ user.activitiesCompleted }} atividades</p>
        <p>{{ user.occurrencesDone }} ocorrências</p>
        <div class="firstPlace">{{ users.indexOf(user) + 1 }}</div>
      </div>
    </div>
    <RouterLink to="/Rank">
      <button class="btn-page btnPk">Ver todos</button>
    </RouterLink>

    <br /><br />
    <h1 class="gradientRed padding title">
      <span>Sugestões de atividades</span>
    </h1>

    <div class="list listSug" v-if="activitiesSug.length > 0">
      <div class="grid-item itemR" v-for="activity in activitiesSug">
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
    <div v-else>
      <p>Não há novas sugestões de atividades.</p>
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
            width="5"
            height="50"
            src="https://cdn.pixabay.com/photo/2018/03/23/22/06/question-mark-3255118_960_720.jpg"
          />
        </v-col>
        <v-col>
          <p id="qstnText">
            Este questionário servirá para compreender melhor os hábitos e as
            opiniões dos alunos desta escola, em aspetos relacionados com o
            ambiente. As tuas respostas são muito importantes!Só juntos
            poderemos detetar os principais problemas e contribuir para que a
            nossa escola se transforme num local ainda mais agradável.O Conselho
            Eco-Escola agradece a tua colaboração.
          </p>
          <RouterLink to="/Form">
            <button class="btn-page btnY" id="qstnBtn">Preencher</button>
          </RouterLink>
        </v-col>
      </v-row>
    </div>

    <br /><br />
    <div v-if="this.user.council == true">
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
  <div id="divBtnUp">
    <button class="btnUp" @click.native="scrollToTop">
      <img
        style="width: 50px; height: 50px"
        src="../assets/icons/icones/up.svg"
      />
    </button>
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
      activity: {},
      themes: this.activityStore.getThemes,
      users: this.userStore.getTop3,
      logged: "",
      activitiesSub: [],
      activitiesSug: [],
      // user: this.userStore.getUsers.find((user) => user.email == this.logged),
      user: "",
      userObj: this.userStore.getLoggedObj,
      open: false,
      loginReward: false,
      loginPoints: 0,
      loginClass: "",
      closeActivities: [],
      activitiesNow: [],
    };
  },
  async created() {
    if (this.user == undefined || this.user == "") {
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
    }
    if (this.users == undefined || this.users == "") {
      await this.userStore.fetchAllUsers();
      this.users = this.userStore.getTop3;
    }
    this.activitiesSub = await this.activityStore.fetchSubActivities();
    console.log("atividades:", this.activitiesSub);
    // this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
    // (this.user = this.userStore.getUsers.find((t) => t.email == this.logged)),
    //   (this.themes = this.activityStore.getThemes);
    // let today = new Date(),
    //   yesterday = new Date(today);
    // yesterday.setDate(yesterday.getDate() - 1);
    // let yesterdayDate = +(
    //   yesterday.getFullYear() +
    //   "" +
    //   ((yesterday.getMonth() + 1).toString().length < 2
    //     ? "0" + (yesterday.getMonth() + 1)
    //     : yesterday.getMonth() + 1) +
    //   (yesterday.getDate().toString().length < 2
    //     ? "0" + yesterday.getDate()
    //     : yesterday.getDate())
    // );
    // 0 == this.user.received &&
    //   (console.log(1),
    //   this.user.previousLoginDate == yesterdayDate
    //     ? (1 == this.user.streak
    //         ? (this.loginPoints = 1)
    //         : 2 == this.user.streak
    //         ? (this.loginPoints = 3)
    //         : 3 == this.user.streak
    //         ? (this.loginPoints = 5)
    //         : 4 == this.user.streak
    //         ? (this.loginPoints = 8)
    //         : 5 == this.user.streak
    //         ? (this.loginPoints = 10)
    //         : 6 == this.user.streak
    //         ? (this.loginPoints = 15)
    //         : 7 == this.user.streak && (this.loginPoints = 20),
    //       (this.loginClass = "login" + this.user.streak),
    //       (this.loginReward = !0))
    //     : this.user.previousLoginDate < this.user.loginDate &&
    //       ((this.loginPoints = 1),
    //       (this.user.streak = 1),
    //       (this.loginClass = "login" + this.user.streak),
    //       (this.loginReward = !0),
    //       console.log(1)));
  },
  async updated() {
    // let activities = this.activityStore.getActivities;
    // activities.forEach((s) => {
    //   s.users.forEach((i) => {
    //     i.user == this.user._id &&
    //       (this.activitiesSub.find((i) => i._id == s._id) ||
    //         this.activitiesSub.push(s));
    //     console.log("b");
    //   });
    // }),
    //   this.activitiesSub.forEach((i) => {
    //     i.users.find((i) => i.user == this.user._id) ||
    //       ((i = this.activitiesSub.indexOf(i)),
    //       this.activitiesSub.splice(i, 1));
    //     console.log("a");
    //   }),
    (this.users = this.userStore.getTop3),
      // this.missionStore.completeMission(this.logged, 1),
      // this.missionStore.completeMission(this.logged, 2),
      // this.missionStore.completeMission(this.logged, 3),
      // this.missionStore.completeMission(this.logged, 4),
      // this.missionStore.completeMission(this.logged, 5),
      // this.missionStore.completeMission(this.logged, 8),
      // this.missionStore.completeMission(this.logged, 9),
      // console.log(),
      console.log(this.activitiesSug);
    (this.activitiesSug = this.activityStore.getActivitySuggestions),
      console.log(this.activitiesSug);

    this.activitiesSub.forEach((act) => {
      if (
        this.closeActivities.length < 5 &&
        +act.begin > this.user.loginDate &&
        !this.closeActivities.find((a) => a._id == act._id)
      ) {
        this.closeActivities.push(act);
      } else {
        this.closeActivities.forEach((a) => {
          if (
            +a.begin > +act.begin &&
            +a.begin > this.user.loginDate &&
            !this.closeActivities.find((ac) => a._id == ac._id)
          ) {
            this.closeActivities.splice(this.closeActivities.indexOf(act), 1);
            this.closeActivities.push(a);
          }
        });
      }
    });
    this.activitiesSub.forEach((act) => {
      if (
        +act.begin <= this.user.loginDate &&
        +act.end >= this.user.loginDate &&
        !this.activitiesNow.find((a) => a._id == act._id)
      ) {
        this.activitiesNow.push(act);
      }
    });
  },
  methods: {
    receive() {
      (this.user.points += this.loginPoints),
        (this.loginReward = !1),
        (this.user.received = !0),
        this.missionStore.completeMission(this.logged),
        7 == this.user.streak && (this.user.streak = 0);
    },
    async subscribe(activity) {
      this.activity = await this.activityStore.subscribeActivity(activity);
      await this.activityStore.fetchAllActivities();
      await this.missionStore.getAllMissions();
      this.missionStore.completeMission(this.userStore.getLogged, 0);
    },
    changeBtn(activity) {
      let u = activity.users.find((user) => user.user == this.user._id);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
    async SubConselho() {
      await this.userStore.subscribeCouncil();
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
      // FOR THE MISSION SUB CONSELHO
      // (this.user = this.userStore.getUsers.find((s) => s.email == this.logged)),
      //   this.user.council
      //     ? (this.user.council = !1)
      //     : ((this.user.council = !0),
      //       this.missionStore.completeMission(this.logged, 4)),
      //   this.userStore.edit(JSON.stringify(this.user));
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
@import "../assets/styles/home.css";
</style>
