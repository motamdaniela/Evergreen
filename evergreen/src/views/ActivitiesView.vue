<template>
  <div>
    <h1 class="title"><img src="../assets/images/flowerP.svg">Plano de Atividades</h1>
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
            src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
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
              <button class="btn-card btnP" >
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
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const activityStore = useActivityStore();

    return { activityStore };
  },
  name: "Activities",
  data() {
    return {
      activities: [],
    };
  },
  created() {
    this.activities = this.activityStore.getActivities;
  },
};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
