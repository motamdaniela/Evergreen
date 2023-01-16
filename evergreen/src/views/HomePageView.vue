<template>
  <br />
  <h1 class="gradientPurple padding title">
    <span>Atividades Inscritas</span>
  </h1>
  <br />
  <div class="list">
    <div class="grid-item" v-for="activity in activitiesSub">
      <v-card
        class="mx-auto"
        max-width="400"
        id="card"
        :items="activitiesWithLink"
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
            <button class="btn-card btnP">
              <RouterLink
                :to="{ name: 'Activity', params: { id: activity.id } }"
                >Ver mais</RouterLink
              >
            </button>
          </div>
        </div>
      </v-card>
    </div>
  </div>
  <!-- <div id="activities"> -->
  <!-- usar groups > slides groups do vuetify -->
  <!-- <v-card class="mx-auto" max-width="400" id="card">
      <v-img
        class="image"
        src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
        height="219"
        width="380"
        cover
      >
      </v-img>

      <div class="cardText">
        <v-card-title>
          <b>Bancos de Jardim</b>
        </v-card-title>

        <div class="alignCard">
          <v-card-subtitle>
            <div>
              <b
                >Maio e Junho <br />
                Campus 2</b
              >
            </div>
          </v-card-subtitle>
          <button class="btn-card btnP" >Ver mais</button>
        </div>
      </div>
    </v-card>

    <v-card class="mx-auto" max-width="400" id="card">
      <v-img
        class="image"
        src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
        height="219"
        width="380"
        cover
      >
      </v-img>

      <div class="cardText">
        <v-card-title>
          <b>Bancos de Jardim</b>
        </v-card-title>

        <div class="alignCard">
          <v-card-subtitle>
            <div>
              <b
                >Maio e Junho <br />
                Campus 2</b
              >
            </div>
          </v-card-subtitle>
          <button class="btn-card btnP" >Ver mais</button>
        </div>
      </div>
    </v-card>

    <v-card class="mx-auto" max-width="400" id="card">
      <v-img
        class="image"
        src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
        height="219"
        width="380"
        cover
      >
      </v-img>

      <div class="cardText">
        <v-card-title>
          <b>Bancos de Jardim</b>
        </v-card-title>

        <div class="alignCard">
          <v-card-subtitle>
            <div>
              <b
                >Maio e Junho <br />
                Campus 2</b
              >
            </div>
          </v-card-subtitle>
          <button class="btn-card btnP" >Ver mais</button>
        </div>
      </div>
    </v-card>
  </div>
  <br /> -->
  <button class="btn-page btnP">Ver todas</button>

  <br /><br />
  <h1 class="gradientPink padding title"><span>Quadro de Líderes</span></h1>
  <div v-for="user in users">
    <div class="board">
      <img src="../assets/images/joana.jpg" id="profilePic" />
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
      users: [],
      logged: this.userStore.getLogged,
      activitiesSub: [],
    };
  },
  created() {
    if (this.userStore.getTop3.length > 1) {
      this.users = this.userStore.getTop3;
    } else {
      this.users.push(this.userStore.getTop3);
    }

    let activities = this.activityStore.getActivities;
    activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          this.activitiesSub.push(activity);
        }
      });
    });
  },
};
</script>

<style>
@import "../assets/styles/home.css";
</style>
