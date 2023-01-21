<template>
  <div>
  <br />
  <h1 class="gradientPurple padding title">
    <span>Atividades Inscritas</span>
  </h1>
  <br />
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
      users: this.userStore.getTop3,
      logged: this.userStore.getLogged,
      activitiesSub: [],
      user: this.userStore.getLogged,
      open: false,
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
      let u = activity.users.find((user) => user == this.user);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
@import "../assets/styles/home.css";
</style>
