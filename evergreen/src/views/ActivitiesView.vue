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

              <h1>{{ activity.title }}</h1>
              <h3>Diagnostico:</h3>
              <p>{{ activity.desc1 }}</p>
              <h3>Objetivos:</h3>
              <p>{{ activity.desc2 }}</p>
              <h3>Metas:</h3>
              <p>{{ activity.desc3 }}</p>

            </v-card-text>
            <v-card-actions>
              <input

                v-if="!changeBtn"
                type="button"
                class="btn-page btnG"
                id="sub"
                value="Inscrever"
                @click="subscribe"
              />
              <input
                v-else
                type="button"
                class="btn-page btnR"
                id="unsub"
                value="Anular Inscrição"
                @click="unsubscribe"
              />

            </v-card-actions>
          </v-card>
        </div>
        </v-dialog>



  <div>
    <h1 class="title">
      <img src="../assets/images/flowerP.svg" />Plano de Atividades
    </h1>
    <button class="btn-card btnP">Filtrar</button>
    <button class="btn-card btnP">
      <RouterLink to="/Suggestion">Sugerir Atividades</RouterLink>
    </button>
    <div class="list">
      <div class="grid-item" v-for="activity in activities">
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
              <button class="btn-card btnP"
              @click="dialog = true; this.activity = activity">
                <!-- <RouterLink
                  :to="{ name: 'Activity', params: { id: activity.id } }"
                  >Ver mais</RouterLink
                > -->
                Ver mais
              </button>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useActivityStore } from "@/stores/Activity";
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const activityStore = useActivityStore();
    const usersStore = useUsersStore();

    return { activityStore, usersStore };
  },
  name: "Activities",
  data() {
    return {
      activities: [],
      activity: '',
      dialog: false,
      user: this.usersStore.getLogged,
    };
  },
  created() {
    this.activities = this.activityStore.getActivities;
  },
  methods: {
    subscribe() {
      this.activityStore.updateUsers(this.user, this.activity.id);
      this.missionStore.completeMission(this.user, 0);
    },
    unsubscribe() {
      this.activity.users = this.activity.users.filter((e) => e != this.user);
    },
  },
  computed: {
    changeBtn() {
      let u = this.activity.users.find((user) => user == this.user);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
