<template>
  <div>
    <h1>Atividades</h1>
    <div class="list">
      <div class="grid-item" v-for="activity in activities">
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
                class="btn-card"
                @click="
                  this.$router.push({
                    path: '/Activity',
                    params: { param1: activity.id },
                  })
                "
              >
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
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const activityStore = useActivityStore();

    return { activityStore };
  },
  data() {
    return {
      activities: this.activityStore.getActivities,
    };
  },
  methods: {},
};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
