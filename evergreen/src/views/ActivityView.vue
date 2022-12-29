<template>
  <h1>{{ activity.title }}</h1>
  <h3>Diagnostico:</h3>
  <p>{{ activity.desc1 }}</p>
  <h3>Objetivos:</h3>
  <p>{{ activity.desc2 }}</p>
  <h3>Metas:</h3>
  <p>{{ activity.desc3 }}</p>
  <input type="button" value="Inscrever" class="btn-page" id="actBtn" />
</template>

<script>
import { RouterLink } from "vue-router";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const activityStore = useActivityStore();

    return { activityStore };
  },
  name: "Activity",
  data() {
    return {
      activityId: this.$route.params.id,
      activities: [],
      activity: {},
    };
  },
  created() {
    this.activities = this.activityStore.getActivities;
    this.activity = this.activities.find(
      (activity) => activity.id == this.activityId
    );
  },
};
</script>

<style lang="scss" scoped></style>
