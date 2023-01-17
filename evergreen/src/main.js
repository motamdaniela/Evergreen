import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import json from "/data.json";

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.mount("#app");

import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useMissionStore } from "@/stores/Mission";
import { useSchoolStore } from "@/stores/School";

const userStore = useUsersStore();
const activityStore = useActivityStore();
const occurrenceStore = useOccurrenceStore();
const missionStore = useMissionStore();
const schoolStore = useSchoolStore();

let predefinedUsers = json.predefinedUsers

let activities=json.activities

let themes=json.themes

let types=json.types

let missions = json.missions

let campus=json.campus

let schools=json.schools

let buildings=json.buildings

let floors=json.floors

let classrooms=json.classrooms

let typeM=json.typeM

let rewards=json.rewards

let users = userStore.getUsers;
predefinedUsers.forEach((user) => {
  if (users.find((u) => u.email == user.email)) {
    console.log("user has already been added");
  } else {
    userStore.add(user);
  }
});
let act = activityStore.getActivities;
activities.forEach((activity) => {
  if (act.find((a) => a.id == activity.id)) {
    console.log("activity has already been added");
  } else {
    activityStore.addActivity(activity);
  }
});

let tms = activityStore.getThemes;
themes.forEach((theme) => {
  if (tms.find((t) => t.id == theme.id)) {
    console.log("theme has already been added");
  } else {
    activityStore.addTheme(theme);
  }
});

let tps = occurrenceStore.getTypes;
types.forEach((type) => {
  if (tps.find((t) => t.id == type.id)) {
    console.log("type has already been added");
  } else {
    occurrenceStore.addType(type);
  }
});

let mss = missionStore.getMissions;
missions.forEach((mission) => {
  if (mss.find((m) => m.id == mission.id)) {
    console.log("mission has already been added");
  } else {
    missionStore.addMission(mission);
  }
});

let tpm = missionStore.getTypes;
typeM.forEach((type) => {
  if (tpm.find((t) => t.id == type.id)) {
    console.log("type has already been added");
  } else {
    missionStore.addType(type);
  }
});

let rwd = missionStore.getRewards;
rewards.forEach((reward) => {
  if (rwd.find((r) => r.id == reward.id)) {
    console.log("type has already been added");
  } else {
    missionStore.addReward(reward);
  }
});

let cmp = schoolStore.getCampus;
campus.forEach((camp) => {
  if (cmp.find((c) => c.id == camp.id)) {
    console.log("campus has already been added");
  } else {
    schoolStore.addCampus(camp);
  }
});

let sch = schoolStore.getSchools;
schools.forEach((school) => {
  if (sch.find((s) => s.id == school.id)) {
    console.log("school has already been added");
  } else {
    schoolStore.addSchool(school);
  }
});

let bld = schoolStore.getBuildings;
buildings.forEach((building) => {
  if (bld.find((b) => b.id == building.id)) {
    console.log("building has already been added");
  } else {
    schoolStore.addBuilding(building);
  }
});

let flo = schoolStore.getFloors;
floors.forEach((floor) => {
  if (flo.find((f) => f.id == floor.id)) {
    console.log("floor has already been added");
  } else {
    schoolStore.addFloor(floor);
  }
});

let cls = schoolStore.getClassrooms;
classrooms.forEach((classroom) => {
  if (cls.find((c) => c.id == classroom.id)) {
    console.log("classroom has already been added");
  } else {
    schoolStore.addClassroom(classroom);
  }
});

missionStore.completeMission(userStore.getLogged, 0);
